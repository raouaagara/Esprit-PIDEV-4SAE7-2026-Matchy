import { Component, OnInit, NgZone } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardStats, User } from '../../core/models/models';

export interface StatItem {
  icon: string;
  bg: string;
  glow: string;
  color: string;
  label: string;
  sub: string;
  value: number;
  suffix?: string;
  change: string;
  changeType: 'up' | 'neutral';
  barW: string;
  animated: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats: StatItem[] = [];
  recentUsers:    User[] = [];
  topFreelancers: User[] = [];

  isLoading     = true;
  chartsReady   = false;
  donutAnimated = false;
  progAnimated  = false;
  isDark        = true;

  userSearch       = '';
  freelancerSearch = '';
  activeSortBtn    = 'Date';

  /* ── Bar chart (replace with real API when available) ── */
  readonly barData = [
    { l: 'Jan', v: 4  }, { l: 'Feb', v: 9  }, { l: 'Mar', v: 6  },
    { l: 'Apr', v: 14 }, { l: 'May', v: 11 }, { l: 'Jun', v: 18 },
    { l: 'Jul', v: 15 }, { l: 'Aug', v: 8  }, { l: 'Sep', v: 13 },
    { l: 'Oct', v: 21 }, { l: 'Nov', v: 17 }, { l: 'Dec', v: 24 },
  ];
  readonly barMax = 24;

  /* ── Donut ── */
  readonly donutC = 2 * Math.PI * 52;
  donutSegs: { id: string; label: string; pct: number; color: string; dashArray: string; dashOffset: number }[] = [];

  /* ── Progress bars ── */
  progBars: { title: string; pct: number; gradient: string; meta: { val: string; key: string }[] }[] = [];

  readonly avatarGrads = [
    'linear-gradient(135deg,#6366f1,#818cf8)',
    'linear-gradient(135deg,#06b6d4,#38bdf8)',
    'linear-gradient(135deg,#a855f7,#c084fc)',
    'linear-gradient(135deg,#22c55e,#4ade80)',
    'linear-gradient(135deg,#f59e0b,#fcd34d)',
  ];

  readonly ranks = ['🥇', '🥈', '🥉'];

  constructor(
    private dashboardService: DashboardService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.restoreTheme();
    this.loadData();
  }

  /* ─── Load ─────────────────────────────────────────── */
  loadData(): void {
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.buildStats(data);
        this.buildDonut(data);
        this.buildProgBars(data);
        this.isLoading = false;

        setTimeout(() => {
          this.chartsReady  = true;
          this.progAnimated = true;
          this.animateCounters();
          setTimeout(() => this.donutAnimated = true, 800);
        }, 100);
      },
      error: () => { this.isLoading = false; }
    });

    this.dashboardService.getRecentUsers().subscribe(u  => this.recentUsers    = u);
    this.dashboardService.getTopFreelancers().subscribe(f => this.topFreelancers = f);
  }

  /* ─── Stats ────────────────────────────────────────── */
  private buildStats(s: DashboardStats): void {
    const total = s.totalUsers || 1;
    const totalP = s.totalProjects || 1;

    this.stats = [
      { icon:'👥', bg:'rgba(99,102,241,.15)',  glow:'rgba(99,102,241,.4)',  color:'#6366f1', label:'Total Users',      sub:'registered accounts',   value: s.totalUsers,          change:'+12%', changeType:'up',      barW:'100%',                             animated:0 },
      { icon:'🧑‍💼', bg:'rgba(6,182,212,.15)',   glow:'rgba(6,182,212,.4)',   color:'#06b6d4', label:'Clients',          sub:'project owners',        value: s.totalClients,        change:'+8%',  changeType:'up',      barW: Math.round(s.totalClients/total*100)+'%',   animated:0 },
      { icon:'🎨', bg:'rgba(168,85,247,.15)',  glow:'rgba(168,85,247,.4)',  color:'#a855f7', label:'Freelancers',      sub:'active providers',      value: s.totalFreelancers,    change:'+15%', changeType:'up',      barW: Math.round(s.totalFreelancers/total*100)+'%', animated:0 },
      { icon:'✅', bg:'rgba(34,197,94,.15)',   glow:'rgba(34,197,94,.4)',   color:'#22c55e', label:'Verified',         sub:'trusted badge',         value: s.verifiedFreelancers, change:'+5%',  changeType:'up',      barW: Math.round(s.verifiedFreelancers/total*100)+'%', animated:0 },
      { icon:'📂', bg:'rgba(245,158,11,.15)',  glow:'rgba(245,158,11,.4)',  color:'#f59e0b', label:'Open Projects',    sub:'seeking freelancers',   value: s.openProjects,        change:'new',  changeType:'neutral', barW: Math.round(s.openProjects/totalP*100)+'%',  animated:0 },
      { icon:'🔲', bg:'rgba(100,116,139,.15)', glow:'rgba(100,116,139,.4)', color:'#64748b', label:'Completed',        sub:'delivered projects',    value: s.completedProjects,   change:'+22%', changeType:'up',      barW: Math.round(s.completedProjects/totalP*100)+'%', animated:0 },
      { icon:'📊', bg:'rgba(239,68,68,.15)',   glow:'rgba(239,68,68,.4)',   color:'#ef4444', label:'Total Projects',   sub:'on the platform',       value: s.totalProjects,       change:'+18%', changeType:'up',      barW:'100%',                             animated:0 },
      { icon:'⭐', bg:'rgba(234,179,8,.15)',   glow:'rgba(234,179,8,.4)',   color:'#eab308', label:'Verif. Rate',      sub:'platform quality',      value: +s.verificationRate,   change:'+3%',  changeType:'up',      barW: s.verificationRate+'%', suffix:'%',  animated:0 },
    ];
  }

  /* ─── Donut ────────────────────────────────────────── */
  private buildDonut(s: DashboardStats): void {
    const total = (s.totalClients + s.totalFreelancers) || 1;
    const raw = [
      { id:'d0', label:'Clients',     pct: Math.round(s.totalClients     / total * 100), color:'#06b6d4' },
      { id:'d1', label:'Freelancers', pct: Math.round(s.totalFreelancers / total * 100), color:'#a855f7' },
      { id:'d2', label:'Verified',    pct: Math.round(s.verifiedFreelancers / total * 100), color:'#22c55e' },
    ].filter(x => x.pct > 0);

    let off = 0;
    this.donutSegs = raw.map(seg => {
      const len = (seg.pct / 100) * this.donutC;
      const built = { ...seg, dashArray: `${len} ${this.donutC}`, dashOffset: -off };
      off += len;
      return built;
    });
  }

  /* ─── Progress bars ─────────────────────────────────── */
  private buildProgBars(s: DashboardStats): void {
    const total = s.totalUsers || 1;
    const totalP = s.totalProjects || 1;
    this.progBars = [
      { title:'Freelancer Adoption',    pct: Math.min(Math.round(s.totalFreelancers  / total * 100), 100), gradient:'linear-gradient(90deg,#a855f7,#c084fc)', meta:[{val:String(s.totalFreelancers), key:'Freelancers'},{val:String(s.totalUsers), key:'Total Users'}] },
      { title:'Project Completion Rate',pct: Math.min(Math.round(s.completedProjects / totalP* 100), 100), gradient:'linear-gradient(90deg,#22c55e,#4ade80)',  meta:[{val:String(s.completedProjects),key:'Completed'  },{val:String(s.totalProjects),key:'Total'}] },
      { title:'Verification Rate',      pct: Math.min(Math.round(+s.verificationRate), 100),             gradient:'linear-gradient(90deg,#f59e0b,#fcd34d)',  meta:[{val:String(s.verifiedFreelancers),key:'Verified'},{val:String(s.totalFreelancers),key:'Freelancers'}] },
      { title:'Platform Activity',      pct: 83,                                                          gradient:'linear-gradient(90deg,#6366f1,#818cf8)',  meta:[{val:String(s.totalUsers),key:'Active'},{val:String(s.totalUsers),key:'Registered'}] },
    ];
  }

  /* ─── Animated counters ─────────────────────────────── */
  private animateCounters(): void {
    const duration = 1200;
    const start    = performance.now();
    const targets  = this.stats.map(s => s.value);

    const tick = (now: number) => {
      const p    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      this.ngZone.run(() => {
        this.stats.forEach((s, i) => s.animated = Math.round(targets[i] * ease));
      });
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ─── Helpers ───────────────────────────────────────── */
  barHeight(v: number): number  { return Math.round((v / this.barMax) * 100); }
  barDelay(i: number): string   { return `${i * 55 + 600}ms`; }
  arcDelay(i: number): string   { return `${800 + i * 150}ms`; }
  setSort(btn: string): void    { this.activeSortBtn = btn; }
  getInitial(name: string): string { return name?.charAt(0)?.toUpperCase() || '?'; }
  avatarGrad(i: number): string { return this.avatarGrads[i % this.avatarGrads.length]; }
  rankLabel(i: number): string  { return this.ranks[i] ?? '#' + (i + 1); }

  statusDotClass(status: string): string {
    const map: Record<string, string> = { active:'dot-active', inactive:'dot-inactive', banned:'dot-banned' };
    return map[status?.toLowerCase()] || 'dot-inactive';
  }

  /* ─── Theme ─────────────────────────────────────────── */
  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    localStorage.setItem('adm-theme', this.isDark ? 'dark' : 'light');
  }

  private restoreTheme(): void {
    this.isDark = localStorage.getItem('adm-theme') !== 'light';
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }
}