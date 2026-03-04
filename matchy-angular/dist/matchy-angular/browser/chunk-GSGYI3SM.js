import {
  AuthService,
  BehaviorSubject,
  CommonModule,
  DatePipe,
  DecimalPipe,
  FormsModule,
  HttpClient,
  NgControlStatus,
  NgForOf,
  NgIf,
  NgModel,
  NgSelectOption,
  Router,
  SelectControlValueAccessor,
  animate,
  environment,
  interval,
  style,
  switchMap,
  tap,
  transition,
  trigger,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-AADHPL3I.js";

// src/app/frontoffice/services/notification.service.ts
var NotificationService = class _NotificationService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/notifications`;
    this.unreadCountSubject = new BehaviorSubject(0);
    this.unreadCount$ = this.unreadCountSubject.asObservable();
  }
  getUserNotifications(userId) {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
  getUnreadNotifications(userId) {
    return this.http.get(`${this.apiUrl}/user/${userId}/unread`);
  }
  getUnreadCount(userId) {
    return this.http.get(`${this.apiUrl}/user/${userId}/unread-count`).pipe(tap((count) => this.unreadCountSubject.next(count)));
  }
  markAsRead(notificationId) {
    return this.http.put(`${this.apiUrl}/${notificationId}/read`, {});
  }
  markAllAsRead(userId) {
    return this.http.put(`${this.apiUrl}/user/${userId}/read-all`, {});
  }
  // Poll for new notifications every 30 seconds
  startPolling(userId) {
    return interval(3e4).pipe(switchMap(() => this.getUnreadCount(userId))).subscribe();
  }
  static {
    this.\u0275fac = function NotificationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotificationService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
  }
};

// src/app/shared/notification-bell/notification-bell.component.ts
function NotificationBellComponent_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.unreadCount > 99 ? "99+" : ctx_r0.unreadCount);
  }
}
function NotificationBellComponent_div_5_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function NotificationBellComponent_div_5_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.markAllAsRead());
    });
    \u0275\u0275text(1, " Mark all as read ");
    \u0275\u0275elementEnd();
  }
}
function NotificationBellComponent_div_5_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "div", 17);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading notifications...");
    \u0275\u0275elementEnd()();
  }
}
function NotificationBellComponent_div_5_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "span", 19);
    \u0275\u0275text(2, "\u{1F4ED}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No notifications yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6, "We'll notify you when something happens");
    \u0275\u0275elementEnd()();
  }
}
function NotificationBellComponent_div_5_div_7_div_1_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function NotificationBellComponent_div_5_div_7_div_1_button_11_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const notification_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.markAsRead(notification_r4.id, $event));
    });
    \u0275\u0275text(1, " \u2713 ");
    \u0275\u0275elementEnd();
  }
}
function NotificationBellComponent_div_5_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275listener("click", function NotificationBellComponent_div_5_div_7_div_1_Template_div_click_0_listener() {
      const notification_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.handleNotificationClick(notification_r4));
    });
    \u0275\u0275elementStart(1, "div", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 24)(4, "h4", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 26);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 27);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, NotificationBellComponent_div_5_div_7_div_1_button_11_Template, 2, 0, "button", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notification_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("unread", !notification_r4.isRead);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.getNotificationClass(notification_r4.type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getNotificationIcon(notification_r4.type), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(notification_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(notification_r4.message);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 9, notification_r4.createdAt, "short"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !notification_r4.isRead);
  }
}
function NotificationBellComponent_div_5_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275template(1, NotificationBellComponent_div_5_div_7_div_1_Template, 12, 12, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.notifications);
  }
}
function NotificationBellComponent_div_5_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "a", 31);
    \u0275\u0275listener("click", function NotificationBellComponent_div_5_div_8_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.closeDropdown());
    });
    \u0275\u0275text(2, " View all notifications \u2192 ");
    \u0275\u0275elementEnd()();
  }
}
function NotificationBellComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8)(2, "h3", 9);
    \u0275\u0275text(3, "Notifications");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, NotificationBellComponent_div_5_button_4_Template, 2, 0, "button", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, NotificationBellComponent_div_5_div_5_Template, 4, 0, "div", 11)(6, NotificationBellComponent_div_5_div_6_Template, 7, 0, "div", 12)(7, NotificationBellComponent_div_5_div_7_Template, 2, 1, "div", 13)(8, NotificationBellComponent_div_5_div_8_Template, 3, 0, "div", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("@slideDown", void 0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.notifications.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loading && ctx_r0.notifications.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loading && ctx_r0.notifications.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.notifications.length > 0);
  }
}
function NotificationBellComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275listener("click", function NotificationBellComponent_div_6_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDropdown());
    });
    \u0275\u0275elementEnd();
  }
}
var NotificationBellComponent = class _NotificationBellComponent {
  constructor(notificationService, authService, router) {
    this.notificationService = notificationService;
    this.authService = authService;
    this.router = router;
    this.isOpen = false;
    this.notifications = [];
    this.unreadCount = 0;
    this.loading = false;
  }
  ngOnInit() {
    this.loadNotifications();
    this.startPolling();
    this.unreadCountSubscription = this.notificationService.unreadCount$.subscribe((count) => this.unreadCount = count);
  }
  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
    if (this.unreadCountSubscription) {
      this.unreadCountSubscription.unsubscribe();
    }
  }
  loadNotifications() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id)
      return;
    this.loading = true;
    this.notificationService.getUserNotifications(currentUser.id).subscribe({
      next: (notifications) => {
        this.notifications = notifications.slice(0, 10);
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading notifications:", err);
        this.loading = false;
      }
    });
    this.notificationService.getUnreadCount(currentUser.id).subscribe();
  }
  startPolling() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id)
      return;
    this.pollingSubscription = this.notificationService.startPolling(currentUser.id);
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.loadNotifications();
    }
  }
  closeDropdown() {
    this.isOpen = false;
  }
  markAsRead(notificationId, event) {
    event.stopPropagation();
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        const notification = this.notifications.find((n) => n.id === notificationId);
        if (notification) {
          notification.isRead = true;
          this.unreadCount = Math.max(0, this.unreadCount - 1);
        }
      },
      error: (err) => console.error("Error marking as read:", err)
    });
  }
  markAllAsRead() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id)
      return;
    this.notificationService.markAllAsRead(currentUser.id).subscribe({
      next: () => {
        this.notifications.forEach((n) => n.isRead = true);
        this.unreadCount = 0;
      },
      error: (err) => console.error("Error marking all as read:", err)
    });
  }
  handleNotificationClick(notification) {
    if (!notification.isRead) {
      this.markAsRead(notification.id, new Event("click"));
    }
    this.closeDropdown();
    this.navigateToReference(notification);
  }
  navigateToReference(notification) {
    if (!notification.referenceId)
      return;
    switch (notification.type) {
      case "APPLICATION_RECEIVED":
      case "APPLICATION_ACCEPTED":
      case "APPLICATION_REJECTED":
        this.router.navigate(["/my-applications"]);
        break;
      case "INTERVIEW_SCHEDULED":
      case "INTERVIEW_CONFIRMED":
        this.router.navigate(["/my-applications"]);
        break;
      case "SUBMISSION_RECEIVED":
      case "SUBMISSION_REVIEWED":
        this.router.navigate(["/my-projects"]);
        break;
      case "PAYMENT_RECEIVED":
      case "PAYMENT_PENDING":
        this.router.navigate(["/payments"]);
        break;
      case "MESSAGE_RECEIVED":
        this.router.navigate(["/messages"]);
        break;
      default:
        break;
    }
  }
  getNotificationIcon(type) {
    const iconMap = {
      "APPLICATION_RECEIVED": "\u{1F4CB}",
      "APPLICATION_ACCEPTED": "\u2705",
      "APPLICATION_REJECTED": "\u274C",
      "INTERVIEW_SCHEDULED": "\u{1F4C5}",
      "INTERVIEW_CONFIRMED": "\u2713",
      "SUBMISSION_RECEIVED": "\u{1F4E4}",
      "SUBMISSION_REVIEWED": "\u2B50",
      "MILESTONE_ASSIGNED": "\u{1F3AF}",
      "PROJECT_UPDATE": "\u{1F4C1}",
      "PAYMENT_RECEIVED": "\u{1F4B0}",
      "PAYMENT_PENDING": "\u23F3",
      "CONTRACT_GENERATED": "\u{1F4C4}",
      "REVISION_REQUESTED": "\u{1F504}",
      "MESSAGE_RECEIVED": "\u{1F4AC}"
    };
    return iconMap[type] || "\u{1F514}";
  }
  getNotificationClass(type) {
    if (type.includes("ACCEPTED") || type.includes("RECEIVED") || type.includes("CONFIRMED")) {
      return "success";
    }
    if (type.includes("REJECTED") || type.includes("OVERDUE")) {
      return "danger";
    }
    if (type.includes("PENDING") || type.includes("SCHEDULED")) {
      return "warning";
    }
    return "info";
  }
  static {
    this.\u0275fac = function NotificationBellComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotificationBellComponent)(\u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationBellComponent, selectors: [["app-notification-bell"]], decls: 7, vars: 5, consts: [[1, "notification-bell"], [1, "bell-button", 3, "click"], [1, "bell-icon"], ["class", "badge", 4, "ngIf"], ["class", "notification-dropdown", 4, "ngIf"], ["class", "backdrop", 3, "click", 4, "ngIf"], [1, "badge"], [1, "notification-dropdown"], [1, "dropdown-header"], [1, "header-title"], ["class", "mark-all-btn", 3, "click", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "notifications-list", 4, "ngIf"], ["class", "dropdown-footer", 4, "ngIf"], [1, "mark-all-btn", 3, "click"], [1, "loading-state"], [1, "spinner"], [1, "empty-state"], [1, "empty-icon"], [1, "notifications-list"], ["class", "notification-item", 3, "unread", "click", 4, "ngFor", "ngForOf"], [1, "notification-item", 3, "click"], [1, "notification-icon"], [1, "notification-content"], [1, "notification-title"], [1, "notification-message"], [1, "notification-time"], ["class", "mark-read-btn", "title", "Mark as read", 3, "click", 4, "ngIf"], ["title", "Mark as read", 1, "mark-read-btn", 3, "click"], [1, "dropdown-footer"], ["routerLink", "/notifications", 1, "view-all-link", 3, "click"], [1, "backdrop", 3, "click"]], template: function NotificationBellComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
        \u0275\u0275listener("click", function NotificationBellComponent_Template_button_click_1_listener() {
          return ctx.toggleDropdown();
        });
        \u0275\u0275elementStart(2, "span", 2);
        \u0275\u0275text(3, "\u{1F514}");
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, NotificationBellComponent_span_4_Template, 2, 1, "span", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, NotificationBellComponent_div_5_Template, 9, 6, "div", 4)(6, NotificationBellComponent_div_6_Template, 1, 0, "div", 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275classProp("has-unread", ctx.unreadCount > 0);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.unreadCount > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isOpen);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isOpen);
      }
    }, dependencies: [NgForOf, NgIf, DatePipe], styles: ['\n\n.notification-bell[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n}\n.bell-button[_ngcontent-%COMP%] {\n  position: relative;\n  width: 48px;\n  height: 48px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(10px);\n  border: 2px solid rgba(0, 0, 0, 0.08);\n  cursor: pointer;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.bell-button[_ngcontent-%COMP%]:hover {\n  background: rgba(102, 126, 234, 0.1);\n  border-color: #667eea;\n  transform: translateY(-2px);\n}\n.bell-button.has-unread[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_ring 2s ease-in-out infinite;\n}\n.dark-mode[_nghost-%COMP%]   .bell-button[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .bell-button[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.dark-mode[_nghost-%COMP%]   .bell-button[_ngcontent-%COMP%]:hover, .dark-mode   [_nghost-%COMP%]   .bell-button[_ngcontent-%COMP%]:hover {\n  background: rgba(102, 126, 234, 0.2);\n}\n@keyframes _ngcontent-%COMP%_ring {\n  0%, 100% {\n    transform: rotate(0deg);\n  }\n  10%, 30% {\n    transform: rotate(-10deg);\n  }\n  20%, 40% {\n    transform: rotate(10deg);\n  }\n  50% {\n    transform: rotate(0deg);\n  }\n}\n.bell-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n}\n.badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -4px;\n  right: -4px;\n  min-width: 20px;\n  height: 20px;\n  padding: 0 6px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444 0%,\n      #dc2626 100%);\n  color: white;\n  font-size: 0.75rem;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);\n  animation: _ngcontent-%COMP%_pulse-badge 2s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse-badge {\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.1);\n  }\n}\n.notification-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  width: 400px;\n  max-height: 600px;\n  background: rgba(255, 255, 255, 0.98);\n  backdrop-filter: blur(20px);\n  border: 2px solid rgba(0, 0, 0, 0.08);\n  border-radius: 16px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.dark-mode[_nghost-%COMP%]   .notification-dropdown[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .notification-dropdown[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.98);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.dropdown-header[_ngcontent-%COMP%] {\n  padding: 1.25rem 1.5rem;\n  border-bottom: 2px solid rgba(0, 0, 0, 0.08);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.05) 0%,\n      rgba(118, 75, 162, 0.05) 100%);\n}\n.dark-mode[_nghost-%COMP%]   .dropdown-header[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .dropdown-header[_ngcontent-%COMP%] {\n  border-bottom-color: rgba(255, 255, 255, 0.1);\n}\n.header-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0;\n}\n.dark-mode[_nghost-%COMP%]   .header-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .header-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.mark-all-btn[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 8px;\n  background: rgba(102, 126, 234, 0.1);\n  color: #667eea;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.mark-all-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(102, 126, 234, 0.2);\n  transform: translateY(-1px);\n}\n.loading-state[_ngcontent-%COMP%] {\n  padding: 3rem 2rem;\n  text-align: center;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid rgba(102, 126, 234, 0.2);\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n  font-size: 0.875rem;\n  margin: 0;\n}\n.dark-mode[_nghost-%COMP%]   .loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.empty-state[_ngcontent-%COMP%] {\n  padding: 3rem 2rem;\n  text-align: center;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  display: block;\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #1a202c;\n  margin: 0 0 0.5rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.empty-state[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #718096;\n}\n.dark-mode[_nghost-%COMP%]   .empty-state[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .empty-state[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.notifications-list[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  max-height: 450px;\n}\n.notifications-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.notifications-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.2);\n  border-radius: 3px;\n}\n.notification-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  position: relative;\n}\n.notification-item[_ngcontent-%COMP%]:hover {\n  background: rgba(102, 126, 234, 0.05);\n}\n.notification-item.unread[_ngcontent-%COMP%] {\n  background: rgba(102, 126, 234, 0.08);\n}\n.notification-item.unread[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 4px;\n  background:\n    linear-gradient(\n      180deg,\n      #667eea 0%,\n      #764ba2 100%);\n}\n.dark-mode[_nghost-%COMP%]   .notification-item[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .notification-item[_ngcontent-%COMP%] {\n  border-bottom-color: rgba(255, 255, 255, 0.05);\n}\n.dark-mode[_nghost-%COMP%]   .notification-item[_ngcontent-%COMP%]:hover, .dark-mode   [_nghost-%COMP%]   .notification-item[_ngcontent-%COMP%]:hover {\n  background: rgba(102, 126, 234, 0.1);\n}\n.dark-mode[_nghost-%COMP%]   .notification-item.unread[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .notification-item.unread[_ngcontent-%COMP%] {\n  background: rgba(102, 126, 234, 0.15);\n}\n.notification-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n.notification-icon.success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n}\n.notification-icon.danger[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n}\n.notification-icon.warning[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.15);\n}\n.notification-icon.info[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.15);\n}\n.notification-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.notification-title[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: #1a202c;\n  margin: 0 0 0.25rem 0;\n  line-height: 1.4;\n}\n.dark-mode[_nghost-%COMP%]   .notification-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .notification-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.notification-message[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #718096;\n  margin: 0 0 0.5rem 0;\n  line-height: 1.5;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.dark-mode[_nghost-%COMP%]   .notification-message[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .notification-message[_ngcontent-%COMP%] {\n  color: #cbd5e0;\n}\n.notification-time[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #a0aec0;\n}\n.dark-mode[_nghost-%COMP%]   .notification-time[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .notification-time[_ngcontent-%COMP%] {\n  color: #718096;\n}\n.mark-read-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: none;\n  border-radius: 8px;\n  background: rgba(102, 126, 234, 0.1);\n  color: #667eea;\n  font-size: 1rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  flex-shrink: 0;\n}\n.mark-read-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(102, 126, 234, 0.2);\n  transform: scale(1.1);\n}\n.dropdown-footer[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-top: 2px solid rgba(0, 0, 0, 0.08);\n  text-align: center;\n  background: rgba(0, 0, 0, 0.02);\n}\n.dark-mode[_nghost-%COMP%]   .dropdown-footer[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .dropdown-footer[_ngcontent-%COMP%] {\n  border-top-color: rgba(255, 255, 255, 0.1);\n  background: rgba(255, 255, 255, 0.02);\n}\n.view-all-link[_ngcontent-%COMP%] {\n  color: #667eea;\n  text-decoration: none;\n  font-size: 0.9375rem;\n  font-weight: 600;\n  transition: all 0.2s ease;\n}\n.view-all-link[_ngcontent-%COMP%]:hover {\n  color: #764ba2;\n}\n.backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 999;\n}\n@media (max-width: 768px) {\n  .notification-dropdown[_ngcontent-%COMP%] {\n    width: calc(100vw - 2rem);\n    right: -1rem;\n  }\n}\n/*# sourceMappingURL=notification-bell.component.css.map */'], data: { animation: [
      trigger("slideDown", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateY(-10px)" }),
          animate("200ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
        ]),
        transition(":leave", [
          animate("150ms ease-in", style({ opacity: 0, transform: "translateY(-10px)" }))
        ])
      ])
    ] } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationBellComponent, { className: "NotificationBellComponent", filePath: "src\\app\\shared\\notification-bell\\notification-bell.component.ts", lineNumber: 25 });
})();

// src/app/frontoffice/services/payment.service.ts
var PaymentService = class _PaymentService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/payments`;
  }
  // Create payment for milestone
  createPayment(data) {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
  // Get payment by ID
  getPayment(paymentId) {
    return this.http.get(`${this.apiUrl}/${paymentId}`);
  }
  // Get payments by milestone
  getMilestonePayments(milestoneId) {
    return this.http.get(`${this.apiUrl}/milestone/${milestoneId}`);
  }
  // Get payments by project
  getProjectPayments(projectId) {
    return this.http.get(`${this.apiUrl}/project/${projectId}`);
  }
  // Get payment history for company
  getCompanyPaymentHistory(companyId) {
    return this.http.get(`${this.apiUrl}/company/${companyId}/history`);
  }
  // Get payment history for freelancer
  getFreelancerPaymentHistory(freelancerId) {
    return this.http.get(`${this.apiUrl}/freelancer/${freelancerId}/history`);
  }
  // Process payment
  processPayment(data) {
    return this.http.put(`${this.apiUrl}/${data.paymentId}/process`, data);
  }
  // Move to escrow
  moveToEscrow(paymentId) {
    return this.http.put(`${this.apiUrl}/${paymentId}/escrow`, {});
  }
  // Release from escrow
  releaseFromEscrow(paymentId) {
    return this.http.put(`${this.apiUrl}/${paymentId}/release`, {});
  }
  // Generate invoice
  generateInvoice(paymentId) {
    return this.http.post(`${this.apiUrl}/${paymentId}/invoice`, {});
  }
  // Get invoice
  getInvoice(invoiceId) {
    return this.http.get(`${this.apiUrl}/invoices/${invoiceId}`);
  }
  // Download invoice PDF
  downloadInvoice(invoiceId) {
    return this.http.get(`${this.apiUrl}/invoices/${invoiceId}/download`, {
      responseType: "blob"
    });
  }
  static {
    this.\u0275fac = function PaymentService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PaymentService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PaymentService, factory: _PaymentService.\u0275fac, providedIn: "root" });
  }
};

// src/app/shared/payment-dashboard/payment-dashboard.component.ts
function PaymentDashboardComponent_div_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "div", 30);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading payments...");
    \u0275\u0275elementEnd()();
  }
}
function PaymentDashboardComponent_div_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "span", 32);
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 33);
    \u0275\u0275listener("click", function PaymentDashboardComponent_div_66_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadPayments());
    });
    \u0275\u0275text(6, "Try Again");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function PaymentDashboardComponent_div_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "span", 35);
    \u0275\u0275text(2, "\u{1F4B8}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No Payments Found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.selectedStatus === "ALL" ? "No payment records yet" : "No " + ctx_r1.selectedStatus.toLowerCase() + " payments");
  }
}
function PaymentDashboardComponent_div_68_div_1_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "span", 48);
    \u0275\u0275text(2, "\u2705");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49)(4, "span", 50);
    \u0275\u0275text(5, "Paid On");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 51);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const payment_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 1, payment_r4.paidAt, "MMM d, y"));
  }
}
function PaymentDashboardComponent_div_68_div_1_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "span", 48);
    \u0275\u0275text(2, "\u{1F4C4}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49)(4, "span", 50);
    \u0275\u0275text(5, "Invoice");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 51);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const payment_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("#", payment_r4.invoiceNumber, "");
  }
}
function PaymentDashboardComponent_div_68_div_1_div_33_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 60);
    \u0275\u0275listener("click", function PaymentDashboardComponent_div_68_div_1_div_33_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const payment_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.moveToEscrow(payment_r4.id));
    });
    \u0275\u0275text(1, " \u{1F512} Move to Escrow ");
    \u0275\u0275elementEnd();
  }
}
function PaymentDashboardComponent_div_68_div_1_div_33_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 61);
    \u0275\u0275listener("click", function PaymentDashboardComponent_div_68_div_1_div_33_button_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const payment_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.releasePayment(payment_r4.id));
    });
    \u0275\u0275text(1, " \u2705 Release Payment ");
    \u0275\u0275elementEnd();
  }
}
function PaymentDashboardComponent_div_68_div_1_div_33_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 62);
    \u0275\u0275listener("click", function PaymentDashboardComponent_div_68_div_1_div_33_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const payment_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.generateInvoice(payment_r4.id));
    });
    \u0275\u0275text(1, " \u{1F4C4} Generate Invoice ");
    \u0275\u0275elementEnd();
  }
}
function PaymentDashboardComponent_div_68_div_1_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275template(1, PaymentDashboardComponent_div_68_div_1_div_33_button_1_Template, 2, 0, "button", 57)(2, PaymentDashboardComponent_div_68_div_1_div_33_button_2_Template, 2, 0, "button", 58)(3, PaymentDashboardComponent_div_68_div_1_div_33_button_3_Template, 2, 0, "button", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const payment_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", payment_r4.status === "PENDING");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", payment_r4.status === "IN_ESCROW");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !payment_r4.invoiceNumber);
  }
}
function PaymentDashboardComponent_div_68_div_1_div_34_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 64);
    \u0275\u0275listener("click", function PaymentDashboardComponent_div_68_div_1_div_34_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const payment_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.downloadInvoice(payment_r4.id));
    });
    \u0275\u0275text(1, " \u{1F4E5} Download Invoice ");
    \u0275\u0275elementEnd();
  }
}
function PaymentDashboardComponent_div_68_div_1_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275template(1, PaymentDashboardComponent_div_68_div_1_div_34_button_1_Template, 2, 0, "button", 63);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const payment_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", payment_r4.invoiceNumber);
  }
}
function PaymentDashboardComponent_div_68_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "div", 40)(3, "h3", 41);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 42);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 43);
    \u0275\u0275element(8, "span", 44);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 45)(11, "div", 46)(12, "div", 47)(13, "span", 48);
    \u0275\u0275text(14, "\u{1F4B5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 49)(16, "span", 50);
    \u0275\u0275text(17, "Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 51);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 47)(22, "span", 48);
    \u0275\u0275text(23, "\u{1F4C5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 49)(25, "span", 50);
    \u0275\u0275text(26, "Due Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 51);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(30, PaymentDashboardComponent_div_68_div_1_div_30_Template, 9, 4, "div", 52)(31, PaymentDashboardComponent_div_68_div_1_div_31_Template, 8, 1, "div", 52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 53);
    \u0275\u0275template(33, PaymentDashboardComponent_div_68_div_1_div_33_Template, 4, 3, "div", 54)(34, PaymentDashboardComponent_div_68_div_1_div_34_Template, 2, 1, "div", 54);
    \u0275\u0275elementStart(35, "button", 55);
    \u0275\u0275listener("click", function PaymentDashboardComponent_div_68_div_1_Template_button_click_35_listener() {
      const payment_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewDetails(payment_r4));
    });
    \u0275\u0275text(36, " \u{1F441}\uFE0F View Details ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const payment_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(payment_r4.milestoneTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r4.projectTitle);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(payment_r4.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", payment_r4.status.replace("_", " "), " ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(20, 11, payment_r4.amount, "1.0-0"), " TND");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(29, 14, payment_r4.dueDate, "MMM d, y"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", payment_r4.paidAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", payment_r4.invoiceNumber);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.userType === "COMPANY");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.userType === "FREELANCER");
  }
}
function PaymentDashboardComponent_div_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275template(1, PaymentDashboardComponent_div_68_div_1_Template, 37, 17, "div", 37);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.filteredPayments);
  }
}
var PaymentDashboardComponent = class _PaymentDashboardComponent {
  constructor(paymentService) {
    this.paymentService = paymentService;
    this.payments = [];
    this.filteredPayments = [];
    this.selectedStatus = "ALL";
    this.loading = false;
    this.error = "";
  }
  ngOnInit() {
    if (this.userId && this.userType) {
      this.loadPayments();
    }
  }
  loadPayments() {
    this.loading = true;
    this.error = "";
    const historyObservable = this.userType === "COMPANY" ? this.paymentService.getCompanyPaymentHistory(this.userId) : this.paymentService.getFreelancerPaymentHistory(this.userId);
    historyObservable.subscribe({
      next: (history) => {
        this.paymentHistory = history;
        this.payments = history.payments || [];
        this.filteredPayments = [...this.payments];
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading payments:", err);
        this.error = "Failed to load payment data";
        this.loading = false;
      }
    });
  }
  filterPayments() {
    if (this.selectedStatus === "ALL") {
      this.filteredPayments = [...this.payments];
    } else {
      this.filteredPayments = this.payments.filter((p) => p.status === this.selectedStatus);
    }
  }
  getTotalEscrow() {
    return this.payments.filter((p) => p.status === "IN_ESCROW").reduce((sum, p) => sum + p.amount, 0);
  }
  getStatusClass(status) {
    const statusMap = {
      "PENDING": "warning",
      "IN_ESCROW": "info",
      "PAID": "success",
      "OVERDUE": "danger",
      "CANCELLED": "secondary"
    };
    return statusMap[status] || "secondary";
  }
  moveToEscrow(paymentId) {
    if (!confirm("Move this payment to escrow? The funds will be held until work is approved.")) {
      return;
    }
    this.paymentService.moveToEscrow(paymentId).subscribe({
      next: () => {
        alert("Payment moved to escrow successfully!");
        this.loadPayments();
      },
      error: (err) => {
        console.error("Error moving to escrow:", err);
        alert("Failed to move payment to escrow");
      }
    });
  }
  releasePayment(paymentId) {
    if (!confirm("Release this payment to the freelancer? This action cannot be undone.")) {
      return;
    }
    this.paymentService.releaseFromEscrow(paymentId).subscribe({
      next: () => {
        alert("Payment released successfully!");
        this.loadPayments();
      },
      error: (err) => {
        console.error("Error releasing payment:", err);
        alert("Failed to release payment");
      }
    });
  }
  generateInvoice(paymentId) {
    this.paymentService.generateInvoice(paymentId).subscribe({
      next: (invoice) => {
        alert(`Invoice #${invoice.invoiceNumber} generated successfully!`);
        this.loadPayments();
      },
      error: (err) => {
        console.error("Error generating invoice:", err);
        alert("Failed to generate invoice");
      }
    });
  }
  downloadInvoice(paymentId) {
    const payment = this.payments.find((p) => p.id === paymentId);
    if (!payment || !payment.invoiceNumber)
      return;
    this.paymentService.downloadInvoice(paymentId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${payment.invoiceNumber}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error("Error downloading invoice:", err);
        alert("Failed to download invoice");
      }
    });
  }
  viewDetails(payment) {
    console.log("View payment details:", payment);
    alert(`Payment Details:

Milestone: ${payment.milestoneTitle}
Amount: ${payment.amount} TND
Status: ${payment.status}`);
  }
  static {
    this.\u0275fac = function PaymentDashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PaymentDashboardComponent)(\u0275\u0275directiveInject(PaymentService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentDashboardComponent, selectors: [["app-payment-dashboard"]], inputs: { userId: "userId", userType: "userType" }, decls: 69, vars: 24, consts: [[1, "payment-dashboard"], [1, "dashboard-header"], [1, "header-content"], [1, "dashboard-title"], [1, "title-icon"], [1, "dashboard-subtitle"], [1, "summary-cards"], [1, "summary-card", "total-paid"], [1, "card-icon"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "summary-card", "total-pending"], [1, "summary-card", "total-escrow"], [1, "summary-card", "total-overdue"], [1, "filters-bar"], [1, "filter-group"], [1, "filter-select", 3, "ngModelChange", "change", "ngModel"], ["value", "ALL"], ["value", "PENDING"], ["value", "IN_ESCROW"], ["value", "PAID"], ["value", "OVERDUE"], [1, "btn-refresh", 3, "click", "disabled"], [1, "refresh-icon"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "payments-list", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "error-state"], [1, "error-icon"], [1, "btn-retry", 3, "click"], [1, "empty-state"], [1, "empty-icon"], [1, "payments-list"], ["class", "payment-card", 4, "ngFor", "ngForOf"], [1, "payment-card"], [1, "card-header"], [1, "payment-info"], [1, "payment-title"], [1, "project-name"], [1, "status-badge"], [1, "status-dot"], [1, "card-body"], [1, "payment-details"], [1, "detail-item"], [1, "detail-icon"], [1, "detail-content"], [1, "detail-label"], [1, "detail-value"], ["class", "detail-item", 4, "ngIf"], [1, "card-footer"], ["class", "action-buttons", 4, "ngIf"], [1, "btn-action", "btn-details", 3, "click"], [1, "action-buttons"], ["class", "btn-action btn-escrow", 3, "click", 4, "ngIf"], ["class", "btn-action btn-release", 3, "click", 4, "ngIf"], ["class", "btn-action btn-invoice", 3, "click", 4, "ngIf"], [1, "btn-action", "btn-escrow", 3, "click"], [1, "btn-action", "btn-release", 3, "click"], [1, "btn-action", "btn-invoice", 3, "click"], ["class", "btn-action btn-download", 3, "click", 4, "ngIf"], [1, "btn-action", "btn-download", 3, "click"]], template: function PaymentDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3)(4, "span", 4);
        \u0275\u0275text(5, "\u{1F4B0}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Payment Dashboard ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p", 5);
        \u0275\u0275text(8, "Track your earnings and payments");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(9, "div", 6)(10, "div", 7)(11, "div", 8);
        \u0275\u0275text(12, "\u2705");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 9)(14, "span", 10);
        \u0275\u0275text(15, "Total Paid");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span", 11);
        \u0275\u0275text(17);
        \u0275\u0275pipe(18, "number");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(19, "div", 12)(20, "div", 8);
        \u0275\u0275text(21, "\u23F3");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "div", 9)(23, "span", 10);
        \u0275\u0275text(24, "Pending");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "span", 11);
        \u0275\u0275text(26);
        \u0275\u0275pipe(27, "number");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(28, "div", 13)(29, "div", 8);
        \u0275\u0275text(30, "\u{1F512}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "div", 9)(32, "span", 10);
        \u0275\u0275text(33, "In Escrow");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "span", 11);
        \u0275\u0275text(35);
        \u0275\u0275pipe(36, "number");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(37, "div", 14)(38, "div", 8);
        \u0275\u0275text(39, "\u26A0\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "div", 9)(41, "span", 10);
        \u0275\u0275text(42, "Overdue");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "span", 11);
        \u0275\u0275text(44);
        \u0275\u0275pipe(45, "number");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(46, "div", 15)(47, "div", 16)(48, "label");
        \u0275\u0275text(49, "Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "select", 17);
        \u0275\u0275twoWayListener("ngModelChange", function PaymentDashboardComponent_Template_select_ngModelChange_50_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedStatus, $event) || (ctx.selectedStatus = $event);
          return $event;
        });
        \u0275\u0275listener("change", function PaymentDashboardComponent_Template_select_change_50_listener() {
          return ctx.filterPayments();
        });
        \u0275\u0275elementStart(51, "option", 18);
        \u0275\u0275text(52, "All Payments");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "option", 19);
        \u0275\u0275text(54, "\u23F3 Pending");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "option", 20);
        \u0275\u0275text(56, "\u{1F512} In Escrow");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "option", 21);
        \u0275\u0275text(58, "\u2705 Paid");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "option", 22);
        \u0275\u0275text(60, "\u26A0\uFE0F Overdue");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(61, "button", 23);
        \u0275\u0275listener("click", function PaymentDashboardComponent_Template_button_click_61_listener() {
          return ctx.loadPayments();
        });
        \u0275\u0275elementStart(62, "span", 24);
        \u0275\u0275text(63, "\u{1F504}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(64, " Refresh ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(65, PaymentDashboardComponent_div_65_Template, 4, 0, "div", 25)(66, PaymentDashboardComponent_div_66_Template, 7, 1, "div", 26)(67, PaymentDashboardComponent_div_67_Template, 7, 1, "div", 27)(68, PaymentDashboardComponent_div_68_Template, 2, 1, "div", 28);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(17);
        \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(18, 12, (ctx.paymentHistory == null ? null : ctx.paymentHistory.totalPaid) || 0, "1.0-0"), " TND");
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(27, 15, (ctx.paymentHistory == null ? null : ctx.paymentHistory.totalPending) || 0, "1.0-0"), " TND");
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(36, 18, ctx.getTotalEscrow(), "1.0-0"), " TND");
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(45, 21, (ctx.paymentHistory == null ? null : ctx.paymentHistory.totalOverdue) || 0, "1.0-0"), " TND");
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedStatus);
        \u0275\u0275advance(11);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275classProp("spinning", ctx.loading);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.filteredPayments.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.filteredPayments.length > 0);
      }
    }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe, DatePipe], styles: ["\n\n.payment-dashboard[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.dashboard-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.header-content[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(34, 197, 94, 0.1) 0%,\n      rgba(16, 185, 129, 0.1) 100%);\n  padding: 2rem;\n  border-radius: 16px;\n  border: 1px solid rgba(34, 197, 94, 0.2);\n}\n.dark-mode[_nghost-%COMP%]   .header-content[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(34, 197, 94, 0.15) 0%,\n      rgba(16, 185, 129, 0.15) 100%);\n}\n.dashboard-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 0.5rem 0;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.dark-mode[_nghost-%COMP%]   .dashboard-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .dashboard-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.title-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.dashboard-subtitle[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #718096;\n  margin: 0;\n}\n.dark-mode[_nghost-%COMP%]   .dashboard-subtitle[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .dashboard-subtitle[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.summary-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1.5rem;\n  margin-bottom: 2rem;\n}\n.summary-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(10px);\n  border: 2px solid rgba(0, 0, 0, 0.08);\n  border-radius: 16px;\n  padding: 1.5rem;\n  display: flex;\n  align-items: center;\n  gap: 1.25rem;\n  transition: all 0.3s ease;\n}\n.summary-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);\n}\n.dark-mode[_nghost-%COMP%]   .summary-card[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .summary-card[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.card-icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.75rem;\n  flex-shrink: 0;\n}\n.total-paid[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n}\n.total-pending[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.15);\n}\n.total-escrow[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.15);\n}\n.total-overdue[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n}\n.card-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.card-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #718096;\n  font-weight: 500;\n}\n.dark-mode[_nghost-%COMP%]   .card-label[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .card-label[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.card-value[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1a202c;\n}\n.dark-mode[_nghost-%COMP%]   .card-value[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .card-value[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  gap: 1rem;\n  margin-bottom: 2rem;\n  flex-wrap: wrap;\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #4a5568;\n  margin-left: 0.5rem;\n}\n.dark-mode[_nghost-%COMP%]   .filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #cbd5e0;\n}\n.filter-select[_ngcontent-%COMP%] {\n  padding: 0.875rem 1.25rem;\n  border: 2px solid rgba(0, 0, 0, 0.08);\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(10px);\n  color: #1a202c;\n  font-size: 0.9375rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  min-width: 200px;\n}\n.filter-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #22c55e;\n  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);\n}\n.dark-mode[_nghost-%COMP%]   .filter-select[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .filter-select[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n  color: #ffffff;\n}\n.btn-refresh[_ngcontent-%COMP%] {\n  padding: 0.875rem 1.5rem;\n  border: 2px solid rgba(34, 197, 94, 0.3);\n  border-radius: 12px;\n  background: rgba(34, 197, 94, 0.1);\n  color: #16a34a;\n  font-size: 0.9375rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.btn-refresh[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(34, 197, 94, 0.2);\n  transform: translateY(-2px);\n}\n.btn-refresh[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.refresh-icon[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  transition: transform 0.3s ease;\n}\n.refresh-icon.spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border: 4px solid rgba(34, 197, 94, 0.2);\n  border-top-color: #22c55e;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 1.5rem;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n  font-size: 1rem;\n  margin: 0;\n}\n.dark-mode[_nghost-%COMP%]   .loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.dark-mode[_nghost-%COMP%]   .error-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .error-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.error-icon[_ngcontent-%COMP%], \n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  display: block;\n  margin-bottom: 1.5rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 0.75rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #718096;\n  margin: 0;\n}\n.dark-mode[_nghost-%COMP%]   .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.btn-retry[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding: 0.875rem 1.75rem;\n  border: none;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e 0%,\n      #10b981 100%);\n  color: white;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.btn-retry[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);\n}\n.payments-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));\n  gap: 1.5rem;\n}\n.payment-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(10px);\n  border: 2px solid rgba(0, 0, 0, 0.08);\n  border-radius: 16px;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n.payment-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);\n  border-color: #22c55e;\n}\n.dark-mode[_nghost-%COMP%]   .payment-card[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .payment-card[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 1.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(34, 197, 94, 0.05) 0%,\n      rgba(16, 185, 129, 0.05) 100%);\n  border-bottom: 2px solid rgba(0, 0, 0, 0.05);\n  gap: 1rem;\n}\n.dark-mode[_nghost-%COMP%]   .card-header[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  border-bottom-color: rgba(255, 255, 255, 0.05);\n}\n.payment-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.payment-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 0.5rem 0;\n  line-height: 1.3;\n}\n.dark-mode[_nghost-%COMP%]   .payment-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .payment-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.project-name[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #22c55e;\n  margin: 0;\n  font-weight: 600;\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  white-space: nowrap;\n}\n.status-badge.success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #16a34a;\n}\n.status-badge.warning[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.15);\n  color: #d97706;\n}\n.status-badge.info[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.15);\n  color: #2563eb;\n}\n.status-badge.danger[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #dc2626;\n}\n.status-badge.secondary[_ngcontent-%COMP%] {\n  background: rgba(107, 114, 128, 0.15);\n  color: #6b7280;\n}\n.status-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: currentColor;\n  animation: _ngcontent-%COMP%_pulse-dot 2s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse-dot {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.payment-details[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1.25rem;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.detail-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  background: rgba(34, 197, 94, 0.1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n.detail-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  min-width: 0;\n}\n.detail-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #718096;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.dark-mode[_nghost-%COMP%]   .detail-label[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .detail-label[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.detail-value[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #1a202c;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.dark-mode[_nghost-%COMP%]   .detail-value[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .detail-value[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.card-footer[_ngcontent-%COMP%] {\n  padding: 1.25rem 1.5rem;\n  background: rgba(0, 0, 0, 0.02);\n  border-top: 2px solid rgba(0, 0, 0, 0.05);\n}\n.dark-mode[_nghost-%COMP%]   .card-footer[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .card-footer[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.02);\n  border-top-color: rgba(255, 255, 255, 0.05);\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.btn-action[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 140px;\n  padding: 0.75rem 1.25rem;\n  border: none;\n  border-radius: 10px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n.btn-action[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.btn-escrow[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6 0%,\n      #2563eb 100%);\n  color: white;\n}\n.btn-escrow[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);\n}\n.btn-release[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e 0%,\n      #16a34a 100%);\n  color: white;\n}\n.btn-release[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 6px 16px rgba(34, 197, 94, 0.4);\n}\n.btn-invoice[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6 0%,\n      #7c3aed 100%);\n  color: white;\n}\n.btn-invoice[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);\n}\n.btn-download[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #06b6d4 0%,\n      #0891b2 100%);\n  color: white;\n}\n.btn-download[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 6px 16px rgba(6, 182, 212, 0.4);\n}\n.btn-details[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.05);\n  color: #4a5568;\n  border: 2px solid rgba(0, 0, 0, 0.1);\n}\n.btn-details[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.1);\n}\n.dark-mode[_nghost-%COMP%]   .btn-details[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .btn-details[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: #cbd5e0;\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.dark-mode[_nghost-%COMP%]   .btn-details[_ngcontent-%COMP%]:hover, .dark-mode   [_nghost-%COMP%]   .btn-details[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n@media (max-width: 768px) {\n  .summary-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .payments-list[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .payment-details[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .action-buttons[_ngcontent-%COMP%]   .btn-action[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=payment-dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentDashboardComponent, { className: "PaymentDashboardComponent", filePath: "src\\app\\shared\\payment-dashboard\\payment-dashboard.component.ts", lineNumber: 10 });
})();

// src/app/shared/chat-window/chat-window.component.ts
var ChatWindowComponent = class _ChatWindowComponent {
  static {
    this.\u0275fac = function ChatWindowComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ChatWindowComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChatWindowComponent, selectors: [["app-chat-window"]], decls: 2, vars: 0, template: function ChatWindowComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "p");
        \u0275\u0275text(1, "chat-window works!");
        \u0275\u0275elementEnd();
      }
    } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChatWindowComponent, { className: "ChatWindowComponent", filePath: "src\\app\\shared\\chat-window\\chat-window.component.ts", lineNumber: 8 });
})();

// src/app/shared/contract-modal/contract-modal.component.ts
var ContractModalComponent = class _ContractModalComponent {
  static {
    this.\u0275fac = function ContractModalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ContractModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractModalComponent, selectors: [["app-contract-modal"]], decls: 2, vars: 0, template: function ContractModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "p");
        \u0275\u0275text(1, "contract-modal works!");
        \u0275\u0275elementEnd();
      }
    } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractModalComponent, { className: "ContractModalComponent", filePath: "src\\app\\shared\\contract-modal\\contract-modal.component.ts", lineNumber: 8 });
})();

// src/app/shared/task-review-modal/task-review-modal.component.ts
var TaskReviewModalComponent = class _TaskReviewModalComponent {
  static {
    this.\u0275fac = function TaskReviewModalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TaskReviewModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaskReviewModalComponent, selectors: [["app-task-review-modal"]], decls: 2, vars: 0, template: function TaskReviewModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "p");
        \u0275\u0275text(1, "task-review-modal works!");
        \u0275\u0275elementEnd();
      }
    } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaskReviewModalComponent, { className: "TaskReviewModalComponent", filePath: "src\\app\\shared\\task-review-modal\\task-review-modal.component.ts", lineNumber: 8 });
})();

// src/app/shared/shared.module.ts
var SharedModule = class _SharedModule {
  static {
    this.\u0275fac = function SharedModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SharedModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _SharedModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      FormsModule
    ] });
  }
};

// src/app/frontoffice/services/project.service.ts
var ProjectService = class _ProjectService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/projects`;
  }
  createProject(data) {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
  getOpenProjects() {
    return this.http.get(`${this.apiUrl}/all?status=OPEN`);
  }
  getCompanyProjects(companyId) {
    return this.http.get(`${this.apiUrl}/company/${companyId}`);
  }
  getProjectById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  updateProject(id, data) {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }
  deleteProject(id) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
  getProjectMilestones(id) {
    return this.http.get(`${this.apiUrl}/${id}/milestones`);
  }
  static {
    this.\u0275fac = function ProjectService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProjectService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProjectService, factory: _ProjectService.\u0275fac, providedIn: "root" });
  }
};

// src/app/frontoffice/services/milestone.service.ts
var MilestoneService = class _MilestoneService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/milestones`;
  }
  createMilestone(data) {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
  getProjectMilestones(projectId) {
    return this.http.get(`${this.apiUrl}/project/${projectId}`);
  }
  getAvailableMilestones(projectId) {
    return this.http.get(`${this.apiUrl}/available/${projectId}`);
  }
  getMilestoneById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  updateMilestone(id, data) {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }
  deleteMilestone(id) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
  static {
    this.\u0275fac = function MilestoneService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MilestoneService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MilestoneService, factory: _MilestoneService.\u0275fac, providedIn: "root" });
  }
};

// src/app/frontoffice/services/application.service.ts
var ApplicationService = class _ApplicationService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/applications`;
  }
  applyToMilestone(data) {
    return this.http.post(`${this.apiUrl}/apply`, data);
  }
  getFreelancerApplications(freelancerId) {
    return this.http.get(`${this.apiUrl}/freelancer/${freelancerId}`);
  }
  getCompanyApplications(companyId) {
    return this.http.get(`${this.apiUrl}/company/${companyId}`);
  }
  getMilestoneApplications(milestoneId) {
    return this.http.get(`${this.apiUrl}/milestone/${milestoneId}`);
  }
  scheduleInterview(applicationId, data) {
    return this.http.put(`${this.apiUrl}/${applicationId}/schedule-interview`, data);
  }
  confirmInterview(applicationId) {
    return this.http.put(`${this.apiUrl}/${applicationId}/confirm-interview`, {});
  }
  finalDecision(applicationId, status, feedback) {
    return this.http.put(`${this.apiUrl}/${applicationId}/final-decision?status=${status}&feedback=${encodeURIComponent(feedback)}`, {});
  }
  updateStatus(applicationId, status) {
    return this.http.put(`${this.apiUrl}/${applicationId}/status?status=${status}`, {});
  }
  getAllApplications() {
    return this.http.get(`${this.apiUrl}/all`);
  }
  static {
    this.\u0275fac = function ApplicationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ApplicationService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApplicationService, factory: _ApplicationService.\u0275fac, providedIn: "root" });
  }
};

// src/app/frontoffice/services/submission.service.ts
var SubmissionService = class _SubmissionService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/submissions`;
  }
  submitWork(data) {
    return this.http.post(`${this.apiUrl}/submit`, data);
  }
  getFreelancerSubmissions(freelancerId) {
    return this.http.get(`${this.apiUrl}/freelancer/${freelancerId}`);
  }
  getCompanySubmissions(companyId) {
    return this.http.get(`${this.apiUrl}/company/${companyId}`);
  }
  getMilestoneSubmissions(milestoneId) {
    return this.http.get(`${this.apiUrl}/milestone/${milestoneId}`);
  }
  getAllSubmissions() {
    return this.http.get(`${this.apiUrl}/all`);
  }
  static {
    this.\u0275fac = function SubmissionService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SubmissionService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SubmissionService, factory: _SubmissionService.\u0275fac, providedIn: "root" });
  }
};

export {
  NotificationBellComponent,
  ProjectService,
  MilestoneService,
  ApplicationService,
  PaymentDashboardComponent,
  SubmissionService,
  SharedModule
};
//# sourceMappingURL=chunk-GSGYI3SM.js.map
