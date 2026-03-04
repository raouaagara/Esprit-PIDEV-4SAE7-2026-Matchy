import { Injectable, ComponentRef, ViewContainerRef, ApplicationRef, ComponentFactoryResolver, Injector, EmbeddedViewRef } from '@angular/core';
import { ConfirmationDialogComponent, ConfirmationConfig } from '../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private dialogComponentRef: ComponentRef<ConfirmationDialogComponent> | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  confirm(config: Partial<ConfirmationConfig>): Promise<boolean> {
    return new Promise((resolve) => {
      // Create component
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmationDialogComponent);
      this.dialogComponentRef = componentFactory.create(this.injector);

      // Set config
      const fullConfig: ConfirmationConfig = {
        title: config.title || 'Confirm Action',
        message: config.message || 'Are you sure you want to proceed?',
        confirmText: config.confirmText || 'OK',
        cancelText: config.cancelText || 'Cancel',
        type: config.type || 'info',
        icon: config.icon
      };
      this.dialogComponentRef.instance.config = fullConfig;

      // Subscribe to events
      this.dialogComponentRef.instance.confirmed.subscribe(() => {
        resolve(true);
        this.destroyDialog();
      });

      this.dialogComponentRef.instance.cancelled.subscribe(() => {
        resolve(false);
        this.destroyDialog();
      });

      // Attach to DOM
      this.appRef.attachView(this.dialogComponentRef.hostView);
      const domElem = (this.dialogComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);

      // Show dialog
      setTimeout(() => {
        this.dialogComponentRef?.instance.show();
      }, 10);
    });
  }

  private destroyDialog(): void {
    if (this.dialogComponentRef) {
      this.appRef.detachView(this.dialogComponentRef.hostView);
      this.dialogComponentRef.destroy();
      this.dialogComponentRef = null;
    }
  }
}
