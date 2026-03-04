import {
  ApplicationService,
  MilestoneService,
  NotificationBellComponent,
  PaymentDashboardComponent,
  ProjectService,
  SharedModule,
  SubmissionService
} from "./chunk-GSGYI3SM.js";
import {
  ActivatedRoute,
  AuthService,
  CheckboxControlValueAccessor,
  CommonModule,
  DarkModeService,
  DatePipe,
  DecimalPipe,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  HttpClient,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  SelectControlValueAccessor,
  SlicePipe,
  TitleCasePipe,
  Validators,
  __spreadProps,
  __spreadValues,
  environment,
  of,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵpureFunction0,
  ɵɵpureFunction3,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-AADHPL3I.js";

// src/app/backoffice/layout/bo-sidebar/bo-sidebar.component.ts
function BoSidebarComponent_a_15_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 15);
  }
}
function BoSidebarComponent_a_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 11)(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, BoSidebarComponent_a_15_span_5_Template, 1, 0, "span", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r1.isActive(item_r1.route));
    \u0275\u0275property("routerLink", item_r1.route);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isActive(item_r1.route));
  }
}
function BoSidebarComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 18)(4, "span", 19);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 20);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 21);
    \u0275\u0275listener("click", function BoSidebarComponent_div_16_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275text(9, " \u2192 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getInitials(ctx_r1.authService.currentUser.firstName + " " + ctx_r1.authService.currentUser.lastName), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r1.authService.currentUser.firstName, " ", ctx_r1.authService.currentUser.lastName, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.authService.currentUser.userType);
  }
}
var BoSidebarComponent = class _BoSidebarComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.navItems = [
      { label: "Dashboard", icon: "\u{1F4CA}", route: "/backoffice/dashboard" },
      { label: "Users", icon: "\u{1F465}", route: "/backoffice/users" },
      { label: "Projects", icon: "\u{1F4C1}", route: "/backoffice/projects" },
      { label: "Applications", icon: "\u{1F4CB}", route: "/backoffice/applications" },
      { label: "Interviews", icon: "\u{1F4C5}", route: "/backoffice/interviews" },
      { label: "Submissions", icon: "\u{1F4E4}", route: "/backoffice/submissions" },
      { label: "Reviews", icon: "\u2B50", route: "/backoffice/reviews" },
      {
        label: "Courses & Resources",
        icon: "\u{1F4DA}",
        route: "/backoffice/courses-resources"
      },
      { label: "Events", icon: "\u{1F4C5}", route: "/backoffice/events" },
      {
        label: "Profile Settings",
        icon: "\u2699\uFE0F",
        route: "/backoffice/profile-settings"
      },
      {
        label: "Milestones",
        icon: "\u{1F3AF}",
        route: "/backoffice/projects-milestones"
      },
      {
        label: "Subscriptions",
        icon: "\u{1F4B3}",
        route: "/backoffice/subscription-management"
      },
      {
        label: "User Management",
        icon: "\u{1F6E1}\uFE0F",
        route: "/backoffice/user-management"
      }
    ];
  }
  isActive(route) {
    return this.router.url === route;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }
  getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  }
  static {
    this.\u0275fac = function BoSidebarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BoSidebarComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BoSidebarComponent, selectors: [["app-bo-sidebar"]], decls: 17, vars: 2, consts: [[1, "bo-sidebar"], [1, "sidebar-logo"], [1, "logo-icon"], [1, "logo-text"], [1, "accent"], [1, "admin-badge"], [1, "material-icons", 2, "font-size", "14px"], [1, "sidebar-notification"], [1, "sidebar-nav"], ["class", "nav-item", "routerLinkActive", "active", 3, "routerLink", "active", 4, "ngFor", "ngForOf"], ["class", "sidebar-footer", 4, "ngIf"], ["routerLinkActive", "active", 1, "nav-item", 3, "routerLink"], [1, "nav-icon"], [1, "nav-label"], ["class", "nav-indicator", 4, "ngIf"], [1, "nav-indicator"], [1, "sidebar-footer"], [1, "user-avatar"], [1, "user-info"], [1, "user-name"], [1, "user-role"], ["title", "Logout", 1, "logout-btn", 3, "click"]], template: function BoSidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275text(3, "M");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5, "Match");
        \u0275\u0275elementStart(6, "span", 4);
        \u0275\u0275text(7, "y");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(8, "div", 5)(9, "span", 6);
        \u0275\u0275text(10, "admin_panel_settings");
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " ADMIN ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 7);
        \u0275\u0275element(13, "app-notification-bell");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "nav", 8);
        \u0275\u0275template(15, BoSidebarComponent_a_15_Template, 6, 6, "a", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, BoSidebarComponent_div_16_Template, 10, 4, "div", 10);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275property("ngForOf", ctx.navItems);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.authService.currentUser);
      }
    }, dependencies: [NgForOf, NgIf, RouterLink, RouterLinkActive, NotificationBellComponent], styles: ["\n\n.bo-sidebar[_ngcontent-%COMP%] {\n  width: 220px;\n  min-height: 100vh;\n  background: var(--bo-bg-sidebar);\n  display: flex;\n  flex-direction: column;\n  padding: 24px 16px;\n  flex-shrink: 0;\n  border-right: 1px solid rgba(255, 255, 255, 0.06);\n}\n.sidebar-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 0 8px;\n  margin-bottom: 20px;\n}\n.sidebar-logo[_ngcontent-%COMP%]   .logo-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--accent));\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 800;\n  font-size: 16px;\n  font-family: var(--font-display);\n}\n.sidebar-logo[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 18px;\n  font-weight: 700;\n  color: white;\n}\n.sidebar-logo[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .accent[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.admin-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  margin: 0 8px 20px;\n  padding: 6px 12px;\n  background: rgba(79, 110, 247, 0.2);\n  border: 1px solid rgba(79, 110, 247, 0.3);\n  border-radius: 6px;\n  color: var(--primary-light);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  width: fit-content;\n}\n.sidebar-notification[_ngcontent-%COMP%] {\n  margin: 0 8px 24px;\n  padding: 12px;\n  background: rgba(255, 255, 255, 0.03);\n  border-radius: var(--radius-sm);\n  border: 1px solid rgba(255, 255, 255, 0.06);\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.nav-item[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 11px 12px;\n  border-radius: var(--radius-sm);\n  color: rgba(255, 255, 255, 0.5);\n  text-decoration: none;\n  transition: all 0.2s;\n  font-size: 14px;\n  font-weight: 500;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.06);\n  color: rgba(255, 255, 255, 0.85);\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background: rgba(79, 110, 247, 0.15);\n  color: white;\n  border: 1px solid rgba(79, 110, 247, 0.25);\n}\n.nav-item.active[_ngcontent-%COMP%]   .nav-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.nav-item[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.nav-item[_ngcontent-%COMP%]   .nav-label[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.nav-item[_ngcontent-%COMP%]   .nav-indicator[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  background: var(--primary-light);\n  border-radius: 50%;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 8px;\n  border-top: 1px solid rgba(255, 255, 255, 0.08);\n  margin-top: 16px;\n}\n.sidebar-footer[_ngcontent-%COMP%]   .user-avatar[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--accent-secondary));\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 12px;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.sidebar-footer[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.sidebar-footer[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: white;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.sidebar-footer[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%]   .user-role[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: rgba(255, 255, 255, 0.4);\n  text-transform: capitalize;\n}\n.sidebar-footer[_ngcontent-%COMP%]   .logout-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: rgba(255, 255, 255, 0.3);\n  font-size: 16px;\n  padding: 4px;\n  border-radius: 4px;\n  transition: all 0.2s;\n}\n.sidebar-footer[_ngcontent-%COMP%]   .logout-btn[_ngcontent-%COMP%]:hover {\n  color: var(--danger);\n  background: rgba(239, 68, 68, 0.1);\n}\n/*# sourceMappingURL=bo-sidebar.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BoSidebarComponent, { className: "BoSidebarComponent", filePath: "src\\app\\backoffice\\layout\\bo-sidebar\\bo-sidebar.component.ts", lineNumber: 16 });
})();

// src/app/backoffice/layout/bo-header/bo-header.component.ts
var BoHeaderComponent = class _BoHeaderComponent {
  constructor(router, darkModeService) {
    this.router = router;
    this.darkModeService = darkModeService;
    this.showUsers = true;
    this.isDarkMode = false;
  }
  ngOnInit() {
    this.darkModeService.darkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
  goToFront() {
    this.router.navigate(["/"]);
  }
  static {
    this.\u0275fac = function BoHeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BoHeaderComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(DarkModeService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BoHeaderComponent, selectors: [["app-bo-header"]], decls: 15, vars: 10, consts: [[1, "bo-header"], [1, "header-left"], [1, "toggle-view", 3, "click"], [1, "header-right"], ["title", "Toggle dark mode", 1, "dark-mode-toggle", 3, "click"], [1, "toggle-icon", "sun-icon"], [1, "toggle-icon", "moon-icon"], [1, "btn-back", 3, "click"]], template: function BoHeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "button", 2);
        \u0275\u0275listener("click", function BoHeaderComponent_Template_button_click_2_listener() {
          return ctx.showUsers = true;
        });
        \u0275\u0275text(3, " \u{1F465} Users ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 2);
        \u0275\u0275listener("click", function BoHeaderComponent_Template_button_click_4_listener() {
          return ctx.showUsers = false;
        });
        \u0275\u0275text(5, " \u{1F4C1} Projects ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 3);
        \u0275\u0275element(7, "app-notification-bell");
        \u0275\u0275elementStart(8, "button", 4);
        \u0275\u0275listener("click", function BoHeaderComponent_Template_button_click_8_listener() {
          return ctx.toggleDarkMode();
        });
        \u0275\u0275elementStart(9, "span", 5);
        \u0275\u0275text(10, "\u2600\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "span", 6);
        \u0275\u0275text(12, "\u{1F319}");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "button", 7);
        \u0275\u0275listener("click", function BoHeaderComponent_Template_button_click_13_listener() {
          return ctx.goToFront();
        });
        \u0275\u0275text(14, "\u2190 Front Office");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.showUsers);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", !ctx.showUsers);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("active", ctx.isDarkMode);
        \u0275\u0275advance();
        \u0275\u0275classProp("visible", ctx.isDarkMode);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("visible", !ctx.isDarkMode);
      }
    }, dependencies: [NotificationBellComponent], styles: ["\n\n.bo-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 28px;\n  background: var(--bo-bg-secondary);\n  border-bottom: 1px solid var(--bo-border);\n  gap: 16px;\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.toggle-view[_ngcontent-%COMP%] {\n  padding: 7px 16px;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  border: 1px solid var(--bo-border);\n  background: transparent;\n  color: var(--bo-text-secondary);\n  transition: all 0.2s;\n  font-family: var(--font-body);\n  &.active {\n    background: var(--primary);\n    color: white;\n    border-color: var(--primary);\n  }\n  &:not(.active):hover {\n    border-color: var(--primary);\n    color: var(--primary);\n  }\n}\n.btn-back[_ngcontent-%COMP%] {\n  padding: 7px 14px;\n  font-size: 13px;\n  font-weight: 500;\n  border: 1px solid var(--bo-border);\n  border-radius: 6px;\n  background: transparent;\n  color: var(--bo-text-secondary);\n  cursor: pointer;\n  transition: all 0.2s;\n  font-family: var(--font-body);\n  &:hover {\n    border-color: var(--primary);\n    color: var(--primary);\n  }\n}\n.dark-mode-toggle[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: var(--bo-bg-primary);\n  border: 1px solid var(--bo-border);\n  border-radius: 10px;\n  cursor: pointer;\n  overflow: hidden;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);\n    border-color: #667eea;\n  }\n  &:active {\n    transform: translateY(0);\n  }\n}\n.toggle-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  font-size: 1.25rem;\n  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);\n  opacity: 0;\n  transform: scale(0) rotate(-180deg);\n  &.visible {\n    opacity: 1;\n    transform: scale(1) rotate(0deg);\n  }\n}\n/*# sourceMappingURL=bo-header.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BoHeaderComponent, { className: "BoHeaderComponent", filePath: "src\\app\\backoffice\\layout\\bo-header\\bo-header.component.ts", lineNumber: 100 });
})();

// src/app/backoffice/layout/bo-layout.component.ts
var BoLayoutComponent = class _BoLayoutComponent {
  static {
    this.\u0275fac = function BoLayoutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BoLayoutComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BoLayoutComponent, selectors: [["app-bo-layout"]], decls: 6, vars: 0, consts: [[1, "bo-layout"], [1, "bo-main"], [1, "bo-content"]], template: function BoLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "app-bo-sidebar");
        \u0275\u0275elementStart(2, "div", 1);
        \u0275\u0275element(3, "app-bo-header");
        \u0275\u0275elementStart(4, "main", 2);
        \u0275\u0275element(5, "router-outlet");
        \u0275\u0275elementEnd()()();
      }
    }, dependencies: [RouterOutlet, BoSidebarComponent, BoHeaderComponent], styles: ["\n\n.bo-layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bo-bg-primary);\n  font-family: var(--font-body);\n}\n.bo-main[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  overflow: hidden;\n}\n.bo-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 24px 28px;\n  overflow-y: auto;\n}\n/*# sourceMappingURL=bo-layout.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BoLayoutComponent, { className: "BoLayoutComponent", filePath: "src\\app\\backoffice\\layout\\bo-layout.component.ts", lineNumber: 37 });
})();

// src/app/frontoffice/services/dashboard.service.ts
var DashboardService = class _DashboardService {
  getStats() {
    return of({
      totalUsers: 0,
      totalClients: 0,
      totalFreelancers: 0,
      verifiedFreelancers: 0,
      openProjects: 0,
      completedProjects: 0,
      totalProjects: 0,
      verificationRate: 0
    });
  }
  getRecentUsers() {
    return of([]);
  }
  getTopFreelancers() {
    return of([]);
  }
  static {
    this.\u0275fac = function DashboardService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardService, factory: _DashboardService.\u0275fac, providedIn: "root" });
  }
};

// src/app/backoffice/shared/stat-card/stat-card.component.ts
function StatCardComponent_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.suffix);
  }
}
function StatCardComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subLabel);
  }
}
var StatCardComponent = class _StatCardComponent {
  constructor() {
    this.icon = "";
    this.iconBg = "#4f6ef7";
    this.label = "";
    this.subLabel = "";
    this.value = 0;
    this.suffix = "";
    this.borderColor = "";
  }
  static {
    this.\u0275fac = function StatCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StatCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StatCardComponent, selectors: [["app-stat-card"]], inputs: { icon: "icon", iconBg: "iconBg", label: "label", subLabel: "subLabel", value: "value", suffix: "suffix", borderColor: "borderColor" }, decls: 10, vars: 11, consts: [[1, "stat-card"], [1, "stat-icon"], [1, "stat-body"], [1, "stat-value"], ["class", "stat-suffix", 4, "ngIf"], [1, "stat-label"], ["class", "stat-sublabel", 4, "ngIf"], [1, "stat-suffix"], [1, "stat-sublabel"]], template: function StatCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 2)(4, "div", 3);
        \u0275\u0275text(5);
        \u0275\u0275template(6, StatCardComponent_span_6_Template, 2, 1, "span", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, StatCardComponent_div_9_Template, 2, 1, "div", 6);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275styleProp("border-top-color", ctx.borderColor || ctx.iconBg);
        \u0275\u0275advance();
        \u0275\u0275styleProp("background", ctx.iconBg + "20")("color", ctx.iconBg);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.icon, " ");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.value);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.suffix);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.label);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.subLabel);
      }
    }, dependencies: [NgIf], styles: ["\n\n.stat-card[_ngcontent-%COMP%] {\n  background: var(--bo-bg-secondary);\n  border-radius: var(--radius-md);\n  border: 1px solid var(--bo-border);\n  border-top: 3px solid;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  transition: all 0.25s;\n  cursor: default;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: var(--shadow-elevated);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--radius-sm);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n}\n.stat-body[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 28px;\n  font-weight: 800;\n  color: var(--bo-text-primary);\n  line-height: 1;\n  margin-bottom: 4px;\n}\n.stat-body[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]   .stat-suffix[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.stat-body[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--bo-text-primary);\n  margin-bottom: 2px;\n}\n.stat-body[_ngcontent-%COMP%]   .stat-sublabel[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--bo-text-secondary);\n}\n/*# sourceMappingURL=stat-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StatCardComponent, { className: "StatCardComponent", filePath: "src\\app\\backoffice\\shared\\stat-card\\stat-card.component.ts", lineNumber: 8 });
})();

// src/app/backoffice/dashboard/dashboard.component.ts
var _c0 = () => ["Users", "Clients", "Freelancers", "Verified", "Clients", "Terminal"];
function DashboardComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "div", 10);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Loading dashboard...");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_ng_container_13_app_stat_card_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-stat-card", 42);
  }
  if (rf & 2) {
    const stat_r2 = ctx.$implicit;
    \u0275\u0275property("icon", stat_r2.icon)("iconBg", stat_r2.iconBg)("borderColor", stat_r2.borderColor)("label", stat_r2.label)("subLabel", stat_r2.subLabel)("value", stat_r2.value)("suffix", stat_r2.suffix || "");
  }
}
function DashboardComponent_ng_container_13_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275element(1, "app-payment-dashboard", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("userId", ctx_r2.currentUser.id)("userType", "COMPANY");
  }
}
function DashboardComponent_ng_container_13_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "div", 46);
    \u0275\u0275element(2, "div", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const label_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("height", 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(label_r4);
  }
}
function DashboardComponent_ng_container_13_tr_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 49);
    \u0275\u0275text(2, "No users registered yet");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_ng_container_13_tr_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 50)(2, "div", 51);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "span", 52);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275element(12, "span", 53);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", user_r5.firstName[0], "", user_r5.lastName[0], "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", user_r5.firstName, " ", user_r5.lastName, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r5.email);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r5.userType);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(user_r5.isActive ? "active" : "inactive");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r5.isActive ? "Active" : "Inactive", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r5.hourlyRate || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r5.expertise || "\u2014");
  }
}
function DashboardComponent_ng_container_13_tr_130_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 54);
    \u0275\u0275text(2, "No freelancers yet");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_ng_container_13_tr_131_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1, "Active");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_ng_container_13_tr_131_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_ng_container_13_tr_131_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 50)(2, "div", 51);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275template(13, DashboardComponent_ng_container_13_tr_131_span_13_Template, 2, 0, "span", 55)(14, DashboardComponent_ng_container_13_tr_131_span_14_Template, 2, 0, "span", 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", f_r6.firstName[0], "", f_r6.lastName[0], "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", f_r6.firstName, " ", f_r6.lastName, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r6.address || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r6.hourlyRate ? f_r6.hourlyRate + " TND/h" : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r6.expertise || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", f_r6.isActive);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !f_r6.isActive);
  }
}
function DashboardComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 11);
    \u0275\u0275template(2, DashboardComponent_ng_container_13_app_stat_card_2_Template, 1, 7, "app-stat-card", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, DashboardComponent_ng_container_13_div_3_Template, 2, 2, "div", 13);
    \u0275\u0275elementStart(4, "div", 14)(5, "div", 15)(6, "div", 16)(7, "span", 17);
    \u0275\u0275text(8, "\u{1F465}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h3");
    \u0275\u0275text(10, "User Distribution");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 18)(12, "a", 19);
    \u0275\u0275text(13, "Clients");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " vs ");
    \u0275\u0275elementStart(15, "a", 20);
    \u0275\u0275text(16, "Freelancers");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 21)(18, "p", 22);
    \u0275\u0275text(19, "No data available yet");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 15)(21, "div", 16)(22, "span", 17);
    \u0275\u0275text(23, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "h3");
    \u0275\u0275text(25, "Project Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 18)(27, "a", 19);
    \u0275\u0275text(28, "Open");
    \u0275\u0275elementEnd();
    \u0275\u0275text(29, " vs ");
    \u0275\u0275elementStart(30, "a", 20);
    \u0275\u0275text(31, "Completed");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 21)(33, "p", 22);
    \u0275\u0275text(34, "No data available yet");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 23)(36, "div", 16)(37, "span", 17);
    \u0275\u0275text(38, "\u{1F4C8}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "h3");
    \u0275\u0275text(40, "Global KPI Overview");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span", 24);
    \u0275\u0275text(42, "All key indicators");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 25);
    \u0275\u0275template(44, DashboardComponent_ng_container_13_div_44_Template, 5, 3, "div", 26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 27)(46, "div", 28)(47, "div", 29)(48, "div", 30)(49, "span");
    \u0275\u0275text(50, "\u{1F464}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "h3");
    \u0275\u0275text(52, "Recent Users");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "span", 31);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 32)(56, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_ng_container_13_Template_input_ngModelChange_56_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.userSearch, $event) || (ctx_r2.userSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "button", 34)(58, "span", 35);
    \u0275\u0275text(59, "\u{1F4C4}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "span");
    \u0275\u0275text(61, "CSV");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "button", 34)(63, "span", 35);
    \u0275\u0275text(64, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "span");
    \u0275\u0275text(66, "Excel");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(67, "div", 36);
    \u0275\u0275text(68, " Sort by: ");
    \u0275\u0275elementStart(69, "button", 37);
    \u0275\u0275text(70, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "button", 38);
    \u0275\u0275text(72, "Rating");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "button", 38);
    \u0275\u0275text(74, "Projects");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "div", 39)(76, "table", 40)(77, "thead")(78, "tr")(79, "th");
    \u0275\u0275text(80, "User");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "th");
    \u0275\u0275text(82, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "th");
    \u0275\u0275text(84, "Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "th");
    \u0275\u0275text(86, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "th");
    \u0275\u0275text(88, "Rating");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "th");
    \u0275\u0275text(90, "Projects");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(91, "tbody");
    \u0275\u0275template(92, DashboardComponent_ng_container_13_tr_92_Template, 3, 0, "tr", 8)(93, DashboardComponent_ng_container_13_tr_93_Template, 18, 11, "tr", 41);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(94, "div", 28)(95, "div", 29)(96, "div", 30)(97, "span");
    \u0275\u0275text(98, "\u{1F3C6}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "h3");
    \u0275\u0275text(100, "Top Freelancers");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "span", 31);
    \u0275\u0275text(102);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(103, "div", 32)(104, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_ng_container_13_Template_input_ngModelChange_104_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.freelancerSearch, $event) || (ctx_r2.freelancerSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "button", 34)(106, "span", 35);
    \u0275\u0275text(107, "\u{1F4C4}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "span");
    \u0275\u0275text(109, "CSV");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(110, "button", 34)(111, "span", 35);
    \u0275\u0275text(112, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "span");
    \u0275\u0275text(114, "Excel");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(115, "div", 39)(116, "table", 40)(117, "thead")(118, "tr")(119, "th");
    \u0275\u0275text(120, "Freelancer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(121, "th");
    \u0275\u0275text(122, "City");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(123, "th");
    \u0275\u0275text(124, "Rating");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(125, "th");
    \u0275\u0275text(126, "Projects");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(127, "th");
    \u0275\u0275text(128, "Badge");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(129, "tbody");
    \u0275\u0275template(130, DashboardComponent_ng_container_13_tr_130_Template, 3, 0, "tr", 8)(131, DashboardComponent_ng_container_13_tr_131_Template, 15, 9, "tr", 41);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.stats);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.currentUser == null ? null : ctx_r2.currentUser.id);
    \u0275\u0275advance(41);
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(11, _c0));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", ctx_r2.recentUsers.length, " results");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.userSearch);
    \u0275\u0275advance(36);
    \u0275\u0275property("ngIf", ctx_r2.recentUsers.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.recentUsers);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("", ctx_r2.topFreelancers.length, " freelancers");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.freelancerSearch);
    \u0275\u0275advance(26);
    \u0275\u0275property("ngIf", ctx_r2.topFreelancers.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.topFreelancers);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(dashboardService, darkModeService, authService) {
    this.dashboardService = dashboardService;
    this.darkModeService = darkModeService;
    this.authService = authService;
    this.stats = [];
    this.recentUsers = [];
    this.topFreelancers = [];
    this.isLoading = true;
    this.userSearch = "";
    this.freelancerSearch = "";
    this.isDarkMode = false;
    this.currentUser = null;
  }
  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.loadData();
    this.darkModeService.darkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
  loadData() {
    this.dashboardService.getStats().subscribe((data) => {
      this.buildStats(data);
      this.isLoading = false;
    });
    this.dashboardService.getRecentUsers().subscribe((u) => this.recentUsers = u);
    this.dashboardService.getTopFreelancers().subscribe((f) => this.topFreelancers = f);
  }
  buildStats(s) {
    this.stats = [
      {
        icon: "\u{1F465}",
        iconBg: "#4f6ef7",
        borderColor: "#4f6ef7",
        label: "Total Users",
        subLabel: "registered accounts",
        value: s.totalUsers
      },
      {
        icon: "\u{1F9D1}\u200D\u{1F4BC}",
        iconBg: "#06b6d4",
        borderColor: "#06b6d4",
        label: "Clients",
        subLabel: "project owners",
        value: s.totalClients
      },
      {
        icon: "\u{1F3A8}",
        iconBg: "#a855f7",
        borderColor: "#a855f7",
        label: "Freelancers",
        subLabel: "active providers",
        value: s.totalFreelancers
      },
      {
        icon: "\u2705",
        iconBg: "#22c55e",
        borderColor: "#22c55e",
        label: "Verified",
        subLabel: "trusted badge",
        value: s.verifiedFreelancers
      },
      {
        icon: "\u{1F4C2}",
        iconBg: "#f59e0b",
        borderColor: "#f59e0b",
        label: "Open Projects",
        subLabel: "seeking freelancers",
        value: s.openProjects
      },
      {
        icon: "\u{1F532}",
        iconBg: "#64748b",
        borderColor: "#64748b",
        label: "Completed Projects",
        subLabel: "successfully delivered",
        value: s.completedProjects
      },
      {
        icon: "\u{1F4CA}",
        iconBg: "#ef4444",
        borderColor: "#ef4444",
        label: "Total Projects",
        subLabel: "on the platform",
        value: s.totalProjects
      },
      {
        icon: "\u2B50",
        iconBg: "#eab308",
        borderColor: "#eab308",
        label: "Verification Rate",
        subLabel: "platform quality",
        value: s.verificationRate,
        suffix: "%"
      }
    ];
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardComponent)(\u0275\u0275directiveInject(DashboardService), \u0275\u0275directiveInject(DarkModeService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 14, vars: 8, consts: [[1, "dashboard"], [1, "page-header"], [1, "page-title"], [1, "page-sub"], ["aria-label", "Toggle dark mode", 1, "dark-mode-toggle", 3, "click"], [1, "toggle-icon", "sun-icon"], [1, "toggle-icon", "moon-icon"], ["class", "loading-state", 4, "ngIf"], [4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "stats-grid"], [3, "icon", "iconBg", "borderColor", "label", "subLabel", "value", "suffix", 4, "ngFor", "ngForOf"], ["class", "payment-section", 4, "ngIf"], [1, "charts-row"], [1, "chart-card"], [1, "chart-header"], [1, "chart-icon"], [1, "chart-toggle"], ["href", "#"], ["href", "#", 1, "active"], [1, "chart-placeholder"], [1, "empty-chart"], [1, "chart-card", "chart-wide"], [1, "chart-badge"], [1, "kpi-bars"], ["class", "kpi-bar", 4, "ngFor", "ngForOf"], [1, "tables-row"], [1, "table-card"], [1, "table-header"], [1, "table-title"], [1, "count-badge"], [1, "table-actions"], ["type", "text", "placeholder", "Search...", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "btn-icon"], [1, "icon"], [1, "sort-row"], [1, "sort-btn", "active"], [1, "sort-btn"], [1, "table-wrap"], [1, "data-table"], [4, "ngFor", "ngForOf"], [3, "icon", "iconBg", "borderColor", "label", "subLabel", "value", "suffix"], [1, "payment-section"], [3, "userId", "userType"], [1, "kpi-bar"], [1, "bar-track"], [1, "bar-fill"], [1, "bar-label"], ["colspan", "6", 1, "empty-row"], [1, "user-cell"], [1, "avatar"], [1, "badge", "badge-primary"], [1, "status-dot"], ["colspan", "5", 1, "empty-row"], ["class", "badge badge-warning", 4, "ngIf"], [1, "badge", "badge-warning"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "Admin Dashboard");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Global overview of the Matchy platform");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 4);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_7_listener() {
          return ctx.toggleDarkMode();
        });
        \u0275\u0275elementStart(8, "span", 5);
        \u0275\u0275text(9, "\u2600\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span", 6);
        \u0275\u0275text(11, "\u{1F319}");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(12, DashboardComponent_div_12_Template, 4, 0, "div", 7)(13, DashboardComponent_ng_container_13_Template, 132, 12, "ng-container", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275classProp("active", ctx.isDarkMode);
        \u0275\u0275advance();
        \u0275\u0275classProp("visible", ctx.isDarkMode);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("visible", !ctx.isDarkMode);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading);
      }
    }, dependencies: [NgForOf, NgIf, DefaultValueAccessor, NgControlStatus, NgModel, PaymentDashboardComponent, StatCardComponent], styles: ['\n\n.dashboard[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\n.page-header[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 28px;\n  font-weight: 800;\n  color: var(--bo-text-primary);\n  letter-spacing: -0.5px;\n}\n.page-header[_ngcontent-%COMP%]   .page-sub[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 14px;\n  margin-top: 4px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 40px;\n  justify-content: center;\n  color: var(--bo-text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  border: 2px solid var(--bo-border);\n  border-top-color: var(--primary);\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n}\n.charts-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 2fr;\n  gap: 16px;\n}\n.chart-card[_ngcontent-%COMP%] {\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-md);\n  padding: 20px;\n}\n.chart-card[_ngcontent-%COMP%]   .chart-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 16px;\n  flex-wrap: wrap;\n}\n.chart-card[_ngcontent-%COMP%]   .chart-header[_ngcontent-%COMP%]   .chart-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.chart-card[_ngcontent-%COMP%]   .chart-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--bo-text-primary);\n  flex: 1;\n}\n.chart-card[_ngcontent-%COMP%]   .chart-header[_ngcontent-%COMP%]   .chart-toggle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--bo-text-secondary);\n}\n.chart-card[_ngcontent-%COMP%]   .chart-header[_ngcontent-%COMP%]   .chart-toggle[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  text-decoration: none;\n  margin: 0 2px;\n}\n.chart-card[_ngcontent-%COMP%]   .chart-header[_ngcontent-%COMP%]   .chart-toggle[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  color: var(--primary);\n  font-weight: 600;\n}\n.chart-card[_ngcontent-%COMP%]   .chart-header[_ngcontent-%COMP%]   .chart-toggle[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--primary);\n}\n.chart-card[_ngcontent-%COMP%]   .chart-header[_ngcontent-%COMP%]   .chart-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--bo-text-secondary);\n  background: var(--bo-bg-primary);\n  padding: 3px 8px;\n  border-radius: 10px;\n}\n.chart-card[_ngcontent-%COMP%]   .chart-placeholder[_ngcontent-%COMP%] {\n  height: 120px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.chart-card[_ngcontent-%COMP%]   .empty-chart[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 13px;\n  border: 1px dashed var(--bo-border);\n  padding: 16px 24px;\n  border-radius: 8px;\n}\n.kpi-bars[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 20px;\n  height: 120px;\n  padding-top: 12px;\n}\n.kpi-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  flex: 1;\n}\n.kpi-bar[_ngcontent-%COMP%]   .bar-track[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 80px;\n  background: var(--bo-bg-primary);\n  border-radius: 4px;\n  display: flex;\n  align-items: flex-end;\n  overflow: hidden;\n}\n.kpi-bar[_ngcontent-%COMP%]   .bar-fill[_ngcontent-%COMP%] {\n  width: 100%;\n  background:\n    linear-gradient(\n      to top,\n      var(--primary),\n      var(--accent));\n  border-radius: 4px;\n  min-height: 2px;\n  transition: height 0.6s ease;\n}\n.kpi-bar[_ngcontent-%COMP%]   .bar-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: var(--bo-text-secondary);\n  white-space: nowrap;\n}\n.tables-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.table-card[_ngcontent-%COMP%] {\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-md);\n  overflow: hidden;\n}\n.table-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  gap: 12px;\n  flex-wrap: wrap;\n  border-bottom: 1px solid var(--bo-border);\n}\n.table-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.table-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--bo-text-primary);\n}\n.table-title[_ngcontent-%COMP%]   .count-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--bo-text-secondary);\n  background: var(--bo-bg-primary);\n  padding: 2px 8px;\n  border-radius: 10px;\n}\n.table-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.table-actions[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  padding: 6px 10px;\n  font-size: 12px;\n  border: 1px solid var(--bo-border);\n  border-radius: 6px;\n  outline: none;\n  font-family: var(--font-body);\n  background: var(--bo-bg-primary);\n  color: var(--bo-text-primary);\n}\n.table-actions[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--primary);\n}\n.table-actions[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--bo-text-secondary);\n}\n.table-actions[_ngcontent-%COMP%]   .btn-export[_ngcontent-%COMP%] {\n  padding: 6px 10px;\n  font-size: 12px;\n  border-radius: 6px;\n  border: 1px solid var(--bo-border);\n  cursor: pointer;\n  font-family: var(--font-body);\n  background: white;\n  color: var(--bo-text-secondary);\n  transition: all 0.2s;\n}\n.table-actions[_ngcontent-%COMP%]   .btn-export[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary);\n  color: var(--primary);\n}\n.sort-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 20px;\n  font-size: 12px;\n  color: var(--bo-text-secondary);\n  border-bottom: 1px solid var(--bo-border);\n}\n.sort-row[_ngcontent-%COMP%]   .sort-btn[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n  border-radius: 10px;\n  font-size: 12px;\n  border: 1px solid transparent;\n  cursor: pointer;\n  font-family: var(--font-body);\n  background: transparent;\n  color: var(--bo-text-secondary);\n  transition: all 0.2s;\n}\n.sort-row[_ngcontent-%COMP%]   .sort-btn.active[_ngcontent-%COMP%] {\n  background: var(--primary);\n  color: white;\n}\n.sort-row[_ngcontent-%COMP%]   .sort-btn[_ngcontent-%COMP%]:not(.active):hover {\n  border-color: var(--bo-border);\n}\n.table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  text-align: left;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--bo-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 1px solid var(--bo-border);\n  background: var(--bo-bg-primary);\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  font-size: 13px;\n  color: var(--bo-text-primary);\n  border-bottom: 1px solid var(--bo-border);\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: rgba(79, 110, 247, 0.03);\n}\n.user-cell[_ngcontent-%COMP%] {\n  display: flex !important;\n  align-items: center;\n  gap: 8px;\n}\n.user-cell[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--accent-secondary));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 11px;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.status-dot[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  margin-right: 4px;\n}\n.status-dot.active[_ngcontent-%COMP%] {\n  background: var(--success);\n}\n.status-dot.inactive[_ngcontent-%COMP%] {\n  background: var(--bo-text-secondary);\n}\n.status-dot.banned[_ngcontent-%COMP%] {\n  background: var(--danger);\n}\n.empty-row[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--bo-text-secondary);\n  font-size: 13px;\n  padding: 32px !important;\n}\n@media (max-width: 1200px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .charts-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .tables-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n.dark-mode-toggle[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  background: var(--bo-bg-secondary, #ffffff);\n  border: 2px solid var(--bo-border, #e2e8f0);\n  border-radius: 16px;\n  cursor: pointer;\n  overflow: hidden;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  flex-shrink: 0;\n}\n.dark-mode-toggle[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);\n  border-color: #667eea;\n}\n.dark-mode-toggle[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.dark-mode-toggle[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 0;\n  height: 0;\n  border-radius: 50%;\n  background: rgba(102, 126, 234, 0.2);\n  transform: translate(-50%, -50%);\n  transition: width 0.4s, height 0.4s;\n}\n.dark-mode-toggle[_ngcontent-%COMP%]:active::after {\n  width: 100%;\n  height: 100%;\n}\n.toggle-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  font-size: 1.75rem;\n  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);\n  opacity: 0;\n  transform: scale(0) rotate(-180deg);\n}\n.toggle-icon.visible[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: scale(1) rotate(0deg);\n}\n.sun-icon.visible[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_sunRise 0.5s ease-out;\n}\n.moon-icon.visible[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_moonRise 0.5s ease-out;\n}\n@keyframes _ngcontent-%COMP%_sunRise {\n  0% {\n    opacity: 0;\n    transform: scale(0) rotate(-180deg);\n  }\n  50% {\n    transform: scale(1.2) rotate(-90deg);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1) rotate(0deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_moonRise {\n  0% {\n    opacity: 0;\n    transform: scale(0) rotate(180deg);\n  }\n  50% {\n    transform: scale(1.2) rotate(90deg);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1) rotate(0deg);\n  }\n}\n@media (max-width: 768px) {\n  .dark-mode-toggle[_ngcontent-%COMP%] {\n    width: 48px;\n    height: 48px;\n    border-radius: 12px;\n  }\n  .toggle-icon[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n.payment-section[_ngcontent-%COMP%] {\n  margin: 24px 0;\n  padding: 24px;\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-md);\n}\n.badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 10px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.badge.badge-primary[_ngcontent-%COMP%] {\n  background: rgba(79, 110, 247, 0.15);\n  color: var(--primary);\n  border: 1px solid rgba(79, 110, 247, 0.25);\n}\n.badge.badge-warning[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #f59e0b;\n  border: 1px solid rgba(245, 158, 11, 0.25);\n}\n.btn-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  font-size: 12px;\n  border-radius: 6px;\n  border: 1px solid var(--bo-border);\n  cursor: pointer;\n  font-family: var(--font-body);\n  background: var(--bo-bg-primary);\n  color: var(--bo-text-secondary);\n  transition: all 0.2s;\n}\n.btn-icon[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.btn-icon[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary);\n  color: var(--primary);\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\backoffice\\dashboard\\dashboard.component.ts", lineNumber: 22 });
})();

// src/app/backoffice/users/users.component.ts
function UsersComponent_tr_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 22)(2, "div", 23)(3, "span", 24);
    \u0275\u0275text(4, "\u{1F465}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "No users registered yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8, "Users will appear here once they sign up");
    \u0275\u0275elementEnd()()()();
  }
}
function UsersComponent_tr_65_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r1.address);
  }
}
function UsersComponent_tr_65_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1, "\u2705");
    \u0275\u0275elementEnd();
  }
}
function UsersComponent_tr_65_span_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1, "\u274C");
    \u0275\u0275elementEnd();
  }
}
function UsersComponent_tr_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 25)(2, "div", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 27)(5, "span", 28);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, UsersComponent_tr_65_span_7_Template, 2, 1, "span", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td")(11, "span", 30);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td")(14, "span", 31);
    \u0275\u0275element(15, "span", 32);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td");
    \u0275\u0275template(18, UsersComponent_tr_65_span_18_Template, 2, 0, "span", 33)(19, UsersComponent_tr_65_span_19_Template, 2, 0, "span", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td");
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "td", 35)(26, "div", 36)(27, "button", 37)(28, "span", 5);
    \u0275\u0275text(29, "\u{1F441}\uFE0F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "button", 38)(31, "span", 5);
    \u0275\u0275text(32, "\u270F\uFE0F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "button", 39)(34, "span", 5);
    \u0275\u0275text(35, "\u{1F5D1}\uFE0F");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const user_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getInitials(user_r1.firstName + " " + user_r1.lastName));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", user_r1.firstName, " ", user_r1.lastName, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", user_r1.address);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r1.email);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r1.userType);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(user_r1.isActive ? "active" : "inactive");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", user_r1.isActive ? "Active" : "Inactive", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", user_r1.isActive);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !user_r1.isActive);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r1.hourlyRate ? user_r1.hourlyRate + " TND/h" : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(24, 13, user_r1.createdAt, "MMM d, y"));
  }
}
var UsersComponent = class _UsersComponent {
  constructor() {
    this.users = [];
    this.filteredUsers = [];
    this.searchTerm = "";
    this.selectedRole = "all";
    this.selectedStatus = "all";
  }
  ngOnInit() {
    this.filteredUsers = [...this.users];
  }
  onSearch() {
    this.filteredUsers = this.users.filter((u) => {
      const lowerTerm = this.searchTerm.toLowerCase();
      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
      const matchSearch = !this.searchTerm || fullName.includes(lowerTerm) || (u.email ? u.email.toLowerCase().includes(lowerTerm) : false);
      const matchRole = this.selectedRole === "all" || u.userType === this.selectedRole;
      const matchStatus = this.selectedStatus === "all" || (u.isActive ? "active" : "inactive") === this.selectedStatus;
      return matchSearch && matchRole && matchStatus;
    });
  }
  getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  }
  static {
    this.\u0275fac = function UsersComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UsersComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsersComponent, selectors: [["app-users"]], decls: 66, vars: 5, consts: [[1, "users-page"], [1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "btn-primary-action"], [1, "icon"], [1, "filters-bar", "bo-filters-bar"], ["type", "text", "placeholder", "\u{1F50D} Search users...", 1, "filter-input", "bo-filter-input", 3, "ngModelChange", "input", "ngModel"], [1, "filter-select", "bo-filter-select", 3, "ngModelChange", "change", "ngModel"], ["value", "all"], ["value", "admin"], ["value", "client"], ["value", "freelancer"], ["value", "active"], ["value", "inactive"], ["value", "banned"], [1, "filter-spacer", "bo-filter-spacer"], [1, "btn-icon"], [1, "table-card"], [1, "data-table"], [4, "ngIf"], [4, "ngFor", "ngForOf"], ["colspan", "8", 1, "empty-row"], [1, "empty-state"], [1, "empty-icon"], [1, "user-cell"], [1, "avatar"], [1, "user-info"], [1, "user-name"], ["class", "user-city", 4, "ngIf"], [1, "badge", "badge-primary"], [1, "status-chip"], [1, "dot"], ["class", "verified-icon", 4, "ngIf"], ["class", "verified-icon unverified", 4, "ngIf"], [1, "actions-cell"], [1, "action-icons"], ["data-tooltip", "View Details", "aria-label", "View user details", 1, "action-icon-view", "action-icon-tooltip"], ["data-tooltip", "Edit User", "aria-label", "Edit user", 1, "action-icon-edit", "action-icon-tooltip"], ["data-tooltip", "Delete User", "aria-label", "Delete user", 1, "action-icon-delete", "action-icon-tooltip"], [1, "user-city"], [1, "verified-icon"], [1, "verified-icon", "unverified"]], template: function UsersComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "Users Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Manage all registered users on Matchy");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 4)(8, "span", 5);
        \u0275\u0275text(9, "\u2728");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "Add User");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 6)(13, "input", 7);
        \u0275\u0275twoWayListener("ngModelChange", function UsersComponent_Template_input_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275listener("input", function UsersComponent_Template_input_input_13_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "select", 8);
        \u0275\u0275twoWayListener("ngModelChange", function UsersComponent_Template_select_ngModelChange_14_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedRole, $event) || (ctx.selectedRole = $event);
          return $event;
        });
        \u0275\u0275listener("change", function UsersComponent_Template_select_change_14_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275elementStart(15, "option", 9);
        \u0275\u0275text(16, "All Roles");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "option", 10);
        \u0275\u0275text(18, "Admin");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "option", 11);
        \u0275\u0275text(20, "Client");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "option", 12);
        \u0275\u0275text(22, "Freelancer");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "select", 8);
        \u0275\u0275twoWayListener("ngModelChange", function UsersComponent_Template_select_ngModelChange_23_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedStatus, $event) || (ctx.selectedStatus = $event);
          return $event;
        });
        \u0275\u0275listener("change", function UsersComponent_Template_select_change_23_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275elementStart(24, "option", 9);
        \u0275\u0275text(25, "All Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "option", 13);
        \u0275\u0275text(27, "Active");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "option", 14);
        \u0275\u0275text(29, "Inactive");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "option", 15);
        \u0275\u0275text(31, "Banned");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(32, "div", 16);
        \u0275\u0275elementStart(33, "button", 17)(34, "span", 5);
        \u0275\u0275text(35, "\u{1F4C4}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "span");
        \u0275\u0275text(37, "CSV");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "button", 17)(39, "span", 5);
        \u0275\u0275text(40, "\u{1F4CA}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "span");
        \u0275\u0275text(42, "Excel");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(43, "div", 18)(44, "table", 19)(45, "thead")(46, "tr")(47, "th");
        \u0275\u0275text(48, "User");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "th");
        \u0275\u0275text(50, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "th");
        \u0275\u0275text(52, "Role");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "th");
        \u0275\u0275text(54, "Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "th");
        \u0275\u0275text(56, "Verified");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "th");
        \u0275\u0275text(58, "Rating");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "th");
        \u0275\u0275text(60, "Joined");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "th");
        \u0275\u0275text(62, "Actions");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(63, "tbody");
        \u0275\u0275template(64, UsersComponent_tr_64_Template, 9, 0, "tr", 20)(65, UsersComponent_tr_65_Template, 36, 16, "tr", 21);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedRole);
        \u0275\u0275advance(9);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedStatus);
        \u0275\u0275advance(41);
        \u0275\u0275property("ngIf", ctx.filteredUsers.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.filteredUsers);
      }
    }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ["\n\n.users-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n.page-header[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 28px;\n  font-weight: 800;\n  color: var(--bo-text-primary);\n  letter-spacing: -0.5px;\n}\n.page-header[_ngcontent-%COMP%]   .page-sub[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 14px;\n  margin-top: 4px;\n}\n.btn-add[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: var(--primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-sm);\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-add[_ngcontent-%COMP%]:hover {\n  background: var(--primary-light);\n  transform: translateY(-1px);\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.filter-input[_ngcontent-%COMP%], \n.filter-select[_ngcontent-%COMP%] {\n  padding: 9px 14px;\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-sm);\n  font-size: 13px;\n  font-family: var(--font-body);\n  background: var(--bo-bg-secondary);\n  color: var(--bo-text-primary);\n  outline: none;\n  transition: border 0.2s;\n}\n.filter-input[_ngcontent-%COMP%]:focus, \n.filter-select[_ngcontent-%COMP%]:focus {\n  border-color: var(--primary);\n}\n.filter-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.filter-select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.filter-spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.btn-export[_ngcontent-%COMP%] {\n  padding: 9px 14px;\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-sm);\n  font-size: 12px;\n  background: white;\n  color: var(--bo-text-secondary);\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n}\n.btn-export[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary);\n  color: var(--primary);\n}\n.table-card[_ngcontent-%COMP%] {\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-md);\n  overflow: hidden;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--bo-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 1px solid var(--bo-border);\n  background: var(--bo-bg-primary);\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  color: var(--bo-text-primary);\n  border-bottom: 1px solid var(--bo-border);\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: rgba(79, 110, 247, 0.03);\n}\n.user-cell[_ngcontent-%COMP%] {\n  display: flex !important;\n  align-items: center;\n  gap: 10px;\n}\n.user-cell[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--accent-secondary));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 12px;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.user-cell[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.user-cell[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 13px;\n}\n.user-cell[_ngcontent-%COMP%]   .user-city[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--bo-text-secondary);\n}\n.status-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 4px 10px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.status-chip[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n}\n.status-chip.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  color: #16a34a;\n}\n.status-chip.active[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: #22c55e;\n}\n.status-chip.inactive[_ngcontent-%COMP%] {\n  background: rgba(100, 116, 139, 0.1);\n  color: #64748b;\n}\n.status-chip.inactive[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: #64748b;\n}\n.status-chip.banned[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  color: #dc2626;\n}\n.status-chip.banned[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n.verified-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.unverified[_ngcontent-%COMP%] {\n  opacity: 0.4;\n}\n.actions-cell[_ngcontent-%COMP%] {\n  display: flex !important;\n  gap: 4px;\n}\n.actions-cell[_ngcontent-%COMP%]   .btn-action[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 6px;\n  border: 1px solid var(--bo-border);\n  cursor: pointer;\n  font-size: 13px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  transition: all 0.2s;\n}\n.actions-cell[_ngcontent-%COMP%]   .btn-action.view[_ngcontent-%COMP%]:hover {\n  background: rgba(79, 110, 247, 0.1);\n  border-color: var(--primary);\n}\n.actions-cell[_ngcontent-%COMP%]   .btn-action.edit[_ngcontent-%COMP%]:hover {\n  background: rgba(245, 158, 11, 0.1);\n  border-color: var(--warning);\n}\n.actions-cell[_ngcontent-%COMP%]   .btn-action.delete[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  border-color: var(--danger);\n}\n.empty-row[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px !important;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  opacity: 0.3;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 15px;\n  font-weight: 500;\n}\n.empty-state[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 12px;\n  opacity: 0.7;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: var(--primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-sm);\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--primary-light);\n  transform: translateY(-1px);\n}\n.bo-filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.bo-filter-input[_ngcontent-%COMP%], \n.filter-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 180px;\n}\n.bo-filter-spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=users.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsersComponent, { className: "UsersComponent", filePath: "src\\app\\backoffice\\users\\users.component.ts", lineNumber: 9 });
})();

// src/app/backoffice/projects/projects.component.ts
function ProjectsComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "div", 22);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading projects...");
    \u0275\u0275elementEnd()();
  }
}
function ProjectsComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "span", 24);
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 25);
    \u0275\u0275listener("click", function ProjectsComponent_div_31_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadProjects());
    });
    \u0275\u0275text(6, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function ProjectsComponent_div_32_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 30)(2, "div", 31)(3, "span", 32);
    \u0275\u0275text(4, "\u{1F4C1}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "No projects found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8, "Create your first project to get started");
    \u0275\u0275elementEnd()()()();
  }
}
function ProjectsComponent_div_32_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 33)(2, "span", 34);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 35);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "slice");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 36);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "span", 37);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td");
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td", 38)(22, "div", 39)(23, "button", 40);
    \u0275\u0275listener("click", function ProjectsComponent_div_32_tr_20_Template_button_click_23_listener() {
      const project_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewProject(project_r4.id));
    });
    \u0275\u0275elementStart(24, "span", 5);
    \u0275\u0275text(25, "\u{1F441}\uFE0F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "button", 41);
    \u0275\u0275listener("click", function ProjectsComponent_div_32_tr_20_Template_button_click_26_listener() {
      const project_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openEditModal(project_r4));
    });
    \u0275\u0275elementStart(27, "span", 5);
    \u0275\u0275text(28, "\u270F\uFE0F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "button", 42);
    \u0275\u0275listener("click", function ProjectsComponent_div_32_tr_20_Template_button_click_29_listener() {
      const project_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openDeleteModal(project_r4));
    });
    \u0275\u0275elementStart(30, "span", 5);
    \u0275\u0275text(31, "\u{1F5D1}\uFE0F");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const project_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(project_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind3(6, 10, project_r4.description, 0, 50), "", project_r4.description && project_r4.description.length > 50 ? "..." : "", "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(9, 14, project_r4.totalBudget, "1.2-2"), " TND");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 17, project_r4.deadline, "MMM d, y"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap("badge-" + ctx_r1.getStatusClass(project_r4.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(project_r4.status), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(project_r4.milestoneCount || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(20, 20, project_r4.createdAt, "MMM d, y"));
  }
}
function ProjectsComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "table", 27)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Budget");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Deadline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Milestones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Created");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275template(19, ProjectsComponent_div_32_tr_19_Template, 9, 0, "tr", 28)(20, ProjectsComponent_div_32_tr_20_Template, 32, 23, "tr", 29);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275property("ngIf", ctx_r1.filteredProjects.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.filteredProjects);
  }
}
function ProjectsComponent_div_33_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "label");
    \u0275\u0275text(2, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 59);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectsComponent_div_33_div_25_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.status, $event) || (ctx_r1.formData.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 10);
    \u0275\u0275text(5, "Open");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 11);
    \u0275\u0275text(7, "In Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "option", 12);
    \u0275\u0275text(9, "Completed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "option", 13);
    \u0275\u0275text(11, "Cancelled");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.status);
  }
}
function ProjectsComponent_div_33_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modalError, " ");
  }
}
function ProjectsComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275listener("click", function ProjectsComponent_div_33_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 44);
    \u0275\u0275listener("click", function ProjectsComponent_div_33_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 45)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 46);
    \u0275\u0275listener("click", function ProjectsComponent_div_33_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 47)(8, "div", 48)(9, "label");
    \u0275\u0275text(10, "Title *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 49);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectsComponent_div_33_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.title, $event) || (ctx_r1.formData.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 48)(13, "label");
    \u0275\u0275text(14, "Description *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "textarea", 50);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectsComponent_div_33_Template_textarea_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.description, $event) || (ctx_r1.formData.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 51)(17, "div", 48)(18, "label");
    \u0275\u0275text(19, "Budget (TND) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectsComponent_div_33_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.totalBudget, $event) || (ctx_r1.formData.totalBudget = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 48)(22, "label");
    \u0275\u0275text(23, "Deadline *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectsComponent_div_33_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.deadline, $event) || (ctx_r1.formData.deadline = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(25, ProjectsComponent_div_33_div_25_Template, 12, 1, "div", 54)(26, ProjectsComponent_div_33_div_26_Template, 2, 1, "div", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 56)(28, "button", 57);
    \u0275\u0275listener("click", function ProjectsComponent_div_33_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(29, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 58);
    \u0275\u0275listener("click", function ProjectsComponent_div_33_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveProject());
    });
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Edit Project" : "Create New Project");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.totalBudget);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.deadline);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isEditMode);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.modalError);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving ? "Saving..." : ctx_r1.isEditMode ? "Update" : "Create", " ");
  }
}
function ProjectsComponent_div_34_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modalError, " ");
  }
}
function ProjectsComponent_div_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275listener("click", function ProjectsComponent_div_34_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDeleteModal());
    });
    \u0275\u0275elementStart(1, "div", 62);
    \u0275\u0275listener("click", function ProjectsComponent_div_34_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 63)(3, "div", 64)(4, "span", 65);
    \u0275\u0275text(5, "\u26A0\uFE0F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 66)(7, "h2", 67);
    \u0275\u0275text(8, "Delete Project?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 68);
    \u0275\u0275text(10, " Are you sure you want to delete ");
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, "? ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 69);
    \u0275\u0275text(15, " This action cannot be undone. All associated milestones and data will be permanently removed. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, ProjectsComponent_div_34_div_16_Template, 2, 1, "div", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 70)(18, "button", 71);
    \u0275\u0275listener("click", function ProjectsComponent_div_34_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDeleteModal());
    });
    \u0275\u0275elementStart(19, "span", 5);
    \u0275\u0275text(20, "\u2717");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "Cancel");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "button", 72);
    \u0275\u0275listener("click", function ProjectsComponent_div_34_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmDelete());
    });
    \u0275\u0275elementStart(24, "span", 5);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1('"', ctx_r1.deletingProjectTitle, '"');
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.modalError);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.deleting);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.deleting);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.deleting ? "\u23F3" : "\u{1F5D1}\uFE0F");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.deleting ? "Deleting..." : "Delete Project");
  }
}
var ProjectsComponent = class _ProjectsComponent {
  constructor(projectService, authService, router) {
    this.projectService = projectService;
    this.authService = authService;
    this.router = router;
    this.projects = [];
    this.filteredProjects = [];
    this.searchTerm = "";
    this.selectedStatus = "all";
    this.loading = false;
    this.error = null;
    this.showModal = false;
    this.isEditMode = false;
    this.saving = false;
    this.modalError = "";
    this.formData = {
      title: "",
      description: "",
      totalBudget: 0,
      deadline: "",
      status: "OPEN"
    };
    this.editingProjectId = null;
    this.showDeleteModal = false;
    this.deletingProjectId = null;
    this.deletingProjectTitle = "";
    this.deleting = false;
  }
  ngOnInit() {
    this.loadProjects();
  }
  loadProjects() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.error = "Please login to view projects";
      return;
    }
    this.loading = true;
    this.error = null;
    this.projectService.getCompanyProjects(currentUser.id).subscribe({
      next: (data) => {
        this.projects = data;
        this.filteredProjects = [...this.projects];
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading projects:", err);
        this.error = "Failed to load projects. Please try again.";
        this.loading = false;
      }
    });
  }
  onSearch() {
    this.filteredProjects = this.projects.filter((p) => {
      const lowerTerm = this.searchTerm.toLowerCase();
      const matchSearch = !this.searchTerm || p.title.toLowerCase().includes(lowerTerm) || (p.description ? p.description.toLowerCase().includes(lowerTerm) : false);
      const matchStatus = this.selectedStatus === "all" || p.status === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }
  openCreateModal() {
    this.isEditMode = false;
    this.editingProjectId = null;
    this.formData = {
      title: "",
      description: "",
      totalBudget: 0,
      deadline: "",
      status: "OPEN"
    };
    this.modalError = "";
    this.showModal = true;
  }
  openEditModal(project) {
    this.isEditMode = true;
    this.editingProjectId = project.id;
    this.formData = {
      title: project.title,
      description: project.description,
      totalBudget: project.totalBudget,
      deadline: project.deadline,
      status: project.status
    };
    this.modalError = "";
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.modalError = "";
  }
  saveProject() {
    if (!this.formData.title || !this.formData.description || !this.formData.totalBudget || !this.formData.deadline) {
      this.modalError = "Please fill in all required fields";
      return;
    }
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.modalError = "User not authenticated";
      return;
    }
    this.saving = true;
    this.modalError = "";
    if (this.isEditMode && this.editingProjectId) {
      this.projectService.updateProject(this.editingProjectId, this.formData).subscribe({
        next: () => {
          this.saving = false;
          this.closeModal();
          this.loadProjects();
        },
        error: (err) => {
          console.error("Error updating project:", err);
          this.modalError = "Failed to update project. Please try again.";
          this.saving = false;
        }
      });
    } else {
      const createData = __spreadProps(__spreadValues({}, this.formData), {
        companyId: currentUser.id
      });
      this.projectService.createProject(createData).subscribe({
        next: () => {
          this.saving = false;
          this.closeModal();
          this.loadProjects();
        },
        error: (err) => {
          console.error("Error creating project:", err);
          this.modalError = "Failed to create project. Please try again.";
          this.saving = false;
        }
      });
    }
  }
  openDeleteModal(project) {
    this.deletingProjectId = project.id;
    this.deletingProjectTitle = project.title;
    this.showDeleteModal = true;
  }
  closeDeleteModal() {
    this.showDeleteModal = false;
    this.deletingProjectId = null;
    this.deletingProjectTitle = "";
  }
  confirmDelete() {
    if (!this.deletingProjectId)
      return;
    this.deleting = true;
    this.projectService.deleteProject(this.deletingProjectId).subscribe({
      next: () => {
        this.projects = this.projects.filter((p) => p.id !== this.deletingProjectId);
        this.onSearch();
        this.deleting = false;
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error("Error deleting project:", err);
        this.modalError = "Failed to delete project. It may have milestones attached.";
        this.deleting = false;
      }
    });
  }
  viewProject(id) {
    this.router.navigate(["/backoffice/projects", id]);
  }
  getStatusClass(status) {
    if (!status) {
      return "primary";
    }
    const map = {
      OPEN: "success",
      IN_PROGRESS: "primary",
      COMPLETED: "success",
      CANCELLED: "danger"
    };
    return map[status] || "primary";
  }
  getStatusLabel(status) {
    if (!status)
      return "Open";
    const map = {
      OPEN: "Open",
      IN_PROGRESS: "In Progress",
      COMPLETED: "Completed",
      CANCELLED: "Cancelled"
    };
    return map[status] || status;
  }
  static {
    this.\u0275fac = function ProjectsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProjectsComponent)(\u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectsComponent, selectors: [["app-projects"]], decls: 35, vars: 7, consts: [[1, "projects-page"], [1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "btn-primary-action", 3, "click"], [1, "icon"], [1, "filters-bar", "bo-filters-bar"], ["type", "text", "placeholder", "\u{1F50D} Search projects...", 1, "filter-input", "bo-filter-input", 3, "ngModelChange", "input", "ngModel"], [1, "filter-select", "bo-filter-select", 3, "ngModelChange", "change", "ngModel"], ["value", "all"], ["value", "OPEN"], ["value", "IN_PROGRESS"], ["value", "COMPLETED"], ["value", "CANCELLED"], [1, "filter-spacer", "bo-filter-spacer"], [1, "btn-export"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "table-card", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["class", "modal-overlay delete-modal-overlay", 3, "click", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "error-state"], [1, "error-icon"], [1, "btn-retry", 3, "click"], [1, "table-card"], [1, "data-table"], [4, "ngIf"], [4, "ngFor", "ngForOf"], ["colspan", "7", 1, "empty-row"], [1, "empty-state"], [1, "empty-icon"], [1, "project-cell"], [1, "project-title"], [1, "project-desc"], [1, "budget-cell"], [1, "badge"], [1, "actions-cell"], [1, "action-icons"], ["data-tooltip", "View Details", "title", "View", 1, "action-icon-view", "action-icon-tooltip", 3, "click"], ["data-tooltip", "Edit Project", "title", "Edit", 1, "action-icon-edit", "action-icon-tooltip", 3, "click"], ["data-tooltip", "Delete Project", "title", "Delete", 1, "action-icon-delete", "action-icon-tooltip", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "form-group"], ["type", "text", "placeholder", "Enter project title", 1, "form-input", 3, "ngModelChange", "ngModel"], ["placeholder", "Enter project description", "rows", "4", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "form-row"], ["type", "number", "placeholder", "0.00", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], ["class", "form-group", 4, "ngIf"], ["class", "modal-error", 4, "ngIf"], [1, "modal-footer"], [1, "btn-secondary", 3, "click"], [1, "btn-primary", 3, "click", "disabled"], [1, "form-input", 3, "ngModelChange", "ngModel"], [1, "modal-error"], [1, "modal-overlay", "delete-modal-overlay", 3, "click"], [1, "delete-modal-content", 3, "click"], [1, "delete-modal-icon"], [1, "icon-circle"], [1, "icon-warning"], [1, "delete-modal-body"], [1, "delete-modal-title"], [1, "delete-modal-message"], [1, "delete-modal-warning"], [1, "delete-modal-footer"], [1, "btn-cancel-delete", 3, "click", "disabled"], [1, "btn-confirm-delete", 3, "click", "disabled"]], template: function ProjectsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "Projects Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Overview of all projects on the Matchy platform");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 4);
        \u0275\u0275listener("click", function ProjectsComponent_Template_button_click_7_listener() {
          return ctx.openCreateModal();
        });
        \u0275\u0275elementStart(8, "span", 5);
        \u0275\u0275text(9, "\u2728");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "New Project");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 6)(13, "input", 7);
        \u0275\u0275twoWayListener("ngModelChange", function ProjectsComponent_Template_input_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275listener("input", function ProjectsComponent_Template_input_input_13_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "select", 8);
        \u0275\u0275twoWayListener("ngModelChange", function ProjectsComponent_Template_select_ngModelChange_14_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedStatus, $event) || (ctx.selectedStatus = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ProjectsComponent_Template_select_change_14_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275elementStart(15, "option", 9);
        \u0275\u0275text(16, "All Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "option", 10);
        \u0275\u0275text(18, "Open");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "option", 11);
        \u0275\u0275text(20, "In Progress");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "option", 12);
        \u0275\u0275text(22, "Completed");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "option", 13);
        \u0275\u0275text(24, "Cancelled");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(25, "div", 14);
        \u0275\u0275elementStart(26, "button", 15);
        \u0275\u0275text(27, "\u{1F4C4} CSV");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "button", 15);
        \u0275\u0275text(29, "\u{1F4CA} Excel");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(30, ProjectsComponent_div_30_Template, 4, 0, "div", 16)(31, ProjectsComponent_div_31_Template, 7, 1, "div", 17)(32, ProjectsComponent_div_32_Template, 21, 2, "div", 18)(33, ProjectsComponent_div_33_Template, 32, 9, "div", 19)(34, ProjectsComponent_div_34_Template, 28, 6, "div", 20);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedStatus);
        \u0275\u0275advance(16);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDeleteModal);
      }
    }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, SlicePipe, DecimalPipe, DatePipe], styles: ["\n\n.projects-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n.page-header[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 28px;\n  font-weight: 800;\n  color: var(--bo-text-primary);\n  letter-spacing: -0.5px;\n}\n.page-header[_ngcontent-%COMP%]   .page-sub[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 14px;\n  margin-top: 4px;\n}\n.btn-add[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: var(--primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-sm);\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-add[_ngcontent-%COMP%]:hover {\n  background: var(--primary-light);\n  transform: translateY(-1px);\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.filter-input[_ngcontent-%COMP%], \n.filter-select[_ngcontent-%COMP%] {\n  padding: 9px 14px;\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-sm);\n  font-size: 13px;\n  font-family: var(--font-body);\n  background: var(--bo-bg-secondary);\n  color: var(--bo-text-primary);\n  outline: none;\n  transition: border 0.2s;\n}\n.filter-input[_ngcontent-%COMP%]:focus, \n.filter-select[_ngcontent-%COMP%]:focus {\n  border-color: var(--primary);\n}\n.filter-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.filter-spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.btn-export[_ngcontent-%COMP%] {\n  padding: 9px 14px;\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-sm);\n  font-size: 12px;\n  background: white;\n  color: var(--bo-text-secondary);\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n}\n.btn-export[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary);\n  color: var(--primary);\n}\n.table-card[_ngcontent-%COMP%] {\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-md);\n  overflow: hidden;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--bo-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 1px solid var(--bo-border);\n  background: var(--bo-bg-primary);\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  color: var(--bo-text-primary);\n  border-bottom: 1px solid var(--bo-border);\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: rgba(79, 110, 247, 0.03);\n}\n.project-cell[_ngcontent-%COMP%] {\n  display: flex !important;\n  flex-direction: column;\n  gap: 2px;\n  max-width: 220px;\n}\n.project-cell[_ngcontent-%COMP%]   .project-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 13px;\n}\n.project-cell[_ngcontent-%COMP%]   .project-desc[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--bo-text-secondary);\n}\n.category-tag[_ngcontent-%COMP%] {\n  padding: 3px 8px;\n  border-radius: 4px;\n  font-size: 11px;\n  font-weight: 600;\n  background: rgba(79, 110, 247, 0.1);\n  color: var(--primary);\n}\n.budget-cell[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--success);\n}\n.actions-cell[_ngcontent-%COMP%] {\n  display: flex !important;\n  gap: 4px;\n}\n.actions-cell[_ngcontent-%COMP%]   .btn-action[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 6px;\n  border: 1px solid var(--bo-border);\n  cursor: pointer;\n  font-size: 13px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  transition: all 0.2s;\n}\n.actions-cell[_ngcontent-%COMP%]   .btn-action.view[_ngcontent-%COMP%]:hover {\n  background: rgba(79, 110, 247, 0.1);\n  border-color: var(--primary);\n}\n.actions-cell[_ngcontent-%COMP%]   .btn-action.edit[_ngcontent-%COMP%]:hover {\n  background: rgba(245, 158, 11, 0.1);\n  border-color: var(--warning);\n}\n.actions-cell[_ngcontent-%COMP%]   .btn-action.delete[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  border-color: var(--danger);\n}\n.empty-row[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px !important;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  opacity: 0.3;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 15px;\n  font-weight: 500;\n}\n.empty-state[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 12px;\n  opacity: 0.7;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: var(--primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-sm);\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--primary-light);\n  transform: translateY(-1px);\n}\n.bo-filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.bo-filter-spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 20px;\n  gap: 16px;\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-md);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid var(--bo-border);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 14px;\n  font-weight: 500;\n}\n.error-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  opacity: 0.5;\n}\n.btn-retry[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background: var(--primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-sm);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n}\n.btn-retry[_ngcontent-%COMP%]:hover {\n  background: var(--primary-light);\n  transform: translateY(-1px);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s;\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: var(--bo-bg-secondary);\n  border-radius: var(--radius-md);\n  width: 90%;\n  max-width: 600px;\n  max-height: 90vh;\n  overflow-y: auto;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  animation: _ngcontent-%COMP%_slideUp 0.3s;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px;\n  border-bottom: 1px solid var(--bo-border);\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--bo-text-primary);\n}\n.modal-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 28px;\n  color: var(--bo-text-secondary);\n  cursor: pointer;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: all 0.2s;\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: var(--bo-border);\n  color: var(--bo-text-primary);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--bo-text-primary);\n}\n.form-input[_ngcontent-%COMP%], \n.form-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-sm);\n  font-size: 14px;\n  font-family: var(--font-body);\n  background: var(--bo-bg-primary);\n  color: var(--bo-text-primary);\n  transition: border 0.2s;\n}\n.form-input[_ngcontent-%COMP%]:focus, \n.form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--primary);\n}\n.form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 100px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.modal-error[_ngcontent-%COMP%] {\n  padding: 12px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid var(--danger);\n  border-radius: var(--radius-sm);\n  color: var(--danger);\n  font-size: 13px;\n  margin-top: 16px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid var(--bo-border);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: transparent;\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-sm);\n  color: var(--bo-text-primary);\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--bo-border);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: var(--primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-sm);\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--primary-light);\n  transform: translateY(-1px);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=projects.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectsComponent, { className: "ProjectsComponent", filePath: "src\\app\\backoffice\\projects\\projects.component.ts", lineNumber: 12 });
})();

// src/app/frontoffice/services/review.service.ts
var ReviewService = class _ReviewService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/reviews`;
  }
  // Basic review operations
  createReview(data) {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
  getReviewBySubmission(submissionId) {
    return this.http.get(`${this.apiUrl}/submission/${submissionId}`);
  }
  // Enhanced multi-level review operations
  createTaskReview(data) {
    return this.http.post(`${this.apiUrl}/task/create`, data);
  }
  getTaskReviews(submissionId) {
    return this.http.get(`${this.apiUrl}/submission/${submissionId}/tasks`);
  }
  updateTaskReview(taskReviewId, data) {
    return this.http.put(`${this.apiUrl}/task/${taskReviewId}`, data);
  }
  // Request revision
  requestRevision(submissionId, taskName, revisionNotes) {
    return this.http.post(`${this.apiUrl}/submission/${submissionId}/revision`, {
      taskName,
      revisionNotes
    });
  }
  // Approve task
  approveTask(taskReviewId) {
    return this.http.put(`${this.apiUrl}/task/${taskReviewId}/approve`, {});
  }
  // Get quality score
  getQualityScore(submissionId) {
    return this.http.get(`${this.apiUrl}/submission/${submissionId}/quality-score`);
  }
  // Get freelancer average rating
  getFreelancerRating(freelancerId) {
    return this.http.get(`${this.apiUrl}/freelancer/${freelancerId}/rating`);
  }
  // Get all reviews
  getAllReviews() {
    return this.http.get(`${this.apiUrl}/all`);
  }
  static {
    this.\u0275fac = function ReviewService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ReviewService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReviewService, factory: _ReviewService.\u0275fac, providedIn: "root" });
  }
};

// src/app/backoffice/project-details/project-details.component.ts
function ProjectDetailsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "div", 11);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading project details...");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "span", 13);
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 14);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_10_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadProjectDetails());
    });
    \u0275\u0275text(6, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function ProjectDetailsComponent_div_11_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "p");
    \u0275\u0275text(2, "No milestones yet. Create one to get started!");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_div_11_div_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "h4");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 5);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 34);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 35)(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 36)(16, "button", 37);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_11_div_38_Template_button_click_16_listener() {
      const milestone_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewMilestoneApplications(milestone_r5.id));
    });
    \u0275\u0275elementStart(17, "span", 23);
    \u0275\u0275text(18, "\u{1F4CB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "Applications");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "button", 37);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_11_div_38_Template_button_click_21_listener() {
      const milestone_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewMilestoneSubmissions(milestone_r5.id));
    });
    \u0275\u0275elementStart(22, "span", 23);
    \u0275\u0275text(23, "\u{1F4E6}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25, "Submissions");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "button", 38);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_11_div_38_Template_button_click_26_listener() {
      const milestone_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openEditMilestoneModal(milestone_r5));
    });
    \u0275\u0275elementStart(27, "span", 23);
    \u0275\u0275text(28, "\u270F\uFE0F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "button", 39);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_11_div_38_Template_button_click_29_listener() {
      const milestone_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteMilestone(milestone_r5.id));
    });
    \u0275\u0275elementStart(30, "span", 23);
    \u0275\u0275text(31, "\u{1F5D1}\uFE0F");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const milestone_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(milestone_r5.title);
    \u0275\u0275advance();
    \u0275\u0275classMap("badge-" + ctx_r1.getStatusClass(milestone_r5.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", milestone_r5.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(milestone_r5.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4B0} ", \u0275\u0275pipeBind2(11, 7, milestone_r5.budget, "1.2-2"), " TND");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4C5} ", \u0275\u0275pipeBind2(14, 10, milestone_r5.deadline, "MMM d, y"), "");
  }
}
function ProjectDetailsComponent_div_11_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "p");
    \u0275\u0275text(2, "No applications yet");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_div_11_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 41)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 42);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 43);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const app_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(app_r6.freelancerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(app_r6.milestoneTitle);
    \u0275\u0275advance();
    \u0275\u0275classMap("badge-" + ctx_r1.getStatusClass(app_r6.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", app_r6.status, " ");
  }
}
function ProjectDetailsComponent_div_11_div_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "p");
    \u0275\u0275text(2, "No submissions yet");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_div_11_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 45)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 46);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 43);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sub_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sub_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("by ", sub_r7.freelancerName, "");
    \u0275\u0275advance();
    \u0275\u0275classMap("badge-" + ctx_r1.getStatusClass(sub_r7.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sub_r7.status, " ");
  }
}
function ProjectDetailsComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16)(2, "h3");
    \u0275\u0275text(3, "Project Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 17)(5, "span", 18);
    \u0275\u0275text(6, "Description:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 19);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 17)(10, "span", 18);
    \u0275\u0275text(11, "Total Budget:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 19);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 17)(16, "span", 18);
    \u0275\u0275text(17, "Deadline:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 19);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 17)(22, "span", 18);
    \u0275\u0275text(23, "Created:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 19);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 20)(28, "div", 21)(29, "h3");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "button", 22);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_11_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCreateMilestoneModal());
    });
    \u0275\u0275elementStart(32, "span", 23);
    \u0275\u0275text(33, "\u2795");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span");
    \u0275\u0275text(35, "Add Milestone");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 24);
    \u0275\u0275template(37, ProjectDetailsComponent_div_11_div_37_Template, 3, 0, "div", 25)(38, ProjectDetailsComponent_div_11_div_38_Template, 32, 13, "div", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 20)(40, "h3");
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 27);
    \u0275\u0275template(43, ProjectDetailsComponent_div_11_div_43_Template, 3, 0, "div", 25)(44, ProjectDetailsComponent_div_11_div_44_Template, 8, 5, "div", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 20)(46, "h3");
    \u0275\u0275text(47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 29);
    \u0275\u0275template(49, ProjectDetailsComponent_div_11_div_49_Template, 3, 0, "div", 25)(50, ProjectDetailsComponent_div_11_div_50_Template, 8, 5, "div", 30);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.project.description);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(14, 13, ctx_r1.project.totalBudget, "1.2-2"), " TND");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(20, 16, ctx_r1.project.deadline, "MMM d, y"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(26, 19, ctx_r1.project.createdAt, "MMM d, y"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Milestones (", ctx_r1.milestones.length, ")");
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.milestones.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.milestones);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Recent Applications (", ctx_r1.applications.length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.applications.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.applications.slice(0, 5));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Recent Submissions (", ctx_r1.submissions.length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.submissions.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.submissions.slice(0, 5));
  }
}
function ProjectDetailsComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_12_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMilestoneModal());
    });
    \u0275\u0275elementStart(1, "div", 48);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_12_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 49)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 50);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_12_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMilestoneModal());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 51)(8, "div", 52)(9, "label");
    \u0275\u0275text(10, "Title *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetailsComponent_div_12_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.milestoneFormData.title, $event) || (ctx_r1.milestoneFormData.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 52)(13, "label");
    \u0275\u0275text(14, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "textarea", 54);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetailsComponent_div_12_Template_textarea_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.milestoneFormData.description, $event) || (ctx_r1.milestoneFormData.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 55)(17, "div", 52)(18, "label");
    \u0275\u0275text(19, "Budget (TND) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetailsComponent_div_12_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.milestoneFormData.budget, $event) || (ctx_r1.milestoneFormData.budget = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 52)(22, "label");
    \u0275\u0275text(23, "Deadline *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 57);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetailsComponent_div_12_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.milestoneFormData.deadline, $event) || (ctx_r1.milestoneFormData.deadline = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(25, "div", 58)(26, "button", 59);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_12_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMilestoneModal());
    });
    \u0275\u0275text(27, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 60);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_12_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveMilestone());
    });
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.isEditMilestone ? "Edit Milestone" : "Create New Milestone");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.milestoneFormData.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.milestoneFormData.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.milestoneFormData.budget);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.milestoneFormData.deadline);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.savingMilestone);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.savingMilestone ? "Saving..." : ctx_r1.isEditMilestone ? "Update" : "Create", " ");
  }
}
function ProjectDetailsComponent_div_13_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "p");
    \u0275\u0275text(2, "No applications for this milestone");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_div_13_div_9_div_19_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "span", 80);
    \u0275\u0275text(2, "\u2713 Freelancer Confirmed");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_div_13_div_9_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 77)(1, "p")(2, "strong");
    \u0275\u0275text(3, "Interview Scheduled:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p")(7, "strong");
    \u0275\u0275text(8, "Meet Link:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "a", 78);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, ProjectDetailsComponent_div_13_div_9_div_19_p_11_Template, 3, 0, "p", 79);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const app_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(5, 4, app_r10.interviewDate, "MMM d, y h:mm a"), "");
    \u0275\u0275advance(5);
    \u0275\u0275property("href", app_r10.meetLink, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(app_r10.meetLink);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", app_r10.freelancerConfirmed);
  }
}
function ProjectDetailsComponent_div_13_div_9_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81)(1, "p")(2, "strong");
    \u0275\u0275text(3, "Feedback:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const app_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", app_r10.companyFeedback, "");
  }
}
function ProjectDetailsComponent_div_13_div_9_button_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 82);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_13_div_9_button_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const app_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openInterviewModal(app_r10));
    });
    \u0275\u0275text(1, " \u{1F4C5} Schedule Interview ");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_div_13_div_9_button_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 83);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_13_div_9_button_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const app_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.acceptApplication(app_r10));
    });
    \u0275\u0275text(1, " \u2713 Accept ");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_div_13_div_9_button_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_13_div_9_button_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const app_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.rejectApplication(app_r10));
    });
    \u0275\u0275text(1, " \u2717 Reject ");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_div_13_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "div", 66)(2, "div")(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 5);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 67);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 68)(11, "p")(12, "strong");
    \u0275\u0275text(13, "Cover Letter:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p", 69);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p", 70);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, ProjectDetailsComponent_div_13_div_9_div_19_Template, 12, 7, "div", 71)(20, ProjectDetailsComponent_div_13_div_9_div_20_Template, 5, 1, "div", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 73);
    \u0275\u0275template(22, ProjectDetailsComponent_div_13_div_9_button_22_Template, 2, 0, "button", 74)(23, ProjectDetailsComponent_div_13_div_9_button_23_Template, 2, 0, "button", 75)(24, ProjectDetailsComponent_div_13_div_9_button_24_Template, 2, 0, "button", 76);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const app_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(app_r10.freelancerName);
    \u0275\u0275advance();
    \u0275\u0275classMap("badge-" + ctx_r1.getStatusClass(app_r10.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(app_r10.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4B0} ", \u0275\u0275pipeBind2(9, 12, app_r10.proposedBudget, "1.2-2"), " TND");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(app_r10.coverLetter);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Applied: ", \u0275\u0275pipeBind2(18, 15, app_r10.appliedAt, "MMM d, y h:mm a"), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", app_r10.interviewDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", app_r10.companyFeedback);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", app_r10.status === "PENDING");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", app_r10.status === "INTERVIEW_CONFIRMED");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", app_r10.status === "INTERVIEW_CONFIRMED" || app_r10.status === "PENDING");
  }
}
function ProjectDetailsComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_13_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeApplicationModal());
    });
    \u0275\u0275elementStart(1, "div", 61);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_13_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 49)(3, "h2");
    \u0275\u0275text(4, "Applications");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 50);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_13_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeApplicationModal());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 51);
    \u0275\u0275template(8, ProjectDetailsComponent_div_13_div_8_Template, 3, 0, "div", 62)(9, ProjectDetailsComponent_div_13_div_9_Template, 25, 18, "div", 63);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r1.selectedApplications.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.selectedApplications);
  }
}
function ProjectDetailsComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_14_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeInterviewModal());
    });
    \u0275\u0275elementStart(1, "div", 48);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_14_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r14);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 49)(3, "h2");
    \u0275\u0275text(4, "Schedule Interview");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 50);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_14_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeInterviewModal());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 51)(8, "p")(9, "strong");
    \u0275\u0275text(10, "Freelancer:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 52)(13, "label");
    \u0275\u0275text(14, "Interview Date & Time *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 85);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetailsComponent_div_14_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.interviewFormData.interviewDate, $event) || (ctx_r1.interviewFormData.interviewDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 52)(17, "label");
    \u0275\u0275text(18, "Google Meet Link *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 86);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetailsComponent_div_14_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.interviewFormData.meetLink, $event) || (ctx_r1.interviewFormData.meetLink = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 58)(21, "button", 59);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_14_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeInterviewModal());
    });
    \u0275\u0275text(22, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 87);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_14_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.scheduleInterview());
    });
    \u0275\u0275text(24, "Schedule");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedApplication == null ? null : ctx_r1.selectedApplication.freelancerName, "");
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.interviewFormData.interviewDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.interviewFormData.meetLink);
  }
}
function ProjectDetailsComponent_div_15_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "p");
    \u0275\u0275text(2, "No submissions for this milestone");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_div_15_div_9_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 98)(1, "strong");
    \u0275\u0275text(2, "Attachment:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 78);
    \u0275\u0275text(4, "Download");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sub_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275property("href", sub_r16.attachmentUrl, \u0275\u0275sanitizeUrl);
  }
}
function ProjectDetailsComponent_div_15_div_9_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 99)(1, "h5");
    \u0275\u0275text(2, "Review");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p")(4, "strong");
    \u0275\u0275text(5, "Rating:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p")(8, "strong");
    \u0275\u0275text(9, "Comments:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p")(12, "strong");
    \u0275\u0275text(13, "Status:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 5);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const sub_r16 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", sub_r16.review.rating, "/5 \u2B50");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", sub_r16.review.comments, "");
    \u0275\u0275advance(4);
    \u0275\u0275classMap("badge-" + ctx_r1.getStatusClass(sub_r16.review.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(sub_r16.review.status);
  }
}
function ProjectDetailsComponent_div_15_div_9_button_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 100);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_15_div_9_button_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const sub_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openReviewModal(sub_r16));
    });
    \u0275\u0275text(1, " \u2B50 Review Work ");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_div_15_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 89)(1, "div", 90)(2, "div")(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 91);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 5);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 92)(10, "p")(11, "strong");
    \u0275\u0275text(12, "Description:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, ProjectDetailsComponent_div_15_div_9_p_15_Template, 5, 1, "p", 93);
    \u0275\u0275elementStart(16, "p", 94);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, ProjectDetailsComponent_div_15_div_9_div_19_Template, 16, 5, "div", 95);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 96);
    \u0275\u0275template(21, ProjectDetailsComponent_div_15_div_9_button_21_Template, 2, 0, "button", 97);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sub_r16 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(sub_r16.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("by ", sub_r16.freelancerName, "");
    \u0275\u0275advance();
    \u0275\u0275classMap("badge-" + ctx_r1.getStatusClass(sub_r16.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(sub_r16.status);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(sub_r16.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", sub_r16.attachmentUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Submitted: ", \u0275\u0275pipeBind2(18, 10, sub_r16.submittedAt, "MMM d, y h:mm a"), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", sub_r16.review);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", sub_r16.status === "SUBMITTED" && !sub_r16.review);
  }
}
function ProjectDetailsComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_15_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSubmissionModal());
    });
    \u0275\u0275elementStart(1, "div", 61);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_15_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r15);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 49)(3, "h2");
    \u0275\u0275text(4, "Submissions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 50);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_15_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSubmissionModal());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 51);
    \u0275\u0275template(8, ProjectDetailsComponent_div_15_div_8_Template, 3, 0, "div", 62)(9, ProjectDetailsComponent_div_15_div_9_Template, 22, 13, "div", 88);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r1.selectedSubmissions.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.selectedSubmissions);
  }
}
function ProjectDetailsComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_16_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeReviewModal());
    });
    \u0275\u0275elementStart(1, "div", 48);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_16_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r18);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 49)(3, "h2");
    \u0275\u0275text(4, "Review Submission");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 50);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_16_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeReviewModal());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 51)(8, "p")(9, "strong");
    \u0275\u0275text(10, "Submission:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p")(13, "strong");
    \u0275\u0275text(14, "By:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 52)(17, "label");
    \u0275\u0275text(18, "Rating (1-5) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 101);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetailsComponent_div_16_Template_select_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.reviewFormData.rating, $event) || (ctx_r1.reviewFormData.rating = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(20, "option", 102);
    \u0275\u0275text(21, "1 - Poor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 102);
    \u0275\u0275text(23, "2 - Fair");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 102);
    \u0275\u0275text(25, "3 - Good");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 102);
    \u0275\u0275text(27, "4 - Very Good");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 102);
    \u0275\u0275text(29, "5 - Excellent");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 52)(31, "label");
    \u0275\u0275text(32, "Comments *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "textarea", 103);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetailsComponent_div_16_Template_textarea_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.reviewFormData.comments, $event) || (ctx_r1.reviewFormData.comments = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 52)(35, "label");
    \u0275\u0275text(36, "Decision *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "select", 101);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetailsComponent_div_16_Template_select_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.reviewFormData.status, $event) || (ctx_r1.reviewFormData.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(38, "option", 104);
    \u0275\u0275text(39, "Approve & Pay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "option", 105);
    \u0275\u0275text(41, "Request Revision");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(42, "div", 58)(43, "button", 59);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_16_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeReviewModal());
    });
    \u0275\u0275text(44, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "button", 87);
    \u0275\u0275listener("click", function ProjectDetailsComponent_div_16_Template_button_click_45_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitReview());
    });
    \u0275\u0275text(46, "Submit Review");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedSubmission == null ? null : ctx_r1.selectedSubmission.title, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedSubmission == null ? null : ctx_r1.selectedSubmission.freelancerName, "");
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.reviewFormData.rating);
    \u0275\u0275advance();
    \u0275\u0275property("value", 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 2);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 3);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 4);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 5);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.reviewFormData.comments);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.reviewFormData.status);
  }
}
var ProjectDetailsComponent = class _ProjectDetailsComponent {
  constructor(route, router, projectService, milestoneService, applicationService, submissionService, reviewService, authService) {
    this.route = route;
    this.router = router;
    this.projectService = projectService;
    this.milestoneService = milestoneService;
    this.applicationService = applicationService;
    this.submissionService = submissionService;
    this.reviewService = reviewService;
    this.authService = authService;
    this.project = null;
    this.milestones = [];
    this.applications = [];
    this.submissions = [];
    this.loading = false;
    this.error = "";
    this.showMilestoneModal = false;
    this.milestoneFormData = {};
    this.isEditMilestone = false;
    this.savingMilestone = false;
    this.showApplicationModal = false;
    this.selectedApplications = [];
    this.showInterviewModal = false;
    this.selectedApplication = null;
    this.interviewFormData = {};
    this.showSubmissionModal = false;
    this.selectedSubmissions = [];
    this.showReviewModal = false;
    this.selectedSubmission = null;
    this.reviewFormData = {};
  }
  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.projectId = Number(this.route.snapshot.paramMap.get("id"));
    this.loadProjectDetails();
  }
  loadProjectDetails() {
    this.loading = true;
    this.error = "";
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.loadMilestones();
        this.loadApplications();
        this.loadSubmissions();
      },
      error: (err) => {
        this.error = "Failed to load project details";
        this.loading = false;
      }
    });
  }
  loadMilestones() {
    this.milestoneService.getProjectMilestones(this.projectId).subscribe({
      next: (milestones) => {
        this.milestones = milestones;
        this.loading = false;
      },
      error: (err) => {
        console.error("Failed to load milestones", err);
        this.loading = false;
      }
    });
  }
  loadApplications() {
    if (this.currentUser?.id) {
      this.applicationService.getCompanyApplications(this.currentUser.id).subscribe({
        next: (apps) => {
          this.applications = apps.filter((app) => app.projectId === this.projectId);
        },
        error: (err) => console.error("Failed to load applications", err)
      });
    }
  }
  loadSubmissions() {
    if (this.currentUser?.id) {
      this.submissionService.getCompanySubmissions(this.currentUser.id).subscribe({
        next: (subs) => {
          this.submissions = subs.filter((sub) => sub.projectId === this.projectId);
        },
        error: (err) => console.error("Failed to load submissions", err)
      });
    }
  }
  // Milestone CRUD
  openCreateMilestoneModal() {
    this.isEditMilestone = false;
    this.milestoneFormData = {
      title: "",
      description: "",
      budget: null,
      deadline: ""
    };
    this.showMilestoneModal = true;
  }
  openEditMilestoneModal(milestone) {
    this.isEditMilestone = true;
    this.milestoneFormData = __spreadValues({}, milestone);
    this.showMilestoneModal = true;
  }
  saveMilestone() {
    if (!this.milestoneFormData.title || !this.milestoneFormData.budget || !this.milestoneFormData.deadline) {
      alert("Please fill all required fields");
      return;
    }
    this.savingMilestone = true;
    if (this.isEditMilestone) {
      this.milestoneService.updateMilestone(this.milestoneFormData.id, this.milestoneFormData).subscribe({
        next: () => {
          this.loadMilestones();
          this.closeMilestoneModal();
        },
        error: (err) => {
          alert("Failed to update milestone");
          this.savingMilestone = false;
        }
      });
    } else {
      const request = __spreadValues({
        projectId: this.projectId
      }, this.milestoneFormData);
      this.milestoneService.createMilestone(request).subscribe({
        next: () => {
          this.loadMilestones();
          this.closeMilestoneModal();
        },
        error: (err) => {
          alert("Failed to create milestone");
          this.savingMilestone = false;
        }
      });
    }
  }
  deleteMilestone(id) {
    if (confirm("Are you sure you want to delete this milestone?")) {
      this.milestoneService.deleteMilestone(id).subscribe({
        next: () => this.loadMilestones(),
        error: (err) => alert("Failed to delete milestone")
      });
    }
  }
  closeMilestoneModal() {
    this.showMilestoneModal = false;
    this.savingMilestone = false;
  }
  // Applications
  viewMilestoneApplications(milestoneId) {
    this.applicationService.getMilestoneApplications(milestoneId).subscribe({
      next: (apps) => {
        this.selectedApplications = apps;
        this.showApplicationModal = true;
      },
      error: (err) => alert("Failed to load applications")
    });
  }
  closeApplicationModal() {
    this.showApplicationModal = false;
    this.selectedApplications = [];
  }
  // Interview Scheduling
  openInterviewModal(application) {
    this.selectedApplication = application;
    this.interviewFormData = {
      interviewDate: "",
      meetLink: ""
    };
    this.showInterviewModal = true;
  }
  scheduleInterview() {
    if (!this.selectedApplication || !this.interviewFormData.interviewDate || !this.interviewFormData.meetLink) {
      alert("Please fill all fields");
      return;
    }
    const request = {
      interviewDate: this.interviewFormData.interviewDate,
      meetLink: this.interviewFormData.meetLink
    };
    this.applicationService.scheduleInterview(this.selectedApplication.id, request).subscribe({
      next: () => {
        alert("Interview scheduled successfully!");
        this.closeInterviewModal();
        this.loadApplications();
      },
      error: (err) => alert("Failed to schedule interview")
    });
  }
  closeInterviewModal() {
    this.showInterviewModal = false;
    this.selectedApplication = null;
  }
  acceptApplication(application) {
    if (confirm("Accept this application?")) {
      this.applicationService.finalDecision(application.id, "ACCEPTED", "Congratulations! You have been selected.").subscribe({
        next: () => {
          alert("Application accepted!");
          this.loadApplications();
          this.loadMilestones();
        },
        error: (err) => alert("Failed to accept application")
      });
    }
  }
  rejectApplication(application) {
    const feedback = prompt("Provide feedback for rejection:");
    if (feedback !== null) {
      this.applicationService.finalDecision(application.id, "REJECTED", feedback).subscribe({
        next: () => {
          alert("Application rejected");
          this.loadApplications();
        },
        error: (err) => alert("Failed to reject application")
      });
    }
  }
  // Submissions
  viewMilestoneSubmissions(milestoneId) {
    this.submissionService.getMilestoneSubmissions(milestoneId).subscribe({
      next: (subs) => {
        this.selectedSubmissions = subs;
        this.showSubmissionModal = true;
      },
      error: (err) => alert("Failed to load submissions")
    });
  }
  closeSubmissionModal() {
    this.showSubmissionModal = false;
    this.selectedSubmissions = [];
  }
  // Review
  openReviewModal(submission) {
    this.selectedSubmission = submission;
    this.reviewFormData = {
      comments: "",
      rating: 5,
      status: "APPROVED"
    };
    this.showReviewModal = true;
  }
  submitReview() {
    if (!this.selectedSubmission || !this.reviewFormData.comments) {
      alert("Please provide comments");
      return;
    }
    const request = {
      submissionId: this.selectedSubmission.id,
      reviewerId: this.currentUser.id,
      comments: this.reviewFormData.comments,
      rating: this.reviewFormData.rating,
      status: this.reviewFormData.status
    };
    this.reviewService.createReview(request).subscribe({
      next: () => {
        alert("Review submitted successfully!");
        this.closeReviewModal();
        this.loadSubmissions();
        this.loadMilestones();
      },
      error: (err) => alert("Failed to submit review")
    });
  }
  closeReviewModal() {
    this.showReviewModal = false;
    this.selectedSubmission = null;
  }
  getStatusClass(status) {
    const statusMap = {
      "PENDING": "warning",
      "OPEN": "info",
      "IN_PROGRESS": "primary",
      "COMPLETED": "success",
      "PAID": "success",
      "CANCELLED": "danger",
      "REJECTED": "danger",
      "ACCEPTED": "success",
      "APPROVED": "success",
      "INTERVIEW_SCHEDULED": "info",
      "INTERVIEW_CONFIRMED": "primary"
    };
    return statusMap[status] || "secondary";
  }
  goBack() {
    this.router.navigate(["/backoffice/projects"]);
  }
  static {
    this.\u0275fac = function ProjectDetailsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProjectDetailsComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(MilestoneService), \u0275\u0275directiveInject(ApplicationService), \u0275\u0275directiveInject(SubmissionService), \u0275\u0275directiveInject(ReviewService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectDetailsComponent, selectors: [["app-project-details"]], decls: 17, vars: 12, consts: [[1, "project-details-page"], [1, "page-header"], [1, "btn-back", 3, "click"], [1, "header-content"], [1, "page-title"], [1, "badge"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "content-grid", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "error-state"], [1, "error-icon"], [1, "btn-retry", 3, "click"], [1, "content-grid"], [1, "info-card"], [1, "info-row"], [1, "label"], [1, "value"], [1, "section-card"], [1, "section-header"], [1, "btn-primary-action", 3, "click"], [1, "icon"], [1, "milestones-list"], ["class", "empty-state-small", 4, "ngIf"], ["class", "milestone-card", 4, "ngFor", "ngForOf"], [1, "applications-list"], ["class", "application-item", 4, "ngFor", "ngForOf"], [1, "submissions-list"], ["class", "submission-item", 4, "ngFor", "ngForOf"], [1, "empty-state-small"], [1, "milestone-card"], [1, "milestone-header"], [1, "milestone-desc"], [1, "milestone-meta"], [1, "milestone-actions"], [1, "btn-icon", 3, "click"], ["data-tooltip", "Edit Milestone", 1, "action-icon-edit", "action-icon-tooltip", 3, "click"], ["data-tooltip", "Delete Milestone", 1, "action-icon-delete", "action-icon-tooltip", 3, "click"], [1, "application-item"], [1, "app-info"], [1, "app-milestone"], [1, "badge", "badge-small"], [1, "submission-item"], [1, "sub-info"], [1, "sub-freelancer"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "form-group"], ["type", "text", "placeholder", "Enter milestone title", 1, "form-input", 3, "ngModelChange", "ngModel"], ["placeholder", "Enter description", "rows", "3", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "form-row"], ["type", "number", "placeholder", "0.00", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-secondary", 3, "click"], [1, "btn-primary", 3, "click", "disabled"], [1, "modal-content", "modal-large", 3, "click"], ["class", "empty-state", 4, "ngIf"], ["class", "application-card", 4, "ngFor", "ngForOf"], [1, "empty-state"], [1, "application-card"], [1, "app-header"], [1, "app-budget"], [1, "app-body"], [1, "cover-letter"], [1, "app-date"], ["class", "interview-info", 4, "ngIf"], ["class", "feedback", 4, "ngIf"], [1, "app-actions"], ["class", "btn-action", 3, "click", 4, "ngIf"], ["class", "btn-action success", 3, "click", 4, "ngIf"], ["class", "btn-action danger", 3, "click", 4, "ngIf"], [1, "interview-info"], ["target", "_blank", 3, "href"], [4, "ngIf"], [1, "confirmed"], [1, "feedback"], [1, "btn-action", 3, "click"], [1, "btn-action", "success", 3, "click"], [1, "btn-action", "danger", 3, "click"], ["type", "datetime-local", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "url", "placeholder", "https://meet.google.com/...", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "btn-primary", 3, "click"], ["class", "submission-card", 4, "ngFor", "ngForOf"], [1, "submission-card"], [1, "sub-header"], [1, "sub-author"], [1, "sub-body"], ["class", "sub-attachment", 4, "ngIf"], [1, "sub-date"], ["class", "review-info", 4, "ngIf"], [1, "sub-actions"], ["class", "btn-action primary", 3, "click", 4, "ngIf"], [1, "sub-attachment"], [1, "review-info"], [1, "btn-action", "primary", 3, "click"], [1, "form-input", 3, "ngModelChange", "ngModel"], [3, "value"], ["placeholder", "Provide detailed feedback", "rows", "4", 1, "form-textarea", 3, "ngModelChange", "ngModel"], ["value", "APPROVED"], ["value", "REJECTED"]], template: function ProjectDetailsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
        \u0275\u0275listener("click", function ProjectDetailsComponent_Template_button_click_2_listener() {
          return ctx.goBack();
        });
        \u0275\u0275text(3, "\u2190 Back to Projects");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 3)(5, "h1", 4);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "span", 5);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(9, ProjectDetailsComponent_div_9_Template, 4, 0, "div", 6)(10, ProjectDetailsComponent_div_10_Template, 7, 1, "div", 7)(11, ProjectDetailsComponent_div_11_Template, 51, 22, "div", 8)(12, ProjectDetailsComponent_div_12_Template, 30, 7, "div", 9)(13, ProjectDetailsComponent_div_13_Template, 10, 2, "div", 9)(14, ProjectDetailsComponent_div_14_Template, 25, 3, "div", 9)(15, ProjectDetailsComponent_div_15_Template, 10, 2, "div", 9)(16, ProjectDetailsComponent_div_16_Template, 47, 10, "div", 9);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.project == null ? null : ctx.project.title);
        \u0275\u0275advance();
        \u0275\u0275classMap("badge-" + ctx.getStatusClass((ctx.project == null ? null : ctx.project.status) || ""));
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.project == null ? null : ctx.project.status, " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.project);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showMilestoneModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showApplicationModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showInterviewModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showSubmissionModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showReviewModal);
      }
    }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe, DatePipe], styles: ['@charset "UTF-8";\n\n\n\n.bo-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.bo-page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.bo-page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 28px;\n  font-weight: 800;\n  color: var(--bo-text-primary);\n  letter-spacing: -0.5px;\n}\n.bo-page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 14px;\n  margin-top: 4px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: var(--primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-sm);\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--primary-light);\n  transform: translateY(-1px);\n}\n.stats-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.stats-row[_ngcontent-%COMP%]   .mini-stat[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 120px;\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-md);\n  padding: 16px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.stats-row[_ngcontent-%COMP%]   .mini-stat[_ngcontent-%COMP%]   .ms-val[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 26px;\n  font-weight: 800;\n  color: var(--bo-text-primary);\n}\n.stats-row[_ngcontent-%COMP%]   .mini-stat[_ngcontent-%COMP%]   .ms-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--bo-text-secondary);\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.filter-input[_ngcontent-%COMP%], \n.filter-select[_ngcontent-%COMP%] {\n  padding: 9px 14px;\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-sm);\n  font-size: 13px;\n  font-family: var(--font-body);\n  background: var(--bo-bg-secondary);\n  color: var(--bo-text-primary);\n  outline: none;\n  transition: border 0.2s;\n}\n.filter-input[_ngcontent-%COMP%]:focus, \n.filter-select[_ngcontent-%COMP%]:focus {\n  border-color: var(--primary);\n}\n.filter-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 180px;\n}\n.filter-select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.filter-spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.btn-export[_ngcontent-%COMP%] {\n  padding: 9px 14px;\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-sm);\n  font-size: 12px;\n  background: white;\n  color: var(--bo-text-secondary);\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n}\n.btn-export[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary);\n  color: var(--primary);\n}\n.table-card[_ngcontent-%COMP%] {\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-md);\n  overflow: hidden;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--bo-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 1px solid var(--bo-border);\n  background: var(--bo-bg-primary);\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 13px 16px;\n  font-size: 13px;\n  color: var(--bo-text-primary);\n  border-bottom: 1px solid var(--bo-border);\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: rgba(79, 110, 247, 0.03);\n}\n.actions-cell[_ngcontent-%COMP%] {\n  display: flex !important;\n  gap: 4px;\n}\n.actions-cell[_ngcontent-%COMP%]   .btn-action[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 6px;\n  border: 1px solid var(--bo-border);\n  cursor: pointer;\n  font-size: 13px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  transition: all 0.2s;\n}\n.actions-cell[_ngcontent-%COMP%]   .btn-action.view[_ngcontent-%COMP%]:hover {\n  background: rgba(79, 110, 247, 0.1);\n  border-color: var(--primary);\n}\n.actions-cell[_ngcontent-%COMP%]   .btn-action.edit[_ngcontent-%COMP%]:hover {\n  background: rgba(245, 158, 11, 0.1);\n  border-color: var(--warning);\n}\n.actions-cell[_ngcontent-%COMP%]   .btn-action.delete[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  border-color: var(--danger);\n}\n.empty-row[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--bo-text-secondary);\n  padding: 40px !important;\n}\n.project-details-page[_ngcontent-%COMP%] {\n  padding: 2rem;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.page-header[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #6c757d;\n  font-size: 0.95rem;\n  cursor: pointer;\n  margin-bottom: 1rem;\n  padding: 0.5rem 0;\n}\n.page-header[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%]:hover {\n  color: #495057;\n}\n.page-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n  gap: 1.5rem;\n}\n.info-card[_ngcontent-%COMP%], \n.section-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.info-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  color: #2c3e50;\n}\n.info-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #f0f0f0;\n}\n.info-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.info-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #6c757d;\n  min-width: 140px;\n}\n.info-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #2c3e50;\n}\n.section-card[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.section-card[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #2c3e50;\n}\n.btn-add-small[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n.btn-add-small[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.milestones-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.milestone-card[_ngcontent-%COMP%] {\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  padding: 1rem;\n  transition: box-shadow 0.2s;\n}\n.milestone-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #2c3e50;\n  font-size: 1.1rem;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-desc[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 0.9rem;\n  margin-bottom: 0.75rem;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1.5rem;\n  font-size: 0.9rem;\n  color: #6c757d;\n  margin-bottom: 0.75rem;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.btn-action-small[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border: 1px solid #dee2e6;\n  padding: 0.4rem 0.8rem;\n  border-radius: 6px;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-action-small[_ngcontent-%COMP%]:hover {\n  background: #e9ecef;\n}\n.btn-action-small.edit[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  border-color: #ffc107;\n}\n.btn-action-small.edit[_ngcontent-%COMP%]:hover {\n  background: #ffe69c;\n}\n.btn-action-small.delete[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  border-color: #dc3545;\n}\n.btn-action-small.delete[_ngcontent-%COMP%]:hover {\n  background: #f5c2c7;\n}\n.applications-list[_ngcontent-%COMP%], \n.submissions-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.application-item[_ngcontent-%COMP%], \n.submission-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem;\n  background: #f8f9fa;\n  border-radius: 6px;\n}\n.application-item[_ngcontent-%COMP%]   .app-info[_ngcontent-%COMP%], \n.application-item[_ngcontent-%COMP%]   .sub-info[_ngcontent-%COMP%], \n.submission-item[_ngcontent-%COMP%]   .app-info[_ngcontent-%COMP%], \n.submission-item[_ngcontent-%COMP%]   .sub-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.application-item[_ngcontent-%COMP%]   .app-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.application-item[_ngcontent-%COMP%]   .sub-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.submission-item[_ngcontent-%COMP%]   .app-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.submission-item[_ngcontent-%COMP%]   .sub-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2c3e50;\n}\n.application-item[_ngcontent-%COMP%]   .app-info[_ngcontent-%COMP%]   .app-milestone[_ngcontent-%COMP%], \n.application-item[_ngcontent-%COMP%]   .app-info[_ngcontent-%COMP%]   .sub-freelancer[_ngcontent-%COMP%], \n.application-item[_ngcontent-%COMP%]   .sub-info[_ngcontent-%COMP%]   .app-milestone[_ngcontent-%COMP%], \n.application-item[_ngcontent-%COMP%]   .sub-info[_ngcontent-%COMP%]   .sub-freelancer[_ngcontent-%COMP%], \n.submission-item[_ngcontent-%COMP%]   .app-info[_ngcontent-%COMP%]   .app-milestone[_ngcontent-%COMP%], \n.submission-item[_ngcontent-%COMP%]   .app-info[_ngcontent-%COMP%]   .sub-freelancer[_ngcontent-%COMP%], \n.submission-item[_ngcontent-%COMP%]   .sub-info[_ngcontent-%COMP%]   .app-milestone[_ngcontent-%COMP%], \n.submission-item[_ngcontent-%COMP%]   .sub-info[_ngcontent-%COMP%]   .sub-freelancer[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6c757d;\n}\n.badge-small[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.25rem 0.5rem;\n}\n.empty-state-small[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  color: #6c757d;\n}\n.modal-large[_ngcontent-%COMP%] {\n  max-width: 800px;\n  max-height: 90vh;\n  overflow-y: auto;\n}\n.application-card[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%] {\n  border: 2px solid #e9ecef;\n  border-radius: 12px;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  background: white;\n  transition: all 0.3s ease;\n}\n.application-card[_ngcontent-%COMP%]:hover, \n.submission-card[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);\n  transform: translateY(-2px);\n}\n.application-card[_ngcontent-%COMP%]   .app-header[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-header[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-header[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1.5rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid #f0f0f0;\n}\n.application-card[_ngcontent-%COMP%]   .app-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  color: #2c3e50;\n  font-size: 1.3rem;\n  font-weight: 700;\n}\n.application-card[_ngcontent-%COMP%]   .app-header[_ngcontent-%COMP%]   .app-budget[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-header[_ngcontent-%COMP%]   .app-budget[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-header[_ngcontent-%COMP%]   .app-budget[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-header[_ngcontent-%COMP%]   .app-budget[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  font-weight: 700;\n  color: #28a745;\n  background: #d4edda;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n}\n.application-card[_ngcontent-%COMP%]   .app-header[_ngcontent-%COMP%]   .sub-author[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-header[_ngcontent-%COMP%]   .sub-author[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-header[_ngcontent-%COMP%]   .sub-author[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-header[_ngcontent-%COMP%]   .sub-author[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #6c757d;\n  font-weight: 500;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .cover-letter[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .cover-letter[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .cover-letter[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .cover-letter[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  padding: 1.25rem;\n  border-radius: 8px;\n  margin: 0.75rem 0;\n  white-space: pre-wrap;\n  border-left: 4px solid #667eea;\n  font-size: 0.95rem;\n  line-height: 1.6;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .app-date[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .sub-date[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .app-date[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .sub-date[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .app-date[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .sub-date[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .app-date[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .sub-date[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #6c757d;\n  margin-top: 0.75rem;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .app-date[_ngcontent-%COMP%]::before, \n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .sub-date[_ngcontent-%COMP%]::before, \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .app-date[_ngcontent-%COMP%]::before, \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .sub-date[_ngcontent-%COMP%]::before, \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .app-date[_ngcontent-%COMP%]::before, \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .sub-date[_ngcontent-%COMP%]::before, \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .app-date[_ngcontent-%COMP%]::before, \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .sub-date[_ngcontent-%COMP%]::before {\n  content: "\\1f4c5";\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #e7f3ff 0%,\n      #d0e9ff 100%);\n  padding: 1.25rem;\n  border-radius: 8px;\n  margin-top: 1rem;\n  border-left: 4px solid #007bff;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n  font-size: 0.95rem;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #0056b3;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%]   .confirmed[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%]   .confirmed[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%]   .confirmed[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .interview-info[_ngcontent-%COMP%]   .confirmed[_ngcontent-%COMP%] {\n  color: #28a745;\n  font-weight: 700;\n  font-size: 1rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .feedback[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .feedback[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .feedback[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .feedback[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #fff3cd 0%,\n      #ffe69c 100%);\n  padding: 1.25rem;\n  border-radius: 8px;\n  margin-top: 1rem;\n  border-left: 4px solid #ffc107;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #667eea;\n  text-decoration: none;\n  font-weight: 600;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]::before, \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]::before, \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]::before, \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]::before {\n  content: "\\1f4ce";\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .sub-attachment[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .review-info[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .review-info[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .review-info[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .review-info[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #d4edda 0%,\n      #c3e6cb 100%);\n  padding: 1.25rem;\n  border-radius: 8px;\n  margin-top: 1rem;\n  border-left: 4px solid #28a745;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .review-info[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .review-info[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .review-info[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .review-info[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem 0;\n  color: #155724;\n  font-size: 1.1rem;\n}\n.application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .review-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .review-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .review-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .review-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n}\n.application-card[_ngcontent-%COMP%]   .app-actions[_ngcontent-%COMP%], \n.application-card[_ngcontent-%COMP%]   .sub-actions[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .app-actions[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%]   .sub-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n  padding-top: 1rem;\n  border-top: 2px solid #f0f0f0;\n}\nbody.dark-mode[_ngcontent-%COMP%]   .application-card[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .submission-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-color: var(--border-color);\n}\nbody.dark-mode[_ngcontent-%COMP%]   .application-card[_ngcontent-%COMP%]:hover, \nbody.dark-mode[_ngcontent-%COMP%]   .submission-card[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n}\nbody.dark-mode[_ngcontent-%COMP%]   .application-card[_ngcontent-%COMP%]   .app-header[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .application-card[_ngcontent-%COMP%]   .sub-header[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .submission-card[_ngcontent-%COMP%]   .app-header[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .submission-card[_ngcontent-%COMP%]   .sub-header[_ngcontent-%COMP%] {\n  border-bottom-color: var(--border-color);\n}\nbody.dark-mode[_ngcontent-%COMP%]   .application-card[_ngcontent-%COMP%]   .app-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .application-card[_ngcontent-%COMP%]   .sub-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .submission-card[_ngcontent-%COMP%]   .app-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .submission-card[_ngcontent-%COMP%]   .sub-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n}\nbody.dark-mode[_ngcontent-%COMP%]   .application-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .cover-letter[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .application-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .cover-letter[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .submission-card[_ngcontent-%COMP%]   .app-body[_ngcontent-%COMP%]   .cover-letter[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .submission-card[_ngcontent-%COMP%]   .sub-body[_ngcontent-%COMP%]   .cover-letter[_ngcontent-%COMP%] {\n  background: var(--bg-tertiary);\n  color: var(--text-primary);\n}\n.btn-action[_ngcontent-%COMP%] {\n  padding: 0.875rem 1.75rem;\n  border: none;\n  border-radius: 10px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n  position: relative;\n  overflow: hidden;\n}\n.btn-action[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(255, 255, 255, 0.3),\n      transparent);\n  transition: left 0.5s;\n}\n.btn-action[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);\n}\n.btn-action[_ngcontent-%COMP%]:hover::before {\n  left: 100%;\n}\n.btn-action[_ngcontent-%COMP%]:active {\n  transform: translateY(-1px);\n}\n.btn-action.success[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #28a745 0%,\n      #20c997 100%);\n  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);\n}\n.btn-action.success[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 8px 20px rgba(40, 167, 69, 0.4);\n}\n.btn-action.danger[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #dc3545 0%,\n      #c82333 100%);\n  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);\n}\n.btn-action.danger[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 8px 20px rgba(220, 53, 69, 0.4);\n}\n.btn-action.primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #007bff 0%,\n      #0056b3 100%);\n  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);\n}\n.btn-action.primary[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 8px 20px rgba(0, 123, 255, 0.4);\n}\n.btn-action[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.btn-action[_ngcontent-%COMP%]:disabled:hover {\n  transform: none;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid #dee2e6;\n  border-radius: 6px;\n  font-size: 0.95rem;\n}\n.form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  font-family: inherit;\n}\n/*# sourceMappingURL=project-details.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectDetailsComponent, { className: "ProjectDetailsComponent", filePath: "src\\app\\backoffice\\project-details\\project-details.component.ts", lineNumber: 16 });
})();

// src/app/backoffice/applications/applications.component.ts
function ApplicationsComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1, "Loading applications...");
    \u0275\u0275elementEnd();
  }
}
function ApplicationsComponent_div_21_div_1_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const app_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(app_r2.coverLetter);
  }
}
function ApplicationsComponent_div_21_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275listener("click", function ApplicationsComponent_div_21_div_1_Template_div_click_0_listener() {
      const app_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.viewProject(app_r2.projectId));
    });
    \u0275\u0275elementStart(1, "div", 19)(2, "div", 20)(3, "div", 21);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 22);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "span", 23);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 24)(13, "p", 25);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, ApplicationsComponent_div_21_div_1_p_15_Template, 2, 1, "p", 26);
    \u0275\u0275elementStart(16, "div", 27)(17, "span", 28);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 29);
    \u0275\u0275text(21, "View Details \u2192");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const app_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((app_r2.freelancerName == null ? null : app_r2.freelancerName.charAt(0)) || "F");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(app_r2.freelancerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(app_r2.projectTitle);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.getStatusClass(app_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", app_r2.status.replace("_", " "), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(app_r2.milestoneTitle);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", app_r2.coverLetter);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Applied: ", \u0275\u0275pipeBind2(19, 8, app_r2.appliedAt, "short"), "");
  }
}
function ApplicationsComponent_div_21_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "span", 32);
    \u0275\u0275text(2, "\u{1F4CB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No applications found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "There are no applications matching your criteria");
    \u0275\u0275elementEnd()();
  }
}
function ApplicationsComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275template(1, ApplicationsComponent_div_21_div_1_Template, 22, 11, "div", 16)(2, ApplicationsComponent_div_21_div_2_Template, 7, 0, "div", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.filteredApplications);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.filteredApplications.length === 0);
  }
}
var ApplicationsComponent = class _ApplicationsComponent {
  constructor(applicationService, router) {
    this.applicationService = applicationService;
    this.router = router;
    this.applications = [];
    this.filteredApplications = [];
    this.loading = false;
    this.searchTerm = "";
    this.statusFilter = "ALL";
  }
  ngOnInit() {
    this.loadApplications();
  }
  loadApplications() {
    this.loading = true;
    this.applicationService.getAllApplications().subscribe({
      next: (data) => {
        this.applications = data;
        this.filteredApplications = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading applications:", err);
        this.loading = false;
      }
    });
  }
  filterApplications() {
    this.filteredApplications = this.applications.filter((app) => {
      const matchesSearch = !this.searchTerm || app.freelancerName?.toLowerCase().includes(this.searchTerm.toLowerCase()) || app.projectTitle?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === "ALL" || app.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }
  viewProject(projectId) {
    this.router.navigate(["/backoffice/projects", projectId]);
  }
  getStatusClass(status) {
    const statusMap = {
      "PENDING": "status-pending",
      "ACCEPTED": "status-accepted",
      "REJECTED": "status-rejected",
      "INTERVIEW_SCHEDULED": "status-interview"
    };
    return statusMap[status] || "status-default";
  }
  static {
    this.\u0275fac = function ApplicationsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ApplicationsComponent)(\u0275\u0275directiveInject(ApplicationService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApplicationsComponent, selectors: [["app-applications"]], decls: 22, vars: 4, consts: [[1, "applications-page"], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], [1, "filters-bar"], ["type", "text", "placeholder", "Search by freelancer or project...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "status-filter", 3, "ngModelChange", "change", "ngModel"], ["value", "ALL"], ["value", "PENDING"], ["value", "ACCEPTED"], ["value", "REJECTED"], ["value", "INTERVIEW_SCHEDULED"], ["class", "loading", 4, "ngIf"], ["class", "applications-grid", 4, "ngIf"], [1, "loading"], [1, "applications-grid"], ["class", "application-card", 3, "click", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "application-card", 3, "click"], [1, "card-header"], [1, "freelancer-info"], [1, "avatar"], [1, "project-title"], [1, "status-badge", 3, "ngClass"], [1, "card-body"], [1, "milestone-title"], ["class", "cover-letter", 4, "ngIf"], [1, "card-footer"], [1, "date"], [1, "btn-view"], [1, "cover-letter"], [1, "empty-state"], [1, "empty-icon"]], template: function ApplicationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "Applications");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Review and manage freelancer applications");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 4)(8, "input", 5);
        \u0275\u0275twoWayListener("ngModelChange", function ApplicationsComponent_Template_input_ngModelChange_8_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275listener("input", function ApplicationsComponent_Template_input_input_8_listener() {
          return ctx.filterApplications();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "select", 6);
        \u0275\u0275twoWayListener("ngModelChange", function ApplicationsComponent_Template_select_ngModelChange_9_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ApplicationsComponent_Template_select_change_9_listener() {
          return ctx.filterApplications();
        });
        \u0275\u0275elementStart(10, "option", 7);
        \u0275\u0275text(11, "All Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "option", 8);
        \u0275\u0275text(13, "Pending");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "option", 9);
        \u0275\u0275text(15, "Accepted");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "option", 10);
        \u0275\u0275text(17, "Rejected");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "option", 11);
        \u0275\u0275text(19, "Interview Scheduled");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(20, ApplicationsComponent_div_20_Template, 2, 0, "div", 12)(21, ApplicationsComponent_div_21_Template, 3, 2, "div", 13);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
        \u0275\u0275advance(11);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [NgClass, NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ["\n\n.applications-page[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 800;\n  color: var(--bo-text-primary);\n  margin-bottom: 4px;\n}\n.page-header[_ngcontent-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 14px;\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 24px;\n}\n.filters-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%], \n.filters-bar[_ngcontent-%COMP%]   .status-filter[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  border: 1px solid var(--bo-border);\n  border-radius: 8px;\n  background: var(--bo-bg-secondary);\n  color: var(--bo-text-primary);\n  font-size: 14px;\n}\n.filters-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus, \n.filters-bar[_ngcontent-%COMP%]   .status-filter[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--primary);\n}\n.filters-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.filters-bar[_ngcontent-%COMP%]   .status-filter[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n.applications-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n  gap: 20px;\n}\n.application-card[_ngcontent-%COMP%] {\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: 12px;\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.application-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border-color: var(--primary);\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 16px;\n}\n.freelancer-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.freelancer-info[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--accent));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 700;\n  font-size: 18px;\n}\n.freelancer-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--bo-text-primary);\n  margin-bottom: 4px;\n}\n.freelancer-info[_ngcontent-%COMP%]   .project-title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--bo-text-secondary);\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.status-badge.status-pending[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #f59e0b;\n}\n.status-badge.status-accepted[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.status-badge.status-rejected[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.status-badge.status-interview[_ngcontent-%COMP%] {\n  background: rgba(79, 110, 247, 0.15);\n  color: var(--primary);\n}\n.card-body[_ngcontent-%COMP%]   .milestone-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--bo-text-primary);\n  margin-bottom: 8px;\n}\n.card-body[_ngcontent-%COMP%]   .cover-letter[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--bo-text-secondary);\n  line-height: 1.5;\n  margin-bottom: 16px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 16px;\n  border-top: 1px solid var(--bo-border);\n}\n.card-footer[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--bo-text-secondary);\n}\n.card-footer[_ngcontent-%COMP%]   .btn-view[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: transparent;\n  border: 1px solid var(--primary);\n  color: var(--primary);\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.card-footer[_ngcontent-%COMP%]   .btn-view[_ngcontent-%COMP%]:hover {\n  background: var(--primary);\n  color: white;\n}\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  text-align: center;\n  padding: 60px 20px;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  display: block;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--bo-text-primary);\n  margin-bottom: 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: var(--bo-text-secondary);\n}\n/*# sourceMappingURL=applications.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApplicationsComponent, { className: "ApplicationsComponent", filePath: "src\\app\\backoffice\\applications\\applications.component.ts", lineNumber: 11 });
})();

// src/app/backoffice/interviews/interviews.component.ts
function InterviewsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1, "Loading interviews...");
    \u0275\u0275elementEnd();
  }
}
function InterviewsComponent_div_7_div_1_div_13_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "\u{1F517} Link:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 21);
    \u0275\u0275text(4, "Join Meeting");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const interview_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275property("href", interview_r2.meetLink, \u0275\u0275sanitizeUrl);
  }
}
function InterviewsComponent_div_7_div_1_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "p")(2, "strong");
    \u0275\u0275text(3, "\u{1F4C5} Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, InterviewsComponent_div_7_div_1_div_13_p_6_Template, 5, 1, "p", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const interview_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(5, 2, interview_r2.interviewDate, "medium"), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", interview_r2.meetLink);
  }
}
function InterviewsComponent_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275listener("click", function InterviewsComponent_div_7_div_1_Template_div_click_0_listener() {
      const interview_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.viewProject(interview_r2.projectId));
    });
    \u0275\u0275elementStart(1, "div", 11)(2, "div", 12)(3, "div", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 14);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "div", 15)(11, "p", 16);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, InterviewsComponent_div_7_div_1_div_13_Template, 7, 5, "div", 17);
    \u0275\u0275elementStart(14, "button", 18);
    \u0275\u0275text(15, "View Details \u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const interview_r2 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((interview_r2.freelancerName == null ? null : interview_r2.freelancerName.charAt(0)) || "F");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(interview_r2.freelancerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(interview_r2.projectTitle);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(interview_r2.milestoneTitle);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", interview_r2.interviewDate);
  }
}
function InterviewsComponent_div_7_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "span", 23);
    \u0275\u0275text(2, "\u{1F4C5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No interviews scheduled");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "You don't have any upcoming interviews");
    \u0275\u0275elementEnd()();
  }
}
function InterviewsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275template(1, InterviewsComponent_div_7_div_1_Template, 16, 5, "div", 8)(2, InterviewsComponent_div_7_div_2_Template, 7, 0, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.interviews);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.interviews.length === 0);
  }
}
var InterviewsComponent = class _InterviewsComponent {
  constructor(applicationService, router) {
    this.applicationService = applicationService;
    this.router = router;
    this.interviews = [];
    this.loading = false;
  }
  ngOnInit() {
    this.loadInterviews();
  }
  loadInterviews() {
    this.loading = true;
    this.applicationService.getAllApplications().subscribe({
      next: (data) => {
        this.interviews = data.filter((app) => app.status === "INTERVIEW_SCHEDULED" || app.interviewDate);
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading interviews:", err);
        this.loading = false;
      }
    });
  }
  viewProject(projectId) {
    this.router.navigate(["/backoffice/projects", projectId]);
  }
  static {
    this.\u0275fac = function InterviewsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InterviewsComponent)(\u0275\u0275directiveInject(ApplicationService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InterviewsComponent, selectors: [["app-interviews"]], decls: 8, vars: 2, consts: [[1, "interviews-page"], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], ["class", "loading", 4, "ngIf"], ["class", "interviews-grid", 4, "ngIf"], [1, "loading"], [1, "interviews-grid"], ["class", "interview-card", 3, "click", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "interview-card", 3, "click"], [1, "card-header"], [1, "freelancer-info"], [1, "avatar"], [1, "project-title"], [1, "card-body"], [1, "milestone-title"], ["class", "interview-details", 4, "ngIf"], [1, "btn-view"], [1, "interview-details"], [4, "ngIf"], ["target", "_blank", 3, "href"], [1, "empty-state"], [1, "empty-icon"]], template: function InterviewsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Interviews");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 3);
        \u0275\u0275text(5, "Scheduled interviews with freelancers");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, InterviewsComponent_div_6_Template, 2, 0, "div", 4)(7, InterviewsComponent_div_7_Template, 3, 2, "div", 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [NgForOf, NgIf, DatePipe], styles: ["\n\n.applications-page[_ngcontent-%COMP%], \n.interviews-page[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 800;\n  color: var(--bo-text-primary);\n  margin-bottom: 4px;\n}\n.page-header[_ngcontent-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 14px;\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 24px;\n}\n.filters-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%], \n.filters-bar[_ngcontent-%COMP%]   .status-filter[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  border: 1px solid var(--bo-border);\n  border-radius: 8px;\n  background: var(--bo-bg-secondary);\n  color: var(--bo-text-primary);\n  font-size: 14px;\n}\n.filters-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus, \n.filters-bar[_ngcontent-%COMP%]   .status-filter[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--primary);\n}\n.filters-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.filters-bar[_ngcontent-%COMP%]   .status-filter[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n.applications-grid[_ngcontent-%COMP%], \n.interviews-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n  gap: 20px;\n}\n.application-card[_ngcontent-%COMP%], \n.interview-card[_ngcontent-%COMP%] {\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: 12px;\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.application-card[_ngcontent-%COMP%]:hover, \n.interview-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border-color: var(--primary);\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 16px;\n}\n.freelancer-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.freelancer-info[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--accent));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 700;\n  font-size: 18px;\n}\n.freelancer-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--bo-text-primary);\n  margin-bottom: 4px;\n}\n.freelancer-info[_ngcontent-%COMP%]   .project-title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--bo-text-secondary);\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.status-badge.status-pending[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #f59e0b;\n}\n.status-badge.status-accepted[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.status-badge.status-rejected[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.status-badge.status-interview[_ngcontent-%COMP%] {\n  background: rgba(79, 110, 247, 0.15);\n  color: var(--primary);\n}\n.card-body[_ngcontent-%COMP%]   .milestone-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--bo-text-primary);\n  margin-bottom: 8px;\n}\n.card-body[_ngcontent-%COMP%]   .cover-letter[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--bo-text-secondary);\n  line-height: 1.5;\n  margin-bottom: 16px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 16px;\n  border-top: 1px solid var(--bo-border);\n}\n.card-footer[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--bo-text-secondary);\n}\n.card-footer[_ngcontent-%COMP%]   .btn-view[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: transparent;\n  border: 1px solid var(--primary);\n  color: var(--primary);\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.card-footer[_ngcontent-%COMP%]   .btn-view[_ngcontent-%COMP%]:hover {\n  background: var(--primary);\n  color: white;\n}\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  text-align: center;\n  padding: 60px 20px;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  display: block;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--bo-text-primary);\n  margin-bottom: 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: var(--bo-text-secondary);\n}\n.interview-details[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  padding: 12px;\n  background: var(--bo-bg-primary);\n  border-radius: 8px;\n  font-size: 13px;\n}\n.interview-details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0;\n  color: var(--bo-text-primary);\n}\n.interview-details[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--primary);\n  text-decoration: none;\n}\n.interview-details[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=interviews.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InterviewsComponent, { className: "InterviewsComponent", filePath: "src\\app\\backoffice\\interviews\\interviews.component.ts", lineNumber: 11 });
})();

// src/app/backoffice/submissions/submissions.component.ts
function SubmissionsComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, "Loading submissions...");
    \u0275\u0275elementEnd();
  }
}
function SubmissionsComponent_div_19_div_1_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sub_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(sub_r2.description);
  }
}
function SubmissionsComponent_div_19_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275listener("click", function SubmissionsComponent_div_19_div_1_Template_div_click_0_listener() {
      const sub_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.viewProject(sub_r2.projectId));
    });
    \u0275\u0275elementStart(1, "div", 18)(2, "div", 19)(3, "div", 20);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 21);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "span", 22);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 23)(13, "p", 24);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, SubmissionsComponent_div_19_div_1_p_15_Template, 2, 1, "p", 25);
    \u0275\u0275elementStart(16, "div", 26)(17, "span", 27);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 28);
    \u0275\u0275text(21, "Review \u2192");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const sub_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((sub_r2.freelancerName == null ? null : sub_r2.freelancerName.charAt(0)) || "F");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sub_r2.freelancerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sub_r2.projectTitle);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.getStatusClass(sub_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sub_r2.status.replace("_", " "), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sub_r2.milestoneTitle);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", sub_r2.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Submitted: ", \u0275\u0275pipeBind2(19, 8, sub_r2.submittedAt, "short"), "");
  }
}
function SubmissionsComponent_div_19_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 31);
    \u0275\u0275text(2, "\u{1F4E4}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No submissions found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "There are no work submissions to review");
    \u0275\u0275elementEnd()();
  }
}
function SubmissionsComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275template(1, SubmissionsComponent_div_19_div_1_Template, 22, 11, "div", 15)(2, SubmissionsComponent_div_19_div_2_Template, 7, 0, "div", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.filteredSubmissions);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.filteredSubmissions.length === 0);
  }
}
var SubmissionsComponent = class _SubmissionsComponent {
  constructor(submissionService, router) {
    this.submissionService = submissionService;
    this.router = router;
    this.submissions = [];
    this.filteredSubmissions = [];
    this.loading = false;
    this.statusFilter = "ALL";
  }
  ngOnInit() {
    this.loadSubmissions();
  }
  loadSubmissions() {
    this.loading = true;
    this.submissionService.getAllSubmissions().subscribe({
      next: (data) => {
        this.submissions = data;
        this.filteredSubmissions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading submissions:", err);
        this.loading = false;
      }
    });
  }
  filterSubmissions() {
    this.filteredSubmissions = this.submissions.filter((sub) => {
      return this.statusFilter === "ALL" || sub.status === this.statusFilter;
    });
  }
  viewProject(projectId) {
    this.router.navigate(["/backoffice/projects", projectId]);
  }
  getStatusClass(status) {
    const statusMap = {
      "PENDING": "status-pending",
      "APPROVED": "status-accepted",
      "REJECTED": "status-rejected",
      "REVISION_REQUESTED": "status-interview"
    };
    return statusMap[status] || "status-default";
  }
  static {
    this.\u0275fac = function SubmissionsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SubmissionsComponent)(\u0275\u0275directiveInject(SubmissionService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SubmissionsComponent, selectors: [["app-submissions"]], decls: 20, vars: 3, consts: [[1, "submissions-page"], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], [1, "filters-bar"], [1, "status-filter", 3, "ngModelChange", "change", "ngModel"], ["value", "ALL"], ["value", "PENDING"], ["value", "APPROVED"], ["value", "REJECTED"], ["value", "REVISION_REQUESTED"], ["class", "loading", 4, "ngIf"], ["class", "submissions-grid", 4, "ngIf"], [1, "loading"], [1, "submissions-grid"], ["class", "submission-card", 3, "click", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "submission-card", 3, "click"], [1, "card-header"], [1, "freelancer-info"], [1, "avatar"], [1, "project-title"], [1, "status-badge", 3, "ngClass"], [1, "card-body"], [1, "milestone-title"], ["class", "description", 4, "ngIf"], [1, "card-footer"], [1, "date"], [1, "btn-view"], [1, "description"], [1, "empty-state"], [1, "empty-icon"]], template: function SubmissionsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Work Submissions");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 3);
        \u0275\u0275text(5, "Review freelancer deliverables");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 4)(7, "select", 5);
        \u0275\u0275twoWayListener("ngModelChange", function SubmissionsComponent_Template_select_ngModelChange_7_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
          return $event;
        });
        \u0275\u0275listener("change", function SubmissionsComponent_Template_select_change_7_listener() {
          return ctx.filterSubmissions();
        });
        \u0275\u0275elementStart(8, "option", 6);
        \u0275\u0275text(9, "All Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "option", 7);
        \u0275\u0275text(11, "Pending Review");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "option", 8);
        \u0275\u0275text(13, "Approved");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "option", 9);
        \u0275\u0275text(15, "Rejected");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "option", 10);
        \u0275\u0275text(17, "Revision Requested");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(18, SubmissionsComponent_div_18_Template, 2, 0, "div", 11)(19, SubmissionsComponent_div_19_Template, 3, 2, "div", 12);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
        \u0275\u0275advance(11);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [NgClass, NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ["\n\n.applications-page[_ngcontent-%COMP%], \n.submissions-page[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 800;\n  color: var(--bo-text-primary);\n  margin-bottom: 4px;\n}\n.page-header[_ngcontent-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 14px;\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 24px;\n}\n.filters-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%], \n.filters-bar[_ngcontent-%COMP%]   .status-filter[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  border: 1px solid var(--bo-border);\n  border-radius: 8px;\n  background: var(--bo-bg-secondary);\n  color: var(--bo-text-primary);\n  font-size: 14px;\n}\n.filters-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus, \n.filters-bar[_ngcontent-%COMP%]   .status-filter[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--primary);\n}\n.filters-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.filters-bar[_ngcontent-%COMP%]   .status-filter[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n.applications-grid[_ngcontent-%COMP%], \n.submissions-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n  gap: 20px;\n}\n.application-card[_ngcontent-%COMP%], \n.submission-card[_ngcontent-%COMP%] {\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: 12px;\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.application-card[_ngcontent-%COMP%]:hover, \n.submission-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border-color: var(--primary);\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 16px;\n}\n.freelancer-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.freelancer-info[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--accent));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 700;\n  font-size: 18px;\n}\n.freelancer-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--bo-text-primary);\n  margin-bottom: 4px;\n}\n.freelancer-info[_ngcontent-%COMP%]   .project-title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--bo-text-secondary);\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.status-badge.status-pending[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #f59e0b;\n}\n.status-badge.status-accepted[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.status-badge.status-rejected[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.status-badge.status-interview[_ngcontent-%COMP%] {\n  background: rgba(79, 110, 247, 0.15);\n  color: var(--primary);\n}\n.card-body[_ngcontent-%COMP%]   .milestone-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--bo-text-primary);\n  margin-bottom: 8px;\n}\n.card-body[_ngcontent-%COMP%]   .cover-letter[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--bo-text-secondary);\n  line-height: 1.5;\n  margin-bottom: 16px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 16px;\n  border-top: 1px solid var(--bo-border);\n}\n.card-footer[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--bo-text-secondary);\n}\n.card-footer[_ngcontent-%COMP%]   .btn-view[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: transparent;\n  border: 1px solid var(--primary);\n  color: var(--primary);\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.card-footer[_ngcontent-%COMP%]   .btn-view[_ngcontent-%COMP%]:hover {\n  background: var(--primary);\n  color: white;\n}\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  text-align: center;\n  padding: 60px 20px;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  display: block;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--bo-text-primary);\n  margin-bottom: 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: var(--bo-text-secondary);\n}\n.description[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--bo-text-secondary);\n  line-height: 1.5;\n  margin: 12px 0;\n}\n/*# sourceMappingURL=submissions.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SubmissionsComponent, { className: "SubmissionsComponent", filePath: "src\\app\\backoffice\\submissions\\submissions.component.ts", lineNumber: 11 });
})();

// src/app/backoffice/reviews/reviews.component.ts
function ReviewsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1, "Loading reviews...");
    \u0275\u0275elementEnd();
  }
}
function ReviewsComponent_div_7_div_1_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, "\u2B50");
    \u0275\u0275elementEnd();
  }
}
function ReviewsComponent_div_7_div_1_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const review_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(review_r1.comments);
  }
}
function ReviewsComponent_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 11)(2, "div", 12)(3, "div", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 14);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 15);
    \u0275\u0275template(11, ReviewsComponent_div_7_div_1_span_11_Template, 2, 0, "span", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 17)(13, "p", 18);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, ReviewsComponent_div_7_div_1_p_15_Template, 2, 1, "p", 19);
    \u0275\u0275elementStart(16, "div", 20)(17, "span", 21);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 22);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const review_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((review_r1.reviewerName == null ? null : review_r1.reviewerName.charAt(0)) || "C");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(review_r1.reviewerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Submission #", review_r1.submissionId, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.getStarsArray(review_r1.rating));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Review for Submission #", review_r1.submissionId, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", review_r1.comments);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Reviewed: ", \u0275\u0275pipeBind2(19, 9, review_r1.createdAt, "short"), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", "status-" + review_r1.status.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(review_r1.status);
  }
}
function ReviewsComponent_div_7_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "span", 26);
    \u0275\u0275text(2, "\u2B50");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No reviews yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "There are no reviews to display");
    \u0275\u0275elementEnd()();
  }
}
function ReviewsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275template(1, ReviewsComponent_div_7_div_1_Template, 22, 12, "div", 8)(2, ReviewsComponent_div_7_div_2_Template, 7, 0, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.reviews);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.reviews.length === 0);
  }
}
var ReviewsComponent = class _ReviewsComponent {
  constructor(reviewService) {
    this.reviewService = reviewService;
    this.reviews = [];
    this.loading = false;
  }
  ngOnInit() {
    this.loadReviews();
  }
  loadReviews() {
    this.loading = true;
    this.reviewService.getAllReviews().subscribe({
      next: (data) => {
        this.reviews = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading reviews:", err);
        this.loading = false;
      }
    });
  }
  getStarsArray(rating) {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
  static {
    this.\u0275fac = function ReviewsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ReviewsComponent)(\u0275\u0275directiveInject(ReviewService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReviewsComponent, selectors: [["app-reviews"]], decls: 8, vars: 2, consts: [[1, "reviews-page"], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], ["class", "loading", 4, "ngIf"], ["class", "reviews-grid", 4, "ngIf"], [1, "loading"], [1, "reviews-grid"], ["class", "review-card", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "review-card"], [1, "card-header"], [1, "freelancer-info"], [1, "avatar"], [1, "project-title"], [1, "rating"], ["class", "star", 4, "ngFor", "ngForOf"], [1, "card-body"], [1, "milestone-title"], ["class", "feedback", 4, "ngIf"], [1, "card-footer"], [1, "date"], [1, "status-badge", 3, "ngClass"], [1, "star"], [1, "feedback"], [1, "empty-state"], [1, "empty-icon"]], template: function ReviewsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Reviews");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 3);
        \u0275\u0275text(5, "Feedback and ratings for completed work");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, ReviewsComponent_div_6_Template, 2, 0, "div", 4)(7, ReviewsComponent_div_7_Template, 3, 2, "div", 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [NgClass, NgForOf, NgIf, DatePipe], styles: ["\n\n.applications-page[_ngcontent-%COMP%], \n.reviews-page[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 800;\n  color: var(--bo-text-primary);\n  margin-bottom: 4px;\n}\n.page-header[_ngcontent-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 14px;\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 24px;\n}\n.filters-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%], \n.filters-bar[_ngcontent-%COMP%]   .status-filter[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  border: 1px solid var(--bo-border);\n  border-radius: 8px;\n  background: var(--bo-bg-secondary);\n  color: var(--bo-text-primary);\n  font-size: 14px;\n}\n.filters-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus, \n.filters-bar[_ngcontent-%COMP%]   .status-filter[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--primary);\n}\n.filters-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.filters-bar[_ngcontent-%COMP%]   .status-filter[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n.applications-grid[_ngcontent-%COMP%], \n.reviews-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n  gap: 20px;\n}\n.application-card[_ngcontent-%COMP%], \n.review-card[_ngcontent-%COMP%] {\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: 12px;\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.application-card[_ngcontent-%COMP%]:hover, \n.review-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border-color: var(--primary);\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 16px;\n}\n.freelancer-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.freelancer-info[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--accent));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 700;\n  font-size: 18px;\n}\n.freelancer-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--bo-text-primary);\n  margin-bottom: 4px;\n}\n.freelancer-info[_ngcontent-%COMP%]   .project-title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--bo-text-secondary);\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.status-badge.status-pending[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #f59e0b;\n}\n.status-badge.status-accepted[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.status-badge.status-rejected[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.status-badge.status-interview[_ngcontent-%COMP%] {\n  background: rgba(79, 110, 247, 0.15);\n  color: var(--primary);\n}\n.card-body[_ngcontent-%COMP%]   .milestone-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--bo-text-primary);\n  margin-bottom: 8px;\n}\n.card-body[_ngcontent-%COMP%]   .cover-letter[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--bo-text-secondary);\n  line-height: 1.5;\n  margin-bottom: 16px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 16px;\n  border-top: 1px solid var(--bo-border);\n}\n.card-footer[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--bo-text-secondary);\n}\n.card-footer[_ngcontent-%COMP%]   .btn-view[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: transparent;\n  border: 1px solid var(--primary);\n  color: var(--primary);\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.card-footer[_ngcontent-%COMP%]   .btn-view[_ngcontent-%COMP%]:hover {\n  background: var(--primary);\n  color: white;\n}\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  text-align: center;\n  padding: 60px 20px;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  display: block;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--bo-text-primary);\n  margin-bottom: 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: var(--bo-text-secondary);\n}\n.rating[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n}\n.rating[_ngcontent-%COMP%]   .star[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.feedback[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--bo-text-secondary);\n  line-height: 1.5;\n  margin: 12px 0;\n  font-style: italic;\n}\n/*# sourceMappingURL=reviews.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReviewsComponent, { className: "ReviewsComponent", filePath: "src\\app\\backoffice\\reviews\\reviews.component.ts", lineNumber: 10 });
})();

// src/app/backoffice/layout/bo-login/bo-login.component.ts
function BoLoginComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", ctx_r0.error, "");
  }
}
function BoLoginComponent_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Sign In \u2192");
    \u0275\u0275elementEnd();
  }
}
function BoLoginComponent_span_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Signing in...");
    \u0275\u0275elementEnd();
  }
}
var BoLoginComponent = class _BoLoginComponent {
  constructor(fb, authService, router) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    this.isLoading = false;
    this.error = "";
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    if (this.loginForm.invalid)
      return;
    this.isLoading = true;
    this.error = "";
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(["/backoffice/dashboard"]);
      },
      error: (err) => {
        console.error("Login error:", err);
        this.error = err.error?.message || err.error || "Invalid email or password";
        this.isLoading = false;
      }
    });
  }
  static {
    this.\u0275fac = function BoLoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BoLoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BoLoginComponent, selectors: [["app-bo-login"]], decls: 31, vars: 9, consts: [[1, "login-page"], [1, "login-bg"], [1, "bg-glow", "g1"], [1, "bg-glow", "g2"], [1, "login-card"], [1, "login-logo"], [1, "logo-icon"], [1, "logo-text"], [1, "accent"], [1, "login-title"], [1, "login-sub"], ["class", "login-error", 4, "ngIf"], [1, "login-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["type", "email", "formControlName", "email", "placeholder", "admin@matchy.tn", 1, "form-input"], ["type", "password", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "form-input"], ["type", "submit", 1, "btn-login", 3, "disabled"], [4, "ngIf"], ["routerLink", "/", 1, "back-link"], [1, "login-error"]], template: function BoLoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275element(2, "div", 2)(3, "div", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "div", 6);
        \u0275\u0275text(7, "M");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "span", 7);
        \u0275\u0275text(9, "Match");
        \u0275\u0275elementStart(10, "span", 8);
        \u0275\u0275text(11, "y");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "h1", 9);
        \u0275\u0275text(13, "Admin Login");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "p", 10);
        \u0275\u0275text(15, "Access the Matchy backoffice dashboard");
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, BoLoginComponent_div_16_Template, 3, 1, "div", 11);
        \u0275\u0275elementStart(17, "form", 12);
        \u0275\u0275listener("ngSubmit", function BoLoginComponent_Template_form_ngSubmit_17_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(18, "div", 13)(19, "label");
        \u0275\u0275text(20, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(21, "input", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "div", 13)(23, "label");
        \u0275\u0275text(24, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(25, "input", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "button", 16);
        \u0275\u0275template(27, BoLoginComponent_span_27_Template, 2, 0, "span", 17)(28, BoLoginComponent_span_28_Template, 2, 0, "span", 17);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "a", 18);
        \u0275\u0275text(30, "\u2190 Back to Matchy");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_3_0;
        \u0275\u0275advance(16);
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.loginForm);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("invalid", ((tmp_2_0 = ctx.loginForm.get("email")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.loginForm.get("email")) == null ? null : tmp_2_0.touched));
        \u0275\u0275advance(4);
        \u0275\u0275classProp("invalid", ((tmp_3_0 = ctx.loginForm.get("password")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.loginForm.get("password")) == null ? null : tmp_3_0.touched));
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.isLoading || ctx.loginForm.invalid);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
      }
    }, dependencies: [NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.login-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--fo-bg-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n  padding: 24px;\n}\n.login-bg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\n.login-bg[_ngcontent-%COMP%]   .bg-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.15;\n}\n.login-bg[_ngcontent-%COMP%]   .bg-glow.g1[_ngcontent-%COMP%] {\n  width: 400px;\n  height: 400px;\n  background: var(--primary);\n  top: -100px;\n  right: -100px;\n}\n.login-bg[_ngcontent-%COMP%]   .bg-glow.g2[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  background: var(--accent-secondary);\n  bottom: -50px;\n  left: -50px;\n}\n.login-card[_ngcontent-%COMP%] {\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-xl);\n  padding: 48px 40px;\n  width: 100%;\n  max-width: 420px;\n  position: relative;\n  z-index: 1;\n  backdrop-filter: blur(20px);\n}\n.login-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 28px;\n}\n.login-logo[_ngcontent-%COMP%]   .logo-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--accent));\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 800;\n  font-size: 18px;\n  font-family: var(--font-display);\n}\n.login-logo[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 22px;\n  font-weight: 700;\n  color: white;\n}\n.login-logo[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .accent[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.login-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 28px;\n  font-weight: 800;\n  color: white;\n  margin-bottom: 8px;\n  letter-spacing: -0.5px;\n}\n.login-sub[_ngcontent-%COMP%] {\n  color: var(--fo-text-muted);\n  font-size: 14px;\n  margin-bottom: 32px;\n}\n.login-error[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: var(--radius-sm);\n  padding: 12px 14px;\n  color: #fca5a5;\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--fo-text-secondary);\n  letter-spacing: 0.3px;\n}\n.form-input[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-sm);\n  color: white;\n  font-size: 15px;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n  outline: none;\n}\n.form-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--fo-text-muted);\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.15);\n}\n.form-input.invalid[_ngcontent-%COMP%] {\n  border-color: var(--danger);\n}\n.btn-login[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  padding: 14px;\n  background: var(--primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-sm);\n  font-size: 15px;\n  font-weight: 600;\n  font-family: var(--font-body);\n  cursor: pointer;\n  transition: all 0.25s;\n}\n.btn-login[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--primary-light);\n  transform: translateY(-1px);\n  box-shadow: 0 6px 20px rgba(79, 110, 247, 0.4);\n}\n.btn-login[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.back-link[_ngcontent-%COMP%] {\n  display: block;\n  text-align: center;\n  margin-top: 24px;\n  color: var(--fo-text-muted);\n  font-size: 13px;\n  text-decoration: none;\n  transition: color 0.2s;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: var(--primary-light);\n}\n/*# sourceMappingURL=bo-login.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BoLoginComponent, { className: "BoLoginComponent", filePath: "src\\app\\backoffice\\layout\\bo-login\\bo-login.component.ts", lineNumber: 11 });
})();

// src/app/backoffice/courses-resources/courses-resources.component.ts
var _c02 = (a0, a1, a2) => ({ "badge-success": a0, "badge-primary": a1, "badge-danger": a2 });
function BoCoursesResourcesComponent_option_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 18);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "titlecase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r1 = ctx.$implicit;
    \u0275\u0275property("value", cat_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 2, cat_r1));
  }
}
function BoCoursesResourcesComponent_tr_71_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 19)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td")(8, "span", 20);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td")(12, "span", 21);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td")(23, "span", 21);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "td")(26, "button", 22);
    \u0275\u0275listener("click", function BoCoursesResourcesComponent_tr_71_Template_button_click_26_listener() {
      const course_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleStatus(course_r3));
    });
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "td", 23)(30, "div", 24)(31, "button", 25)(32, "span", 3);
    \u0275\u0275text(33, "\u{1F441}\uFE0F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "button", 26)(35, "span", 3);
    \u0275\u0275text(36, "\u270F\uFE0F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "button", 27)(38, "span", 3);
    \u0275\u0275text(39, "\u{1F5D1}\uFE0F");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const course_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(course_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 13, course_r3.createdAt, "MMM d, y"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 16, course_r3.category));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(24, _c02, course_r3.level === "beginner", course_r3.level === "intermediate", course_r3.level === "advanced"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 18, course_r3.level), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(course_r3.author);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F465} ", \u0275\u0275pipeBind1(19, 20, course_r3.students), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4D6} ", course_r3.lessons, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", course_r3.isFree ? "badge-success" : "badge-warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", course_r3.isFree ? "Free" : "Paid", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("published", course_r3.status === "published");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(28, 22, course_r3.status), " ");
  }
}
function BoCoursesResourcesComponent_tr_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 28);
    \u0275\u0275text(2, "No courses found");
    \u0275\u0275elementEnd()();
  }
}
var BoCoursesResourcesComponent = class _BoCoursesResourcesComponent {
  constructor() {
    this.searchTerm = "";
    this.selectedCategory = "all";
    this.categories = ["all", "design", "development", "marketing", "business"];
    this.courses = [
      { id: 1, title: "UI/UX Design Fundamentals", category: "design", level: "beginner", students: 1240, lessons: 24, status: "published", author: "Sara B.", createdAt: "2025-01-10", isFree: true },
      { id: 2, title: "React & Angular Development", category: "development", level: "intermediate", students: 2310, lessons: 48, status: "published", author: "Karim M.", createdAt: "2025-01-15", isFree: false },
      { id: 3, title: "Freelance Business Mastery", category: "business", level: "beginner", students: 870, lessons: 16, status: "draft", author: "Admin", createdAt: "2025-02-01", isFree: true },
      { id: 4, title: "Digital Marketing Essentials", category: "marketing", level: "beginner", students: 1050, lessons: 20, status: "published", author: "Yasmine K.", createdAt: "2025-02-10", isFree: false }
    ];
  }
  get filteredCourses() {
    return this.courses.filter((c) => {
      const matchCat = this.selectedCategory === "all" || c.category === this.selectedCategory;
      const matchSearch = !this.searchTerm || c.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }
  ngOnInit() {
  }
  getTotalStudents() {
    return this.courses.reduce((sum, c) => sum + c.students, 0);
  }
  toggleStatus(course) {
    course.status = course.status === "published" ? "draft" : "published";
  }
  static {
    this.\u0275fac = function BoCoursesResourcesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BoCoursesResourcesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BoCoursesResourcesComponent, selectors: [["app-bo-courses-resources"]], decls: 73, vars: 8, consts: [[1, "bo-page"], [1, "bo-page-header"], [1, "btn-primary-action"], [1, "icon"], [1, "stats-row"], [1, "mini-stat"], [1, "ms-val"], [1, "ms-label"], [1, "bo-filters-bar", "filters-bar"], ["type", "text", "placeholder", "\u{1F50D} Search courses...", 1, "bo-filter-input", "filter-input", 3, "ngModelChange", "ngModel"], [1, "bo-filter-select", "filter-select", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "bo-filter-spacer", "filter-spacer"], [1, "btn-icon"], [1, "bo-table-card", "table-card"], [1, "bo-data-table", "data-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "value"], [1, "course-title-cell"], [1, "category-tag"], [1, "badge", 3, "ngClass"], [1, "status-toggle", 3, "click"], [1, "bo-actions-cell", "actions-cell"], [1, "action-icons"], ["data-tooltip", "View Course", "aria-label", "View course details", 1, "action-icon-view", "action-icon-tooltip"], ["data-tooltip", "Edit Course", "aria-label", "Edit course", 1, "action-icon-edit", "action-icon-tooltip"], ["data-tooltip", "Delete Course", "aria-label", "Delete course", 1, "action-icon-delete", "action-icon-tooltip"], ["colspan", "9", 1, "bo-empty-row", "empty-row"]], template: function BoCoursesResourcesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
        \u0275\u0275text(4, "Courses & Resources");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Manage all educational content on the platform");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 2)(8, "span", 3);
        \u0275\u0275text(9, "\u2728");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "Add Course");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 4)(13, "div", 5)(14, "span", 6);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span", 7);
        \u0275\u0275text(17, "Total Courses");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 5)(19, "span", 6);
        \u0275\u0275text(20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span", 7);
        \u0275\u0275text(22, "Total Students");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "div", 5)(24, "span", 6);
        \u0275\u0275text(25);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "span", 7);
        \u0275\u0275text(27, "Published");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "div", 5)(29, "span", 6);
        \u0275\u0275text(30, "2");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "span", 7);
        \u0275\u0275text(32, "Free Courses");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(33, "div", 8)(34, "input", 9);
        \u0275\u0275twoWayListener("ngModelChange", function BoCoursesResourcesComponent_Template_input_ngModelChange_34_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "select", 10);
        \u0275\u0275twoWayListener("ngModelChange", function BoCoursesResourcesComponent_Template_select_ngModelChange_35_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedCategory, $event) || (ctx.selectedCategory = $event);
          return $event;
        });
        \u0275\u0275template(36, BoCoursesResourcesComponent_option_36_Template, 3, 4, "option", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275element(37, "div", 12);
        \u0275\u0275elementStart(38, "button", 13)(39, "span", 3);
        \u0275\u0275text(40, "\u{1F4C4}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "span");
        \u0275\u0275text(42, "CSV");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(43, "button", 13)(44, "span", 3);
        \u0275\u0275text(45, "\u{1F4CA}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "span");
        \u0275\u0275text(47, "Excel");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(48, "div", 14)(49, "table", 15)(50, "thead")(51, "tr")(52, "th");
        \u0275\u0275text(53, "Course");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "th");
        \u0275\u0275text(55, "Category");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "th");
        \u0275\u0275text(57, "Level");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "th");
        \u0275\u0275text(59, "Author");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "th");
        \u0275\u0275text(61, "Students");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "th");
        \u0275\u0275text(63, "Lessons");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "th");
        \u0275\u0275text(65, "Type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "th");
        \u0275\u0275text(67, "Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "th");
        \u0275\u0275text(69, "Actions");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(70, "tbody");
        \u0275\u0275template(71, BoCoursesResourcesComponent_tr_71_Template, 40, 28, "tr", 16)(72, BoCoursesResourcesComponent_tr_72_Template, 3, 0, "tr", 17);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275textInterpolate(ctx.courses.length);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.getTotalStudents());
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.courses.length);
        \u0275\u0275advance(9);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedCategory);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.categories);
        \u0275\u0275advance(35);
        \u0275\u0275property("ngForOf", ctx.filteredCourses);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filteredCourses.length === 0);
      }
    }, dependencies: [NgClass, NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe, TitleCasePipe, DatePipe], styles: ["\n\n.course-title-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.course-title-cell[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n}\n.course-title-cell[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--bo-text-secondary);\n}\n.category-tag[_ngcontent-%COMP%] {\n  padding: 3px 8px;\n  border-radius: 4px;\n  font-size: 11px;\n  font-weight: 600;\n  background: rgba(79, 110, 247, 0.1);\n  color: var(--primary);\n}\n.status-toggle[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  border: 1px solid;\n  background: rgba(100, 116, 139, 0.1);\n  color: #64748b;\n  border-color: rgba(100, 116, 139, 0.2509803922);\n  transition: all 0.2s;\n}\n.status-toggle.published[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  color: #16a34a;\n  border-color: rgba(34, 197, 94, 0.3);\n}\n/*# sourceMappingURL=courses-resources.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BoCoursesResourcesComponent, { className: "BoCoursesResourcesComponent", filePath: "src\\app\\backoffice\\courses-resources\\courses-resources.component.ts", lineNumber: 8 });
})();

// src/app/backoffice/events/events.component.ts
function BoEventsComponent_option_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 18);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "titlecase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = ctx.$implicit;
    \u0275\u0275property("value", t_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 2, t_r1));
  }
}
function BoEventsComponent_tr_67_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "\u{1F310} Online");
    \u0275\u0275elementEnd();
  }
}
function BoEventsComponent_tr_67_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F4CD} ", event_r2.location, "");
  }
}
function BoEventsComponent_tr_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "span", 19);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275template(12, BoEventsComponent_tr_67_span_12_Template, 2, 0, "span", 20)(13, BoEventsComponent_tr_67_span_13_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "div", 21)(16, "div", 22);
    \u0275\u0275element(17, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "td")(21, "span", 24);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "td", 25)(25, "div", 26)(26, "button", 27)(27, "span", 3);
    \u0275\u0275text(28, "\u{1F441}\uFE0F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "button", 28)(30, "span", 3);
    \u0275\u0275text(31, "\u270F\uFE0F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "button", 29)(33, "span", 3);
    \u0275\u0275text(34, "\u{1F5D1}\uFE0F");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const event_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(event_r2.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 10, event_r2.type));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 12, event_r2.date, "MMM d, y"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", event_r2.isOnline);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !event_r2.isOnline);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", ctx_r2.getAttendancePercent(event_r2), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", event_r2.attendees, "/", event_r2.maxAttendees, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 15, event_r2.status));
  }
}
function BoEventsComponent_tr_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 31);
    \u0275\u0275text(2, "No events found");
    \u0275\u0275elementEnd()();
  }
}
var BoEventsComponent = class _BoEventsComponent {
  constructor() {
    this.searchTerm = "";
    this.selectedType = "all";
    this.types = ["all", "webinar", "workshop", "meetup", "conference"];
    this.events = [
      { id: 1, title: "Freelance Tunisia Summit 2025", type: "conference", date: "2025-03-15", location: "Tunis, TN", attendees: 380, maxAttendees: 500, status: "upcoming", isOnline: false },
      { id: 2, title: "UX Design Masterclass", type: "workshop", date: "2025-03-20", location: "Online", attendees: 72, maxAttendees: 100, status: "upcoming", isOnline: true },
      { id: 3, title: "Freelancers Meetup Sfax", type: "meetup", date: "2025-03-25", location: "Sfax, TN", attendees: 34, maxAttendees: 50, status: "upcoming", isOnline: false },
      { id: 4, title: "Client Acquisition Webinar", type: "webinar", date: "2025-04-02", location: "Online", attendees: 210, maxAttendees: 500, status: "upcoming", isOnline: true }
    ];
  }
  get filteredEvents() {
    return this.events.filter((e) => {
      const matchType = this.selectedType === "all" || e.type === this.selectedType;
      const matchSearch = !this.searchTerm || e.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchType && matchSearch;
    });
  }
  ngOnInit() {
  }
  getAttendancePercent(e) {
    return Math.round(e.attendees / e.maxAttendees * 100);
  }
  static {
    this.\u0275fac = function BoEventsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BoEventsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BoEventsComponent, selectors: [["app-bo-events"]], decls: 69, vars: 6, consts: [[1, "bo-page"], [1, "bo-page-header"], [1, "btn-primary-action"], [1, "icon"], [1, "stats-row"], [1, "mini-stat"], [1, "ms-val"], [1, "ms-label"], [1, "bo-filters-bar"], ["type", "text", "placeholder", "\u{1F50D} Search events...", 1, "bo-filter-input", 3, "ngModelChange", "ngModel"], [1, "bo-filter-select", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "bo-filter-spacer"], [1, "btn-icon"], [1, "bo-table-card"], [1, "bo-data-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "value"], [1, "badge", "badge-primary"], ["class", "online-tag", 4, "ngIf"], [1, "attendance-info"], [1, "bar-track"], [1, "bar-fill"], [1, "badge", "badge-success"], [1, "bo-actions-cell"], [1, "action-icons"], ["data-tooltip", "View Event", "aria-label", "View event details", 1, "action-icon-view", "action-icon-tooltip"], ["data-tooltip", "Edit Event", "aria-label", "Edit event", 1, "action-icon-edit", "action-icon-tooltip"], ["data-tooltip", "Delete Event", "aria-label", "Delete event", 1, "action-icon-delete", "action-icon-tooltip"], [1, "online-tag"], ["colspan", "7", 1, "bo-empty-row"]], template: function BoEventsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
        \u0275\u0275text(4, "Events Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Create and manage platform events");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 2)(8, "span", 3);
        \u0275\u0275text(9, "\u2728");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "Create Event");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 4)(13, "div", 5)(14, "span", 6);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span", 7);
        \u0275\u0275text(17, "Total Events");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 5)(19, "span", 6);
        \u0275\u0275text(20, "696");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span", 7);
        \u0275\u0275text(22, "Total Registered");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "div", 5)(24, "span", 6);
        \u0275\u0275text(25, "3");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "span", 7);
        \u0275\u0275text(27, "Online");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "div", 5)(29, "span", 6);
        \u0275\u0275text(30, "2");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "span", 7);
        \u0275\u0275text(32, "In-Person");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(33, "div", 8)(34, "input", 9);
        \u0275\u0275twoWayListener("ngModelChange", function BoEventsComponent_Template_input_ngModelChange_34_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "select", 10);
        \u0275\u0275twoWayListener("ngModelChange", function BoEventsComponent_Template_select_ngModelChange_35_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedType, $event) || (ctx.selectedType = $event);
          return $event;
        });
        \u0275\u0275template(36, BoEventsComponent_option_36_Template, 3, 4, "option", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275element(37, "div", 12);
        \u0275\u0275elementStart(38, "button", 13)(39, "span", 3);
        \u0275\u0275text(40, "\u{1F4C4}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "span");
        \u0275\u0275text(42, "CSV");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(43, "button", 13)(44, "span", 3);
        \u0275\u0275text(45, "\u{1F4CA}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "span");
        \u0275\u0275text(47, "Excel");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(48, "div", 14)(49, "table", 15)(50, "thead")(51, "tr")(52, "th");
        \u0275\u0275text(53, "Event");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "th");
        \u0275\u0275text(55, "Type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "th");
        \u0275\u0275text(57, "Date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "th");
        \u0275\u0275text(59, "Location");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "th");
        \u0275\u0275text(61, "Attendance");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "th");
        \u0275\u0275text(63, "Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "th");
        \u0275\u0275text(65, "Actions");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(66, "tbody");
        \u0275\u0275template(67, BoEventsComponent_tr_67_Template, 35, 17, "tr", 16)(68, BoEventsComponent_tr_68_Template, 3, 0, "tr", 17);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275textInterpolate(ctx.events.length);
        \u0275\u0275advance(19);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedType);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.types);
        \u0275\u0275advance(31);
        \u0275\u0275property("ngForOf", ctx.filteredEvents);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filteredEvents.length === 0);
      }
    }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, TitleCasePipe, DatePipe], styles: ["\n\n.online-tag[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--primary);\n}\n.attendance-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.attendance-info[_ngcontent-%COMP%]   .bar-track[_ngcontent-%COMP%] {\n  width: 70px;\n  height: 5px;\n  background: var(--bo-bg-primary);\n  border-radius: 3px;\n}\n.attendance-info[_ngcontent-%COMP%]   .bar-track[_ngcontent-%COMP%]   .bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: var(--primary);\n  border-radius: 3px;\n  transition: width 0.5s;\n}\n.attendance-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--bo-text-secondary);\n  white-space: nowrap;\n}\n/*# sourceMappingURL=events.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BoEventsComponent, { className: "BoEventsComponent", filePath: "src\\app\\backoffice\\events\\events.component.ts", lineNumber: 8 });
})();

// src/app/backoffice/profile-settings/profile-settings.component.ts
function BoProfileSettingsComponent_div_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, "\u2705 Settings saved successfully!");
    \u0275\u0275elementEnd();
  }
}
var BoProfileSettingsComponent = class _BoProfileSettingsComponent {
  constructor(fb) {
    this.fb = fb;
    this.saved = false;
    this.settings = { maintenance: false, registration: true, emails: true, verification: true };
    this.form = this.fb.group({
      name: ["Admin Matchy", Validators.required],
      email: ["admin@matchy.tn", [Validators.required, Validators.email]],
      phone: ["+216 55 000 000"],
      role: ["Super Admin"]
    });
  }
  save() {
    this.saved = true;
    setTimeout(() => this.saved = false, 3e3);
  }
  static {
    this.\u0275fac = function BoProfileSettingsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BoProfileSettingsComponent)(\u0275\u0275directiveInject(FormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BoProfileSettingsComponent, selectors: [["app-bo-profile-settings"]], decls: 73, vars: 7, consts: [[1, "bo-page"], [1, "bo-page-header"], [1, "btn-success", 3, "click"], [1, "icon"], [1, "ps-grid"], [1, "ps-card"], [3, "formGroup"], [1, "ps-form-group"], ["type", "text", "formControlName", "name", "placeholder", "Full Name", 1, "ps-input"], ["type", "email", "formControlName", "email", "placeholder", "Email", 1, "ps-input"], ["type", "text", "formControlName", "phone", "placeholder", "Phone", 1, "ps-input"], ["type", "text", "formControlName", "role", 1, "ps-input"], [1, "ps-setting-row"], [1, "ps-toggle"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "ps-slider"], ["class", "ps-success", 4, "ngIf"], [1, "ps-success"]], template: function BoProfileSettingsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
        \u0275\u0275text(4, "Profile Settings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Manage admin account and platform settings");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 2);
        \u0275\u0275listener("click", function BoProfileSettingsComponent_Template_button_click_7_listener() {
          return ctx.save();
        });
        \u0275\u0275elementStart(8, "span", 3);
        \u0275\u0275text(9, "\u2713");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "Save Changes");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 4)(13, "div", 5)(14, "h3");
        \u0275\u0275text(15, "Admin Profile");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "form", 6)(17, "div", 7)(18, "label");
        \u0275\u0275text(19, "Full Name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "div", 7)(22, "label");
        \u0275\u0275text(23, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "div", 7)(26, "label");
        \u0275\u0275text(27, "Phone");
        \u0275\u0275elementEnd();
        \u0275\u0275element(28, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "div", 7)(30, "label");
        \u0275\u0275text(31, "Role");
        \u0275\u0275elementEnd();
        \u0275\u0275element(32, "input", 11);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(33, "div", 5)(34, "h3");
        \u0275\u0275text(35, "Platform Settings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "div", 12)(37, "div")(38, "strong");
        \u0275\u0275text(39, "Maintenance Mode");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "p");
        \u0275\u0275text(41, "Temporarily disable public access");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "label", 13)(43, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function BoProfileSettingsComponent_Template_input_ngModelChange_43_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.settings.maintenance, $event) || (ctx.settings.maintenance = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(44, "span", 15);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(45, "div", 12)(46, "div")(47, "strong");
        \u0275\u0275text(48, "User Registration");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "p");
        \u0275\u0275text(50, "Allow new users to sign up");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(51, "label", 13)(52, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function BoProfileSettingsComponent_Template_input_ngModelChange_52_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.settings.registration, $event) || (ctx.settings.registration = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(53, "span", 15);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(54, "div", 12)(55, "div")(56, "strong");
        \u0275\u0275text(57, "Email Notifications");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "p");
        \u0275\u0275text(59, "Send automated emails to users");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(60, "label", 13)(61, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function BoProfileSettingsComponent_Template_input_ngModelChange_61_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.settings.emails, $event) || (ctx.settings.emails = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(62, "span", 15);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(63, "div", 12)(64, "div")(65, "strong");
        \u0275\u0275text(66, "Manual Verification");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "p");
        \u0275\u0275text(68, "Manually verify freelancer profiles");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(69, "label", 13)(70, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function BoProfileSettingsComponent_Template_input_ngModelChange_70_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.settings.verification, $event) || (ctx.settings.verification = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(71, "span", 15);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(72, BoProfileSettingsComponent_div_72_Template, 2, 0, "div", 16);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(16);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(16);
        \u0275\u0275attribute("readonly", true);
        \u0275\u0275advance(11);
        \u0275\u0275twoWayProperty("ngModel", ctx.settings.maintenance);
        \u0275\u0275advance(9);
        \u0275\u0275twoWayProperty("ngModel", ctx.settings.registration);
        \u0275\u0275advance(9);
        \u0275\u0275twoWayProperty("ngModel", ctx.settings.emails);
        \u0275\u0275advance(9);
        \u0275\u0275twoWayProperty("ngModel", ctx.settings.verification);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.saved);
      }
    }, dependencies: [NgIf, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, FormGroupDirective, FormControlName], styles: ['\n\n.ps-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n.ps-card[_ngcontent-%COMP%] {\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-md);\n  padding: 24px;\n}\n.ps-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 16px;\n  font-weight: 700;\n  margin-bottom: 20px;\n  color: var(--bo-text-primary);\n}\n.ps-form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 14px;\n}\n.ps-form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--bo-text-secondary);\n}\n.ps-input[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border: 1px solid var(--bo-border);\n  border-radius: 8px;\n  font-size: 13px;\n  font-family: var(--font-body);\n  color: var(--bo-text-primary);\n  background: var(--bo-bg-primary);\n  outline: none;\n  transition: border 0.2s;\n}\n.ps-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--primary);\n}\n.ps-input[readonly][_ngcontent-%COMP%] {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.ps-setting-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 14px 0;\n  border-bottom: 1px solid var(--bo-border);\n}\n.ps-setting-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.ps-setting-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  color: var(--bo-text-primary);\n  margin-bottom: 2px;\n}\n.ps-setting-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--bo-text-secondary);\n}\n.ps-toggle[_ngcontent-%COMP%] {\n  position: relative;\n  width: 42px;\n  height: 22px;\n  flex-shrink: 0;\n}\n.ps-toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.ps-toggle[_ngcontent-%COMP%]   .ps-slider[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: var(--bo-border);\n  border-radius: 11px;\n  cursor: pointer;\n  transition: 0.3s;\n}\n.ps-toggle[_ngcontent-%COMP%]   .ps-slider[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  background: white;\n  border-radius: 50%;\n  left: 3px;\n  top: 3px;\n  transition: 0.3s;\n}\n.ps-toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .ps-slider[_ngcontent-%COMP%] {\n  background: var(--primary);\n}\n.ps-toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .ps-slider[_ngcontent-%COMP%]::before {\n  transform: translateX(20px);\n}\n.ps-success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  border: 1px solid rgba(34, 197, 94, 0.3);\n  border-radius: 8px;\n  padding: 12px 20px;\n  color: #16a34a;\n  font-size: 14px;\n  font-weight: 600;\n  width: fit-content;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: var(--primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-sm);\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--primary-light);\n}\n@media (max-width: 768px) {\n  .ps-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=profile-settings.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BoProfileSettingsComponent, { className: "BoProfileSettingsComponent", filePath: "src\\app\\backoffice\\profile-settings\\profile-settings.component.ts", lineNumber: 9 });
})();

// src/app/backoffice/projects-milestones/projects-milestones.component.ts
function BoProjectsMilestonesComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "span", 16);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 17);
    \u0275\u0275text(5, "Total Projects");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 15)(7, "span", 16);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 17);
    \u0275\u0275text(11, "Total Budget");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 15)(13, "span", 16);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 17);
    \u0275\u0275text(16, "Active");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 15)(18, "span", 16);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 17);
    \u0275\u0275text(21, "Completed");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.projects.length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(9, 4, ctx_r0.getTotalBudget(), "1.0-0"), " TND");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.getActiveCount());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.getCompletedCount());
  }
}
function BoProjectsMilestonesComponent_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("value", s_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r2 === "all" ? "All Status" : ctx_r0.getStatusLabel(s_r2));
  }
}
function BoProjectsMilestonesComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "div", 20);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading projects...");
    \u0275\u0275elementEnd()();
  }
}
function BoProjectsMilestonesComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "span", 22);
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 23);
    \u0275\u0275listener("click", function BoProjectsMilestonesComponent_div_29_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadProjectsWithMilestones());
    });
    \u0275\u0275elementStart(6, "span", 3);
    \u0275\u0275text(7, "\u{1F504}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "Retry");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function BoProjectsMilestonesComponent_div_30_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 28);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td")(10, "div", 29)(11, "div", 30);
    \u0275\u0275element(12, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "td")(16, "span", 32);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td");
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td")(22, "span", 33);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "td", 34)(25, "button", 35);
    \u0275\u0275listener("click", function BoProjectsMilestonesComponent_div_30_tr_21_Template_button_click_25_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.viewProject(p_r5.id));
    });
    \u0275\u0275elementStart(26, "span", 3);
    \u0275\u0275text(27, "\u{1F441}\uFE0F");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r5.companyName || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(8, 12, p_r5.totalBudget, "1.2-2"), " TND");
    \u0275\u0275advance(5);
    \u0275\u0275styleProp("width", p_r5.progress || 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", p_r5.progress || 0, "%");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", p_r5.completedMilestones || 0, "/", (p_r5.milestones == null ? null : p_r5.milestones.length) || 0, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(20, 15, p_r5.deadline, "MMM d, y"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap("badge-" + ctx_r0.getStatusClass(p_r5.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getStatusLabel(p_r5.status));
  }
}
function BoProjectsMilestonesComponent_div_30_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 36);
    \u0275\u0275text(2, "No projects found");
    \u0275\u0275elementEnd()();
  }
}
function BoProjectsMilestonesComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "table", 25)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Company");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Budget");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Milestones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Due Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275template(21, BoProjectsMilestonesComponent_div_30_tr_21_Template, 28, 18, "tr", 26)(22, BoProjectsMilestonesComponent_div_30_tr_22_Template, 3, 0, "tr", 27);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(21);
    \u0275\u0275property("ngForOf", ctx_r0.filteredProjects);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.filteredProjects.length === 0);
  }
}
var BoProjectsMilestonesComponent = class _BoProjectsMilestonesComponent {
  constructor(projectService, milestoneService, authService, router) {
    this.projectService = projectService;
    this.milestoneService = milestoneService;
    this.authService = authService;
    this.router = router;
    this.searchTerm = "";
    this.selectedStatus = "all";
    this.statuses = ["all", "OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
    this.projects = [];
    this.loading = false;
    this.error = null;
  }
  ngOnInit() {
    this.loadProjectsWithMilestones();
  }
  loadProjectsWithMilestones() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.error = "Please login to view projects";
      return;
    }
    this.loading = true;
    this.error = null;
    this.projectService.getCompanyProjects(currentUser.id).subscribe({
      next: (projects) => {
        this.projects = projects.map((p) => __spreadProps(__spreadValues({}, p), {
          milestones: [],
          completedMilestones: 0,
          progress: 0
        }));
        this.projects.forEach((project, index) => {
          this.milestoneService.getProjectMilestones(project.id).subscribe({
            next: (milestones) => {
              this.projects[index].milestones = milestones;
              const completed = milestones.filter((m) => m.status === "COMPLETED").length;
              this.projects[index].completedMilestones = completed;
              this.projects[index].progress = milestones.length > 0 ? Math.round(completed / milestones.length * 100) : 0;
            },
            error: (err) => console.error(`Error loading milestones for project ${project.id}:`, err)
          });
        });
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading projects:", err);
        this.error = "Failed to load projects. Please try again.";
        this.loading = false;
      }
    });
  }
  get filteredProjects() {
    return this.projects.filter((p) => {
      const matchStatus = this.selectedStatus === "all" || p.status === this.selectedStatus;
      const matchSearch = !this.searchTerm || p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || p.companyName && p.companyName.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    });
  }
  viewProject(id) {
    this.router.navigate(["/backoffice/projects", id]);
  }
  getStatusClass(status) {
    const map = {
      OPEN: "success",
      IN_PROGRESS: "primary",
      COMPLETED: "success",
      CANCELLED: "danger"
    };
    return map[status] || "primary";
  }
  getStatusLabel(status) {
    const map = {
      OPEN: "Open",
      IN_PROGRESS: "In Progress",
      COMPLETED: "Completed",
      CANCELLED: "Cancelled"
    };
    return map[status] || status;
  }
  getTotalBudget() {
    return this.projects.reduce((sum, p) => sum + (p.totalBudget || 0), 0);
  }
  getActiveCount() {
    return this.projects.filter((p) => p.status === "IN_PROGRESS" || p.status === "OPEN").length;
  }
  getCompletedCount() {
    return this.projects.filter((p) => p.status === "COMPLETED").length;
  }
  static {
    this.\u0275fac = function BoProjectsMilestonesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BoProjectsMilestonesComponent)(\u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(MilestoneService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BoProjectsMilestonesComponent, selectors: [["app-bo-projects-milestones"]], decls: 31, vars: 7, consts: [[1, "bo-page"], [1, "bo-page-header"], [1, "btn-primary-action"], [1, "icon"], ["class", "stats-row", 4, "ngIf"], [1, "bo-filters-bar"], ["type", "text", "placeholder", "\u{1F50D} Search projects...", 1, "bo-filter-input", 3, "ngModelChange", "ngModel"], [1, "bo-filter-select", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "bo-filter-spacer"], [1, "btn-icon"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "bo-table-card", 4, "ngIf"], [1, "stats-row"], [1, "mini-stat"], [1, "ms-val"], [1, "ms-label"], [3, "value"], [1, "loading-state"], [1, "spinner"], [1, "error-state"], [1, "error-icon"], [1, "btn-warning", 3, "click"], [1, "bo-table-card"], [1, "bo-data-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "budget-cell"], [1, "progress-cell"], [1, "prog-bar"], [1, "prog-fill"], [1, "milestone-chip"], [1, "badge"], [1, "bo-actions-cell"], ["data-tooltip", "View Project", "aria-label", "View project details", 1, "action-icon-view", "action-icon-tooltip", 3, "click"], ["colspan", "8", 1, "bo-empty-row"]], template: function BoProjectsMilestonesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
        \u0275\u0275text(4, "Projects & Milestones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Monitor all projects and their milestone progress");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 2)(8, "span", 3);
        \u0275\u0275text(9, "\u2728");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "New Project");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(12, BoProjectsMilestonesComponent_div_12_Template, 22, 7, "div", 4);
        \u0275\u0275elementStart(13, "div", 5)(14, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function BoProjectsMilestonesComponent_Template_input_ngModelChange_14_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "select", 7);
        \u0275\u0275twoWayListener("ngModelChange", function BoProjectsMilestonesComponent_Template_select_ngModelChange_15_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedStatus, $event) || (ctx.selectedStatus = $event);
          return $event;
        });
        \u0275\u0275template(16, BoProjectsMilestonesComponent_option_16_Template, 2, 2, "option", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275element(17, "div", 9);
        \u0275\u0275elementStart(18, "button", 10)(19, "span", 3);
        \u0275\u0275text(20, "\u{1F4C4}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span");
        \u0275\u0275text(22, "CSV");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "button", 10)(24, "span", 3);
        \u0275\u0275text(25, "\u{1F4CA}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "span");
        \u0275\u0275text(27, "Excel");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(28, BoProjectsMilestonesComponent_div_28_Template, 4, 0, "div", 11)(29, BoProjectsMilestonesComponent_div_29_Template, 10, 1, "div", 12)(30, BoProjectsMilestonesComponent_div_30_Template, 23, 2, "div", 13);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error);
        \u0275\u0275advance(2);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedStatus);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.statuses);
        \u0275\u0275advance(12);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error);
      }
    }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe, DatePipe], styles: ["\n\n.budget-cell[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--success);\n}\n.progress-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.progress-cell[_ngcontent-%COMP%]   .prog-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 80px;\n  height: 5px;\n  background: var(--bo-bg-primary);\n  border-radius: 3px;\n}\n.progress-cell[_ngcontent-%COMP%]   .prog-bar[_ngcontent-%COMP%]   .prog-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: var(--primary);\n  border-radius: 3px;\n  transition: width 0.5s;\n}\n.progress-cell[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--bo-text-secondary);\n  white-space: nowrap;\n}\n.milestone-chip[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 600;\n  background: rgba(79, 110, 247, 0.1);\n  color: var(--primary);\n}\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 20px;\n  gap: 16px;\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: var(--radius-md);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid var(--bo-border);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 14px;\n  font-weight: 500;\n}\n.error-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  opacity: 0.5;\n}\n.btn-retry[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background: var(--primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-sm);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n}\n.btn-retry[_ngcontent-%COMP%]:hover {\n  background: var(--primary-light);\n  transform: translateY(-1px);\n}\n/*# sourceMappingURL=projects-milestones.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BoProjectsMilestonesComponent, { className: "BoProjectsMilestonesComponent", filePath: "src\\app\\backoffice\\projects-milestones\\projects-milestones.component.ts", lineNumber: 19 });
})();

// src/app/backoffice/subscription-management/subscription-management.component.ts
function BoSubscriptionManagementComponent_option_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "titlecase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    \u0275\u0275property("value", p_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 2, p_r1));
  }
}
function BoSubscriptionManagementComponent_tr_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 18)(2, "div", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td")(8, "span", 20);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 21);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td")(20, "span", 22);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "td", 23)(24, "button", 24);
    \u0275\u0275text(25, "\u{1F441}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 25);
    \u0275\u0275text(27, "\u270F\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 26);
    \u0275\u0275text(29, "\u{1F5D1}");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const sub_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sub_r2.user[0]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sub_r2.user, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sub_r2.email);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("badge-" + ctx_r2.getPlanClass(sub_r2.plan));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 11, sub_r2.plan));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sub_r2.amount > 0 ? sub_r2.amount + " " + sub_r2.currency : "Free");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 13, sub_r2.startDate, "MMM d, y"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sub_r2.nextBilling === "-" ? "\u2014" : \u0275\u0275pipeBind2(18, 16, sub_r2.nextBilling, "MMM d, y"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", sub_r2.status === "active" ? "badge-success" : "badge-danger");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 19, sub_r2.status), " ");
  }
}
function BoSubscriptionManagementComponent_tr_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 27);
    \u0275\u0275text(2, "No subscriptions found");
    \u0275\u0275elementEnd()();
  }
}
var BoSubscriptionManagementComponent = class _BoSubscriptionManagementComponent {
  constructor() {
    this.searchTerm = "";
    this.selectedPlan = "all";
    this.plans = ["all", "free", "pro", "elite"];
    this.subscriptions = [
      { id: 1, user: "Karim Mansouri", email: "karim@gmail.com", plan: "pro", amount: 29, currency: "TND", startDate: "2025-01-01", nextBilling: "2025-03-01", status: "active" },
      { id: 2, user: "Sara Belhaj", email: "sara@gmail.com", plan: "elite", amount: 69, currency: "TND", startDate: "2025-02-01", nextBilling: "2025-03-01", status: "active" },
      { id: 3, user: "Ahmed Riahi", email: "ahmed@gmail.com", plan: "free", amount: 0, currency: "TND", startDate: "2025-01-15", nextBilling: "-", status: "active" },
      { id: 4, user: "Yasmine Karoui", email: "yasmine@gmail.com", plan: "pro", amount: 29, currency: "TND", startDate: "2024-12-01", nextBilling: "2025-03-01", status: "cancelled" }
    ];
  }
  get filteredSubscriptions() {
    return this.subscriptions.filter((s) => {
      const matchPlan = this.selectedPlan === "all" || s.plan === this.selectedPlan;
      const matchSearch = !this.searchTerm || s.user.toLowerCase().includes(this.searchTerm.toLowerCase()) || s.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchPlan && matchSearch;
    });
  }
  get totalMRR() {
    return this.subscriptions.filter((s) => s.status === "active").reduce((sum, s) => sum + s.amount, 0);
  }
  ngOnInit() {
  }
  getPlanClass(plan) {
    return { free: "muted", pro: "primary", elite: "warning" }[plan] || "primary";
  }
  static {
    this.\u0275fac = function BoSubscriptionManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BoSubscriptionManagementComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BoSubscriptionManagementComponent, selectors: [["app-bo-subscription-management"]], decls: 62, vars: 7, consts: [[1, "bo-page"], [1, "bo-page-header"], [1, "btn-primary"], [1, "stats-row"], [1, "mini-stat"], [1, "ms-val"], [1, "ms-label"], [1, "bo-filters-bar"], ["type", "text", "placeholder", "\u{1F50D} Search subscribers...", 1, "bo-filter-input", 3, "ngModelChange", "ngModel"], [1, "bo-filter-select", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "bo-filter-spacer"], [1, "btn-export"], [1, "bo-table-card"], [1, "bo-data-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "value"], [1, "user-cell"], [1, "avatar"], [1, "badge"], [1, "amount-cell"], [1, "badge", 3, "ngClass"], [1, "bo-actions-cell"], [1, "btn-action", "view"], [1, "btn-action", "edit"], [1, "btn-action", "delete"], ["colspan", "8", 1, "bo-empty-row"]], template: function BoSubscriptionManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
        \u0275\u0275text(4, "Subscription Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Monitor all user subscriptions and revenue");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 2);
        \u0275\u0275text(8, "+ Add Plan");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "span", 5);
        \u0275\u0275text(12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "span", 6);
        \u0275\u0275text(14, "Total Subscribers");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 4)(16, "span", 5);
        \u0275\u0275text(17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "span", 6);
        \u0275\u0275text(19, "Monthly Revenue");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div", 4)(21, "span", 5);
        \u0275\u0275text(22, "2");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "span", 6);
        \u0275\u0275text(24, "Pro Users");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "div", 4)(26, "span", 5);
        \u0275\u0275text(27, "1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "span", 6);
        \u0275\u0275text(29, "Elite Users");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(30, "div", 7)(31, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function BoSubscriptionManagementComponent_Template_input_ngModelChange_31_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "select", 9);
        \u0275\u0275twoWayListener("ngModelChange", function BoSubscriptionManagementComponent_Template_select_ngModelChange_32_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedPlan, $event) || (ctx.selectedPlan = $event);
          return $event;
        });
        \u0275\u0275template(33, BoSubscriptionManagementComponent_option_33_Template, 3, 4, "option", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275element(34, "div", 11);
        \u0275\u0275elementStart(35, "button", 12);
        \u0275\u0275text(36, "\u{1F4C4} CSV");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "button", 12);
        \u0275\u0275text(38, "\u{1F4CA} Excel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(39, "div", 13)(40, "table", 14)(41, "thead")(42, "tr")(43, "th");
        \u0275\u0275text(44, "User");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "th");
        \u0275\u0275text(46, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "th");
        \u0275\u0275text(48, "Plan");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "th");
        \u0275\u0275text(50, "Amount");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "th");
        \u0275\u0275text(52, "Start Date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "th");
        \u0275\u0275text(54, "Next Billing");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "th");
        \u0275\u0275text(56, "Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "th");
        \u0275\u0275text(58, "Actions");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(59, "tbody");
        \u0275\u0275template(60, BoSubscriptionManagementComponent_tr_60_Template, 30, 21, "tr", 15)(61, BoSubscriptionManagementComponent_tr_61_Template, 3, 0, "tr", 16);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275textInterpolate(ctx.subscriptions.length);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("", ctx.totalMRR, " TND");
        \u0275\u0275advance(14);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedPlan);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.plans);
        \u0275\u0275advance(27);
        \u0275\u0275property("ngForOf", ctx.filteredSubscriptions);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filteredSubscriptions.length === 0);
      }
    }, dependencies: [NgClass, NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, TitleCasePipe, DatePipe], styles: ["\n\n.user-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.user-cell[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--accent-secondary));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 11px;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.amount-cell[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--success);\n}\n/*# sourceMappingURL=subscription-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BoSubscriptionManagementComponent, { className: "BoSubscriptionManagementComponent", filePath: "src\\app\\backoffice\\subscription-management\\subscription-management.component.ts", lineNumber: 8 });
})();

// src/app/backoffice/user-management/user-management.component.ts
function UserManagementComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function UserManagementComponent_button_10_Template_button_click_0_listener() {
      const tab_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTab = tab_r2.id);
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 23);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activeTab === tab_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r2.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tab_r2.count);
  }
}
function UserManagementComponent_tr_61_span_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1, "\u2705 Verified");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_tr_61_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function UserManagementComponent_tr_61_button_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const user_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.verifyUser(user_r6));
    });
    \u0275\u0275text(1, "Verify \u2192");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_tr_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 24)(2, "div", 25);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 26)(5, "span", 27);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 28);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "span", 29);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td")(16, "span", 29);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td")(20, "span", 30);
    \u0275\u0275element(21, "span", 31);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "td");
    \u0275\u0275template(25, UserManagementComponent_tr_61_span_25_Template, 2, 0, "span", 32)(26, UserManagementComponent_tr_61_button_26_Template, 2, 0, "button", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "td");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "td");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "td");
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "td", 34)(35, "button", 35);
    \u0275\u0275text(36, "\u{1F441}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 36);
    \u0275\u0275text(38, "\u270F\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 37);
    \u0275\u0275listener("click", function UserManagementComponent_tr_61_Template_button_click_39_listener() {
      const user_r6 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openBanModal(user_r6));
    });
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classMap("avatar-" + user_r6.role);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getInitials(user_r6.name));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4CD} ", user_r6.city, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r6.email);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("badge-" + ctx_r2.getRoleClass(user_r6.role));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 22, user_r6.role));
    \u0275\u0275advance(3);
    \u0275\u0275classMap("badge-" + ctx_r2.getPlanClass(user_r6.plan));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 24, user_r6.plan));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(user_r6.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(23, 26, user_r6.status), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", user_r6.verified);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !user_r6.verified);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r6.rating ? "\u2B50 " + user_r6.rating : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r6.projects);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(33, 28, user_r6.joined, "MMM y"));
    \u0275\u0275advance(7);
    \u0275\u0275propertyInterpolate("title", user_r6.status === "banned" ? "Unban" : "Ban");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r6.status === "banned" ? "\u{1F513}" : "\u{1F6AB}", " ");
  }
}
function UserManagementComponent_tr_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 40);
    \u0275\u0275text(2, "No users found for this filter");
    \u0275\u0275elementEnd()();
  }
}
function UserManagementComponent_div_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275listener("click", function UserManagementComponent_div_63_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showBanModal = false);
    });
    \u0275\u0275elementStart(1, "div", 42);
    \u0275\u0275listener("click", function UserManagementComponent_div_63_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 43);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Are you sure you want to ");
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, "?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 44)(14, "button", 45);
    \u0275\u0275listener("click", function UserManagementComponent_div_63_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showBanModal = false);
    });
    \u0275\u0275text(15, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 46);
    \u0275\u0275listener("click", function UserManagementComponent_div_63_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmBan());
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((ctx_r2.selectedUser == null ? null : ctx_r2.selectedUser.status) === "banned" ? "\u{1F513}" : "\u{1F6AB}");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r2.selectedUser == null ? null : ctx_r2.selectedUser.status) === "banned" ? "Unban User" : "Ban User");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((ctx_r2.selectedUser == null ? null : ctx_r2.selectedUser.status) === "banned" ? "unban" : "ban");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.selectedUser == null ? null : ctx_r2.selectedUser.name);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("danger", (ctx_r2.selectedUser == null ? null : ctx_r2.selectedUser.status) !== "banned");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Confirm ", (ctx_r2.selectedUser == null ? null : ctx_r2.selectedUser.status) === "banned" ? "Unban" : "Ban", " ");
  }
}
var UserManagementComponent = class _UserManagementComponent {
  constructor() {
    this.activeTab = "all";
    this.searchTerm = "";
    this.selectedRole = "all";
    this.selectedStatus = "all";
    this.showBanModal = false;
    this.selectedUser = null;
    this.tabs = [
      { id: "all", label: "All Users", count: 6 },
      { id: "freelancers", label: "Freelancers", count: 3 },
      { id: "clients", label: "Clients", count: 2 },
      { id: "admins", label: "Admins", count: 1 }
    ];
    this.users = [
      { id: 1, name: "Karim Mansouri", email: "karim@gmail.com", role: "freelancer", city: "Tunis", status: "active", verified: true, rating: 4.9, projects: 12, joined: "2024-10-01", plan: "pro" },
      { id: 2, name: "Sara Belhaj", email: "sara@gmail.com", role: "freelancer", city: "Sfax", status: "active", verified: true, rating: 4.7, projects: 8, joined: "2024-11-15", plan: "elite" },
      { id: 3, name: "Ahmed Riahi", email: "ahmed@gmail.com", role: "client", city: "Tunis", status: "active", verified: false, rating: null, projects: 3, joined: "2025-01-10", plan: "free" },
      { id: 4, name: "Yasmine Karoui", email: "yasmine@gmail.com", role: "freelancer", city: "Sousse", status: "banned", verified: true, rating: 4.2, projects: 5, joined: "2024-09-01", plan: "pro" },
      { id: 5, name: "Mohamed Ben Ali", email: "mba@gmail.com", role: "client", city: "Bizerte", status: "inactive", verified: false, rating: null, projects: 1, joined: "2025-02-01", plan: "free" },
      { id: 6, name: "Admin Matchy", email: "admin@matchy.tn", role: "admin", city: "Tunis", status: "active", verified: true, rating: null, projects: 0, joined: "2024-01-01", plan: "elite" }
    ];
  }
  get filteredUsers() {
    return this.users.filter((u) => {
      const matchTab = this.activeTab === "all" || this.activeTab === "freelancers" && u.role === "freelancer" || this.activeTab === "clients" && u.role === "client" || this.activeTab === "admins" && u.role === "admin";
      const matchSearch = !this.searchTerm || u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || u.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchRole = this.selectedRole === "all" || u.role === this.selectedRole;
      const matchStatus = this.selectedStatus === "all" || u.status === this.selectedStatus;
      return matchTab && matchSearch && matchRole && matchStatus;
    });
  }
  ngOnInit() {
  }
  openBanModal(user) {
    this.selectedUser = user;
    this.showBanModal = true;
  }
  confirmBan() {
    if (this.selectedUser) {
      this.selectedUser.status = this.selectedUser.status === "banned" ? "active" : "banned";
    }
    this.showBanModal = false;
    this.selectedUser = null;
  }
  verifyUser(user) {
    user.verified = true;
  }
  getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  }
  getRoleClass(role) {
    return { admin: "danger", client: "primary", freelancer: "success" }[role] || "primary";
  }
  getPlanClass(plan) {
    return { free: "muted", pro: "primary", elite: "warning" }[plan] || "primary";
  }
  static {
    this.\u0275fac = function UserManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UserManagementComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserManagementComponent, selectors: [["app-user-management"]], decls: 64, vars: 7, consts: [[1, "bo-page"], [1, "bo-page-header"], [1, "btn-primary"], [1, "tab-bar"], ["class", "tab-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "bo-filters-bar"], ["type", "text", "placeholder", "\u{1F50D} Search users...", 1, "bo-filter-input", 3, "ngModelChange", "ngModel"], [1, "bo-filter-select", 3, "ngModelChange", "ngModel"], ["value", "all"], ["value", "admin"], ["value", "client"], ["value", "freelancer"], ["value", "active"], ["value", "inactive"], ["value", "banned"], [1, "bo-filter-spacer"], [1, "btn-export"], [1, "bo-table-card"], [1, "bo-data-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "tab-btn", 3, "click"], [1, "tab-count"], [1, "user-cell"], [1, "avatar-circle"], [1, "user-detail"], [1, "user-name"], [1, "user-city"], [1, "badge"], [1, "status-chip"], [1, "dot"], ["class", "verified-badge", 4, "ngIf"], ["class", "btn-verify", 3, "click", 4, "ngIf"], [1, "bo-actions-cell"], ["title", "View profile", 1, "btn-action", "view"], ["title", "Edit user", 1, "btn-action", "edit"], [1, "btn-action", "delete", 3, "click", "title"], [1, "verified-badge"], [1, "btn-verify", 3, "click"], ["colspan", "10", 1, "bo-empty-row"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-icon"], [1, "modal-actions"], [1, "btn-cancel", 3, "click"], [1, "btn-confirm", 3, "click"]], template: function UserManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
        \u0275\u0275text(4, "User Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Full control over all registered users");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 2);
        \u0275\u0275text(8, "+ Add User");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 3);
        \u0275\u0275template(10, UserManagementComponent_button_10_Template, 4, 4, "button", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 5)(12, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_Template_input_ngModelChange_12_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "select", 7);
        \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_Template_select_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedRole, $event) || (ctx.selectedRole = $event);
          return $event;
        });
        \u0275\u0275elementStart(14, "option", 8);
        \u0275\u0275text(15, "All Roles");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "option", 9);
        \u0275\u0275text(17, "Admin");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "option", 10);
        \u0275\u0275text(19, "Client");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "option", 11);
        \u0275\u0275text(21, "Freelancer");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "select", 7);
        \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_Template_select_ngModelChange_22_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedStatus, $event) || (ctx.selectedStatus = $event);
          return $event;
        });
        \u0275\u0275elementStart(23, "option", 8);
        \u0275\u0275text(24, "All Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "option", 12);
        \u0275\u0275text(26, "Active");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "option", 13);
        \u0275\u0275text(28, "Inactive");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "option", 14);
        \u0275\u0275text(30, "Banned");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(31, "div", 15);
        \u0275\u0275elementStart(32, "button", 16);
        \u0275\u0275text(33, "\u{1F4C4} CSV");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "button", 16);
        \u0275\u0275text(35, "\u{1F4CA} Excel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "div", 17)(37, "table", 18)(38, "thead")(39, "tr")(40, "th");
        \u0275\u0275text(41, "User");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "th");
        \u0275\u0275text(43, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "th");
        \u0275\u0275text(45, "Role");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "th");
        \u0275\u0275text(47, "Plan");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "th");
        \u0275\u0275text(49, "Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "th");
        \u0275\u0275text(51, "Verified");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "th");
        \u0275\u0275text(53, "Rating");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "th");
        \u0275\u0275text(55, "Projects");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "th");
        \u0275\u0275text(57, "Joined");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "th");
        \u0275\u0275text(59, "Actions");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(60, "tbody");
        \u0275\u0275template(61, UserManagementComponent_tr_61_Template, 41, 31, "tr", 19)(62, UserManagementComponent_tr_62_Template, 3, 0, "tr", 20);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(63, UserManagementComponent_div_63_Template, 18, 7, "div", 21);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275property("ngForOf", ctx.tabs);
        \u0275\u0275advance(2);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedRole);
        \u0275\u0275advance(9);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedStatus);
        \u0275\u0275advance(39);
        \u0275\u0275property("ngForOf", ctx.filteredUsers);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filteredUsers.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showBanModal);
      }
    }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, TitleCasePipe, DatePipe], styles: ["\n\n.tab-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  background: var(--bo-bg-secondary);\n  border: 1px solid var(--bo-border);\n  border-radius: 10px;\n  padding: 4px;\n  width: fit-content;\n  flex-wrap: wrap;\n}\n.tab-btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 7px;\n  border: none;\n  background: transparent;\n  color: var(--bo-text-secondary);\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  background: var(--primary);\n  color: white;\n}\n.tab-btn[_ngcontent-%COMP%]   .tab-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 20px;\n  height: 18px;\n  padding: 0 5px;\n  background: rgba(0, 0, 0, 0.15);\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 700;\n  margin-left: 6px;\n}\n.user-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.user-cell[_ngcontent-%COMP%]   .avatar-circle[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 12px;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.user-cell[_ngcontent-%COMP%]   .avatar-circle.avatar-freelancer[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #6366f1);\n}\n.user-cell[_ngcontent-%COMP%]   .avatar-circle.avatar-client[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #06b6d4,\n      #4f6ef7);\n}\n.user-cell[_ngcontent-%COMP%]   .avatar-circle.avatar-admin[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.user-cell[_ngcontent-%COMP%]   .user-detail[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.user-cell[_ngcontent-%COMP%]   .user-detail[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 13px;\n}\n.user-cell[_ngcontent-%COMP%]   .user-detail[_ngcontent-%COMP%]   .user-city[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--bo-text-secondary);\n}\n.status-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 4px 10px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.status-chip[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n}\n.status-chip.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  color: #16a34a;\n}\n.status-chip.active[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: #22c55e;\n}\n.status-chip.inactive[_ngcontent-%COMP%] {\n  background: rgba(100, 116, 139, 0.1);\n  color: #64748b;\n}\n.status-chip.inactive[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: #64748b;\n}\n.status-chip.banned[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  color: #dc2626;\n}\n.status-chip.banned[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n.verified-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #16a34a;\n  font-weight: 600;\n}\n.btn-verify[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border: 1px solid rgba(79, 110, 247, 0.3);\n  border-radius: 6px;\n  background: rgba(79, 110, 247, 0.08);\n  color: var(--primary);\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-verify[_ngcontent-%COMP%]:hover {\n  background: rgba(79, 110, 247, 0.15);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  backdrop-filter: blur(4px);\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: var(--radius-xl);\n  padding: 40px;\n  max-width: 400px;\n  width: 90%;\n  text-align: center;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);\n}\n.modal-card[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n}\n.modal-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--bo-text-primary);\n  margin-bottom: 10px;\n}\n.modal-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--bo-text-secondary);\n  font-size: 14px;\n  line-height: 1.6;\n}\n.modal-card[_ngcontent-%COMP%]   .modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 24px;\n}\n.modal-card[_ngcontent-%COMP%]   .modal-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px;\n  border: 1px solid var(--bo-border);\n  border-radius: 10px;\n  background: transparent;\n  color: var(--bo-text-secondary);\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n}\n.modal-card[_ngcontent-%COMP%]   .modal-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px;\n  border: none;\n  border-radius: 10px;\n  background: var(--success);\n  color: white;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n}\n.modal-card[_ngcontent-%COMP%]   .modal-actions[_ngcontent-%COMP%]   .btn-confirm.danger[_ngcontent-%COMP%] {\n  background: var(--danger);\n}\n/*# sourceMappingURL=user-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserManagementComponent, { className: "UserManagementComponent", filePath: "src\\app\\backoffice\\user-management\\user-management.component.ts", lineNumber: 8 });
})();

// src/app/frontoffice/guards/auth.guard.ts
var AuthGuard = class _AuthGuard {
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }
  canActivate(route, state) {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
  static {
    this.\u0275fac = function AuthGuard_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthGuard)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthGuard, factory: _AuthGuard.\u0275fac, providedIn: "root" });
  }
};

// src/app/backoffice/backoffice-routing.module.ts
var routes = [
  {
    path: "login",
    component: BoLoginComponent
  },
  {
    path: "",
    component: BoLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "users", component: UsersComponent },
      { path: "projects", component: ProjectsComponent },
      { path: "projects/:id", component: ProjectDetailsComponent },
      { path: "applications", component: ApplicationsComponent },
      { path: "interviews", component: InterviewsComponent },
      { path: "submissions", component: SubmissionsComponent },
      { path: "reviews", component: ReviewsComponent },
      { path: "courses-resources", component: BoCoursesResourcesComponent },
      { path: "events", component: BoEventsComponent },
      { path: "profile-settings", component: BoProfileSettingsComponent },
      { path: "projects-milestones", component: BoProjectsMilestonesComponent },
      {
        path: "subscription-management",
        component: BoSubscriptionManagementComponent
      },
      { path: "user-management", component: UserManagementComponent }
    ]
  }
];
var BackofficeRoutingModule = class _BackofficeRoutingModule {
  static {
    this.\u0275fac = function BackofficeRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BackofficeRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _BackofficeRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/backoffice/backoffice.module.ts
var BackofficeModule = class _BackofficeModule {
  static {
    this.\u0275fac = function BackofficeModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BackofficeModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _BackofficeModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      BackofficeRoutingModule,
      SharedModule
    ] });
  }
};
export {
  BackofficeModule
};
//# sourceMappingURL=chunk-3ROMZ6ZZ.js.map
