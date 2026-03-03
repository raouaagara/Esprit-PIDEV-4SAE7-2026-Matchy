import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasEl') canvasEl!: ElementRef<HTMLCanvasElement>;

  // ── Original state ───────────────────────────────────
  step: 'role' | 'form' = 'role';
  selectedRole: 'CLIENT' | 'FREELANCER' | null = null;
  isLoading = false;
  isDark = true;
  error = '';
  showPassword = false;
  form: FormGroup;

  // ── Canvas internals ─────────────────────────────────
  private ctx!: CanvasRenderingContext2D;
  private animId!: number;
  private W = 0;
  private H = 0;
  private dpr = 1;
  private nodes: any[] = [];
  private hexes: any[] = [];
  private waves: any[] = [];
  private tags: any[] = [];
  private stars: any[] = [];
  private frame = 0;
  private MAX_DIST = 160;
  private TAGS = ['UI Design','React','Branding','Figma','Node.js','Motion','Copy','SEO','3D','Vue','Strategy','Spring','Outfit'];
  private resizeHandler!: () => void;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.authService.checkAuth();
    if (this.authService.isAuthenticated) {
      this.redirectByRole();
    }

    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName:  ['', [Validators.required, Validators.minLength(2)]],
      email:     ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.minLength(6)]],
      location:  [''],
      skills:    [''],
      bio:       ['']
    });
  }

  ngAfterViewInit(): void {
    this.initCanvas();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.resizeHandler);
  }

  // ── Original methods (100% preserved) ───────────────
  selectRole(role: 'CLIENT' | 'FREELANCER'): void {
    this.selectedRole = role;
    this.step = 'form';
  }

  goBackToRole(): void {
    this.step = 'role';
    this.error = '';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.error = '';

    const payload = {
      ...this.form.value,
      role: this.selectedRole,
      status: 'ACTIVE'
    };

    this.http.post<any>(`${environment.apiUrl}/auth/register`, payload).subscribe({
      next: () => {
        const { email, password } = this.form.value;
        this.authService.login(email, password).subscribe({
          next: (ok: boolean) => {
            if (ok) this.redirectByRole();
            else this.router.navigate(['/login']);
          },
          error: () => this.router.navigate(['/login'])
        });
      },
      error: (err: any) => {
        this.error = err?.error?.error || 'Registration failed. Email may already be in use.';
        this.isLoading = false;
      }
    });
  }

  private redirectByRole(): void {
    if (this.authService.isAdmin())           this.router.navigate(['/backoffice/dashboard']);
    else if (this.authService.isClient())     this.router.navigate(['/client/dashboard']);
    else if (this.authService.isFreelancer()) this.router.navigate(['/freelancer/dashboard']);
    else                                      this.router.navigate(['/']);
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }

  get passwordStrength(): { score: number; label: string; color: string } {
    const pw = this.form.get('password')?.value || '';
    let score = 0;
    if (pw.length >= 6)           score++;
    if (pw.length >= 10)          score++;
    if (/[A-Z]/.test(pw))         score++;
    if (/[0-9]/.test(pw))         score++;
    if (/[^A-Za-z0-9]/.test(pw))  score++;
    if (score <= 1) return { score, label: 'Weak',        color: '#EF4444' };
    if (score <= 2) return { score, label: 'Fair',        color: '#F97316' };
    if (score <= 3) return { score, label: 'Good',        color: '#EAB308' };
    if (score <= 4) return { score, label: 'Strong',      color: '#22C55E' };
    return                 { score, label: 'Very strong', color: '#10B981' };
  }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c && c.invalid && c.touched);
  }

  // ── Canvas setup ─────────────────────────────────────
  private initCanvas(): void {
    const canvas = this.canvasEl.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeHandler = () => this.resize();
    window.addEventListener('resize', this.resizeHandler);
    this.resize();
    this.loop();
  }

  private resize(): void {
    const canvas = this.canvasEl.nativeElement;
    this.dpr = window.devicePixelRatio || 1;
    this.W = canvas.offsetWidth;
    this.H = canvas.offsetHeight;
    canvas.width  = this.W * this.dpr;
    canvas.height = this.H * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.buildScene();
  }

  private col(r: number, g: number, b: number, a: number): string {
    return `rgba(${r},${g},${b},${a})`;
  }

  private buildScene(): void {
    this.nodes = Array.from({ length: 55 }, () => this.makeNode(true));
    this.hexes = [];
    const S = 46, rows = 12, cols = 12;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        this.hexes.push({
          cx: c * S * Math.sqrt(3) + (r % 2 ? S * Math.sqrt(3) / 2 : 0) - 30,
          cy: r * S * 1.5 - 40,
          s: S,
          phase: Math.random() * Math.PI * 2,
          speed: 0.003 + Math.random() * 0.006,
          base: 0.03 + Math.random() * 0.1
        });
      }
    }
    this.waves = [0, 1, 2].map(i => ({
      i, phase: i * 1.8,
      speed: 0.004 + i * 0.002,
      amp: 80 + i * 30,
      y: this.H * (0.3 + i * 0.18),
      opacity: 0.025 - i * 0.005
    }));
    this.tags = Array.from({ length: 10 }, () => this.makeTag(true));
  }

  private makeNode(init: boolean): any {
    const kind = Math.random() < 0.12 ? 'hi' : Math.random() < 0.25 ? 'mid' : 'lo';
    return {
      x: init ? Math.random() * this.W : (Math.random() < 0.5 ? -5 : this.W + 5),
      y: Math.random() * this.H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2.2 + 1.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.012,
      kind, pulseAmp: 0.4 + Math.random() * 0.6
    };
  }

  private makeTag(init: boolean): any {
    return {
      text: this.TAGS[Math.floor(Math.random() * this.TAGS.length)],
      x: init ? Math.random() * this.W : -200,
      y: 50 + Math.random() * (this.H - 200),
      vx: 0.15 + Math.random() * 0.25, vy: (Math.random() - 0.5) * 0.08,
      opacity: 0, targetOp: 0.12 + Math.random() * 0.12,
      fading: false, delay: init ? Math.random() * 300 : 0, timer: 0,
      fontSize: 11 + Math.floor(Math.random() * 4)
    };
  }

  private makeStar(): any {
    return {
      x: Math.random() * this.W * 0.6 + this.W * 0.2,
      y: Math.random() * this.H * 0.4,
      len: 60 + Math.random() * 80,
      speed: 6 + Math.random() * 8,
      angle: Math.PI / 5 + Math.random() * 0.4,
      life: 1, decay: 0.025 + Math.random() * 0.02,
      w: 1.5 + Math.random()
    };
  }

  private nodePulse(n: any): number {
    return 0.5 + Math.sin(n.phase) * n.pulseAmp * 0.5;
  }

  private drawNode(n: any): void {
    const { ctx } = this;
    let r = 123, g = 159, b = 255;
    if (n.kind === 'hi')  { r = 196; g = 160; b = 255; }
    else if (n.kind === 'mid') { r = 98; g = 216; b = 204; }
    // Darken for light mode
    if (!this.isDark) { r = Math.max(r - 80, 20); g = Math.max(g - 80, 20); b = Math.max(b - 40, 60); }
    const p = this.nodePulse(n);
    const alpha = this.isDark ? 0.18 : 0.55;
    const alphaCore = this.isDark ? (0.5 + p * 0.5) : (0.85 + p * 0.15);
    const rad = n.r * (0.8 + p * 0.2);
    const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rad * 4);
    gr.addColorStop(0, this.col(r, g, b, alpha));
    gr.addColorStop(1, this.col(r, g, b, 0));
    ctx.beginPath(); ctx.arc(n.x, n.y, rad * 4, 0, Math.PI * 2);
    ctx.fillStyle = gr; ctx.fill();
    ctx.beginPath(); ctx.arc(n.x, n.y, rad, 0, Math.PI * 2);
    ctx.fillStyle = this.col(r, g, b, alphaCore); ctx.fill();
  }

  private drawHex(h: any): void {
    const { ctx } = this;
    const a = h.base * (0.5 + Math.sin(h.phase) * 0.5);
    ctx.beginPath();
    for (let k = 0; k < 6; k++) {
      const ang = (Math.PI / 3) * k - Math.PI / 6;
      k === 0
        ? ctx.moveTo(h.cx + h.s * Math.cos(ang), h.cy + h.s * Math.sin(ang))
        : ctx.lineTo(h.cx + h.s * Math.cos(ang), h.cy + h.s * Math.sin(ang));
    }
    ctx.closePath();
    const hexA = this.isDark ? a : a * 7;
    ctx.strokeStyle = this.isDark ? this.col(160, 188, 255, hexA) : this.col(40, 70, 190, hexA);
    ctx.lineWidth = 0.8; ctx.stroke();
  }

  private drawWave(w: any): void {
    const { ctx } = this;
    const colors: [number,number,number][] = [[123,159,255],[196,160,255],[98,216,204]];
    const [r, g, b] = colors[w.i % 3];
    ctx.beginPath(); ctx.moveTo(0, w.y);
    for (let x = 0; x <= this.W; x += 8) {
      const yOff = Math.sin(x * 0.008 + w.phase) * w.amp
                 + Math.sin(x * 0.015 + w.phase * 1.3) * (w.amp * 0.4);
      ctx.lineTo(x, w.y + yOff);
    }
    ctx.lineTo(this.W, this.H); ctx.lineTo(0, this.H); ctx.closePath();
    const gr = ctx.createLinearGradient(0, w.y - w.amp, 0, w.y + w.amp * 2);
    const wOp = this.isDark ? 1 : 7;
    gr.addColorStop(0, this.col(r, g, b, w.opacity * 1.5 * wOp));
    gr.addColorStop(0.5, this.col(r, g, b, w.opacity * wOp));
    gr.addColorStop(1, this.col(r, g, b, 0));
    ctx.fillStyle = gr; ctx.fill();
  }

  private drawTag(t: any): void {
    const { ctx } = this;
    if (t.opacity <= 0 || t.timer < t.delay) return;
    const padding = 8, h = t.fontSize + 12;
    ctx.font = `500 ${t.fontSize}px 'Outfit',sans-serif`;
    const bw = ctx.measureText(t.text).width + padding * 2;
    ctx.beginPath();
    this.roundRect(t.x, t.y - h / 2, bw, h, h / 2);
    const tr = this.isDark ? 160 : 50; const tg2 = this.isDark ? 188 : 80; const tb = this.isDark ? 255 : 200;
    ctx.fillStyle = this.col(tr, tg2, tb, t.opacity * (this.isDark ? 0.35 : 0.6)); ctx.fill();
    ctx.strokeStyle = this.col(tr, tg2, tb, t.opacity * (this.isDark ? 0.7 : 1.2)); ctx.lineWidth = 0.6; ctx.stroke();
    ctx.fillStyle = this.col(tr, tg2, tb, t.opacity * (this.isDark ? 2.2 : 4));
    ctx.textBaseline = 'middle'; ctx.fillText(t.text, t.x + padding, t.y);
  }

  private roundRect(x: number, y: number, w: number, h: number, r: number): void {
    const ctx = this.ctx;
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  private drawConnections(): void {
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i], b = this.nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < this.MAX_DIST) {
          const op = (1 - d / this.MAX_DIST) * 0.22;
          const mid = (this.nodePulse(a) + this.nodePulse(b)) / 2;
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y); this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = this.isDark ? this.col(123, 159, 255, op * mid) : this.col(40, 60, 180, op * mid * 5);
          this.ctx.lineWidth = 0.7; this.ctx.stroke();
        }
      }
    }
  }

  private drawAtmo(): void {
    const blobs = [
      { x: this.W * 0.15, y: this.H * 0.25, r: this.W * 0.4, c: [123,159,255] as [number,number,number], op: 0.09 },
      { x: this.W * 0.9,  y: this.H * 0.8,  r: this.W * 0.35, c: [98,216,204]  as [number,number,number], op: 0.07 },
      { x: this.W * 0.65, y: this.H * 0.1,  r: this.W * 0.3,  c: [196,160,255] as [number,number,number], op: 0.08 }
    ];
    blobs.forEach(b => {
      const gr = this.ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      const blobOp = this.isDark ? b.op : b.op * 4;
      gr.addColorStop(0, this.col(b.c[0], b.c[1], b.c[2], blobOp));
      gr.addColorStop(1, this.col(b.c[0], b.c[1], b.c[2], 0));
      this.ctx.beginPath(); this.ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      this.ctx.fillStyle = gr; this.ctx.fill();
    });
  }

  private loop = (): void => {
    this.animId = requestAnimationFrame(this.loop);
    const { ctx } = this;

    ctx.fillStyle = this.isDark ? '#06081A' : '#C8D0F0'; ctx.fillRect(0, 0, this.W, this.H);
    this.drawAtmo();
    this.waves.forEach(w => { w.phase += w.speed; this.drawWave(w); });
    this.hexes.forEach(h => { h.phase += h.speed; this.drawHex(h); });
    this.tags.forEach(t => {
      if (t.timer < t.delay) { t.timer++; return; }
      t.x += t.vx; t.y += t.vy;
      if (!t.fading) t.opacity = Math.min(t.opacity + 0.004, t.targetOp);
      if (t.x > this.W * 0.9 || t.fading) {
        t.opacity -= 0.003;
        if (t.opacity <= 0) Object.assign(t, this.makeTag(false));
      }
      this.drawTag(t);
    });
    this.drawConnections();
    this.nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy; n.phase += n.speed;
      if (n.x < -20 || n.x > this.W + 20 || n.y < -20 || n.y > this.H + 20) {
        Object.assign(n, this.makeNode(false));
      }
      this.drawNode(n);
    });
    if (this.frame % 220 === 0 && Math.random() < 0.7) this.stars.push(this.makeStar());
    this.stars = this.stars.filter(s => s.life > 0);
    this.stars.forEach(s => {
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.life -= s.decay;
      const tx = s.x - Math.cos(s.angle) * s.len;
      const ty = s.y - Math.sin(s.angle) * s.len;
      const gr = ctx.createLinearGradient(tx, ty, s.x, s.y);
      gr.addColorStop(0, this.col(200, 220, 255, 0));
      gr.addColorStop(1, this.col(200, 220, 255, s.life * 0.9));
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = gr; ctx.lineWidth = s.w * s.life; ctx.stroke();
    });
    this.frame++;
  }
}