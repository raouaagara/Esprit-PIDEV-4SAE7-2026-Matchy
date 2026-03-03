import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ProjectService } from '../../core/services/project.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-cl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class ClDashboardComponent implements OnInit {

  isLoading = true;

  stats = {
    total:        0,
    open:         0,
    inProgress:   0,
    completed:    0,
    unreadNotifs: 0,
    delivered:    0,
  };

  projects:          any[] = [];
  deliveredProjects: any[] = [];
  notifications:     any[] = [];

  // ── Delivery modal ────────────────────────────────
  showDeliveryModal = false;
  selectedDelivery: any   = null;
  revisionMessage   = '';
  showRevisionInput = false;

  // ── Payment modal ─────────────────────────────────
  showPaymentModal = false;
  paymentStep: 'form' | 'processing' | 'success' = 'form';
  paymentMethod: 'card' | 'flouci' | 'virement'  = 'card';
  paymentError = '';

  // Champs carte
  cardNumber = '';
  cardHolder = '';
  cardExpiry = '';
  cardCvc    = '';

  // Frais plateforme (5%)
  readonly SERVICE_FEE_RATE = 0.05;

  constructor(
    public  authService:    AuthService,
    private projectService: ProjectService,
    private notifService:   NotificationService,
  ) {}

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.isLoading = true;
    const userId = this.authService.currentUser?.id;

    this.projectService.getAll(undefined, userId).subscribe({
      next: (projects) => {
        this.projects         = projects.slice(0, 5);
        this.stats.total      = projects.length;
        this.stats.open       = projects.filter((p: any) => p.status?.toLowerCase() === 'open').length;
        this.stats.inProgress = projects.filter((p: any) => ['in_progress','in progress'].includes(p.status?.toLowerCase())).length;
        this.stats.completed  = projects.filter((p: any) => p.status?.toLowerCase() === 'completed').length;

        this.deliveredProjects = projects.filter((p: any) => p.status?.toLowerCase() === 'delivered');
        this.stats.delivered   = this.deliveredProjects.length;

        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });

    if (userId) {
      this.notifService.getForUser(userId).subscribe({
        next: (notifs) => {
          this.notifications      = notifs.slice(0, 5);
          this.stats.unreadNotifs = notifs.filter((n: any) => !n.read).length;
        },
        error: () => {}
      });
    }
  }

  // ── Delivery modal ────────────────────────────────
  openDelivery(project: any): void {
    this.selectedDelivery  = project;
    this.showDeliveryModal = true;
    this.showRevisionInput = false;
    this.revisionMessage   = '';
  }

  closeDeliveryModal(): void {
    this.showDeliveryModal = false;
    this.selectedDelivery  = null;
  }

  requestRevision(): void {
    if (!this.selectedDelivery || !this.revisionMessage.trim()) return;

    this.projectService.requestRevision(
      this.selectedDelivery.id,
      this.revisionMessage,
      Number(this.authService.currentUser!.id)
    ).subscribe({
      next: () => { this.closeDeliveryModal(); this.loadData(); },
      error: (err: any) => console.error('Revision error', err)
    });
  }

  // ── Payment modal ─────────────────────────────────

  /** Montant net freelancer = budget du projet */
  getFreelancerAmount(): number {
    return Number(this.selectedDelivery?.budget) || 0;
  }

  /** Frais plateforme = 5% du budget */
  getServiceFee(): number {
    return +(this.getFreelancerAmount() * this.SERVICE_FEE_RATE).toFixed(2);
  }

  /** Total client = budget + frais */
  getTotalAmount(): number {
    return +(this.getFreelancerAmount() + this.getServiceFee()).toFixed(2);
  }

  openPaymentModal(): void {
    this.showDeliveryModal = false;
    this.showPaymentModal  = true;
    this.paymentStep   = 'form';
    this.paymentMethod = 'card';
    this.paymentError  = '';
    this.cardNumber = '';
    this.cardHolder = '';
    this.cardExpiry = '';
    this.cardCvc    = '';
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.paymentStep      = 'form';
    this.paymentError     = '';
  }

  processPayment(): void {
    if (this.paymentMethod === 'card') {
      if (
        !this.cardNumber || this.cardNumber.replace(/\s/g, '').length < 16 ||
        !this.cardHolder.trim() ||
        !this.cardExpiry || this.cardExpiry.length < 5 ||
        !this.cardCvc || this.cardCvc.length < 3
      ) {
        this.paymentError = 'Veuillez remplir tous les champs correctement.';
        return;
      }
    }

    this.paymentError = '';
    this.paymentStep  = 'processing';

    // Appel backend : marquer le projet comme completed + déclencher le paiement
    const clientId = Number(this.authService.currentUser!.id);
    this.projectService
      .completeProject(
        this.selectedDelivery.id,
        clientId,
        this.selectedDelivery.acceptedProposalId ?? 0
      )
      .subscribe({
        next: () => {
          this.paymentStep = 'success';
        },
        error: (err: any) => {
          console.error('Payment error', err);
          this.paymentStep  = 'form';
          this.paymentError = 'Une erreur est survenue. Veuillez réessayer.';
        }
      });
  }

  finishPayment(): void {
    this.closePaymentModal();
    this.selectedDelivery = null;
    this.loadData();
  }

  formatCardNumber(event: any): void {
    let val = event.target.value.replace(/\D/g, '').substring(0, 16);
    this.cardNumber = val.replace(/(.{4})/g, '$1 ').trim();
  }

  formatExpiry(event: any): void {
    let val = event.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) val = val.substring(0, 2) + '/' + val.substring(2);
    this.cardExpiry = val;
  }

  getStatusClass(status: string): string {
    const s = status?.toLowerCase();
    if (s === 'open')                                return 'badge-open';
    if (s === 'in_progress' || s === 'in progress') return 'badge-progress';
    if (s === 'completed')                          return 'badge-done';
    if (s === 'cancelled')                          return 'badge-cancelled';
    if (s === 'delivered')                          return 'badge-delivered';
    return 'badge-open';
  }
}