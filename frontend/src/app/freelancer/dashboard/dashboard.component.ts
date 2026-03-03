import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { ProjectService } from '../../core/services/project.service';
import { ProposalService } from '../../core/services/proposal.service';
import { NotificationService } from '../../core/services/notification.service';
import { Project, Proposal, Notification } from '../../core/models/models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-fl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class FlDashboardComponent implements OnInit {

  openProjects:        Project[]      = [];
  myProposals:         Proposal[]     = [];
  inProgressProposals: Proposal[]     = [];
  notifications:       Notification[] = [];

  isLoading    = true;
  isSubmitting = false;
  isDark       = false;

  stats = {
    openProjects: 0,
    myProposals:  0,
    accepted:     0,
    inProgress:   0,
    pending:      0,
    unreadNotifs: 0
  };

  // ── Delivery modal ──────────────────────────────────────────
  deliveryModal     = false;
  selectedProposal: Proposal | null = null;
  deliveryError     = '';
  deliveryForm      = { link: '', message: '' };

  private api = environment.apiUrl;

  constructor(
    public  authService:     AuthService,
    private projectService:  ProjectService,
    private proposalService: ProposalService,
    private notifService:    NotificationService,
    private http:            HttpClient
  ) {}

  ngOnInit(): void {
    this.isDark = document.body.classList.contains('dark');
    this.loadAll();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark', this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 18) return 'afternoon';
    return 'evening';
  }

  loadAll(): void {
    const userId = this.authService.currentUser?.id;

    this.projectService.getOpen().subscribe(projects => {
      this.openProjects       = projects.slice(0, 5);
      this.stats.openProjects = projects.length;
    });

    if (userId) {
      this.proposalService.getAll(undefined, userId).subscribe(proposals => {

        // Fix TS2367: cast status to string for comparison
        // (Proposal.status type may be a narrow union that doesn't include DELIVERED yet)
        this.inProgressProposals = proposals.filter(p =>
          (p.status as string) === 'ACCEPTED' || (p.status as string) === 'DELIVERED'
        );

        // Recent proposals panel: PENDING / REJECTED / WITHDRAWN only
        this.myProposals = proposals
          .filter(p => !['ACCEPTED', 'DELIVERED', 'COMPLETED'].includes(p.status as string))
          .slice(0, 5);

        this.stats.myProposals = proposals.length;
        this.stats.accepted    = proposals.filter(p => (p.status as string) === 'ACCEPTED').length;
        this.stats.inProgress  = this.inProgressProposals.length;
        this.stats.pending     = proposals.filter(p => (p.status as string) === 'PENDING').length;

        this.isLoading = false;
      });

      this.notifService.getUnread(userId).subscribe(n => {
        this.notifications      = n.slice(0, 5);
        this.stats.unreadNotifs = n.length;
      });
    } else {
      this.isLoading = false;
    }
  }

  getProposalStatusClass(s: string): string {
    const m: Record<string, string> = {
      PENDING:   'status-pending',
      ACCEPTED:  'status-accept',
      DELIVERED: 'status-deliver',
      COMPLETED: 'status-complete',
      REJECTED:  'status-reject',
      WITHDRAWN: 'status-cancel'
    };
    return m[s] ?? '';
  }

  // ── Delivery modal ──────────────────────────────────────────
  openDeliveryModal(p: Proposal): void {
    this.selectedProposal = p;
    this.deliveryForm     = { link: '', message: '' };
    this.deliveryError    = '';
    this.deliveryModal    = true;
  }

  closeDeliveryModal(): void {
    this.deliveryModal    = false;
    this.selectedProposal = null;
    this.deliveryError    = '';
  }

  submitDelivery(): void {
    if (!this.deliveryForm.link.trim()) {
      this.deliveryError = 'Please provide a delivery link.';
      return;
    }
    if (!this.selectedProposal?.projectId) return;

    this.isSubmitting  = true;
    this.deliveryError = '';

    this.http.patch(`${this.api}/projects/${this.selectedProposal.projectId}/deliver`, {
      deliveryLink:    this.deliveryForm.link,
      deliveryMessage: this.deliveryForm.message,
      freelancerId:    this.authService.currentUser?.id,
      proposalId:      this.selectedProposal.id
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeDeliveryModal();
        this.loadAll();
      },
      error: (err) => {
        this.deliveryError = err?.error?.error || 'Failed to submit. Please try again.';
        this.isSubmitting  = false;
      }
    });
  }
}