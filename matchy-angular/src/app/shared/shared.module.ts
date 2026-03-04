import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Shared Components
import { NotificationBellComponent } from './notification-bell/notification-bell.component';
import { PaymentDashboardComponent } from './payment-dashboard/payment-dashboard.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ContractModalComponent } from './contract-modal/contract-modal.component';
import { TaskReviewModalComponent } from './task-review-modal/task-review-modal.component';

@NgModule({
  declarations: [
    NotificationBellComponent,
    PaymentDashboardComponent,
    ChatWindowComponent,
    ContractModalComponent,
    TaskReviewModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NotificationBellComponent,
    PaymentDashboardComponent,
    ChatWindowComponent,
    ContractModalComponent,
    TaskReviewModalComponent
  ]
})
export class SharedModule {}
