import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { CustomDatepickerComponent } from './components/custom-datepicker/custom-datepicker.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NotificationBellComponent } from './components/notification-bell/notification-bell.component';
import { EventStatisticsPanelComponent } from './components/event-statistics-panel/event-statistics-panel.component';
import { LocationMapComponent } from './components/location-map/location-map.component';
import { SafePipe } from './pipes/safe.pipe';
import { LocationIconComponent } from './components/location-icon/location-icon.component';

@NgModule({
  declarations: [
    ThemeToggleComponent,
    CustomDatepickerComponent,
    ConfirmModalComponent,
    ConfirmationDialogComponent,
    NotificationBellComponent,
    EventStatisticsPanelComponent,
    LocationMapComponent,
    SafePipe,
    LocationIconComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ThemeToggleComponent,
    CustomDatepickerComponent,
    ConfirmModalComponent,
    ConfirmationDialogComponent,
    NotificationBellComponent,
    EventStatisticsPanelComponent,
    LocationMapComponent,
    LocationIconComponent,
    SafePipe
  ]
})
export class SharedModule {}
