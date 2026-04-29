import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgendaClient, AgendaMeeting, AgendaMeetingRequest } from 'src/app/shared/models/models';
import { NotificationToastComponent } from 'src/app/shared/components/notification-toast/notification-toast.component';
import { AgendaService } from 'src/app/core/services/agenda.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';


type CalendarView = 'week' | 'day' | 'list';

interface CalendarEvent {
  meeting: AgendaMeeting;
  top: number;
  height: number;
  left: number;
  width: number;
}

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, NotificationToastComponent],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit, OnDestroy {
  view: CalendarView = 'week';
  currentDate = new Date();
  weekDays: Date[] = [];
  meetings: AgendaMeeting[] = [];
  clients: AgendaClient[] = [];
  loading = true;
  saving = false;
  savingError = '';
  private agendaSub?: Subscription;

  // Time grid: 08:00 – 20:00, 30-min slots → 24 slots, each 52px tall
  readonly SLOT_HEIGHT = 52;
  readonly START_HOUR = 8;
  readonly END_HOUR = 20;
  timeSlots: string[] = [];

  // Create modal
  showCreateModal = false;
  createForm: AgendaMeetingRequest & { scheduledDate: string; scheduledTime: string } = {
    title: '', notes: '', scheduledAt: '', scheduledDate: '', scheduledTime: '09:00',
    durationMinutes: 60, clientId: 0
  };

  // Edit modal
  showEditModal = false;
  editingMeeting: AgendaMeeting | null = null;
  editForm: AgendaMeetingRequest & { scheduledDate: string; scheduledTime: string } = {
    title: '', notes: '', scheduledAt: '', scheduledDate: '', scheduledTime: '09:00',
    durationMinutes: 60, clientId: 0
  };

  // Cancel confirm
  showCancelConfirm = false;
  cancellingMeeting: AgendaMeeting | null = null;

  // 15-min reminder toast
  upcomingReminder: AgendaMeeting | null = null;
  private shownReminderIds = new Set<number>();
  private reminderPollInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private agendaService: AgendaService,
    private notifService: NotificationService,
    public authService: AuthService,
    private router: Router
  ) {}

ngOnInit() {
  this.buildTimeSlots();
  this.buildWeekDays();
  this.notifService.connect();

  // ✅ Toujours charger avec un petit délai
  setTimeout(() => {
    this.loadMeetings();
    this.loadClients();
    this.pollUpcomingMeetings();
  }, 100);

  const userId = this.authService.currentUser?.id;
  if (userId) {
    this.agendaSub = this.agendaService
      .subscribeToNewMeetings(userId)
      .subscribe(meeting => {
        if (!this.meetings.some(m => m.id === meeting.id)) {
          this.meetings = [...this.meetings, meeting];
        }
      });
  }

  this.reminderPollInterval = setInterval(
    () => this.pollUpcomingMeetings(),
    30_000
  );
}
  ngOnDestroy() {
    this.notifService.disconnect();
    this.agendaSub?.unsubscribe();
    this.agendaService.disconnectAgenda();
    if (this.reminderPollInterval) clearInterval(this.reminderPollInterval);
  }

  // ── Data loading ────────────────────────────────────────

  loadMeetings() {
    this.loading = true;
    this.agendaService.getMyMeetings().subscribe({
      next: (data) => { this.meetings = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  loadClients() {
    this.agendaService.getMyClients().subscribe({
      next: (c) => { this.clients = c; },
      error: () => {}
    });
  }

  // ── 15-min reminder polling ─────────────────────────────

  pollUpcomingMeetings() {
    this.agendaService.getUpcoming(15).subscribe({
      next: meetings => {
        const unseen = meetings.filter(m => !this.shownReminderIds.has(m.id));
        if (unseen.length > 0) {
          this.upcomingReminder = unseen[0];
          unseen.forEach(m => this.shownReminderIds.add(m.id));
        }
      },
      error: () => {}
    });
  }

  dismissReminder() { this.upcomingReminder = null; }

  // ── Calendar navigation ─────────────────────────────────

  buildTimeSlots() {
    this.timeSlots = [];
    for (let h = this.START_HOUR; h < this.END_HOUR; h++) {
      this.timeSlots.push(`${String(h).padStart(2, '0')}:00`);
      this.timeSlots.push(`${String(h).padStart(2, '0')}:30`);
    }
    this.timeSlots.push(`${this.END_HOUR}:00`);
  }

  buildWeekDays() {
    const mon = this.getMonday(this.currentDate);
    this.weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(mon);
      d.setDate(mon.getDate() + i);
      return d;
    });
  }

  getMonday(d: Date): Date {
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1 - day);
    const mon = new Date(d);
    mon.setDate(d.getDate() + diff);
    mon.setHours(0, 0, 0, 0);
    return mon;
  }

  prevPeriod() {
    if (this.view === 'week') {
      this.currentDate = new Date(this.currentDate);
      this.currentDate.setDate(this.currentDate.getDate() - 7);
    } else {
      this.currentDate = new Date(this.currentDate);
      this.currentDate.setDate(this.currentDate.getDate() - 1);
    }
    this.buildWeekDays();
  }

  nextPeriod() {
    if (this.view === 'week') {
      this.currentDate = new Date(this.currentDate);
      this.currentDate.setDate(this.currentDate.getDate() + 7);
    } else {
      this.currentDate = new Date(this.currentDate);
      this.currentDate.setDate(this.currentDate.getDate() + 1);
    }
    this.buildWeekDays();
  }

  goToday() {
    this.currentDate = new Date();
    this.buildWeekDays();
  }

  setView(v: CalendarView) {
    this.view = v;
    if (v !== 'list') this.buildWeekDays();
  }

  // ── Calendar event positioning ──────────────────────────

  getMeetingsForDay(day: Date): AgendaMeeting[] {
    return this.meetings.filter(m => {
      if (m.status === 'CANCELLED') return false;
      const d = new Date(m.scheduledAt);
      return d.getFullYear() === day.getFullYear()
          && d.getMonth() === day.getMonth()
          && d.getDate() === day.getDate();
    });
  }

  getEventStyle(meeting: AgendaMeeting): { [k: string]: string } {
    const dt = new Date(meeting.scheduledAt);
    const startMin = (dt.getHours() - this.START_HOUR) * 60 + dt.getMinutes();
    const top = (startMin / 30) * this.SLOT_HEIGHT;
    const height = Math.max((meeting.durationMinutes / 30) * this.SLOT_HEIGHT, this.SLOT_HEIGHT);
    return { top: top + 'px', height: height + 'px' };
  }

  // ── Create meeting ──────────────────────────────────────

  openCreate(day?: Date, hour?: number) {
    const d = day || new Date();
    this.createForm = {
      title: '',
      notes: '',
      scheduledAt: '',
      scheduledDate: this.toDateInput(d),
      scheduledTime: hour != null ? `${String(hour).padStart(2,'0')}:00` : '09:00',
      durationMinutes: 60,
      clientId: this.clients[0]?.id || 0
    };
    this.savingError = '';
    this.showCreateModal = true;
  }

  confirmCreate() {
    if (!this.createForm.title.trim()) return;
    if (!this.createForm.clientId || this.createForm.clientId === 0) {
      this.savingError = 'Veuillez sélectionner un client.';
      return;
    }
    this.saving = true;
    this.savingError = '';
    const req: AgendaMeetingRequest = {
      title: this.createForm.title,
      notes: this.createForm.notes,
      scheduledAt: `${this.createForm.scheduledDate}T${this.createForm.scheduledTime}:00`,
      durationMinutes: this.createForm.durationMinutes,
      clientId: this.createForm.clientId
    };
    this.agendaService.create(req).subscribe({
      next: (m) => {
        this.meetings = [...this.meetings, m];
        this.saving = false;
        this.showCreateModal = false;
      },
      error: (e) => {
        this.saving = false;
        this.savingError = e.error?.message || 'Erreur lors de la création.';
      }
    });
  }

  // ── Edit meeting ────────────────────────────────────────

  openEdit(meeting: AgendaMeeting) {
    this.editingMeeting = meeting;
    const dt = new Date(meeting.scheduledAt);
    this.editForm = {
      title: meeting.title,
      notes: meeting.notes || '',
      scheduledAt: '',
      scheduledDate: this.toDateInput(dt),
      scheduledTime: `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`,
      durationMinutes: meeting.durationMinutes,
      clientId: meeting.clientId
    };
    this.savingError = '';
    this.showEditModal = true;
  }

  confirmEdit() {
    if (!this.editingMeeting || !this.editForm.title.trim()) return;
    this.saving = true;
    this.savingError = '';
    const req: AgendaMeetingRequest = {
      title: this.editForm.title,
      notes: this.editForm.notes,
      scheduledAt: `${this.editForm.scheduledDate}T${this.editForm.scheduledTime}:00`,
      durationMinutes: this.editForm.durationMinutes,
      clientId: this.editingMeeting.clientId
    };
    this.agendaService.update(this.editingMeeting.id, req).subscribe({
      next: (updated) => {
        this.meetings = this.meetings.map(m => m.id === updated.id ? updated : m);
        this.saving = false;
        this.showEditModal = false;
        this.editingMeeting = null;
      },
      error: (e) => {
        this.saving = false;
        this.savingError = e.error?.message || 'Erreur lors de la modification.';
      }
    });
  }

  // ── Cancel meeting ──────────────────────────────────────

  openCancelConfirm(meeting: AgendaMeeting) {
    this.cancellingMeeting = meeting;
    this.showCancelConfirm = true;
  }

  confirmCancel() {
    if (!this.cancellingMeeting) return;
    this.agendaService.cancel(this.cancellingMeeting.id).subscribe({
      next: () => {
        this.meetings = this.meetings.map(m =>
          m.id === this.cancellingMeeting!.id ? { ...m, status: 'CANCELLED' } : m
        );
        this.showCancelConfirm = false;
        this.cancellingMeeting = null;
      },
      error: () => {}
    });
  }

  // ── Helpers ─────────────────────────────────────────────

  toDateInput(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  isToday(d: Date): boolean {
    const today = new Date();
    return d.getFullYear() === today.getFullYear()
        && d.getMonth() === today.getMonth()
        && d.getDate() === today.getDate();
  }

  formatDate(d: Date): string {
    return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  formatMeetingTime(m: AgendaMeeting): string {
    const dt = new Date(m.scheduledAt);
    const end = new Date(dt.getTime() + m.durationMinutes * 60000);
    return `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')} - ${String(end.getHours()).padStart(2,'0')}:${String(end.getMinutes()).padStart(2,'0')}`;
  }

  formatFullDate(s: string): string {
    return new Date(s).toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  get periodLabel(): string {
    if (this.view === 'day') {
      return this.currentDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }
    if (this.weekDays.length) {
      const first = this.weekDays[0];
      const last = this.weekDays[6];
      if (first.getMonth() === last.getMonth()) {
        return `${first.getDate()} – ${last.getDate()} ${first.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`;
      }
      return `${first.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} – ${last.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }
    return '';
  }

  get scheduledMeetings(): AgendaMeeting[] {
    return this.meetings.filter(m => m.status === 'SCHEDULED')
        .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  }

  get cancelledMeetings(): AgendaMeeting[] {
    return this.meetings.filter(m => m.status === 'CANCELLED');
  }

  get gridHeight(): string {
    return `${(this.timeSlots.length - 1) * this.SLOT_HEIGHT}px`;
  }

  getInitials(name: string): string {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
  }

  logout() { this.authService.logout(); this.router.navigate(['/auth/login']); }
}
