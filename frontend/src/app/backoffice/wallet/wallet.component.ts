import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Wallet {
  id: number;
  userId: number;
  solde: number;
  soldeBloque: number;
  devise: string;
  updatedAt: string;
}

@Component({
  selector: 'app-wallet-admin',
  templateUrl: './wallet.component.html',
  standalone: false
})
export class WalletAdminComponent implements OnInit {

  totalCommissions = 0;
  loading = false;
  errorMessage = '';
  successMessage = '';
  rechargeUserId = 0;
  rechargeMontant = 0;

  private apiUrl = `${environment.apiUrl}/wallet`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chargerCommissions();
  }

  chargerCommissions(): void {
    this.http.get<number>(`${this.apiUrl}/commissions`).subscribe({
      next: (total: number) => this.totalCommissions = total,
      error: () => {}
    });
  }

  rechargerWallet(): void {
    if (!this.rechargeUserId || !this.rechargeMontant) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }
    this.loading = true;
    this.http.post<Wallet>(`${this.apiUrl}/recharger`, {
      userId: this.rechargeUserId,
      montant: this.rechargeMontant
    }).subscribe({
      next: (wallet: Wallet) => {
        this.successMessage = `Wallet rechargé ! Nouveau solde : ${wallet.solde} ${wallet.devise}`;
        this.loading = false;
        this.rechargeUserId = 0;
        this.rechargeMontant = 0;
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Erreur lors de la recharge';
        this.loading = false;
      }
    });
  }

  reconcilier(userId: number): void {
    this.http.get<boolean>(`${this.apiUrl}/reconcilier/${userId}`).subscribe({
      next: (ok: boolean) => {
        this.successMessage = ok ? 'Soldes cohérents ✅' : 'Anomalie détectée ⚠️';
      },
      error: () => this.errorMessage = 'Erreur réconciliation'
    });
  }
}