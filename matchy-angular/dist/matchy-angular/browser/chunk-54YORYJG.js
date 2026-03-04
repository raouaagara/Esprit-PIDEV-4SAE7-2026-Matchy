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
  AsyncPipe,
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
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgForm,
  NgIf,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  RequiredValidator,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  SelectControlValueAccessor,
  TitleCasePipe,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveWindow,
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

// src/app/frontoffice/layout/fo-navbar/fo-navbar.component.ts
function FoNavbarComponent_li_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 18);
    \u0275\u0275text(2, "Browse Projects");
    \u0275\u0275elementEnd()();
  }
}
function FoNavbarComponent_li_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 19);
    \u0275\u0275text(2, "My Projects");
    \u0275\u0275elementEnd()();
  }
}
function FoNavbarComponent_li_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 20);
    \u0275\u0275text(2, "Subscription");
    \u0275\u0275elementEnd()();
  }
}
function FoNavbarComponent_li_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 21)(1, "span", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "span", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Hello, ", ctx_r0.authService.currentUser == null ? null : ctx_r0.authService.currentUser.firstName, "");
  }
}
function FoNavbarComponent_a_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 24);
    \u0275\u0275text(1, " \u2699\uFE0F ");
    \u0275\u0275elementEnd();
  }
}
function FoNavbarComponent_button_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function FoNavbarComponent_button_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goToDashboard());
    });
    \u0275\u0275text(1, " My Dashboard ");
    \u0275\u0275elementEnd();
  }
}
function FoNavbarComponent_a_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 26);
    \u0275\u0275text(1, " My Dashboard ");
    \u0275\u0275elementEnd();
  }
}
var FoNavbarComponent = class _FoNavbarComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.isScrolled = false;
    this.isMenuOpen = false;
  }
  onScroll() {
    this.isScrolled = window.scrollY > 30;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  goToDashboard() {
    const user = this.authService.currentUser;
    if (user?.userType === "COMPANY") {
      this.router.navigate(["/backoffice/dashboard"]);
    } else if (user?.userType === "FREELANCER") {
      this.router.navigate(["/dashboard"]);
    } else {
      this.router.navigate(["/"]);
    }
  }
  static {
    this.\u0275fac = function FoNavbarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FoNavbarComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FoNavbarComponent, selectors: [["app-fo-navbar"]], hostBindings: function FoNavbarComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("scroll", function FoNavbarComponent_scroll_HostBindingHandler() {
          return ctx.onScroll();
        }, false, \u0275\u0275resolveWindow);
      }
    }, decls: 34, vars: 13, consts: [[1, "fo-navbar"], [1, "nav-container"], ["routerLink", "/", 1, "nav-logo"], [1, "logo-icon"], [1, "logo-text"], [1, "logo-accent"], [1, "nav-links"], ["href", "#how-it-works", 1, "nav-link"], ["href", "#who-we-are", 1, "nav-link"], ["routerLink", "/events", 1, "nav-link"], ["routerLink", "/courses-resources", 1, "nav-link"], [4, "ngIf"], ["class", "nav-user", 4, "ngIf"], [1, "nav-actions"], ["routerLink", "/profile-settings", "class", "btn-profile", "title", "Profile Settings", 4, "ngIf"], ["class", "btn-dashboard", 3, "click", 4, "ngIf"], ["routerLink", "/backoffice/login", "class", "btn-dashboard", 4, "ngIf"], [1, "hamburger", 3, "click"], ["routerLink", "/projects", 1, "nav-link"], ["routerLink", "/projects-milestones", 1, "nav-link"], ["routerLink", "/subscription-management", 1, "nav-link"], [1, "nav-user"], [1, "user-greeting"], [1, "user-dot"], ["routerLink", "/profile-settings", "title", "Profile Settings", 1, "btn-profile"], [1, "btn-dashboard", 3, "click"], ["routerLink", "/backoffice/login", 1, "btn-dashboard"]], template: function FoNavbarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "nav", 0)(1, "div", 1)(2, "a", 2)(3, "div", 3);
        \u0275\u0275text(4, "M");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "span", 4);
        \u0275\u0275text(6, "Match");
        \u0275\u0275elementStart(7, "span", 5);
        \u0275\u0275text(8, "y");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(9, "ul", 6)(10, "li")(11, "a", 7);
        \u0275\u0275text(12, "How it works");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "li")(14, "a", 8);
        \u0275\u0275text(15, "Who we are");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "li")(17, "a", 9);
        \u0275\u0275text(18, "Events");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "li")(20, "a", 10);
        \u0275\u0275text(21, "Courses");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(22, FoNavbarComponent_li_22_Template, 3, 0, "li", 11)(23, FoNavbarComponent_li_23_Template, 3, 0, "li", 11)(24, FoNavbarComponent_li_24_Template, 3, 0, "li", 11)(25, FoNavbarComponent_li_25_Template, 4, 1, "li", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "div", 13);
        \u0275\u0275template(27, FoNavbarComponent_a_27_Template, 2, 0, "a", 14)(28, FoNavbarComponent_button_28_Template, 2, 0, "button", 15)(29, FoNavbarComponent_a_29_Template, 2, 0, "a", 16);
        \u0275\u0275elementStart(30, "button", 17);
        \u0275\u0275listener("click", function FoNavbarComponent_Template_button_click_30_listener() {
          return ctx.toggleMenu();
        });
        \u0275\u0275element(31, "span")(32, "span")(33, "span");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("scrolled", ctx.isScrolled);
        \u0275\u0275advance(9);
        \u0275\u0275classProp("open", ctx.isMenuOpen);
        \u0275\u0275advance(13);
        \u0275\u0275property("ngIf", ctx.authService.isAuthenticated);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.authService.isAuthenticated);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.authService.isAuthenticated);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.authService.isAuthenticated);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.authService.isAuthenticated);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.authService.isAuthenticated);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.authService.isAuthenticated);
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.isMenuOpen);
      }
    }, dependencies: [NgIf, RouterLink], styles: ["\n\n.fo-navbar[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 1000;\n  padding: 16px 0;\n  transition: all 0.3s ease;\n}\n.fo-navbar.scrolled[_ngcontent-%COMP%] {\n  background: rgba(10, 14, 39, 0.95);\n  backdrop-filter: blur(20px);\n  border-bottom: 1px solid var(--fo-border);\n  padding: 12px 0;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);\n}\n.nav-container[_ngcontent-%COMP%] {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 0 32px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n}\n.nav-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  text-decoration: none;\n}\n.nav-logo[_ngcontent-%COMP%]   .logo-icon[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--accent));\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-family: var(--font-display);\n  font-weight: 800;\n  font-size: 18px;\n}\n.nav-logo[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--fo-text-primary);\n  letter-spacing: -0.5px;\n}\n.nav-logo[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .logo-accent[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.nav-links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  list-style: none;\n  gap: 32px;\n  flex: 1;\n  justify-content: center;\n}\n.nav-links[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  color: var(--fo-text-secondary);\n  font-size: 14px;\n  font-weight: 500;\n  transition: color 0.2s;\n}\n.nav-links[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover {\n  color: var(--fo-text-primary);\n}\n.nav-links[_ngcontent-%COMP%]   .nav-user[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.nav-links[_ngcontent-%COMP%]   .nav-user[_ngcontent-%COMP%]   .user-greeting[_ngcontent-%COMP%] {\n  color: var(--fo-text-secondary);\n  font-size: 14px;\n}\n.nav-links[_ngcontent-%COMP%]   .nav-user[_ngcontent-%COMP%]   .user-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  background: var(--success);\n  border-radius: 50%;\n  box-shadow: 0 0 6px var(--success);\n}\n.nav-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.nav-actions[_ngcontent-%COMP%]   .btn-profile[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border-radius: var(--radius-sm);\n  background: rgba(255, 255, 255, 0.06);\n  border: 1px solid var(--fo-border);\n  font-size: 16px;\n  text-decoration: none;\n  transition: all 0.2s;\n}\n.nav-actions[_ngcontent-%COMP%]   .btn-profile[_ngcontent-%COMP%]:hover {\n  background: rgba(79, 110, 247, 0.15);\n  border-color: var(--primary);\n}\n.nav-actions[_ngcontent-%COMP%]   .btn-dashboard[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 10px 20px;\n  background: var(--primary);\n  color: white;\n  border-radius: var(--radius-sm);\n  font-size: 14px;\n  font-weight: 600;\n  font-family: var(--font-body);\n  cursor: pointer;\n  border: none;\n  transition: all 0.2s;\n  text-decoration: none;\n}\n.nav-actions[_ngcontent-%COMP%]   .btn-dashboard[_ngcontent-%COMP%]:hover {\n  background: var(--primary-light);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 16px rgba(79, 110, 247, 0.4);\n}\n.hamburger[_ngcontent-%COMP%] {\n  display: none;\n  flex-direction: column;\n  gap: 5px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n}\n.hamburger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  width: 22px;\n  height: 2px;\n  background: var(--fo-text-primary);\n  border-radius: 2px;\n  transition: all 0.3s;\n}\n.hamburger.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) {\n  transform: translateY(7px) rotate(45deg);\n}\n.hamburger.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  opacity: 0;\n}\n.hamburger.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) {\n  transform: translateY(-7px) rotate(-45deg);\n}\n@media (max-width: 768px) {\n  .nav-links[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .nav-links.open[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    position: absolute;\n    top: 100%;\n    left: 0;\n    right: 0;\n    background: var(--fo-bg-secondary);\n    padding: 20px;\n    border-bottom: 1px solid var(--fo-border);\n  }\n  .hamburger[_ngcontent-%COMP%] {\n    display: flex;\n  }\n}\n/*# sourceMappingURL=fo-navbar.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FoNavbarComponent, { className: "FoNavbarComponent", filePath: "src\\app\\frontoffice\\layout\\fo-navbar\\fo-navbar.component.ts", lineNumber: 10 });
})();

// src/app/frontoffice/layout/fo-footer/fo-footer.component.ts
var FoFooterComponent = class _FoFooterComponent {
  constructor() {
    this.year = (/* @__PURE__ */ new Date()).getFullYear();
  }
  static {
    this.\u0275fac = function FoFooterComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FoFooterComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FoFooterComponent, selectors: [["app-fo-footer"]], decls: 13, vars: 1, consts: [[1, "fo-footer"], [1, "footer-container"], [1, "footer-brand"], [1, "logo-icon"], [1, "logo-text"], [1, "accent"], [1, "footer-tagline"], [1, "footer-copy"]], template: function FoFooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "footer", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4, "M");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "span", 4);
        \u0275\u0275text(6, "Match");
        \u0275\u0275elementStart(7, "span", 5);
        \u0275\u0275text(8, "y");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(9, "p", 6);
        \u0275\u0275text(10, "#1 Tunisian Freelance Platform");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p", 7);
        \u0275\u0275text(12);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275textInterpolate1("\xA9 ", ctx.year, " Matchy. All rights reserved.");
      }
    }, styles: ["\n\n.fo-footer[_ngcontent-%COMP%] {\n  background: var(--fo-bg-secondary);\n  border-top: 1px solid var(--fo-border);\n  padding: 40px 32px;\n  text-align: center;\n}\n.footer-container[_ngcontent-%COMP%] {\n  max-width: 1280px;\n  margin: 0 auto;\n}\n.footer-brand[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 8px;\n  .logo-icon {\n    width: 30px;\n    height: 30px;\n    background:\n      linear-gradient(\n        135deg,\n        var(--primary),\n        var(--accent));\n    border-radius: 6px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: white;\n    font-weight: 800;\n    font-size: 16px;\n    font-family: var(--font-display);\n  }\n  .logo-text {\n    font-family: var(--font-display);\n    font-size: 18px;\n    font-weight: 700;\n    color: var(--fo-text-primary);\n    .accent {\n      color: var(--accent);\n    }\n  }\n}\n.footer-tagline[_ngcontent-%COMP%] {\n  color: var(--fo-text-muted);\n  font-size: 13px;\n  margin-bottom: 6px;\n}\n.footer-copy[_ngcontent-%COMP%] {\n  color: var(--fo-text-muted);\n  font-size: 12px;\n}\n/*# sourceMappingURL=fo-footer.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FoFooterComponent, { className: "FoFooterComponent", filePath: "src\\app\\frontoffice\\layout\\fo-footer\\fo-footer.component.ts", lineNumber: 43 });
})();

// src/app/frontoffice/layout/fo-sidebar/fo-sidebar.component.ts
function FoSidebarComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17)(4, "h3", 18);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 19);
    \u0275\u0275text(7, "Freelancer");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (ctx_r0.currentUser == null ? null : ctx_r0.currentUser.firstName == null ? null : ctx_r0.currentUser.firstName.charAt(0)) || "F", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r0.currentUser == null ? null : ctx_r0.currentUser.firstName, " ", ctx_r0.currentUser == null ? null : ctx_r0.currentUser.lastName, "");
  }
}
function FoSidebarComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (ctx_r0.currentUser == null ? null : ctx_r0.currentUser.firstName == null ? null : ctx_r0.currentUser.firstName.charAt(0)) || "F", " ");
  }
}
function FoSidebarComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "app-notification-bell");
    \u0275\u0275elementEnd();
  }
}
function FoSidebarComponent_a_6_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 27);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.description);
  }
}
function FoSidebarComponent_a_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 22)(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, FoSidebarComponent_a_6_div_3_Template, 5, 2, "div", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", item_r2.route)("title", ctx_r0.isCollapsed ? item_r2.label : "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.icon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isCollapsed);
  }
}
function FoSidebarComponent_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, ctx_r0.isDarkMode$) ? "Light Mode" : "Dark Mode", " ");
  }
}
function FoSidebarComponent_span_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, "Collapse");
    \u0275\u0275elementEnd();
  }
}
function FoSidebarComponent_span_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1, "Logout");
    \u0275\u0275elementEnd();
  }
}
var FoSidebarComponent = class _FoSidebarComponent {
  constructor(authService, darkModeService, router) {
    this.authService = authService;
    this.darkModeService = darkModeService;
    this.router = router;
    this.isCollapsed = false;
    this.isDarkMode$ = this.darkModeService.darkMode$;
    this.menuItems = [
      {
        icon: "\u{1F3E0}",
        label: "Dashboard",
        route: "/dashboard",
        description: "Overview & Stats"
      },
      {
        icon: "\u{1F50D}",
        label: "Browse Projects",
        route: "/projects",
        description: "Find new opportunities"
      },
      {
        icon: "\u{1F4CB}",
        label: "My Applications",
        route: "/my-applications",
        description: "Track your applications"
      },
      {
        icon: "\u{1F4BC}",
        label: "Active Projects",
        route: "/my-projects",
        description: "Projects you're working on"
      },
      {
        icon: "\u{1F4E4}",
        label: "Submit Work",
        route: "/submit-work",
        description: "Upload deliverables"
      },
      {
        icon: "\u2699\uFE0F",
        label: "Settings",
        route: "/profile-settings",
        description: "Profile & preferences"
      }
    ];
  }
  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
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
  static {
    this.\u0275fac = function FoSidebarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FoSidebarComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(DarkModeService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FoSidebarComponent, selectors: [["app-fo-sidebar"]], decls: 21, vars: 15, consts: [[1, "fo-sidebar"], [1, "sidebar-header"], ["class", "user-profile", 4, "ngIf"], ["class", "user-avatar-small", 4, "ngIf"], ["class", "sidebar-notification", 4, "ngIf"], [1, "sidebar-nav"], ["routerLinkActive", "active", "class", "nav-item", 3, "routerLink", "title", 4, "ngFor", "ngForOf"], [1, "sidebar-footer"], [1, "footer-btn", "dark-mode-toggle", 3, "click", "title"], [1, "toggle-icon"], ["class", "toggle-label", 4, "ngIf"], ["title", "Toggle Sidebar", 1, "footer-btn", "collapse-toggle", 3, "click"], [1, "footer-btn", "logout-btn", 3, "click", "title"], [1, "logout-icon"], ["class", "logout-label", 4, "ngIf"], [1, "user-profile"], [1, "user-avatar"], [1, "user-info"], [1, "user-name"], [1, "user-role"], [1, "user-avatar-small"], [1, "sidebar-notification"], ["routerLinkActive", "active", 1, "nav-item", 3, "routerLink", "title"], [1, "nav-icon"], ["class", "nav-content", 4, "ngIf"], [1, "nav-content"], [1, "nav-label"], [1, "nav-description"], [1, "toggle-label"], [1, "logout-label"]], template: function FoSidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1);
        \u0275\u0275template(2, FoSidebarComponent_div_2_Template, 8, 3, "div", 2)(3, FoSidebarComponent_div_3_Template, 2, 1, "div", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, FoSidebarComponent_div_4_Template, 2, 0, "div", 4);
        \u0275\u0275elementStart(5, "nav", 5);
        \u0275\u0275template(6, FoSidebarComponent_a_6_Template, 4, 4, "a", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 7)(8, "button", 8);
        \u0275\u0275listener("click", function FoSidebarComponent_Template_button_click_8_listener() {
          return ctx.toggleDarkMode();
        });
        \u0275\u0275elementStart(9, "span", 9);
        \u0275\u0275text(10);
        \u0275\u0275pipe(11, "async");
        \u0275\u0275elementEnd();
        \u0275\u0275template(12, FoSidebarComponent_span_12_Template, 3, 3, "span", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "button", 11);
        \u0275\u0275listener("click", function FoSidebarComponent_Template_button_click_13_listener() {
          return ctx.toggleSidebar();
        });
        \u0275\u0275elementStart(14, "span", 9);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, FoSidebarComponent_span_16_Template, 2, 0, "span", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "button", 12);
        \u0275\u0275listener("click", function FoSidebarComponent_Template_button_click_17_listener() {
          return ctx.logout();
        });
        \u0275\u0275elementStart(18, "span", 13);
        \u0275\u0275text(19, "\u{1F6AA}");
        \u0275\u0275elementEnd();
        \u0275\u0275template(20, FoSidebarComponent_span_20_Template, 2, 0, "span", 14);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("collapsed", ctx.isCollapsed);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.isCollapsed);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isCollapsed);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isCollapsed);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.menuItems);
        \u0275\u0275advance(2);
        \u0275\u0275property("title", ctx.isCollapsed ? "Toggle Dark Mode" : "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 13, ctx.isDarkMode$) ? "\u2600\uFE0F" : "\u{1F319}");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.isCollapsed);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.isCollapsed ? "\u2192" : "\u2190");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isCollapsed);
        \u0275\u0275advance();
        \u0275\u0275property("title", ctx.isCollapsed ? "Logout" : "");
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", !ctx.isCollapsed);
      }
    }, dependencies: [NgForOf, NgIf, RouterLink, RouterLinkActive, NotificationBellComponent, AsyncPipe], styles: ['\n\n.fo-sidebar[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  top: 0;\n  height: 100vh;\n  width: 280px;\n  background: rgba(255, 255, 255, 0.95);\n  backdrop-filter: blur(20px);\n  border-right: 1px solid rgba(0, 0, 0, 0.08);\n  display: flex;\n  flex-direction: column;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  z-index: 1000;\n  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.05);\n}\n.fo-sidebar.collapsed[_ngcontent-%COMP%] {\n  width: 80px;\n}\n.dark-mode[_nghost-%COMP%]   .fo-sidebar[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .fo-sidebar[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.95);\n  border-right-color: rgba(255, 255, 255, 0.1);\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  padding: 2rem 1.5rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n  transition: padding 0.3s ease;\n}\n.collapsed[_ngcontent-%COMP%]   .sidebar-header[_ngcontent-%COMP%] {\n  padding: 1.5rem 0.75rem;\n  text-align: center;\n}\n.dark-mode[_nghost-%COMP%]   .sidebar-header[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .sidebar-header[_ngcontent-%COMP%] {\n  border-bottom-color: rgba(255, 255, 255, 0.1);\n}\n.sidebar-notification[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n}\n.sidebar-notification[_ngcontent-%COMP%]     app-notification-bell {\n  display: block;\n}\n.sidebar-notification[_ngcontent-%COMP%]     app-notification-bell .notification-bell {\n  width: 100%;\n}\n.sidebar-notification[_ngcontent-%COMP%]     app-notification-bell .bell-button {\n  width: 100%;\n  justify-content: flex-start;\n  padding: 0.875rem 1rem;\n  gap: 1rem;\n}\n.sidebar-notification[_ngcontent-%COMP%]     app-notification-bell .bell-icon {\n  font-size: 1.5rem;\n}\n.sidebar-notification[_ngcontent-%COMP%]     app-notification-bell .badge {\n  position: relative;\n  top: auto;\n  right: auto;\n  margin-left: auto;\n}\n.dark-mode[_nghost-%COMP%]   .sidebar-notification[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .sidebar-notification[_ngcontent-%COMP%] {\n  border-bottom-color: rgba(255, 255, 255, 0.1);\n}\n.user-profile[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.user-avatar[_ngcontent-%COMP%], \n.user-avatar-small[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.25rem;\n  font-weight: 600;\n  flex-shrink: 0;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n.user-avatar-small[_ngcontent-%COMP%] {\n  margin: 0 auto;\n}\n.user-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #1a202c;\n  margin: 0 0 0.25rem 0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.dark-mode[_nghost-%COMP%]   .user-name[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .user-name[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.user-role[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #718096;\n  margin: 0;\n}\n.dark-mode[_nghost-%COMP%]   .user-role[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .user-role[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 1rem 0.75rem;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.2);\n  border-radius: 3px;\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.875rem 1rem;\n  margin-bottom: 0.5rem;\n  border-radius: 12px;\n  text-decoration: none;\n  color: #4a5568;\n  transition: all 0.2s ease;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n}\n.collapsed[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding: 0.875rem 0.5rem;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(102, 126, 234, 0.1);\n  color: #667eea;\n  transform: translateX(4px);\n}\n.collapsed[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]:hover {\n  transform: translateX(0) scale(1.05);\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n.nav-item.active[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 4px;\n  height: 100%;\n  background: white;\n  border-radius: 0 4px 4px 0;\n}\n.nav-item.active[_ngcontent-%COMP%]   .nav-description[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8);\n}\n.dark-mode[_nghost-%COMP%]   .nav-item[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n  color: #cbd5e0;\n}\n.dark-mode[_nghost-%COMP%]   .nav-item[_ngcontent-%COMP%]:hover, .dark-mode   [_nghost-%COMP%]   .nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(102, 126, 234, 0.2);\n  color: #a5b4fc;\n}\n.nav-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  flex-shrink: 0;\n  width: 32px;\n  text-align: center;\n}\n.nav-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n  flex: 1;\n  min-width: 0;\n}\n.nav-label[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 500;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.nav-description[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  opacity: 0.7;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  padding: 1rem 0.75rem;\n  border-top: 1px solid rgba(0, 0, 0, 0.08);\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.dark-mode[_nghost-%COMP%]   .sidebar-footer[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .sidebar-footer[_ngcontent-%COMP%] {\n  border-top-color: rgba(255, 255, 255, 0.1);\n}\n.footer-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  border: none;\n  border-radius: 8px;\n  background: rgba(0, 0, 0, 0.04);\n  color: #4a5568;\n  font-size: 0.875rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  width: 100%;\n}\n.collapsed[_ngcontent-%COMP%]   .footer-btn[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding: 0.75rem 0.5rem;\n}\n.footer-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.08);\n  transform: translateY(-2px);\n}\n.dark-mode[_nghost-%COMP%]   .footer-btn[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .footer-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: #cbd5e0;\n}\n.dark-mode[_nghost-%COMP%]   .footer-btn[_ngcontent-%COMP%]:hover, .dark-mode   [_nghost-%COMP%]   .footer-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n.dark-mode-toggle[_ngcontent-%COMP%]   .toggle-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  transition: transform 0.3s ease;\n}\n.dark-mode-toggle[_ngcontent-%COMP%]:hover   .toggle-icon[_ngcontent-%COMP%] {\n  transform: rotate(20deg) scale(1.1);\n}\n.logout-btn[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  color: #dc2626;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.2);\n}\n.dark-mode[_nghost-%COMP%]   .logout-btn[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .logout-btn[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #f87171;\n}\n.dark-mode[_nghost-%COMP%]   .logout-btn[_ngcontent-%COMP%]:hover, .dark-mode   [_nghost-%COMP%]   .logout-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.25);\n}\n.toggle-icon[_ngcontent-%COMP%], \n.logout-icon[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  flex-shrink: 0;\n}\n.toggle-label[_ngcontent-%COMP%], \n.logout-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n@media (max-width: 768px) {\n  .fo-sidebar[_ngcontent-%COMP%] {\n    transform: translateX(-100%);\n  }\n  .fo-sidebar.open[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n}\n/*# sourceMappingURL=fo-sidebar.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FoSidebarComponent, { className: "FoSidebarComponent", filePath: "src\\app\\frontoffice\\layout\\fo-sidebar\\fo-sidebar.component.ts", lineNumber: 11 });
})();

// src/app/frontoffice/layout/fo-layout.component.ts
function FoLayoutComponent_app_fo_navbar_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-fo-navbar");
  }
}
function FoLayoutComponent_app_fo_sidebar_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-fo-sidebar");
  }
}
function FoLayoutComponent_app_fo_footer_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-fo-footer");
  }
}
var FoLayoutComponent = class _FoLayoutComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  ngOnInit() {
    if (this.isFreelancer() && this.router.url === "/") {
      this.router.navigate(["/dashboard"]);
    }
  }
  isFreelancer() {
    return this.authService.isAuthenticated() && this.authService.currentUser?.userType === "FREELANCER";
  }
  static {
    this.\u0275fac = function FoLayoutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FoLayoutComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FoLayoutComponent, selectors: [["app-fo-layout"]], decls: 6, vars: 5, consts: [[1, "fo-layout"], [4, "ngIf"], [1, "fo-main"]], template: function FoLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, FoLayoutComponent_app_fo_navbar_1_Template, 1, 0, "app-fo-navbar", 1)(2, FoLayoutComponent_app_fo_sidebar_2_Template, 1, 0, "app-fo-sidebar", 1);
        \u0275\u0275elementStart(3, "main", 2);
        \u0275\u0275element(4, "router-outlet");
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, FoLayoutComponent_app_fo_footer_5_Template, 1, 0, "app-fo-footer", 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.authService.isAuthenticated());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isFreelancer());
        \u0275\u0275advance();
        \u0275\u0275classProp("with-sidebar", ctx.isFreelancer());
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.authService.isAuthenticated());
      }
    }, dependencies: [NgIf, RouterOutlet, FoNavbarComponent, FoFooterComponent, FoSidebarComponent], styles: ["\n\n.fo-layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background-color: var(--fo-bg-primary);\n}\n.fo-main[_ngcontent-%COMP%] {\n  flex: 1;\n  transition: margin-left 0.3s ease;\n}\n.fo-main.with-sidebar[_ngcontent-%COMP%] {\n  margin-left: 280px;\n}\n@media (max-width: 768px) {\n  .fo-main.with-sidebar[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n}\n/*# sourceMappingURL=fo-layout.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FoLayoutComponent, { className: "FoLayoutComponent", filePath: "src\\app\\frontoffice\\layout\\fo-layout.component.ts", lineNumber: 43 });
})();

// src/app/frontoffice/home/home.component.ts
function HomeComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "span", 28);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 29);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.label);
  }
}
function HomeComponent_div_29_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const card_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(card_r2.title);
  }
}
function HomeComponent_div_29_div_8_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u2B50");
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_div_29_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275template(1, HomeComponent_div_29_div_8_span_1_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const card_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.getStarsArray(card_r2.stars));
  }
}
function HomeComponent_div_29_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const card_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(card_r2.sub);
  }
}
function HomeComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 32)(5, "span", 33);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, HomeComponent_div_29_span_7_Template, 2, 1, "span", 34)(8, HomeComponent_div_29_div_8_Template, 2, 1, "div", 35)(9, HomeComponent_div_29_span_9_Template, 2, 1, "span", 36);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const card_r2 = ctx.$implicit;
    const i_r4 = ctx.index;
    \u0275\u0275styleProp("animation-delay", i_r4 * 0.15 + "s");
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", card_r2.iconBg + "20");
    \u0275\u0275advance();
    \u0275\u0275styleProp("filter", "drop-shadow(0 0 6px " + card_r2.iconBg + ")");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(card_r2.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(card_r2.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", card_r2.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", card_r2.stars);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", card_r2.sub);
  }
}
var HomeComponent = class _HomeComponent {
  constructor(router) {
    this.router = router;
    this.stats = [
      { value: "500+", label: "Freelancers" },
      { value: "1200+", label: "Projects" },
      { value: "98%", label: "Satisfaction" }
    ];
    this.projectCards = [
      {
        icon: "\u{1F4E6}",
        iconBg: "#f59e0b",
        label: "New project",
        title: "E-commerce mobile app",
        sub: "Budget: 2500 TND"
      },
      {
        icon: "\u2705",
        iconBg: "#22c55e",
        label: "Project delivered!",
        title: "Restaurant website",
        sub: "",
        stars: 5
      },
      {
        icon: "\u{1F680}",
        iconBg: "#a855f7",
        label: "12 applications",
        title: "",
        sub: "Awaiting your review"
      }
    ];
  }
  ngOnInit() {
  }
  getStarted() {
    this.router.navigate(["/backoffice/login"]);
  }
  getStarsArray(n) {
    return Array(n).fill(0);
  }
  static {
    this.\u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HomeComponent)(\u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 60, vars: 2, consts: [[1, "hero"], [1, "hero-bg"], [1, "bg-glow", "bg-glow-1"], [1, "bg-glow", "bg-glow-2"], [1, "bg-grid"], [1, "hero-container"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-accent"], [1, "hero-description"], [1, "hero-actions"], [1, "btn-primary", 3, "click"], ["routerLink", "/backoffice/login", 1, "btn-secondary"], [1, "hero-stats"], ["class", "stat", 4, "ngFor", "ngForOf"], [1, "hero-cards"], ["class", "project-card", 3, "animation-delay", 4, "ngFor", "ngForOf"], ["id", "how-it-works", 1, "features"], [1, "features-container"], [1, "section-title"], [1, "text-gradient"], [1, "section-sub"], [1, "features-grid"], [1, "feature-card"], [1, "feature-icon"], [1, "stat"], [1, "stat-value"], [1, "stat-label"], [1, "project-card"], [1, "card-icon"], [1, "card-content"], [1, "card-label"], ["class", "card-title", 4, "ngIf"], ["class", "card-stars", 4, "ngIf"], ["class", "card-sub", 4, "ngIf"], [1, "card-title"], [1, "card-stars"], [4, "ngFor", "ngForOf"], [1, "card-sub"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "div", 1);
        \u0275\u0275element(2, "div", 2)(3, "div", 3)(4, "div", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 5)(6, "div", 6)(7, "div", 7);
        \u0275\u0275element(8, "span", 8);
        \u0275\u0275text(9, " #1 Tunisian Freelance Platform ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "h1", 9);
        \u0275\u0275text(11, " Connect your");
        \u0275\u0275element(12, "br");
        \u0275\u0275text(13, " projects");
        \u0275\u0275element(14, "br");
        \u0275\u0275text(15, " with the best");
        \u0275\u0275element(16, "br");
        \u0275\u0275elementStart(17, "span", 10);
        \u0275\u0275text(18, "freelancers");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "p", 11);
        \u0275\u0275text(20, " Matchy connects Tunisian clients and freelancers for efficient, transparent, and secure collaborations. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "div", 12)(22, "button", 13);
        \u0275\u0275listener("click", function HomeComponent_Template_button_click_22_listener() {
          return ctx.getStarted();
        });
        \u0275\u0275text(23, " Get started for free \u2192 ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "button", 14);
        \u0275\u0275text(25, " I already have an account ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 15);
        \u0275\u0275template(27, HomeComponent_div_27_Template, 5, 2, "div", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "div", 17);
        \u0275\u0275template(29, HomeComponent_div_29_Template, 10, 11, "div", 18);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(30, "section", 19)(31, "div", 20)(32, "h2", 21);
        \u0275\u0275text(33, "How it ");
        \u0275\u0275elementStart(34, "span", 22);
        \u0275\u0275text(35, "works");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "p", 23);
        \u0275\u0275text(37, "Simple, fast, and secure in 3 steps");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "div", 24)(39, "div", 25)(40, "div", 26);
        \u0275\u0275text(41, "\u{1F4CB}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "h3");
        \u0275\u0275text(43, "Post your project");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "p");
        \u0275\u0275text(45, "Describe your project, set a budget and timeline, and publish it on the platform.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(46, "div", 25)(47, "div", 26);
        \u0275\u0275text(48, "\u{1F3AF}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "h3");
        \u0275\u0275text(50, "Receive applications");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "p");
        \u0275\u0275text(52, "Qualified freelancers apply. Review profiles, ratings, and portfolios easily.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(53, "div", 25)(54, "div", 26);
        \u0275\u0275text(55, "\u{1F3C6}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "h3");
        \u0275\u0275text(57, "Collaborate securely");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "p");
        \u0275\u0275text(59, "Work with your chosen freelancer with payment protection and milestone tracking.");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(27);
        \u0275\u0275property("ngForOf", ctx.stats);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.projectCards);
      }
    }, dependencies: [NgForOf, NgIf, RouterLink], styles: ["\n\n.hero[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  background: var(--fo-bg-primary);\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  padding-top: 80px;\n}\n.hero-bg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\n.hero-bg[_ngcontent-%COMP%]   .bg-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.15;\n}\n.hero-bg[_ngcontent-%COMP%]   .bg-glow.bg-glow-1[_ngcontent-%COMP%] {\n  width: 500px;\n  height: 500px;\n  background: var(--primary);\n  top: -100px;\n  right: -100px;\n  animation: _ngcontent-%COMP%_pulse 6s ease-in-out infinite;\n}\n.hero-bg[_ngcontent-%COMP%]   .bg-glow.bg-glow-2[_ngcontent-%COMP%] {\n  width: 350px;\n  height: 350px;\n  background: var(--accent-secondary);\n  bottom: -50px;\n  left: -50px;\n  animation: _ngcontent-%COMP%_pulse 8s ease-in-out infinite reverse;\n}\n.hero-bg[_ngcontent-%COMP%]   .bg-grid[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(79, 110, 247, 0.05) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(79, 110, 247, 0.05) 1px,\n      transparent 1px);\n  background-size: 50px 50px;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    transform: scale(1);\n    opacity: 0.15;\n  }\n  50% {\n    transform: scale(1.1);\n    opacity: 0.22;\n  }\n}\n.hero-container[_ngcontent-%COMP%] {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 80px 32px;\n  display: grid;\n  grid-template-columns: 1fr 420px;\n  gap: 80px;\n  align-items: center;\n  width: 100%;\n  position: relative;\n  z-index: 1;\n}\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: rgba(79, 110, 247, 0.12);\n  border: 1px solid rgba(79, 110, 247, 0.25);\n  border-radius: 20px;\n  color: var(--primary-light);\n  font-size: 13px;\n  font-weight: 600;\n  width: fit-content;\n}\n.hero-badge[_ngcontent-%COMP%]   .badge-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  background: var(--accent);\n  border-radius: 50%;\n  box-shadow: 0 0 8px var(--accent);\n  animation: _ngcontent-%COMP%_blink 2s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_blink {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.hero-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(42px, 5vw, 68px);\n  font-weight: 800;\n  line-height: 1.05;\n  color: var(--fo-text-primary);\n  letter-spacing: -2px;\n}\n.hero-title[_ngcontent-%COMP%]   .title-accent[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4f6ef7,\n      #00e5ff);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.hero-description[_ngcontent-%COMP%] {\n  color: var(--fo-text-secondary);\n  font-size: 16px;\n  line-height: 1.7;\n  max-width: 420px;\n}\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.hero-actions[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  padding: 14px 28px;\n  background: var(--primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-sm);\n  font-size: 15px;\n  font-weight: 600;\n  font-family: var(--font-body);\n  cursor: pointer;\n  transition: all 0.25s;\n}\n.hero-actions[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--primary-light);\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(79, 110, 247, 0.4);\n}\n.hero-actions[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  padding: 14px 28px;\n  background: transparent;\n  color: var(--fo-text-secondary);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-sm);\n  font-size: 15px;\n  font-weight: 500;\n  font-family: var(--font-body);\n  cursor: pointer;\n  transition: all 0.25s;\n}\n.hero-actions[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary);\n  color: var(--fo-text-primary);\n}\n.hero-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 40px;\n  padding-top: 8px;\n}\n.hero-stats[_ngcontent-%COMP%]   .stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.hero-stats[_ngcontent-%COMP%]   .stat[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 28px;\n  font-weight: 800;\n  color: var(--fo-text-primary);\n}\n.hero-stats[_ngcontent-%COMP%]   .stat[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--fo-text-muted);\n  margin-top: 2px;\n}\n.hero-cards[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.project-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 18px 20px;\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-md);\n  backdrop-filter: blur(10px);\n  animation: _ngcontent-%COMP%_slideInRight 0.5s ease both;\n  transition: all 0.25s;\n}\n.project-card[_ngcontent-%COMP%]:hover {\n  border-color: rgba(79, 110, 247, 0.4);\n  transform: translateX(-4px);\n  box-shadow: var(--shadow-glow);\n}\n.project-card[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.project-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.project-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .card-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--fo-text-primary);\n}\n.project-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--fo-text-muted);\n}\n.project-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .card-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--fo-text-muted);\n}\n.project-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .card-stars[_ngcontent-%COMP%] {\n  font-size: 12px;\n  letter-spacing: 1px;\n}\n@keyframes _ngcontent-%COMP%_slideInRight {\n  from {\n    opacity: 0;\n    transform: translateX(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n.features[_ngcontent-%COMP%] {\n  background: var(--fo-bg-secondary);\n  padding: 100px 32px;\n  border-top: 1px solid var(--fo-border);\n}\n.features-container[_ngcontent-%COMP%] {\n  max-width: 1280px;\n  margin: 0 auto;\n  text-align: center;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(32px, 4vw, 48px);\n  font-weight: 800;\n  color: var(--fo-text-primary);\n  margin-bottom: 12px;\n  letter-spacing: -1px;\n}\n.section-sub[_ngcontent-%COMP%] {\n  color: var(--fo-text-secondary);\n  font-size: 16px;\n  margin-bottom: 60px;\n}\n.features-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 24px;\n}\n.feature-card[_ngcontent-%COMP%] {\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-lg);\n  padding: 36px 28px;\n  text-align: left;\n  transition: all 0.3s;\n}\n.feature-card[_ngcontent-%COMP%]:hover {\n  border-color: rgba(79, 110, 247, 0.4);\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-glow);\n}\n.feature-card[_ngcontent-%COMP%]   .feature-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  margin-bottom: 20px;\n}\n.feature-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--fo-text-primary);\n  margin-bottom: 10px;\n}\n.feature-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--fo-text-secondary);\n  font-size: 15px;\n  line-height: 1.6;\n}\n@media (max-width: 900px) {\n  .hero-container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 48px;\n    padding: 60px 20px;\n  }\n  .hero-cards[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=home.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src\\app\\frontoffice\\home\\home.component.ts", lineNumber: 24 });
})();

// src/app/frontoffice/courses-resources/courses-resources.component.ts
function CoursesResourcesComponent_button_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function CoursesResourcesComponent_button_16_Template_button_click_0_listener() {
      const cat_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeCategory = cat_r2);
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "titlecase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activeCategory === cat_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 3, cat_r2), " ");
  }
}
function CoursesResourcesComponent_div_18_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "FREE");
    \u0275\u0275elementEnd();
  }
}
function CoursesResourcesComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "div", 16);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, CoursesResourcesComponent_div_18_span_4_Template, 2, 0, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 18)(6, "div", 19)(7, "span", 20);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "titlecase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 21);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "h3", 22);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 23);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 24)(17, "div", 25)(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "button", 26);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const course_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", course_r4.color + "15");
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", course_r4.color + "25");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(course_r4.icon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", course_r4.isFree);
    \u0275\u0275advance(3);
    \u0275\u0275classMap("badge-" + ctx_r2.getLevelClass(course_r4.level));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 17, course_r4.level));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u23F1 ", course_r4.duration, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(course_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(course_r4.description);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u{1F4D6} ", course_r4.lessons, " lessons");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F465} ", \u0275\u0275pipeBind1(22, 19, course_r4.students), "");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", course_r4.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", course_r4.isFree ? "Start Free" : "Enroll Now", " ");
  }
}
function CoursesResourcesComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "span");
    \u0275\u0275text(2, "\u{1F50D}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1('No courses found for "', ctx_r2.searchTerm, '"');
  }
}
var CoursesResourcesComponent = class _CoursesResourcesComponent {
  constructor() {
    this.activeCategory = "all";
    this.searchTerm = "";
    this.categories = ["all", "design", "development", "marketing", "business"];
    this.courses = [
      {
        id: 1,
        title: "UI/UX Design Fundamentals",
        description: "Master the principles of user interface and experience design.",
        category: "design",
        level: "beginner",
        duration: "6h 30m",
        icon: "\u{1F3A8}",
        color: "#a855f7",
        lessons: 24,
        students: 1240,
        isFree: true
      },
      {
        id: 2,
        title: "React & Angular Development",
        description: "Build modern web applications with popular JavaScript frameworks.",
        category: "development",
        level: "intermediate",
        duration: "12h 00m",
        icon: "\u269B\uFE0F",
        color: "#4f6ef7",
        lessons: 48,
        students: 2310,
        isFree: false
      },
      {
        id: 3,
        title: "Freelance Business Mastery",
        description: "Grow your freelance career with proven strategies and tools.",
        category: "business",
        level: "beginner",
        duration: "4h 00m",
        icon: "\u{1F4BC}",
        color: "#22c55e",
        lessons: 16,
        students: 870,
        isFree: true
      },
      {
        id: 4,
        title: "Digital Marketing Essentials",
        description: "Learn SEO, social media and content marketing from scratch.",
        category: "marketing",
        level: "beginner",
        duration: "5h 15m",
        icon: "\u{1F4E3}",
        color: "#f59e0b",
        lessons: 20,
        students: 1050,
        isFree: false
      },
      {
        id: 5,
        title: "Advanced Node.js & APIs",
        description: "Create scalable backend services and RESTful APIs with Node.",
        category: "development",
        level: "advanced",
        duration: "9h 45m",
        icon: "\u{1F7E2}",
        color: "#06b6d4",
        lessons: 36,
        students: 680,
        isFree: false
      },
      {
        id: 6,
        title: "Brand Identity Design",
        description: "Create memorable brand identities for clients and companies.",
        category: "design",
        level: "intermediate",
        duration: "7h 00m",
        icon: "\u2728",
        color: "#ec4899",
        lessons: 28,
        students: 940,
        isFree: true
      }
    ];
  }
  get filteredCourses() {
    return this.courses.filter((c) => {
      const matchCat = this.activeCategory === "all" || c.category === this.activeCategory;
      const matchSearch = !this.searchTerm || c.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }
  ngOnInit() {
  }
  getLevelClass(level) {
    return { beginner: "success", intermediate: "primary", advanced: "danger" }[level] || "primary";
  }
  static {
    this.\u0275fac = function CoursesResourcesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CoursesResourcesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CoursesResourcesComponent, selectors: [["app-courses-resources"]], decls: 20, vars: 4, consts: [[1, "courses-page"], [1, "page-hero"], [1, "hero-content"], [1, "hero-badge"], [1, "text-gradient"], [1, "search-bar"], [1, "search-icon"], ["type", "text", "placeholder", "Search courses...", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "filters"], ["class", "filter-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "courses-grid"], ["class", "course-card", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "filter-btn", 3, "click"], [1, "course-card"], [1, "card-top"], [1, "course-icon"], ["class", "free-badge", 4, "ngIf"], [1, "card-body"], [1, "card-meta"], [1, "badge"], [1, "duration"], [1, "course-title"], [1, "course-desc"], [1, "card-footer"], [1, "course-stats"], [1, "btn-enroll"], [1, "free-badge"], [1, "empty-state"]], template: function CoursesResourcesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4, "\u{1F4DA} Matchy Academy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1");
        \u0275\u0275text(6, "Courses & ");
        \u0275\u0275elementStart(7, "span", 4);
        \u0275\u0275text(8, "Resources");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "p");
        \u0275\u0275text(10, "Boost your skills and grow your freelance career with expert-led content.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 5)(12, "span", 6);
        \u0275\u0275text(13, "\u{1F50D}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "input", 7);
        \u0275\u0275twoWayListener("ngModelChange", function CoursesResourcesComponent_Template_input_ngModelChange_14_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(15, "div", 8);
        \u0275\u0275template(16, CoursesResourcesComponent_button_16_Template, 3, 5, "button", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "div", 10);
        \u0275\u0275template(18, CoursesResourcesComponent_div_18_Template, 25, 21, "div", 11)(19, CoursesResourcesComponent_div_19_Template, 5, 1, "div", 12);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(14);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.categories);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.filteredCourses);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filteredCourses.length === 0);
      }
    }, dependencies: [NgForOf, NgIf, DefaultValueAccessor, NgControlStatus, NgModel, DecimalPipe, TitleCasePipe], styles: ["\n\n.courses-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--fo-bg-primary);\n  padding: 100px 32px 60px;\n  max-width: 1280px;\n  margin: 0 auto;\n}\n.page-hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 32px;\n  margin-bottom: 40px;\n  flex-wrap: wrap;\n}\n.page-hero[_ngcontent-%COMP%]   .hero-content[_ngcontent-%COMP%]   .hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 14px;\n  background: rgba(168, 85, 247, 0.12);\n  border: 1px solid rgba(168, 85, 247, 0.25);\n  border-radius: 20px;\n  color: #c084fc;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n.page-hero[_ngcontent-%COMP%]   .hero-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(32px, 4vw, 52px);\n  font-weight: 800;\n  color: white;\n  letter-spacing: -1.5px;\n  margin-bottom: 12px;\n}\n.page-hero[_ngcontent-%COMP%]   .hero-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--fo-text-secondary);\n  font-size: 16px;\n  max-width: 400px;\n}\n.page-hero[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: 12px;\n  padding: 12px 18px;\n  min-width: 280px;\n  align-self: center;\n}\n.page-hero[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--primary);\n}\n.page-hero[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.page-hero[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  outline: none;\n  color: white;\n  font-size: 14px;\n  font-family: var(--font-body);\n  width: 100%;\n}\n.page-hero[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--fo-text-muted);\n}\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-bottom: 32px;\n}\n.filter-btn[_ngcontent-%COMP%] {\n  padding: 8px 18px;\n  border-radius: 20px;\n  border: 1px solid var(--fo-border);\n  background: transparent;\n  color: var(--fo-text-secondary);\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-family: var(--font-body);\n}\n.filter-btn.active[_ngcontent-%COMP%], \n.filter-btn[_ngcontent-%COMP%]:hover {\n  background: var(--primary);\n  color: white;\n  border-color: var(--primary);\n}\n.courses-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n}\n.course-card[_ngcontent-%COMP%] {\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n  transition: all 0.3s;\n  display: flex;\n  flex-direction: column;\n}\n.course-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  border-color: rgba(79, 110, 247, 0.35);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);\n}\n.course-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%] {\n  padding: 24px;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.course-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .course-icon[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n}\n.course-card[_ngcontent-%COMP%]   .card-top[_ngcontent-%COMP%]   .free-badge[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n  border: 1px solid rgba(34, 197, 94, 0.3);\n  border-radius: 8px;\n  padding: 3px 8px;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1px;\n}\n.course-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 0 24px 16px;\n  flex: 1;\n}\n.course-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n.course-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .duration[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--fo-text-muted);\n}\n.course-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .course-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 17px;\n  font-weight: 700;\n  color: white;\n  margin-bottom: 8px;\n  line-height: 1.3;\n}\n.course-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .course-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--fo-text-secondary);\n  line-height: 1.6;\n}\n.course-card[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-top: 1px solid var(--fo-border);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.course-card[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   .course-stats[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.course-card[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   .course-stats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--fo-text-muted);\n}\n.course-card[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   .btn-enroll[_ngcontent-%COMP%] {\n  padding: 8px 18px;\n  border: none;\n  border-radius: 8px;\n  color: white;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.course-card[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]   .btn-enroll[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n  transform: translateY(-1px);\n}\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  text-align: center;\n  padding: 60px;\n}\n.empty-state[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 40px;\n  display: block;\n  margin-bottom: 12px;\n  opacity: 0.4;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--fo-text-secondary);\n  font-size: 15px;\n}\n/*# sourceMappingURL=courses-resources.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CoursesResourcesComponent, { className: "CoursesResourcesComponent", filePath: "src\\app\\frontoffice\\courses-resources\\courses-resources.component.ts", lineNumber: 22 });
})();

// src/app/frontoffice/events/events.component.ts
function EventsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 13)(4, "span", 14);
    \u0275\u0275text(5, "\u2B50 Featured Event");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 15)(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 16)(18, "div", 17);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(19, "svg", 18);
    \u0275\u0275element(20, "circle", 19)(21, "circle", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "button", 21);
    \u0275\u0275text(25, "Register Now \u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.featuredEvent.icon);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.featuredEvent.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.featuredEvent.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("\u{1F4C5} ", ctx_r0.formatDate(ctx_r0.featuredEvent.date), " \xB7 ", ctx_r0.featuredEvent.time, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4CD} ", ctx_r0.featuredEvent.location, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("\u{1F465} ", ctx_r0.featuredEvent.attendees, "/", ctx_r0.featuredEvent.maxAttendees, " registered");
    \u0275\u0275advance(5);
    \u0275\u0275attribute("stroke", ctx_r0.featuredEvent.color)("stroke-dasharray", "163.4")("stroke-dashoffset", 163.4 - 163.4 * ctx_r0.getAttendancePercent(ctx_r0.featuredEvent) / 100);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.getAttendancePercent(ctx_r0.featuredEvent), "%");
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r0.featuredEvent.color);
  }
}
function EventsComponent_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function EventsComponent_button_13_Template_button_click_0_listener() {
      const f_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activeFilter = f_r3);
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "titlecase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.activeFilter === f_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 3, f_r3));
  }
}
function EventsComponent_div_17_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1, "\u{1F310} Online");
    \u0275\u0275elementEnd();
  }
}
function EventsComponent_div_17_span_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F4CD} ", event_r4.location, "");
  }
}
function EventsComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24)(2, "span", 25);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 26);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 27);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 28)(11, "div", 29)(12, "span", 30);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "titlecase");
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, EventsComponent_div_17_span_15_Template, 2, 0, "span", 31)(16, EventsComponent_div_17_span_16_Template, 2, 1, "span", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "h3");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 33)(22, "span", 34);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 35);
    \u0275\u0275element(25, "div", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 37);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 38)(29, "button", 21);
    \u0275\u0275text(30, " Join ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const event_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", event_r4.color + "20")("border-color", event_r4.color + "40");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 29, event_r4.date, "d"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 32, event_r4.date, "MMM"));
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", event_r4.color + "20");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(event_r4.icon);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", event_r4.color + "20")("color", event_r4.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 35, event_r4.type), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", event_r4.isOnline);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !event_r4.isOnline);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r4.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u23F0 ", event_r4.time, "");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.getAttendancePercent(event_r4), "%")("background", event_r4.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", event_r4.attendees, "/", event_r4.maxAttendees, "");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("border-color", event_r4.color)("color", event_r4.color);
  }
}
var EventsComponent = class _EventsComponent {
  constructor() {
    this.activeFilter = "all";
    this.filters = ["all", "webinar", "workshop", "meetup", "conference"];
    this.events = [
      { id: 1, title: "Freelance Tunisia Summit 2025", description: "The biggest freelance event in Tunisia. Network, learn and grow with 500+ professionals.", date: "2025-03-15", time: "09:00", location: "Tunis, TN", type: "conference", icon: "\u{1F3C6}", color: "#f59e0b", attendees: 380, maxAttendees: 500, isFeatured: true, isOnline: false },
      { id: 2, title: "UX Design Masterclass", description: "Live workshop with industry experts covering the latest UX research methods.", date: "2025-03-20", time: "14:00", location: "Online", type: "workshop", icon: "\u{1F3A8}", color: "#a855f7", attendees: 72, maxAttendees: 100, isFeatured: false, isOnline: true },
      { id: 3, title: "Freelancers Meetup Sfax", description: "Monthly informal gathering of freelancers in Sfax. Share experiences and connections.", date: "2025-03-25", time: "18:00", location: "Sfax, TN", type: "meetup", icon: "\u2615", color: "#22c55e", attendees: 34, maxAttendees: 50, isFeatured: false, isOnline: false },
      { id: 4, title: "Client Acquisition Webinar", description: "Learn proven strategies to find and retain high-paying clients as a freelancer.", date: "2025-04-02", time: "11:00", location: "Online", type: "webinar", icon: "\u{1F4E1}", color: "#4f6ef7", attendees: 210, maxAttendees: 500, isFeatured: true, isOnline: true },
      { id: 5, title: "No-Code Tools Workshop", description: "Master tools like Webflow, Bubble and Make to accelerate your freelance workflow.", date: "2025-04-10", time: "15:00", location: "Online", type: "workshop", icon: "\u26A1", color: "#06b6d4", attendees: 45, maxAttendees: 80, isFeatured: false, isOnline: true }
    ];
  }
  get filteredEvents() {
    return this.events.filter((e) => this.activeFilter === "all" || e.type === this.activeFilter);
  }
  get featuredEvent() {
    return this.events.find((e) => e.isFeatured);
  }
  ngOnInit() {
  }
  getAttendancePercent(event) {
    return Math.round(event.attendees / event.maxAttendees * 100);
  }
  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }
  static {
    this.\u0275fac = function EventsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EventsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventsComponent, selectors: [["app-events"]], decls: 18, vars: 4, consts: [[1, "events-page"], [1, "page-hero"], [1, "hero-badge"], [1, "text-gradient"], ["class", "featured-event", 4, "ngIf"], [1, "filters-row"], [1, "filters"], ["class", "filter-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "results-count"], [1, "events-list"], ["class", "event-card", 4, "ngFor", "ngForOf"], [1, "featured-event"], [1, "featured-icon"], [1, "featured-content"], [1, "featured-label"], [1, "featured-meta"], [1, "featured-action"], [1, "attendance-ring"], ["viewBox", "0 0 60 60"], ["cx", "30", "cy", "30", "r", "26", "fill", "none", "stroke", "rgba(255,255,255,0.1)", "stroke-width", "5"], ["cx", "30", "cy", "30", "r", "26", "fill", "none", "stroke-width", "5", "stroke-linecap", "round", "transform", "rotate(-90 30 30)"], [1, "btn-register"], [1, "filter-btn", 3, "click"], [1, "event-card"], [1, "event-date-block"], [1, "day"], [1, "month"], [1, "event-icon"], [1, "event-content"], [1, "event-tags"], [1, "type-tag"], ["class", "online-tag", 4, "ngIf"], ["class", "location-tag", 4, "ngIf"], [1, "event-bottom"], [1, "event-time"], [1, "attendance-bar"], [1, "bar-fill"], [1, "attendance-text"], [1, "event-action"], [1, "online-tag"], [1, "location-tag"]], template: function EventsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275text(3, "\u{1F4C5} Community");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5, "Upcoming ");
        \u0275\u0275elementStart(6, "span", 3);
        \u0275\u0275text(7, "Events");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "p");
        \u0275\u0275text(9, "Join webinars, workshops and meetups to level up your freelance game.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(10, EventsComponent_div_10_Template, 26, 14, "div", 4);
        \u0275\u0275elementStart(11, "div", 5)(12, "div", 6);
        \u0275\u0275template(13, EventsComponent_button_13_Template, 3, 5, "button", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "span", 8);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 9);
        \u0275\u0275template(17, EventsComponent_div_17_Template, 31, 37, "div", 10);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275property("ngIf", ctx.featuredEvent);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.filters);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("", ctx.filteredEvents.length, " events");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.filteredEvents);
      }
    }, dependencies: [NgForOf, NgIf, TitleCasePipe, DatePipe], styles: ['\n\n.events-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--fo-bg-primary);\n  padding: 100px 32px 60px;\n  max-width: 1280px;\n  margin: 0 auto;\n}\n.page-hero[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n.page-hero[_ngcontent-%COMP%]   .hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 14px;\n  background: rgba(79, 110, 247, 0.12);\n  border: 1px solid rgba(79, 110, 247, 0.25);\n  border-radius: 20px;\n  color: var(--primary-light);\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n.page-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(32px, 4vw, 52px);\n  font-weight: 800;\n  color: white;\n  letter-spacing: -1.5px;\n  margin-bottom: 12px;\n}\n.page-hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--fo-text-secondary);\n  font-size: 16px;\n  max-width: 500px;\n}\n.featured-event[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 28px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(79, 110, 247, 0.12),\n      rgba(0, 229, 255, 0.06));\n  border: 1px solid rgba(79, 110, 247, 0.3);\n  border-radius: var(--radius-xl);\n  padding: 36px 40px;\n  margin-bottom: 40px;\n  position: relative;\n  overflow: hidden;\n  flex-wrap: wrap;\n}\n.featured-event[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: -80px;\n  right: -80px;\n  width: 250px;\n  height: 250px;\n  background: rgba(79, 110, 247, 0.08);\n  border-radius: 50%;\n  pointer-events: none;\n}\n.featured-event[_ngcontent-%COMP%]   .featured-icon[_ngcontent-%COMP%] {\n  font-size: 60px;\n  flex-shrink: 0;\n}\n.featured-event[_ngcontent-%COMP%]   .featured-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.featured-event[_ngcontent-%COMP%]   .featured-content[_ngcontent-%COMP%]   .featured-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: #fbbf24;\n  letter-spacing: 1px;\n  display: block;\n  margin-bottom: 8px;\n}\n.featured-event[_ngcontent-%COMP%]   .featured-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 24px;\n  font-weight: 800;\n  color: white;\n  margin-bottom: 8px;\n}\n.featured-event[_ngcontent-%COMP%]   .featured-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--fo-text-secondary);\n  font-size: 14px;\n  margin-bottom: 14px;\n  max-width: 480px;\n}\n.featured-event[_ngcontent-%COMP%]   .featured-content[_ngcontent-%COMP%]   .featured-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.featured-event[_ngcontent-%COMP%]   .featured-content[_ngcontent-%COMP%]   .featured-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--fo-text-secondary);\n}\n.featured-event[_ngcontent-%COMP%]   .featured-action[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.featured-event[_ngcontent-%COMP%]   .featured-action[_ngcontent-%COMP%]   .attendance-ring[_ngcontent-%COMP%] {\n  position: relative;\n  width: 60px;\n  height: 60px;\n}\n.featured-event[_ngcontent-%COMP%]   .featured-action[_ngcontent-%COMP%]   .attendance-ring[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n.featured-event[_ngcontent-%COMP%]   .featured-action[_ngcontent-%COMP%]   .attendance-ring[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-size: 11px;\n  font-weight: 700;\n  color: white;\n}\n.featured-event[_ngcontent-%COMP%]   .featured-action[_ngcontent-%COMP%]   .btn-register[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 10px;\n  color: white;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  white-space: nowrap;\n  transition: all 0.2s;\n}\n.featured-event[_ngcontent-%COMP%]   .featured-action[_ngcontent-%COMP%]   .btn-register[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n  transform: translateY(-1px);\n}\n.filters-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.filters-row[_ngcontent-%COMP%]   .filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.filters-row[_ngcontent-%COMP%]   .results-count[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--fo-text-muted);\n}\n.filter-btn[_ngcontent-%COMP%] {\n  padding: 7px 16px;\n  border-radius: 20px;\n  border: 1px solid var(--fo-border);\n  background: transparent;\n  color: var(--fo-text-secondary);\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-family: var(--font-body);\n}\n.filter-btn.active[_ngcontent-%COMP%], \n.filter-btn[_ngcontent-%COMP%]:hover {\n  background: var(--primary);\n  color: white;\n  border-color: var(--primary);\n}\n.events-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.event-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-md);\n  padding: 20px 24px;\n  transition: all 0.25s;\n}\n.event-card[_ngcontent-%COMP%]:hover {\n  border-color: rgba(79, 110, 247, 0.35);\n  transform: translateX(4px);\n}\n.event-card[_ngcontent-%COMP%]   .event-date-block[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 12px;\n  border: 1px solid;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.event-card[_ngcontent-%COMP%]   .event-date-block[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 20px;\n  font-weight: 800;\n  color: white;\n  line-height: 1;\n}\n.event-card[_ngcontent-%COMP%]   .event-date-block[_ngcontent-%COMP%]   .month[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--fo-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.event-card[_ngcontent-%COMP%]   .event-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.event-card[_ngcontent-%COMP%]   .event-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.event-card[_ngcontent-%COMP%]   .event-content[_ngcontent-%COMP%]   .event-tags[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 6px;\n  flex-wrap: wrap;\n}\n.event-card[_ngcontent-%COMP%]   .event-content[_ngcontent-%COMP%]   .type-tag[_ngcontent-%COMP%] {\n  padding: 3px 8px;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 700;\n}\n.event-card[_ngcontent-%COMP%]   .event-content[_ngcontent-%COMP%]   .online-tag[_ngcontent-%COMP%], \n.event-card[_ngcontent-%COMP%]   .event-content[_ngcontent-%COMP%]   .location-tag[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--fo-text-muted);\n}\n.event-card[_ngcontent-%COMP%]   .event-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 16px;\n  font-weight: 700;\n  color: white;\n  margin-bottom: 4px;\n}\n.event-card[_ngcontent-%COMP%]   .event-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--fo-text-secondary);\n  margin-bottom: 10px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.event-card[_ngcontent-%COMP%]   .event-content[_ngcontent-%COMP%]   .event-bottom[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.event-card[_ngcontent-%COMP%]   .event-content[_ngcontent-%COMP%]   .event-bottom[_ngcontent-%COMP%]   .event-time[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--fo-text-muted);\n  white-space: nowrap;\n}\n.event-card[_ngcontent-%COMP%]   .event-content[_ngcontent-%COMP%]   .event-bottom[_ngcontent-%COMP%]   .attendance-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.08);\n  border-radius: 2px;\n}\n.event-card[_ngcontent-%COMP%]   .event-content[_ngcontent-%COMP%]   .event-bottom[_ngcontent-%COMP%]   .attendance-bar[_ngcontent-%COMP%]   .bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 2px;\n  transition: width 0.6s;\n}\n.event-card[_ngcontent-%COMP%]   .event-content[_ngcontent-%COMP%]   .event-bottom[_ngcontent-%COMP%]   .attendance-text[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--fo-text-muted);\n  white-space: nowrap;\n}\n.event-card[_ngcontent-%COMP%]   .event-action[_ngcontent-%COMP%]   .btn-register[_ngcontent-%COMP%] {\n  padding: 9px 18px;\n  background: transparent;\n  border: 1px solid;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n}\n.event-card[_ngcontent-%COMP%]   .event-action[_ngcontent-%COMP%]   .btn-register[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n/*# sourceMappingURL=events.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventsComponent, { className: "EventsComponent", filePath: "src\\app\\frontoffice\\events\\events.component.ts", lineNumber: 24 });
})();

// src/app/frontoffice/profile-settings/profile-settings.component.ts
function ProfileSettingsComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, " \u2705 Profile saved successfully! ");
    \u0275\u0275elementEnd();
  }
}
function ProfileSettingsComponent_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function ProfileSettingsComponent_button_15_Template_button_click_0_listener() {
      const tab_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTab = tab_r2.id);
    });
    \u0275\u0275elementStart(1, "span", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activeTab === tab_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tab_r2.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r2.label, " ");
  }
}
function ProfileSettingsComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "h2", 15);
    \u0275\u0275text(2, "Personal Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 16);
    \u0275\u0275listener("ngSubmit", function ProfileSettingsComponent_div_17_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveProfile());
    });
    \u0275\u0275elementStart(4, "div", 17)(5, "div", 18)(6, "label");
    \u0275\u0275text(7, "First Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 18)(10, "label");
    \u0275\u0275text(11, "Last Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 17)(14, "div", 18)(15, "label");
    \u0275\u0275text(16, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 18)(19, "label");
    \u0275\u0275text(20, "Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 17)(23, "div", 18)(24, "label");
    \u0275\u0275text(25, "City");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "input", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 18)(28, "label");
    \u0275\u0275text(29, "Website");
    \u0275\u0275elementEnd();
    \u0275\u0275element(30, "input", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 25)(32, "label");
    \u0275\u0275text(33, "Bio");
    \u0275\u0275elementEnd();
    \u0275\u0275element(34, "textarea", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 27);
    \u0275\u0275text(36, "Save Changes");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r2.profileForm);
    \u0275\u0275advance(32);
    \u0275\u0275property("disabled", ctx_r2.profileForm.invalid);
  }
}
function ProfileSettingsComponent_div_18_span_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 34);
    \u0275\u0275listener("click", function ProfileSettingsComponent_div_18_span_4_Template_button_click_2_listener() {
      const skill_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.removeSkill(skill_r7));
    });
    \u0275\u0275text(3, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const skill_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", skill_r7, " ");
  }
}
function ProfileSettingsComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "h2", 15);
    \u0275\u0275text(2, "Skills & Expertise");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 28);
    \u0275\u0275template(4, ProfileSettingsComponent_div_18_span_4_Template, 4, 1, "span", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 30)(6, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function ProfileSettingsComponent_div_18_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newSkill, $event) || (ctx_r2.newSkill = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function ProfileSettingsComponent_div_18_Template_input_keyup_enter_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addSkill());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 32);
    \u0275\u0275listener("click", function ProfileSettingsComponent_div_18_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addSkill());
    });
    \u0275\u0275text(8, "Add");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r2.skills);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newSkill);
  }
}
function ProfileSettingsComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "h2", 15);
    \u0275\u0275text(2, "Password & Security");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 35)(4, "div", 25)(5, "label");
    \u0275\u0275text(6, "Current Password");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 17)(9, "div", 18)(10, "label");
    \u0275\u0275text(11, "New Password");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 18)(14, "label");
    \u0275\u0275text(15, "Confirm Password");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 39);
    \u0275\u0275text(18, "Update Password");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r2.securityForm);
  }
}
function ProfileSettingsComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "h2", 15);
    \u0275\u0275text(2, "Notification Preferences");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 40)(4, "h3");
    \u0275\u0275text(5, "Email Notifications");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 41)(7, "div")(8, "strong");
    \u0275\u0275text(9, "New Project Matches");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "Get notified when a project matches your skills");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "label", 42)(13, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function ProfileSettingsComponent_div_20_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.notifications.emailProjects, $event) || (ctx_r2.notifications.emailProjects = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "span", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 41)(16, "div")(17, "strong");
    \u0275\u0275text(18, "Messages");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p");
    \u0275\u0275text(20, "New messages from clients or freelancers");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "label", 42)(22, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function ProfileSettingsComponent_div_20_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.notifications.emailMessages, $event) || (ctx_r2.notifications.emailMessages = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "span", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 41)(25, "div")(26, "strong");
    \u0275\u0275text(27, "Payment Updates");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p");
    \u0275\u0275text(29, "Invoice and payment status notifications");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "label", 42)(31, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function ProfileSettingsComponent_div_20_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.notifications.emailPayments, $event) || (ctx_r2.notifications.emailPayments = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(32, "span", 44);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.notifications.emailProjects);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.notifications.emailMessages);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.notifications.emailPayments);
  }
}
var ProfileSettingsComponent = class _ProfileSettingsComponent {
  constructor(fb) {
    this.fb = fb;
    this.activeTab = "profile";
    this.tabs = [
      { id: "profile", label: "Profile", icon: "\u{1F464}" },
      { id: "skills", label: "Skills", icon: "\u{1F3AF}" },
      { id: "security", label: "Security", icon: "\u{1F512}" },
      { id: "notifications", label: "Notifications", icon: "\u{1F514}" }
    ];
    this.saveSuccess = false;
    this.skills = ["Angular", "React", "UI/UX Design", "Node.js"];
    this.newSkill = "";
    this.notifications = {
      emailProjects: true,
      emailMessages: true,
      emailPayments: true,
      pushProjects: false,
      pushMessages: true,
      pushPayments: false
    };
  }
  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: ["Admin", Validators.required],
      lastName: ["Matchy", Validators.required],
      email: ["admin@matchy.tn", [Validators.required, Validators.email]],
      phone: ["+216 55 000 000"],
      city: ["Tunis"],
      bio: ["Freelance platform administrator & passionate about connecting Tunisian talent."],
      website: ["https://matchy.tn"]
    });
    this.securityForm = this.fb.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", Validators.required]
    });
  }
  saveProfile() {
    if (this.profileForm.valid) {
      this.saveSuccess = true;
      setTimeout(() => this.saveSuccess = false, 3e3);
    }
  }
  addSkill() {
    const skill = this.newSkill.trim();
    if (skill && !this.skills.includes(skill)) {
      this.skills.push(skill);
      this.newSkill = "";
    }
  }
  removeSkill(skill) {
    this.skills = this.skills.filter((s) => s !== skill);
  }
  getInitials() {
    const f = this.profileForm.get("firstName")?.value || "";
    const l = this.profileForm.get("lastName")?.value || "";
    return (f[0] || "") + (l[0] || "");
  }
  static {
    this.\u0275fac = function ProfileSettingsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProfileSettingsComponent)(\u0275\u0275directiveInject(FormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileSettingsComponent, selectors: [["app-profile-settings"]], decls: 21, vars: 10, consts: [[1, "profile-page"], [1, "page-header"], [1, "user-card"], [1, "avatar-large"], [1, "user-info"], [1, "role-badge"], ["class", "success-toast", 4, "ngIf"], [1, "settings-layout"], [1, "tabs-nav"], ["class", "tab-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "tab-content"], [4, "ngIf"], [1, "success-toast"], [1, "tab-btn", 3, "click"], [1, "tab-icon"], [1, "section-title"], [3, "ngSubmit", "formGroup"], [1, "form-row"], [1, "form-group"], ["type", "text", "formControlName", "firstName", "placeholder", "First name", 1, "form-input"], ["type", "text", "formControlName", "lastName", "placeholder", "Last name", 1, "form-input"], ["type", "email", "formControlName", "email", "placeholder", "Email", 1, "form-input"], ["type", "text", "formControlName", "phone", "placeholder", "+216 ...", 1, "form-input"], ["type", "text", "formControlName", "city", "placeholder", "City", 1, "form-input"], ["type", "url", "formControlName", "website", "placeholder", "https://...", 1, "form-input"], [1, "form-group", "full"], ["formControlName", "bio", "rows", "4", "placeholder", "Tell us about yourself...", 1, "form-textarea"], ["type", "submit", 1, "btn-save", 3, "disabled"], [1, "skills-grid"], ["class", "skill-tag", 4, "ngFor", "ngForOf"], [1, "add-skill"], ["type", "text", "placeholder", "Add a skill (press Enter)...", 1, "form-input", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "btn-add-skill", 3, "click"], [1, "skill-tag"], [1, "skill-remove", 3, "click"], [1, "security-form", 3, "formGroup"], ["type", "password", "formControlName", "currentPassword", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "form-input"], ["type", "password", "formControlName", "newPassword", "placeholder", "Min. 8 characters", 1, "form-input"], ["type", "password", "formControlName", "confirmPassword", "placeholder", "Repeat password", 1, "form-input"], ["type", "submit", 1, "btn-save", "danger"], [1, "notif-section"], [1, "toggle-row"], [1, "toggle"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "slider"]], template: function ProfileSettingsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 4)(6, "h1");
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p");
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span", 5);
        \u0275\u0275text(11, "Admin \xB7 Matchy");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(12, ProfileSettingsComponent_div_12_Template, 2, 0, "div", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 7)(14, "nav", 8);
        \u0275\u0275template(15, ProfileSettingsComponent_button_15_Template, 4, 4, "button", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 10);
        \u0275\u0275template(17, ProfileSettingsComponent_div_17_Template, 37, 2, "div", 11)(18, ProfileSettingsComponent_div_18_Template, 9, 2, "div", 11)(19, ProfileSettingsComponent_div_19_Template, 19, 1, "div", 11)(20, ProfileSettingsComponent_div_20_Template, 33, 3, "div", 11);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.getInitials());
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate2("", (tmp_1_0 = ctx.profileForm.get("firstName")) == null ? null : tmp_1_0.value, " ", (tmp_1_0 = ctx.profileForm.get("lastName")) == null ? null : tmp_1_0.value, "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate((tmp_2_0 = ctx.profileForm.get("email")) == null ? null : tmp_2_0.value);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.saveSuccess);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.tabs);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.activeTab === "profile");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.activeTab === "skills");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.activeTab === "security");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.activeTab === "notifications");
      }
    }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, FormGroupDirective, FormControlName], styles: ['\n\n.profile-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--fo-bg-primary);\n  padding: 100px 32px 60px;\n  max-width: 1100px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 40px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.page-header[_ngcontent-%COMP%]   .user-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n.page-header[_ngcontent-%COMP%]   .user-card[_ngcontent-%COMP%]   .avatar-large[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--accent-secondary));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 24px;\n  font-weight: 700;\n  font-family: var(--font-display);\n  border: 3px solid rgba(79, 110, 247, 0.4);\n}\n.page-header[_ngcontent-%COMP%]   .user-card[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 26px;\n  font-weight: 800;\n  color: white;\n}\n.page-header[_ngcontent-%COMP%]   .user-card[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--fo-text-secondary);\n  font-size: 14px;\n  margin: 4px 0;\n}\n.page-header[_ngcontent-%COMP%]   .user-card[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%]   .role-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 10px;\n  background: rgba(79, 110, 247, 0.15);\n  border: 1px solid rgba(79, 110, 247, 0.3);\n  border-radius: 10px;\n  color: var(--primary-light);\n  font-size: 12px;\n  font-weight: 600;\n}\n.page-header[_ngcontent-%COMP%]   .success-toast[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  border: 1px solid rgba(34, 197, 94, 0.3);\n  border-radius: 10px;\n  padding: 12px 20px;\n  color: #86efac;\n  font-size: 14px;\n  font-weight: 600;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-8px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n.settings-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 220px 1fr;\n  gap: 28px;\n}\n.tabs-nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-md);\n  padding: 12px;\n  height: fit-content;\n}\n.tab-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 11px 14px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  color: var(--fo-text-secondary);\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  text-align: left;\n  transition: all 0.2s;\n  font-family: var(--font-body);\n}\n.tab-btn[_ngcontent-%COMP%]   .tab-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  background: rgba(79, 110, 247, 0.15);\n  color: white;\n  border: 1px solid rgba(79, 110, 247, 0.25);\n}\n.tab-btn[_ngcontent-%COMP%]:not(.active):hover {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--fo-text-primary);\n}\n.tab-content[_ngcontent-%COMP%] {\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-md);\n  padding: 32px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 22px;\n  font-weight: 800;\n  color: white;\n  margin-bottom: 28px;\n  letter-spacing: -0.5px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.form-group.full[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--fo-text-secondary);\n}\n.form-input[_ngcontent-%COMP%] {\n  padding: 11px 14px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--fo-border);\n  border-radius: 8px;\n  color: white;\n  font-size: 14px;\n  font-family: var(--font-body);\n  outline: none;\n  transition: all 0.2s;\n}\n.form-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--fo-text-muted);\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.15);\n}\n.form-textarea[_ngcontent-%COMP%] {\n  padding: 11px 14px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--fo-border);\n  border-radius: 8px;\n  color: white;\n  font-size: 14px;\n  font-family: var(--font-body);\n  outline: none;\n  resize: vertical;\n  transition: border 0.2s;\n}\n.form-textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--fo-text-muted);\n}\n.form-textarea[_ngcontent-%COMP%]:focus {\n  border-color: var(--primary);\n}\n.btn-save[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  padding: 12px 28px;\n  background: var(--primary);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--primary-light);\n  transform: translateY(-1px);\n}\n.btn-save[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-save.danger[_ngcontent-%COMP%] {\n  background: var(--danger);\n}\n.btn-save.danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #dc2626;\n}\n.skills-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-bottom: 24px;\n}\n.skill-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 7px 14px;\n  background: rgba(79, 110, 247, 0.15);\n  border: 1px solid rgba(79, 110, 247, 0.3);\n  border-radius: 20px;\n  color: var(--primary-light);\n  font-size: 13px;\n  font-weight: 600;\n}\n.skill-tag[_ngcontent-%COMP%]   .skill-remove[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: rgba(107, 132, 255, 0.6);\n  cursor: pointer;\n  font-size: 16px;\n  line-height: 1;\n  padding: 0;\n  transition: color 0.2s;\n}\n.skill-tag[_ngcontent-%COMP%]   .skill-remove[_ngcontent-%COMP%]:hover {\n  color: var(--danger);\n}\n.add-skill[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.btn-add-skill[_ngcontent-%COMP%] {\n  padding: 11px 20px;\n  background: var(--primary);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  white-space: nowrap;\n  transition: all 0.2s;\n}\n.btn-add-skill[_ngcontent-%COMP%]:hover {\n  background: var(--primary-light);\n}\n.notif-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 16px;\n  font-weight: 700;\n  color: white;\n  margin-bottom: 16px;\n}\n.toggle-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 16px 0;\n  border-bottom: 1px solid var(--fo-border);\n}\n.toggle-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.toggle-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  color: white;\n  margin-bottom: 4px;\n}\n.toggle-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--fo-text-muted);\n}\n.toggle[_ngcontent-%COMP%] {\n  position: relative;\n  width: 44px;\n  height: 24px;\n  flex-shrink: 0;\n}\n.toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.toggle[_ngcontent-%COMP%]   .slider[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: 12px;\n  cursor: pointer;\n  transition: 0.3s;\n}\n.toggle[_ngcontent-%COMP%]   .slider[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  width: 18px;\n  height: 18px;\n  background: white;\n  border-radius: 50%;\n  left: 3px;\n  top: 3px;\n  transition: 0.3s;\n}\n.toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%] {\n  background: var(--primary);\n}\n.toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%]::before {\n  transform: translateX(20px);\n}\n@media (max-width: 768px) {\n  .settings-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .tabs-nav[_ngcontent-%COMP%] {\n    flex-direction: row;\n    flex-wrap: wrap;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=profile-settings.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileSettingsComponent, { className: "ProfileSettingsComponent", filePath: "src\\app\\frontoffice\\profile-settings\\profile-settings.component.ts", lineNumber: 9 });
})();

// src/app/frontoffice/projects-milestones/projects-milestones.component.ts
function ProjectsMilestonesComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275listener("click", function ProjectsMilestonesComponent_div_15_Template_div_click_0_listener() {
      const project_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectProject(project_r2));
    });
    \u0275\u0275elementStart(1, "div", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 11)(4, "span", 12);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 13);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(8, "div", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", (ctx_r2.selectedProject == null ? null : ctx_r2.selectedProject.id) === project_r2.id);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", project_r2.color + "20");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(project_r2.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(project_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(project_r2.client);
    \u0275\u0275advance();
    \u0275\u0275classMap(project_r2.status);
  }
}
function ProjectsMilestonesComponent_div_16_div_30_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 40);
  }
}
function ProjectsMilestonesComponent_div_16_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275template(1, ProjectsMilestonesComponent_div_16_div_30_div_1_Template, 1, 0, "div", 32);
    \u0275\u0275elementStart(2, "div", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 34)(5, "div", 35)(6, "h4");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 36)(9, "span", 37);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 38);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "p");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 39);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "titlecase");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const m_r4 = ctx.$implicit;
    const last_r5 = ctx.last;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !last_r5);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.getMilestoneClass(m_r4.status));
    \u0275\u0275styleProp("border-color", ctx_r2.selectedProject.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getMilestoneStatusIcon(m_r4.status), " ");
    \u0275\u0275advance();
    \u0275\u0275classMap("status-" + m_r4.status);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r4.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(11, 15, m_r4.amount), " TND");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4C5} ", \u0275\u0275pipeBind2(14, 17, m_r4.dueDate, "MMM d"), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r4.description);
    \u0275\u0275advance();
    \u0275\u0275classMap("badge-" + ctx_r2.getMilestoneClass(m_r4.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 20, m_r4.status), " ");
  }
}
function ProjectsMilestonesComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16)(2, "div", 17);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 18)(5, "h2");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Client: ");
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 19)(12, "span", 20);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 21);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 22)(19, "div", 23)(20, "span");
    \u0275\u0275text(21, "Overall Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 24);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 25);
    \u0275\u0275element(25, "div", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 27)(27, "h3", 28);
    \u0275\u0275text(28, "Milestones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 29);
    \u0275\u0275template(30, ProjectsMilestonesComponent_div_16_div_30_Template, 20, 22, "div", 30);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("border-color", ctx_r2.selectedProject.color + "40");
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r2.selectedProject.color + "20");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedProject.icon, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.selectedProject.title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.selectedProject.client);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(14, 19, ctx_r2.getPaidAmount(ctx_r2.selectedProject)), " ", ctx_r2.selectedProject.currency, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("/ ", \u0275\u0275pipeBind1(17, 21, ctx_r2.selectedProject.totalBudget), " ", ctx_r2.selectedProject.currency, "");
    \u0275\u0275advance(6);
    \u0275\u0275styleProp("color", ctx_r2.selectedProject.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r2.selectedProject.progress, "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r2.selectedProject.progress, "%")("background", ctx_r2.selectedProject.color);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r2.selectedProject.milestones);
  }
}
var ProjectsMilestonesComponent = class _ProjectsMilestonesComponent {
  constructor() {
    this.selectedProject = null;
    this.projects = [
      {
        id: 1,
        title: "E-Commerce Mobile App",
        client: "TechStart TN",
        totalBudget: 4500,
        currency: "TND",
        progress: 65,
        status: "active",
        color: "#4f6ef7",
        icon: "\u{1F4F1}",
        milestones: [
          { id: 1, title: "UI/UX Mockups", amount: 800, dueDate: "2025-02-10", status: "completed", description: "Design all app screens and prototype." },
          { id: 2, title: "Frontend Development", amount: 1500, dueDate: "2025-03-01", status: "in_progress", description: "Build React Native app with navigation." },
          { id: 3, title: "Backend & API", amount: 1200, dueDate: "2025-03-20", status: "pending", description: "REST API, database and auth integration." },
          { id: 4, title: "Testing & Launch", amount: 1e3, dueDate: "2025-04-01", status: "pending", description: "QA testing, bug fixes, app store submission." }
        ]
      },
      {
        id: 2,
        title: "Restaurant Website",
        client: "Chez Habib",
        totalBudget: 1800,
        currency: "TND",
        progress: 100,
        status: "completed",
        color: "#22c55e",
        icon: "\u{1F37D}\uFE0F",
        milestones: [
          { id: 1, title: "Design & Wireframes", amount: 400, dueDate: "2025-01-10", status: "completed", description: "Site design and responsive mockups." },
          { id: 2, title: "Development", amount: 900, dueDate: "2025-01-20", status: "completed", description: "Full website development with CMS." },
          { id: 3, title: "Launch & SEO", amount: 500, dueDate: "2025-01-28", status: "completed", description: "Live deployment and basic SEO setup." }
        ]
      }
    ];
  }
  ngOnInit() {
    this.selectedProject = this.projects[0];
  }
  selectProject(p) {
    this.selectedProject = p;
  }
  getPaidAmount(project) {
    return project.milestones.filter((m) => m.status === "completed").reduce((sum, m) => sum + m.amount, 0);
  }
  getMilestoneStatusIcon(status) {
    return { completed: "\u2705", in_progress: "\u{1F504}", pending: "\u23F3", overdue: "\u274C" }[status] || "\u23F3";
  }
  getMilestoneClass(status) {
    return { completed: "success", in_progress: "primary", pending: "muted", overdue: "danger" }[status] || "muted";
  }
  static {
    this.\u0275fac = function ProjectsMilestonesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProjectsMilestonesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectsMilestonesComponent, selectors: [["app-projects-milestones"]], decls: 17, vars: 2, consts: [[1, "milestones-page"], [1, "page-header"], [1, "hero-badge"], [1, "text-gradient"], [1, "content-layout"], [1, "projects-sidebar"], [1, "sidebar-title"], ["class", "project-item", 3, "active", "click", 4, "ngFor", "ngForOf"], ["class", "project-detail", 4, "ngIf"], [1, "project-item", 3, "click"], [1, "proj-icon"], [1, "proj-info"], [1, "proj-title"], [1, "proj-client"], [1, "proj-status-dot"], [1, "project-detail"], [1, "detail-header"], [1, "detail-icon"], [1, "detail-info"], [1, "detail-budget"], [1, "budget-paid"], [1, "budget-total"], [1, "progress-section"], [1, "progress-header"], [1, "progress-value"], [1, "progress-track"], [1, "progress-fill"], [1, "milestones-section"], [1, "section-label"], [1, "timeline"], ["class", "timeline-item", 4, "ngFor", "ngForOf"], [1, "timeline-item"], ["class", "timeline-connector", 4, "ngIf"], [1, "timeline-dot"], [1, "timeline-content"], [1, "milestone-header"], [1, "milestone-right"], [1, "milestone-amount"], [1, "milestone-date"], [1, "milestone-status-badge", "badge"], [1, "timeline-connector"]], template: function ProjectsMilestonesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2);
        \u0275\u0275text(4, "\u{1F4C1} My Projects");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1");
        \u0275\u0275text(6, "Projects & ");
        \u0275\u0275elementStart(7, "span", 3);
        \u0275\u0275text(8, "Milestones");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "p");
        \u0275\u0275text(10, "Track progress, deliverables and payments for all your projects.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(11, "div", 4)(12, "div", 5)(13, "h3", 6);
        \u0275\u0275text(14, "My Projects");
        \u0275\u0275elementEnd();
        \u0275\u0275template(15, ProjectsMilestonesComponent_div_15_Template, 9, 9, "div", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, ProjectsMilestonesComponent_div_16_Template, 31, 23, "div", 8);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275property("ngForOf", ctx.projects);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedProject);
      }
    }, dependencies: [NgForOf, NgIf, DecimalPipe, TitleCasePipe, DatePipe], styles: ["\n\n.milestones-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--fo-bg-primary);\n  padding: 100px 32px 60px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n.page-header[_ngcontent-%COMP%]   .hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 14px;\n  background: rgba(79, 110, 247, 0.12);\n  border: 1px solid rgba(79, 110, 247, 0.25);\n  border-radius: 20px;\n  color: var(--primary-light);\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(28px, 4vw, 48px);\n  font-weight: 800;\n  color: white;\n  letter-spacing: -1.5px;\n  margin-bottom: 8px;\n}\n.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--fo-text-secondary);\n  font-size: 15px;\n}\n.content-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 24px;\n}\n.projects-sidebar[_ngcontent-%COMP%] {\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-md);\n  padding: 20px;\n  height: fit-content;\n}\n.projects-sidebar[_ngcontent-%COMP%]   .sidebar-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--fo-text-secondary);\n  margin-bottom: 12px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.project-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n  border-radius: 10px;\n  cursor: pointer;\n  transition: all 0.2s;\n  border: 1px solid transparent;\n  margin-bottom: 4px;\n}\n.project-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.04);\n}\n.project-item.active[_ngcontent-%COMP%] {\n  background: rgba(79, 110, 247, 0.1);\n  border-color: rgba(79, 110, 247, 0.25);\n}\n.project-item[_ngcontent-%COMP%]   .proj-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  flex-shrink: 0;\n}\n.project-item[_ngcontent-%COMP%]   .proj-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.project-item[_ngcontent-%COMP%]   .proj-info[_ngcontent-%COMP%]   .proj-title[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: white;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.project-item[_ngcontent-%COMP%]   .proj-info[_ngcontent-%COMP%]   .proj-client[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--fo-text-muted);\n}\n.project-item[_ngcontent-%COMP%]   .proj-status-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.project-item[_ngcontent-%COMP%]   .proj-status-dot.active[_ngcontent-%COMP%] {\n  background: var(--success);\n  box-shadow: 0 0 6px var(--success);\n}\n.project-item[_ngcontent-%COMP%]   .proj-status-dot.completed[_ngcontent-%COMP%] {\n  background: #a855f7;\n}\n.project-item[_ngcontent-%COMP%]   .proj-status-dot.paused[_ngcontent-%COMP%] {\n  background: var(--warning);\n}\n.project-detail[_ngcontent-%COMP%] {\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-md);\n  padding: 28px;\n}\n.detail-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid;\n  flex-wrap: wrap;\n}\n.detail-header[_ngcontent-%COMP%]   .detail-icon[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  flex-shrink: 0;\n}\n.detail-header[_ngcontent-%COMP%]   .detail-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.detail-header[_ngcontent-%COMP%]   .detail-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 22px;\n  font-weight: 800;\n  color: white;\n}\n.detail-header[_ngcontent-%COMP%]   .detail-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--fo-text-muted);\n  margin-top: 4px;\n}\n.detail-header[_ngcontent-%COMP%]   .detail-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: white;\n}\n.detail-header[_ngcontent-%COMP%]   .detail-budget[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.detail-header[_ngcontent-%COMP%]   .detail-budget[_ngcontent-%COMP%]   .budget-paid[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--font-display);\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--success);\n}\n.detail-header[_ngcontent-%COMP%]   .detail-budget[_ngcontent-%COMP%]   .budget-total[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--fo-text-muted);\n}\n.progress-section[_ngcontent-%COMP%] {\n  margin-bottom: 28px;\n}\n.progress-section[_ngcontent-%COMP%]   .progress-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n  font-size: 14px;\n  color: var(--fo-text-secondary);\n}\n.progress-section[_ngcontent-%COMP%]   .progress-header[_ngcontent-%COMP%]   .progress-value[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-family: var(--font-display);\n}\n.progress-section[_ngcontent-%COMP%]   .progress-track[_ngcontent-%COMP%] {\n  height: 8px;\n  background: rgba(255, 255, 255, 0.08);\n  border-radius: 4px;\n  overflow: hidden;\n}\n.progress-section[_ngcontent-%COMP%]   .progress-track[_ngcontent-%COMP%]   .progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 4px;\n  transition: width 0.8s ease;\n}\n.section-label[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 16px;\n  font-weight: 700;\n  color: white;\n  margin-bottom: 20px;\n}\n.timeline[_ngcontent-%COMP%] {\n  position: relative;\n}\n.timeline-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  position: relative;\n  margin-bottom: 4px;\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-connector[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 18px;\n  top: 36px;\n  width: 2px;\n  height: calc(100% + 20px);\n  background: var(--fo-border);\n  z-index: 0;\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-dot[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  border: 2px solid;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  flex-shrink: 0;\n  position: relative;\n  z-index: 1;\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-dot.success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-dot.primary[_ngcontent-%COMP%] {\n  background: rgba(79, 110, 247, 0.15);\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-dot.muted[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border-color: rgba(255, 255, 255, 0.1) !important;\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-dot.danger[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  border-color: var(--danger) !important;\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%] {\n  flex: 1;\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid var(--fo-border);\n  border-radius: 10px;\n  padding: 16px 20px;\n  margin-bottom: 16px;\n  transition: all 0.2s;\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-content.status-in_progress[_ngcontent-%COMP%] {\n  border-color: rgba(79, 110, 247, 0.3);\n  background: rgba(79, 110, 247, 0.05);\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-content.status-completed[_ngcontent-%COMP%] {\n  border-color: rgba(34, 197, 94, 0.2);\n  background: rgba(34, 197, 94, 0.03);\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 12px;\n  margin-bottom: 6px;\n  flex-wrap: wrap;\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 15px;\n  font-weight: 700;\n  color: white;\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%]   .milestone-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 3px;\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%]   .milestone-right[_ngcontent-%COMP%]   .milestone-amount[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--success);\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%]   .milestone-right[_ngcontent-%COMP%]   .milestone-date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--fo-text-muted);\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--fo-text-secondary);\n  margin-bottom: 10px;\n}\n.timeline-item[_ngcontent-%COMP%]   .timeline-content[_ngcontent-%COMP%]   .milestone-status-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n@media (max-width: 768px) {\n  .content-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=projects-milestones.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectsMilestonesComponent, { className: "ProjectsMilestonesComponent", filePath: "src\\app\\frontoffice\\projects-milestones\\projects-milestones.component.ts", lineNumber: 30 });
})();

// src/app/frontoffice/subscription-management/subscription-management.component.ts
function SubscriptionManagementComponent_div_29_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1, "\u2B50 Most Popular");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionManagementComponent_div_29_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", plan_r1.currency, "", ctx_r1.getPeriod(), "");
  }
}
function SubscriptionManagementComponent_div_29_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "Save 17%");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionManagementComponent_div_29_li_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 34);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const feature_r3 = ctx.$implicit;
    const plan_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", plan_r1.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", feature_r3, " ");
  }
}
function SubscriptionManagementComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275template(1, SubscriptionManagementComponent_div_29_div_1_Template, 2, 0, "div", 20);
    \u0275\u0275elementStart(2, "div", 21)(3, "div", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3", 7);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 23);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 24)(10, "span", 25);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, SubscriptionManagementComponent_div_29_span_13_Template, 2, 2, "span", 26)(14, SubscriptionManagementComponent_div_29_span_14_Template, 2, 0, "span", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "ul", 28);
    \u0275\u0275template(16, SubscriptionManagementComponent_div_29_li_16_Template, 4, 3, "li", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 30);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const plan_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("border-color", plan_r1.isCurrent ? plan_r1.color + "60" : "");
    \u0275\u0275classProp("popular", plan_r1.isPopular)("current", plan_r1.isCurrent);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", plan_r1.isPopular);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", plan_r1.color + "20");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(plan_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r1.description);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", plan_r1.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getPrice(plan_r1) === 0 ? "Free" : \u0275\u0275pipeBind1(12, 27, ctx_r1.getPrice(plan_r1)), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.getPrice(plan_r1) > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.billingCycle === "yearly" && plan_r1.price > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", plan_r1.features);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", plan_r1.isCurrent ? "transparent" : plan_r1.color)("border-color", plan_r1.color)("color", plan_r1.isCurrent ? plan_r1.color : "white");
    \u0275\u0275classProp("current", plan_r1.isCurrent);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", plan_r1.isCurrent ? "\u2713 Current Plan" : "Upgrade to " + plan_r1.name, " ");
  }
}
function SubscriptionManagementComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 37);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span")(11, "span", 38);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 39);
    \u0275\u0275text(14, "\u2B07 PDF");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const inv_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(inv_r4.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 5, inv_r4.date, "MMM d, yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(inv_r4.plan);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", inv_r4.amount, " TND");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(inv_r4.status);
  }
}
var SubscriptionManagementComponent = class _SubscriptionManagementComponent {
  constructor() {
    this.billingCycle = "monthly";
    this.plans = [
      {
        id: "free",
        name: "Free",
        price: 0,
        currency: "TND",
        period: "/month",
        icon: "\u{1F331}",
        color: "#64748b",
        description: "Perfect to get started as a freelancer.",
        features: ["Up to 3 active bids", "Basic profile", "Community access", "Standard support"],
        isCurrent: false,
        isPopular: false
      },
      {
        id: "pro",
        name: "Pro",
        price: 29,
        currency: "TND",
        period: "/month",
        icon: "\u26A1",
        color: "#4f6ef7",
        description: "For serious freelancers who want to grow.",
        features: ["Unlimited bids", "Featured profile", "Priority in search results", "Analytics dashboard", "Badge Pro", "Priority support"],
        isCurrent: true,
        isPopular: true
      },
      {
        id: "elite",
        name: "Elite",
        price: 69,
        currency: "TND",
        period: "/month",
        icon: "\u{1F451}",
        color: "#f59e0b",
        description: "For top freelancers and agencies.",
        features: ["Everything in Pro", "Dedicated account manager", "Team workspace", "White-label proposals", "API access", "24/7 support"],
        isCurrent: false,
        isPopular: false
      }
    ];
    this.currentPlan = this.plans[1];
    this.invoices = [
      { id: "INV-001", date: "2025-02-01", amount: 29, status: "paid", plan: "Pro" },
      { id: "INV-002", date: "2025-01-01", amount: 29, status: "paid", plan: "Pro" },
      { id: "INV-003", date: "2024-12-01", amount: 29, status: "paid", plan: "Pro" }
    ];
  }
  ngOnInit() {
  }
  getPrice(plan) {
    if (this.billingCycle === "yearly")
      return Math.round(plan.price * 10);
    return plan.price;
  }
  getPeriod() {
    return this.billingCycle === "yearly" ? "/year" : "/month";
  }
  static {
    this.\u0275fac = function SubscriptionManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SubscriptionManagementComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SubscriptionManagementComponent, selectors: [["app-subscription-management"]], decls: 48, vars: 10, consts: [[1, "subscription-page"], [1, "page-header"], [1, "hero-badge"], [1, "text-gradient"], [1, "current-plan-card"], [1, "plan-icon"], [1, "plan-label"], [1, "plan-name"], [1, "renew-date"], [1, "billing-toggle"], [3, "click"], [1, "discount-badge"], [1, "plans-grid"], ["class", "plan-card", 3, "popular", "current", "border-color", 4, "ngFor", "ngForOf"], [1, "billing-section"], [1, "section-title"], [1, "invoices-table"], [1, "invoice-header"], ["class", "invoice-row", 4, "ngFor", "ngForOf"], [1, "plan-card"], ["class", "popular-badge", 4, "ngIf"], [1, "plan-header"], [1, "plan-icon-wrap"], [1, "plan-desc"], [1, "plan-price"], [1, "price-amount"], ["class", "price-currency", 4, "ngIf"], ["class", "price-note", 4, "ngIf"], [1, "plan-features"], [4, "ngFor", "ngForOf"], [1, "plan-btn"], [1, "popular-badge"], [1, "price-currency"], [1, "price-note"], [1, "check"], [1, "invoice-row"], [1, "inv-id"], [1, "inv-amount"], [1, "badge", "badge-success"], [1, "btn-download"]], template: function SubscriptionManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2);
        \u0275\u0275text(4, "\u{1F4B3} Subscription");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1");
        \u0275\u0275text(6, "Your ");
        \u0275\u0275elementStart(7, "span", 3);
        \u0275\u0275text(8, "Plan");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "p");
        \u0275\u0275text(10, "Upgrade to unlock more opportunities and grow your freelance career.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 4)(12, "span", 5);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "div")(15, "span", 6);
        \u0275\u0275text(16, "Current Plan");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "span", 7);
        \u0275\u0275text(18);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "span", 8);
        \u0275\u0275text(20, "Renews Mar 1, 2025");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(21, "div", 9)(22, "button", 10);
        \u0275\u0275listener("click", function SubscriptionManagementComponent_Template_button_click_22_listener() {
          return ctx.billingCycle = "monthly";
        });
        \u0275\u0275text(23, "Monthly");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "button", 10);
        \u0275\u0275listener("click", function SubscriptionManagementComponent_Template_button_click_24_listener() {
          return ctx.billingCycle = "yearly";
        });
        \u0275\u0275text(25, " Yearly ");
        \u0275\u0275elementStart(26, "span", 11);
        \u0275\u0275text(27, "-17%");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(28, "div", 12);
        \u0275\u0275template(29, SubscriptionManagementComponent_div_29_Template, 19, 29, "div", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "div", 14)(31, "h2", 15);
        \u0275\u0275text(32, "Billing History");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "div", 16)(34, "div", 17)(35, "span");
        \u0275\u0275text(36, "Invoice");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "span");
        \u0275\u0275text(38, "Date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "span");
        \u0275\u0275text(40, "Plan");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "span");
        \u0275\u0275text(42, "Amount");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "span");
        \u0275\u0275text(44, "Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "span");
        \u0275\u0275text(46, "Action");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(47, SubscriptionManagementComponent_div_47_Template, 15, 8, "div", 18);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275textInterpolate(ctx.currentPlan.icon);
        \u0275\u0275advance(4);
        \u0275\u0275styleProp("color", ctx.currentPlan.color);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.currentPlan.name);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("active", ctx.billingCycle === "monthly");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.billingCycle === "yearly");
        \u0275\u0275advance(5);
        \u0275\u0275property("ngForOf", ctx.plans);
        \u0275\u0275advance(18);
        \u0275\u0275property("ngForOf", ctx.invoices);
      }
    }, dependencies: [NgForOf, NgIf, DecimalPipe, DatePipe], styles: ["\n\n.subscription-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--fo-bg-primary);\n  padding: 100px 32px 60px;\n  max-width: 1100px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 24px;\n  margin-bottom: 40px;\n  flex-wrap: wrap;\n}\n.page-header[_ngcontent-%COMP%]   .hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 14px;\n  background: rgba(79, 110, 247, 0.12);\n  border: 1px solid rgba(79, 110, 247, 0.25);\n  border-radius: 20px;\n  color: var(--primary-light);\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(28px, 4vw, 48px);\n  font-weight: 800;\n  color: white;\n  letter-spacing: -1.5px;\n  margin-bottom: 8px;\n}\n.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--fo-text-secondary);\n  font-size: 15px;\n}\n.current-plan-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-md);\n  padding: 16px 20px;\n  align-self: flex-start;\n}\n.current-plan-card[_ngcontent-%COMP%]   .plan-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.current-plan-card[_ngcontent-%COMP%]   .plan-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: var(--fo-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.current-plan-card[_ngcontent-%COMP%]   .plan-name[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--font-display);\n  font-size: 18px;\n  font-weight: 800;\n}\n.current-plan-card[_ngcontent-%COMP%]   .renew-date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--fo-text-muted);\n  border-left: 1px solid var(--fo-border);\n  padding-left: 14px;\n}\n.billing-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: 10px;\n  padding: 4px;\n  width: fit-content;\n  margin: 0 auto 40px;\n}\n.billing-toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 9px 20px;\n  border-radius: 7px;\n  border: none;\n  background: transparent;\n  color: var(--fo-text-secondary);\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n}\n.billing-toggle[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: var(--primary);\n  color: white;\n}\n.billing-toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   .discount-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 6px;\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n  border-radius: 6px;\n  font-size: 11px;\n  margin-left: 6px;\n}\n.plans-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n  margin-bottom: 60px;\n}\n.plan-card[_ngcontent-%COMP%] {\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-xl);\n  padding: 28px;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  transition: all 0.3s;\n}\n.plan-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);\n}\n.plan-card.popular[_ngcontent-%COMP%] {\n  border-color: rgba(79, 110, 247, 0.4) !important;\n  box-shadow: 0 0 0 1px rgba(79, 110, 247, 0.2);\n}\n.plan-card[_ngcontent-%COMP%]   .popular-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -12px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: var(--primary);\n  color: white;\n  padding: 4px 14px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.plan-card[_ngcontent-%COMP%]   .plan-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  text-align: center;\n}\n.plan-card[_ngcontent-%COMP%]   .plan-header[_ngcontent-%COMP%]   .plan-icon-wrap[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  margin: 0 auto 12px;\n}\n.plan-card[_ngcontent-%COMP%]   .plan-header[_ngcontent-%COMP%]   .plan-name[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 20px;\n  font-weight: 800;\n  color: white;\n  margin-bottom: 4px;\n}\n.plan-card[_ngcontent-%COMP%]   .plan-header[_ngcontent-%COMP%]   .plan-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--fo-text-muted);\n  margin-bottom: 16px;\n}\n.plan-card[_ngcontent-%COMP%]   .plan-header[_ngcontent-%COMP%]   .plan-price[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: center;\n  gap: 4px;\n  flex-wrap: wrap;\n}\n.plan-card[_ngcontent-%COMP%]   .plan-header[_ngcontent-%COMP%]   .plan-price[_ngcontent-%COMP%]   .price-amount[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 36px;\n  font-weight: 800;\n}\n.plan-card[_ngcontent-%COMP%]   .plan-header[_ngcontent-%COMP%]   .plan-price[_ngcontent-%COMP%]   .price-currency[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--fo-text-muted);\n}\n.plan-card[_ngcontent-%COMP%]   .plan-header[_ngcontent-%COMP%]   .plan-price[_ngcontent-%COMP%]   .price-note[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: center;\n  font-size: 12px;\n  color: var(--success);\n  margin-top: 2px;\n}\n.plan-card[_ngcontent-%COMP%]   .plan-features[_ngcontent-%COMP%] {\n  list-style: none;\n  flex: 1;\n  margin-bottom: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.plan-card[_ngcontent-%COMP%]   .plan-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--fo-text-secondary);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.plan-card[_ngcontent-%COMP%]   .plan-features[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n}\n.plan-card[_ngcontent-%COMP%]   .plan-btn[_ngcontent-%COMP%] {\n  padding: 12px;\n  border-radius: 10px;\n  border: 1px solid;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n}\n.plan-card[_ngcontent-%COMP%]   .plan-btn[_ngcontent-%COMP%]:not(.current):hover {\n  opacity: 0.9;\n  transform: translateY(-1px);\n}\n.plan-card[_ngcontent-%COMP%]   .plan-btn.current[_ngcontent-%COMP%] {\n  cursor: default;\n  background: transparent !important;\n}\n.billing-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 22px;\n  font-weight: 800;\n  color: white;\n  margin-bottom: 20px;\n}\n.invoices-table[_ngcontent-%COMP%] {\n  background: var(--fo-bg-card);\n  border: 1px solid var(--fo-border);\n  border-radius: var(--radius-md);\n  overflow: hidden;\n}\n.invoices-table[_ngcontent-%COMP%]   .invoice-header[_ngcontent-%COMP%], \n.invoices-table[_ngcontent-%COMP%]   .invoice-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;\n  align-items: center;\n  padding: 14px 20px;\n  gap: 12px;\n}\n.invoices-table[_ngcontent-%COMP%]   .invoice-header[_ngcontent-%COMP%] {\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: var(--fo-text-muted);\n  background: rgba(255, 255, 255, 0.03);\n  font-weight: 700;\n}\n.invoices-table[_ngcontent-%COMP%]   .invoice-row[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--fo-text-secondary);\n  border-top: 1px solid var(--fo-border);\n  transition: background 0.2s;\n}\n.invoices-table[_ngcontent-%COMP%]   .invoice-row[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.02);\n}\n.invoices-table[_ngcontent-%COMP%]   .invoice-row[_ngcontent-%COMP%]   .inv-id[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: white;\n}\n.invoices-table[_ngcontent-%COMP%]   .invoice-row[_ngcontent-%COMP%]   .inv-amount[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--success);\n}\n.invoices-table[_ngcontent-%COMP%]   .invoice-row[_ngcontent-%COMP%]   .btn-download[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border: 1px solid var(--fo-border);\n  border-radius: 6px;\n  background: transparent;\n  color: var(--fo-text-secondary);\n  font-size: 12px;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.invoices-table[_ngcontent-%COMP%]   .invoice-row[_ngcontent-%COMP%]   .btn-download[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary);\n  color: var(--primary-light);\n}\n@media (max-width: 900px) {\n  .plans-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .invoices-table[_ngcontent-%COMP%]   .invoice-header[_ngcontent-%COMP%], \n   .invoices-table[_ngcontent-%COMP%]   .invoice-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr 1fr;\n  }\n}\n/*# sourceMappingURL=subscription-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SubscriptionManagementComponent, { className: "SubscriptionManagementComponent", filePath: "src\\app\\frontoffice\\subscription-management\\subscription-management.component.ts", lineNumber: 22 });
})();

// src/app/frontoffice/browse-projects/browse-projects.component.ts
function BrowseProjectsComponent_button_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function BrowseProjectsComponent_button_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.searchTerm = "";
      return \u0275\u0275resetView(ctx_r1.onSearch());
    });
    \u0275\u0275text(1, " \u2715 ");
    \u0275\u0275elementEnd();
  }
}
function BrowseProjectsComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275element(1, "div", 31);
    \u0275\u0275elementStart(2, "p", 32);
    \u0275\u0275text(3, "Finding the best projects for you...");
    \u0275\u0275elementEnd()();
  }
}
function BrowseProjectsComponent_div_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34);
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 35);
    \u0275\u0275text(4, "Oops! Something went wrong");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 36);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 37);
    \u0275\u0275listener("click", function BrowseProjectsComponent_div_42_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadAllProjects());
    });
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "\u{1F504}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Try Again ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function BrowseProjectsComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "div", 40);
    \u0275\u0275text(3, "\u{1F50D}");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3", 42);
    \u0275\u0275text(6, "No Projects Found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 43);
    \u0275\u0275text(8, " We couldn't find any projects matching your criteria. Try adjusting your filters or check back later! ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 44);
    \u0275\u0275listener("click", function BrowseProjectsComponent_div_43_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetFilters());
    });
    \u0275\u0275text(10, " Reset Filters ");
    \u0275\u0275elementEnd()();
  }
}
function BrowseProjectsComponent_div_44_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275listener("click", function BrowseProjectsComponent_div_44_div_9_Template_div_click_0_listener() {
      const project_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewProject(project_r6.id));
    });
    \u0275\u0275elementStart(1, "div", 53);
    \u0275\u0275element(2, "span", 54);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 55)(5, "div", 56);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 57)(8, "h3", 58);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 59)(11, "span", 60);
    \u0275\u0275text(12, "\u{1F3E2}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 61)(15, "p", 62);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 63)(18, "div", 64)(19, "div", 65);
    \u0275\u0275text(20, "\u{1F4B0}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 66)(22, "span", 10);
    \u0275\u0275text(23, "Budget");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 67);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 64)(28, "div", 68);
    \u0275\u0275text(29, "\u{1F4C5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 66)(31, "span", 10);
    \u0275\u0275text(32, "Deadline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 67);
    \u0275\u0275text(34);
    \u0275\u0275pipe(35, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 64)(37, "div", 69);
    \u0275\u0275text(38, "\u{1F3AF}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 66)(40, "span", 10);
    \u0275\u0275text(41, "Milestones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 67);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(44, "div", 70)(45, "button", 71)(46, "span", 72);
    \u0275\u0275text(47, "\u{1F441}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span", 73);
    \u0275\u0275text(49, "View & Apply");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span", 74);
    \u0275\u0275text(51, "\u2192");
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(52, "div", 75);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap("badge-" + ctx_r1.getStatusClass(project_r6.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", project_r6.status, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getCompanyInitials(project_r6.companyName), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(project_r6.title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", project_r6.companyName || "Company", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", project_r6.description || "No description available", " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(26, 10, project_r6.totalBudget, "1.0-0"), " TND");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(35, 13, project_r6.deadline, "MMM d"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(project_r6.milestoneCount || 0);
  }
}
function BrowseProjectsComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "div", 46)(2, "h2", 47)(3, "span", 48);
    \u0275\u0275text(4, "\u{1F4BC}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Available Projects ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 49);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 50);
    \u0275\u0275template(9, BrowseProjectsComponent_div_44_div_9_Template, 53, 16, "div", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("", ctx_r1.filteredProjects.length, " project", ctx_r1.filteredProjects.length !== 1 ? "s" : "", " available");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.filteredProjects);
  }
}
var BrowseProjectsComponent = class _BrowseProjectsComponent {
  constructor(projectService, authService, router) {
    this.projectService = projectService;
    this.authService = authService;
    this.router = router;
    this.projects = [];
    this.filteredProjects = [];
    this.loading = false;
    this.error = "";
    this.searchTerm = "";
    this.selectedStatus = "OPEN";
  }
  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.loadAllProjects();
  }
  loadAllProjects() {
    this.loading = true;
    this.error = "";
    this.projectService.getOpenProjects().subscribe({
      next: (projects) => {
        console.log("Loaded projects:", projects);
        this.projects = projects;
        this.filteredProjects = [...this.projects];
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading projects:", err);
        this.error = err.error?.error || err.error || "Failed to load projects";
        this.loading = false;
      }
    });
  }
  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProjects = this.projects.filter((p) => {
      const matchSearch = !term || p.title.toLowerCase().includes(term) || p.description && p.description.toLowerCase().includes(term);
      const matchStatus = this.selectedStatus === "ALL" || p.status === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }
  viewProject(projectId) {
    console.log("Navigating to project:", projectId);
    console.log("Current user:", this.currentUser);
    this.router.navigate(["/projects", projectId]).then((success) => console.log("Navigation success:", success), (error) => console.error("Navigation error:", error));
  }
  getStatusClass(status) {
    const statusMap = {
      "OPEN": "success",
      "IN_PROGRESS": "primary",
      "COMPLETED": "secondary",
      "CANCELLED": "danger"
    };
    return statusMap[status] || "secondary";
  }
  getCompanyInitials(companyName) {
    if (!companyName)
      return "C";
    return companyName.split(" ").map((word) => word[0]).join("").substring(0, 2).toUpperCase();
  }
  resetFilters() {
    this.searchTerm = "";
    this.selectedStatus = "OPEN";
    this.onSearch();
  }
  static {
    this.\u0275fac = function BrowseProjectsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrowseProjectsComponent)(\u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BrowseProjectsComponent, selectors: [["app-browse-projects"]], decls: 45, vars: 9, consts: [[1, "browse-projects-container"], [1, "hero-header"], [1, "hero-content"], [1, "hero-text"], [1, "hero-title"], [1, "gradient-text"], [1, "hero-subtitle"], [1, "hero-stats"], [1, "stat-item"], [1, "stat-number"], [1, "stat-label"], [1, "stat-divider"], [1, "search-section"], [1, "search-container"], [1, "search-box"], [1, "search-icon"], ["type", "text", "placeholder", "Search by project name, description, or company...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["class", "clear-btn", 3, "click", 4, "ngIf"], [1, "filter-group"], [1, "filter-label"], [1, "filter-select", 3, "ngModelChange", "change", "ngModel"], ["value", "ALL"], ["value", "OPEN"], ["value", "IN_PROGRESS"], ["value", "COMPLETED"], ["class", "loading-container", 4, "ngIf"], ["class", "error-container", 4, "ngIf"], ["class", "empty-container", 4, "ngIf"], ["class", "projects-section", 4, "ngIf"], [1, "clear-btn", 3, "click"], [1, "loading-container"], [1, "loading-spinner"], [1, "loading-text"], [1, "error-container"], [1, "error-icon"], [1, "error-title"], [1, "error-message"], [1, "btn-retry", 3, "click"], [1, "empty-container"], [1, "empty-illustration"], [1, "empty-icon"], [1, "empty-circle"], [1, "empty-title"], [1, "empty-message"], [1, "btn-reset", 3, "click"], [1, "projects-section"], [1, "section-header"], [1, "section-title"], [1, "title-icon"], [1, "section-subtitle"], [1, "projects-grid"], ["class", "project-card", 3, "click", 4, "ngFor", "ngForOf"], [1, "project-card", 3, "click"], [1, "card-badge"], [1, "badge-dot"], [1, "card-header"], [1, "company-avatar"], [1, "header-content"], [1, "project-title"], [1, "company-name"], [1, "company-icon"], [1, "card-body"], [1, "project-description"], [1, "card-stats"], [1, "stat-box"], [1, "stat-icon", "budget-icon"], [1, "stat-info"], [1, "stat-value"], [1, "stat-icon", "deadline-icon"], [1, "stat-icon", "milestone-icon"], [1, "card-footer"], [1, "btn-apply"], [1, "btn-icon"], [1, "btn-text"], [1, "btn-arrow"], [1, "card-overlay"]], template: function BrowseProjectsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4)(5, "span", 5);
        \u0275\u0275text(6, "Discover");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Amazing Projects ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 6);
        \u0275\u0275text(9, " Find the perfect project that matches your skills and start earning today ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 7)(11, "div", 8)(12, "span", 9);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "span", 10);
        \u0275\u0275text(15, "Available Projects");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(16, "div", 11);
        \u0275\u0275elementStart(17, "div", 8)(18, "span", 9);
        \u0275\u0275text(19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "span", 10);
        \u0275\u0275text(21, "Total Opportunities");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(22, "div", 12)(23, "div", 13)(24, "div", 14)(25, "span", 15);
        \u0275\u0275text(26, "\u{1F50D}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "input", 16);
        \u0275\u0275twoWayListener("ngModelChange", function BrowseProjectsComponent_Template_input_ngModelChange_27_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275listener("input", function BrowseProjectsComponent_Template_input_input_27_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(28, BrowseProjectsComponent_button_28_Template, 2, 0, "button", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "div", 18)(30, "label", 19);
        \u0275\u0275text(31, "Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "select", 20);
        \u0275\u0275twoWayListener("ngModelChange", function BrowseProjectsComponent_Template_select_ngModelChange_32_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedStatus, $event) || (ctx.selectedStatus = $event);
          return $event;
        });
        \u0275\u0275listener("change", function BrowseProjectsComponent_Template_select_change_32_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275elementStart(33, "option", 21);
        \u0275\u0275text(34, "All Projects");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "option", 22);
        \u0275\u0275text(36, "\u{1F7E2} Open");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "option", 23);
        \u0275\u0275text(38, "\u{1F7E1} In Progress");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "option", 24);
        \u0275\u0275text(40, "\u2705 Completed");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275template(41, BrowseProjectsComponent_div_41_Template, 4, 0, "div", 25)(42, BrowseProjectsComponent_div_42_Template, 11, 1, "div", 26)(43, BrowseProjectsComponent_div_43_Template, 11, 0, "div", 27)(44, BrowseProjectsComponent_div_44_Template, 10, 3, "div", 28);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275textInterpolate(ctx.filteredProjects.length);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.projects.length);
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchTerm);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedStatus);
        \u0275\u0275advance(9);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.filteredProjects.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.filteredProjects.length > 0);
      }
    }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe, DatePipe], styles: ['\n\n.browse-projects-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding: 2rem;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.hero-header[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.1) 0%,\n      rgba(118, 75, 162, 0.1) 100%);\n  border-radius: 24px;\n  padding: 3rem;\n  position: relative;\n  overflow: hidden;\n}\n.hero-header[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: -50%;\n  right: -10%;\n  width: 400px;\n  height: 400px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(102, 126, 234, 0.15) 0%,\n      transparent 70%);\n  border-radius: 50%;\n}\n.dark-mode[_nghost-%COMP%]   .hero-header[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .hero-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.15) 0%,\n      rgba(118, 75, 162, 0.15) 100%);\n}\n.hero-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n.hero-text[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.hero-title[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  font-weight: 800;\n  color: #1a202c;\n  margin: 0 0 1rem 0;\n  line-height: 1.2;\n}\n.dark-mode[_nghost-%COMP%]   .hero-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .hero-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.gradient-text[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.hero-subtitle[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: #718096;\n  margin: 0;\n  max-width: 600px;\n}\n.dark-mode[_nghost-%COMP%]   .hero-subtitle[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .hero-subtitle[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.hero-stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 2rem;\n}\n.stat-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.stat-number[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #718096;\n  font-weight: 500;\n}\n.dark-mode[_nghost-%COMP%]   .stat-label[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.stat-divider[_ngcontent-%COMP%] {\n  width: 2px;\n  height: 60px;\n  background:\n    linear-gradient(\n      180deg,\n      transparent 0%,\n      rgba(102, 126, 234, 0.3) 50%,\n      transparent 100%);\n}\n.search-section[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n}\n.search-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: flex-end;\n}\n.search-box[_ngcontent-%COMP%] {\n  flex: 1;\n  position: relative;\n  display: flex;\n  align-items: center;\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(10px);\n  border: 2px solid rgba(0, 0, 0, 0.08);\n  border-radius: 16px;\n  padding: 0 1.25rem;\n  transition: all 0.3s ease;\n}\n.search-box[_ngcontent-%COMP%]:focus-within {\n  border-color: #667eea;\n  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);\n}\n.dark-mode[_nghost-%COMP%]   .search-box[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .search-box[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.search-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin-right: 1rem;\n}\n.search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  background: transparent;\n  padding: 1.25rem 0;\n  font-size: 1rem;\n  color: #1a202c;\n  outline: none;\n}\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: #a0aec0;\n}\n.dark-mode[_nghost-%COMP%]   .search-input[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.dark-mode[_nghost-%COMP%]   .search-input[_ngcontent-%COMP%]::placeholder, .dark-mode   [_nghost-%COMP%]   .search-input[_ngcontent-%COMP%]::placeholder {\n  color: #718096;\n}\n.clear-btn[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.05);\n  border: none;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  color: #718096;\n  font-size: 1.25rem;\n}\n.clear-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.1);\n  transform: scale(1.1);\n}\n.dark-mode[_nghost-%COMP%]   .clear-btn[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .clear-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: #a0aec0;\n}\n.dark-mode[_nghost-%COMP%]   .clear-btn[_ngcontent-%COMP%]:hover, .dark-mode   [_nghost-%COMP%]   .clear-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.filter-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #4a5568;\n  margin-left: 0.5rem;\n}\n.dark-mode[_nghost-%COMP%]   .filter-label[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .filter-label[_ngcontent-%COMP%] {\n  color: #cbd5e0;\n}\n.filter-select[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border: 2px solid rgba(0, 0, 0, 0.08);\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(10px);\n  color: #1a202c;\n  font-size: 1rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  min-width: 200px;\n}\n.filter-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);\n}\n.filter-select[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n}\n.dark-mode[_nghost-%COMP%]   .filter-select[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .filter-select[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n  color: #ffffff;\n}\n.loading-container[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 6rem 2rem;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border: 6px solid rgba(102, 126, 234, 0.2);\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 2rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-text[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  color: #718096;\n  font-weight: 500;\n}\n.dark-mode[_nghost-%COMP%]   .loading-text[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .loading-text[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.error-container[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 6rem 2rem;\n}\n.error-icon[_ngcontent-%COMP%] {\n  font-size: 5rem;\n  margin-bottom: 1.5rem;\n  display: block;\n}\n.error-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 1rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .error-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .error-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.error-message[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  color: #718096;\n  margin: 0 0 2rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .error-message[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.btn-retry[_ngcontent-%COMP%] {\n  padding: 1rem 2rem;\n  border: none;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.btn-retry[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);\n}\n.empty-container[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 6rem 2rem;\n}\n.empty-illustration[_ngcontent-%COMP%] {\n  position: relative;\n  width: 120px;\n  height: 120px;\n  margin: 0 auto 2rem;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 5rem;\n  position: relative;\n  z-index: 2;\n}\n.empty-circle[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.1) 0%,\n      rgba(118, 75, 162, 0.1) 100%);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_pulse 2s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    transform: translate(-50%, -50%) scale(1);\n    opacity: 1;\n  }\n  50% {\n    transform: translate(-50%, -50%) scale(1.1);\n    opacity: 0.8;\n  }\n}\n.empty-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 1rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .empty-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .empty-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.empty-message[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  color: #718096;\n  margin: 0 0 2rem 0;\n  max-width: 500px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.dark-mode[_nghost-%COMP%]   .empty-message[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .empty-message[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.btn-reset[_ngcontent-%COMP%] {\n  padding: 1rem 2rem;\n  border: 2px solid #667eea;\n  border-radius: 12px;\n  background: transparent;\n  color: #667eea;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.btn-reset[_ngcontent-%COMP%]:hover {\n  background: #667eea;\n  color: white;\n  transform: translateY(-2px);\n}\n.projects-section[_ngcontent-%COMP%] {\n  margin-top: 3rem;\n}\n.section-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 0.5rem 0;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.dark-mode[_nghost-%COMP%]   .section-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.title-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.section-subtitle[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #718096;\n  margin: 0;\n}\n.dark-mode[_nghost-%COMP%]   .section-subtitle[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .section-subtitle[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.projects-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));\n  gap: 2rem;\n}\n.project-card[_ngcontent-%COMP%] {\n  position: relative;\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(10px);\n  border: 2px solid rgba(0, 0, 0, 0.08);\n  border-radius: 20px;\n  padding: 2rem;\n  cursor: pointer;\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  overflow: hidden;\n}\n.project-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px);\n  border-color: #667eea;\n  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);\n}\n.project-card[_ngcontent-%COMP%]:hover   .card-overlay[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.project-card[_ngcontent-%COMP%]:hover   .btn-apply[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.project-card[_ngcontent-%COMP%]:hover   .btn-apply[_ngcontent-%COMP%]   .btn-arrow[_ngcontent-%COMP%] {\n  transform: translateX(4px);\n}\n.project-card[_ngcontent-%COMP%]:hover   .company-avatar[_ngcontent-%COMP%] {\n  transform: scale(1.1);\n}\n.dark-mode[_nghost-%COMP%]   .project-card[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .project-card[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.card-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.05) 0%,\n      rgba(118, 75, 162, 0.05) 100%);\n  opacity: 0;\n  transition: opacity 0.4s ease;\n  pointer-events: none;\n}\n.card-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1.5rem;\n  right: 1.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.card-badge.badge-success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #16a34a;\n}\n.card-badge.badge-primary[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.15);\n  color: #2563eb;\n}\n.card-badge.badge-secondary[_ngcontent-%COMP%] {\n  background: rgba(107, 114, 128, 0.15);\n  color: #6b7280;\n}\n.card-badge.badge-danger[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #dc2626;\n}\n.badge-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: currentColor;\n  animation: _ngcontent-%COMP%_pulse-dot 2s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse-dot {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n  padding-right: 6rem;\n}\n.company-avatar[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.25rem;\n  font-weight: 700;\n  flex-shrink: 0;\n  transition: transform 0.3s ease;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n.header-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.project-title[_ngcontent-%COMP%] {\n  font-size: 1.375rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 0.5rem 0;\n  line-height: 1.3;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.dark-mode[_nghost-%COMP%]   .project-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .project-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.company-name[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: #667eea;\n  margin: 0;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.company-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.card-body[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.project-description[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: #718096;\n  line-height: 1.7;\n  margin: 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.dark-mode[_nghost-%COMP%]   .project-description[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .project-description[_ngcontent-%COMP%] {\n  color: #cbd5e0;\n}\n.card-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n  padding: 1.25rem;\n  background: rgba(102, 126, 234, 0.05);\n  border-radius: 12px;\n}\n.dark-mode[_nghost-%COMP%]   .card-stats[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .card-stats[_ngcontent-%COMP%] {\n  background: rgba(102, 126, 234, 0.1);\n}\n.stat-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n.stat-icon.budget-icon[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n}\n.stat-icon.deadline-icon[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.15);\n}\n.stat-icon.milestone-icon[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.15);\n}\n.stat-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  min-width: 0;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #718096;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.dark-mode[_nghost-%COMP%]   .stat-label[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #1a202c;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.dark-mode[_nghost-%COMP%]   .stat-value[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.card-footer[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n}\n.btn-apply[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1rem 1.5rem;\n  border: 2px solid #667eea;\n  border-radius: 12px;\n  background: transparent;\n  color: #667eea;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.75rem;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n}\n.btn-text[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n}\n.btn-arrow[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  transition: transform 0.3s ease;\n}\n@media (max-width: 1024px) {\n  .projects-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  }\n}\n@media (max-width: 768px) {\n  .browse-projects-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .hero-header[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n  .hero-title[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .hero-subtitle[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .hero-stats[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 1rem;\n  }\n  .stat-divider[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .search-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .filter-select[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .projects-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .card-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .card-header[_ngcontent-%COMP%] {\n    padding-right: 0;\n    margin-bottom: 4rem;\n  }\n  .card-badge[_ngcontent-%COMP%] {\n    top: auto;\n    bottom: 1.5rem;\n    right: 1.5rem;\n  }\n}\n/*# sourceMappingURL=browse-projects.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BrowseProjectsComponent, { className: "BrowseProjectsComponent", filePath: "src\\app\\frontoffice\\browse-projects\\browse-projects.component.ts", lineNumber: 12 });
})();

// src/app/frontoffice/project-view/project-view.component.ts
function ProjectViewComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div")(2, "h1", 10);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 11);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 12);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.project.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("by ", ctx_r0.project.companyName, "");
    \u0275\u0275advance();
    \u0275\u0275classMap("badge-" + ctx_r0.getStatusClass(ctx_r0.project.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.project.status, " ");
  }
}
function ProjectViewComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "div", 14);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading project details...");
    \u0275\u0275elementEnd()();
  }
}
function ProjectViewComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 16);
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 17);
    \u0275\u0275listener("click", function ProjectViewComponent_div_9_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadProjectDetails());
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
function ProjectViewComponent_div_10_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "span", 32);
    \u0275\u0275text(2, "\u{1F4CB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No milestones available yet");
    \u0275\u0275elementEnd()();
  }
}
function ProjectViewComponent_div_10_div_36_button_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function ProjectViewComponent_div_10_div_36_button_34_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const milestone_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openApplicationModal(milestone_r4));
    });
    \u0275\u0275elementStart(1, "span", 3);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Apply to this Milestone");
    \u0275\u0275elementEnd()();
  }
}
function ProjectViewComponent_div_10_div_36_div_35_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const milestone_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("This milestone is ", milestone_r4.status.toLowerCase(), "");
  }
}
function ProjectViewComponent_div_10_div_36_div_35_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Only freelancers can apply");
    \u0275\u0275elementEnd();
  }
}
function ProjectViewComponent_div_10_div_36_div_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275template(1, ProjectViewComponent_div_10_div_36_div_35_span_1_Template, 2, 1, "span", 50)(2, ProjectViewComponent_div_10_div_36_div_35_span_2_Template, 2, 0, "span", 50);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const milestone_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", milestone_r4.status !== "PENDING");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r0.currentUser == null ? null : ctx_r0.currentUser.userType) !== "FREELANCER");
  }
}
function ProjectViewComponent_div_10_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34)(2, "div")(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 35);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 36)(8, "span", 37);
    \u0275\u0275text(9, "Budget");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 38);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "p", 39);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 40)(16, "div", 41)(17, "span", 42);
    \u0275\u0275text(18, "\u{1F4C5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div")(20, "span", 43);
    \u0275\u0275text(21, "Deadline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 44);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 41)(26, "span", 42);
    \u0275\u0275text(27, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div")(29, "span", 43);
    \u0275\u0275text(30, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 44);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(33, "div", 45);
    \u0275\u0275template(34, ProjectViewComponent_div_10_div_36_button_34_Template, 5, 0, "button", 46)(35, ProjectViewComponent_div_10_div_36_div_35_Template, 3, 2, "div", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const milestone_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(milestone_r4.title);
    \u0275\u0275advance();
    \u0275\u0275classMap("badge-" + ctx_r0.getStatusClass(milestone_r4.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", milestone_r4.status, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(12, 10, milestone_r4.budget, "1.2-2"), " TND");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(milestone_r4.description);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(24, 13, milestone_r4.deadline, "MMM d, y"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(milestone_r4.status);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.canApply(milestone_r4));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.canApply(milestone_r4));
  }
}
function ProjectViewComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "h3");
    \u0275\u0275text(3, "Project Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 20)(5, "div", 21)(6, "span", 22);
    \u0275\u0275text(7, "Description:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 23);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 21)(11, "span", 22);
    \u0275\u0275text(12, "Total Budget:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 24);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 21)(17, "span", 22);
    \u0275\u0275text(18, "Deadline:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 23);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 21)(23, "span", 22);
    \u0275\u0275text(24, "Created:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 23);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(28, "div", 25)(29, "div", 26)(30, "h3");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p", 27);
    \u0275\u0275text(33, "Apply to milestones that match your skills");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(34, ProjectViewComponent_div_10_div_34_Template, 5, 0, "div", 28);
    \u0275\u0275elementStart(35, "div", 29);
    \u0275\u0275template(36, ProjectViewComponent_div_10_div_36_Template, 36, 16, "div", 30);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.project.description);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(15, 7, ctx_r0.project.totalBudget, "1.2-2"), " TND");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(21, 10, ctx_r0.project.deadline, "MMMM d, y"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(27, 13, ctx_r0.project.createdAt, "MMMM d, y"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Available Milestones (", ctx_r0.milestones.length, ")");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.milestones.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.milestones);
  }
}
function ProjectViewComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275listener("click", function ProjectViewComponent_div_11_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeApplicationModal());
    });
    \u0275\u0275elementStart(1, "div", 52);
    \u0275\u0275listener("click", function ProjectViewComponent_div_11_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 53)(3, "h2");
    \u0275\u0275text(4, "Apply to Milestone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 54);
    \u0275\u0275listener("click", function ProjectViewComponent_div_11_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeApplicationModal());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 55)(8, "div", 56)(9, "h3");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 39);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 57)(14, "div", 58)(15, "span", 59);
    \u0275\u0275text(16, "\u{1F4B0}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div")(18, "span", 60);
    \u0275\u0275text(19, "Budget");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 61);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 58)(24, "span", 59);
    \u0275\u0275text(25, "\u{1F4C5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div")(27, "span", 60);
    \u0275\u0275text(28, "Deadline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 61);
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "date");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(32, "div", 62)(33, "label");
    \u0275\u0275text(34, "Cover Letter *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "textarea", 63);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectViewComponent_div_11_Template_textarea_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.applicationFormData.coverLetter, $event) || (ctx_r0.applicationFormData.coverLetter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "small", 64);
    \u0275\u0275text(37, "\u{1F4A1} Tip: Be specific about your experience and how you'll deliver quality work on time");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 62)(39, "label");
    \u0275\u0275text(40, "Proposed Budget (TND) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "input", 65);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectViewComponent_div_11_Template_input_ngModelChange_41_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.applicationFormData.proposedBudget, $event) || (ctx_r0.applicationFormData.proposedBudget = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "small", 64);
    \u0275\u0275text(43);
    \u0275\u0275pipe(44, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 66)(46, "button", 2);
    \u0275\u0275listener("click", function ProjectViewComponent_div_11_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeApplicationModal());
    });
    \u0275\u0275elementStart(47, "span", 3);
    \u0275\u0275text(48, "\u2717");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "span");
    \u0275\u0275text(50, "Cancel");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "button", 67);
    \u0275\u0275listener("click", function ProjectViewComponent_div_11_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitApplication());
    });
    \u0275\u0275elementStart(52, "span", 3);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "span");
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.selectedMilestone == null ? null : ctx_r0.selectedMilestone.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.selectedMilestone == null ? null : ctx_r0.selectedMilestone.description);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(22, 10, ctx_r0.selectedMilestone == null ? null : ctx_r0.selectedMilestone.budget, "1.2-2"), " TND");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(31, 13, ctx_r0.selectedMilestone == null ? null : ctx_r0.selectedMilestone.deadline, "MMM d, y"));
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.applicationFormData.coverLetter);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.applicationFormData.proposedBudget);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Original budget: ", \u0275\u0275pipeBind2(44, 16, ctx_r0.selectedMilestone == null ? null : ctx_r0.selectedMilestone.budget, "1.2-2"), " TND");
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r0.submitting);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.submitting ? "\u23F3" : "\u2713");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.submitting ? "Submitting..." : "Submit Application");
  }
}
var ProjectViewComponent = class _ProjectViewComponent {
  constructor(route, router, projectService, milestoneService, applicationService, authService) {
    this.route = route;
    this.router = router;
    this.projectService = projectService;
    this.milestoneService = milestoneService;
    this.applicationService = applicationService;
    this.authService = authService;
    this.project = null;
    this.milestones = [];
    this.loading = false;
    this.error = "";
    this.showApplicationModal = false;
    this.selectedMilestone = null;
    this.applicationFormData = {
      coverLetter: "",
      proposedBudget: null
    };
    this.submitting = false;
  }
  ngOnInit() {
    console.log("ProjectViewComponent initialized");
    this.currentUser = this.authService.currentUser;
    console.log("Current user in project view:", this.currentUser);
    if (!this.currentUser) {
      this.error = "Please login to view projects";
      return;
    }
    this.projectId = Number(this.route.snapshot.paramMap.get("id"));
    console.log("Project ID:", this.projectId);
    this.loadProjectDetails();
  }
  loadProjectDetails() {
    this.loading = true;
    this.error = "";
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.loadMilestones();
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
  openApplicationModal(milestone) {
    if (this.currentUser.userType !== "FREELANCER") {
      alert("Only freelancers can apply to milestones");
      return;
    }
    this.selectedMilestone = milestone;
    this.applicationFormData = {
      coverLetter: "",
      proposedBudget: milestone.budget
    };
    this.showApplicationModal = true;
  }
  closeApplicationModal() {
    this.showApplicationModal = false;
    this.selectedMilestone = null;
  }
  submitApplication() {
    if (!this.selectedMilestone || !this.applicationFormData.coverLetter || !this.applicationFormData.proposedBudget) {
      alert("Please fill all required fields");
      return;
    }
    this.submitting = true;
    const request = {
      milestoneId: this.selectedMilestone.id,
      freelancerId: this.currentUser.id,
      coverLetter: this.applicationFormData.coverLetter,
      proposedBudget: this.applicationFormData.proposedBudget
    };
    this.applicationService.applyToMilestone(request).subscribe({
      next: () => {
        alert("Application submitted successfully! The company will review your application.");
        this.closeApplicationModal();
        this.loadMilestones();
      },
      error: (err) => {
        const errorMsg = err.error?.message || err.error || "Failed to submit application";
        alert(errorMsg);
        this.submitting = false;
      }
    });
  }
  canApply(milestone) {
    return milestone.status === "PENDING" && this.currentUser?.userType === "FREELANCER";
  }
  getStatusClass(status) {
    const statusMap = {
      "PENDING": "warning",
      "OPEN": "success",
      "IN_PROGRESS": "primary",
      "COMPLETED": "success",
      "PAID": "success",
      "CANCELLED": "danger"
    };
    return statusMap[status] || "secondary";
  }
  goBack() {
    this.router.navigate(["/frontoffice/projects"]);
  }
  static {
    this.\u0275fac = function ProjectViewComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProjectViewComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(MilestoneService), \u0275\u0275directiveInject(ApplicationService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectViewComponent, selectors: [["app-project-view"]], decls: 12, vars: 5, consts: [[1, "project-view-page"], [1, "page-header"], [1, "btn-secondary-action", 3, "click"], [1, "icon"], ["class", "header-content", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "content-wrapper", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "header-content"], [1, "page-title"], [1, "company-name"], [1, "badge"], [1, "loading-state"], [1, "spinner"], [1, "error-state"], [1, "error-icon"], [1, "btn-warning", 3, "click"], [1, "content-wrapper"], [1, "info-card"], [1, "info-content"], [1, "info-row"], [1, "label"], [1, "value"], [1, "value", "budget"], [1, "milestones-section"], [1, "section-header"], [1, "section-sub"], ["class", "empty-state", 4, "ngIf"], [1, "milestones-grid"], ["class", "milestone-card", 4, "ngFor", "ngForOf"], [1, "empty-state"], [1, "empty-icon"], [1, "milestone-card"], [1, "milestone-header"], [1, "badge", "badge-small"], [1, "milestone-budget"], [1, "budget-label"], [1, "budget-value"], [1, "milestone-desc"], [1, "milestone-meta"], [1, "meta-item"], [1, "meta-icon"], [1, "meta-label"], [1, "meta-value"], [1, "milestone-actions"], ["class", "btn-success", 3, "click", 4, "ngIf"], ["class", "not-available", 4, "ngIf"], [1, "btn-success", 3, "click"], [1, "not-available"], [4, "ngIf"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "milestone-info"], [1, "info-grid"], [1, "info-item"], [1, "info-icon"], [1, "info-label"], [1, "info-value"], [1, "form-group"], ["placeholder", "Tell the company why you're the perfect fit for this milestone. Highlight your relevant experience, skills, and approach to completing this work...", "rows", "8", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "form-hint"], ["type", "number", "placeholder", "Enter your proposed budget", "step", "0.01", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-primary-action", 3, "click", "disabled"]], template: function ProjectViewComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
        \u0275\u0275listener("click", function ProjectViewComponent_Template_button_click_2_listener() {
          return ctx.goBack();
        });
        \u0275\u0275elementStart(3, "span", 3);
        \u0275\u0275text(4, "\u2190");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "span");
        \u0275\u0275text(6, "Back to Projects");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(7, ProjectViewComponent_div_7_Template, 8, 5, "div", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275template(8, ProjectViewComponent_div_8_Template, 4, 0, "div", 5)(9, ProjectViewComponent_div_9_Template, 10, 1, "div", 6)(10, ProjectViewComponent_div_10_Template, 37, 16, "div", 7)(11, ProjectViewComponent_div_11_Template, 56, 19, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275property("ngIf", ctx.project);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.project);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showApplicationModal);
      }
    }, dependencies: [NgForOf, NgIf, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel, DecimalPipe, DatePipe], styles: ["\n\n.project-view-page[_ngcontent-%COMP%] {\n  padding: 2rem;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.page-header[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #6c757d;\n  font-size: 0.95rem;\n  cursor: pointer;\n  margin-bottom: 1rem;\n  padding: 0.5rem 0;\n  transition: color 0.2s;\n}\n.page-header[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%]:hover {\n  color: #495057;\n}\n.page-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.page-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 0 0 0.5rem 0;\n}\n.page-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .company-name[_ngcontent-%COMP%] {\n  color: #667eea;\n  font-size: 1.1rem;\n  font-weight: 500;\n  margin: 0;\n}\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n}\n.loading-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #667eea;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n.loading-state[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  display: block;\n  margin-bottom: 1rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.content-wrapper[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 2rem;\n}\n.info-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 2rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.info-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 1.5rem 0;\n  color: #2c3e50;\n  font-size: 1.5rem;\n}\n.info-card[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.info-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 1rem 0;\n  border-bottom: 1px solid #f0f0f0;\n}\n.info-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.info-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #6c757d;\n  min-width: 150px;\n}\n.info-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  flex: 1;\n}\n.info-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .value.budget[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #28a745;\n}\n.milestones-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.milestones-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 0 0 0.5rem 0;\n}\n.milestones-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .section-sub[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin: 0;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n  background: white;\n  border-radius: 12px;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  display: block;\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 1.1rem;\n}\n.milestones-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.5rem;\n}\n.milestone-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 2rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  transition: all 0.3s;\n  border: 2px solid transparent;\n}\n.milestone-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);\n  border-color: #667eea;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1rem;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  color: #2c3e50;\n  font-size: 1.5rem;\n  font-weight: 600;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%]   .milestone-budget[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%]   .milestone-budget[_ngcontent-%COMP%]   .budget-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.85rem;\n  color: #6c757d;\n  margin-bottom: 0.25rem;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%]   .milestone-budget[_ngcontent-%COMP%]   .budget-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #28a745;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-desc[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 1rem;\n  line-height: 1.6;\n  margin-bottom: 1.5rem;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-meta[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1.5rem;\n  margin-bottom: 1.5rem;\n  padding: 1.5rem;\n  background: #f8f9fa;\n  border-radius: 8px;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%]   .meta-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%]   .meta-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6c757d;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%]   .meta-value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-actions[_ngcontent-%COMP%]   .btn-apply[_ngcontent-%COMP%] {\n  width: 100%;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 1rem;\n  border-radius: 8px;\n  font-size: 1.1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-actions[_ngcontent-%COMP%]   .btn-apply[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);\n}\n.milestone-card[_ngcontent-%COMP%]   .milestone-actions[_ngcontent-%COMP%]   .not-available[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 1rem;\n  background: #f8f9fa;\n  border-radius: 8px;\n  color: #6c757d;\n  font-style: italic;\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 600;\n}\n.badge.badge-small[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.7rem;\n  font-size: 0.8rem;\n}\n.badge.badge-warning[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n}\n.badge.badge-success[_ngcontent-%COMP%] {\n  background: #d1e7dd;\n  color: #0f5132;\n}\n.badge.badge-primary[_ngcontent-%COMP%] {\n  background: #cfe2ff;\n  color: #084298;\n}\n.badge.badge-danger[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #842029;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  width: 90%;\n  max-width: 700px;\n  max-height: 90vh;\n  overflow-y: auto;\n  animation: _ngcontent-%COMP%_slideUp 0.3s;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2rem;\n  border-bottom: 1px solid #e9ecef;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #2c3e50;\n  font-size: 1.75rem;\n}\n.modal-header[_ngcontent-%COMP%]   .modal-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 2rem;\n  color: #6c757d;\n  cursor: pointer;\n  line-height: 1;\n  padding: 0;\n  width: 32px;\n  height: 32px;\n}\n.modal-header[_ngcontent-%COMP%]   .modal-close[_ngcontent-%COMP%]:hover {\n  color: #2c3e50;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.0823529412) 0%,\n      rgba(118, 75, 162, 0.0823529412) 100%);\n  padding: 1.5rem;\n  border-radius: 12px;\n  margin-bottom: 2rem;\n  border: 2px solid rgba(102, 126, 234, 0.1882352941);\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem 0;\n  color: #2c3e50;\n  font-size: 1.5rem;\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .milestone-desc[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin-bottom: 1rem;\n  line-height: 1.6;\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .info-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .info-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6c757d;\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.75rem;\n  font-weight: 600;\n  color: #2c3e50;\n  font-size: 1.05rem;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%], \n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1rem;\n  border: 2px solid #e9ecef;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-family: inherit;\n  transition: all 0.3s;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus, \n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 150px;\n  line-height: 1.6;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-hint[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.5rem;\n  font-size: 0.9rem;\n  color: #6c757d;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding: 2rem;\n  border-top: 1px solid #e9ecef;\n}\n.modal-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.875rem 2rem;\n  border: none;\n  border-radius: 8px;\n  font-size: 1.05rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.modal-footer[_ngcontent-%COMP%]   button.btn-secondary[_ngcontent-%COMP%] {\n  background: #e9ecef;\n  color: #6c757d;\n}\n.modal-footer[_ngcontent-%COMP%]   button.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #dee2e6;\n}\n.modal-footer[_ngcontent-%COMP%]   button.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.modal-footer[_ngcontent-%COMP%]   button.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);\n}\n.modal-footer[_ngcontent-%COMP%]   button.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n@media (max-width: 768px) {\n  .milestone-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .milestone-meta[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr !important;\n  }\n  .info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr !important;\n  }\n}\n/*# sourceMappingURL=project-view.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectViewComponent, { className: "ProjectViewComponent", filePath: "src\\app\\frontoffice\\project-view\\project-view.component.ts", lineNumber: 14 });
})();

// src/app/frontoffice/freelancer-dashboard/freelancer-dashboard.component.ts
function FreelancerDashboardComponent_div_64_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26)(2, "h4", 27);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 28);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 29);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 30);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const app_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(app_r1.projectTitle || "Project");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(app_r1.milestoneTitle || "Milestone");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 6, app_r1.appliedAt, "short"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getStatusClass(app_r1.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", app_r1.status.replace("_", " "), " ");
  }
}
function FreelancerDashboardComponent_div_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21)(2, "h2", 12);
    \u0275\u0275text(3, "Recent Applications");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 22);
    \u0275\u0275text(5, "View All \u2192");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 23);
    \u0275\u0275template(7, FreelancerDashboardComponent_div_64_div_7_Template, 11, 9, "div", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.recentApplications);
  }
}
function FreelancerDashboardComponent_div_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275element(1, "app-payment-dashboard", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("userId", ctx_r1.currentUser.id)("userType", "FREELANCER");
  }
}
function FreelancerDashboardComponent_div_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "span", 34);
    \u0275\u0275text(2, "\u{1F680}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Start Your Freelance Journey");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "You haven't applied to any projects yet. Browse available projects and start applying!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 35);
    \u0275\u0275listener("click", function FreelancerDashboardComponent_div_66_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateTo("/projects"));
    });
    \u0275\u0275text(8, " Browse Projects ");
    \u0275\u0275elementEnd()();
  }
}
var FreelancerDashboardComponent = class _FreelancerDashboardComponent {
  constructor(applicationService, authService, router) {
    this.applicationService = applicationService;
    this.authService = authService;
    this.router = router;
    this.stats = {
      totalApplications: 0,
      pendingApplications: 0,
      acceptedApplications: 0,
      activeProjects: 0
    };
    this.recentApplications = [];
    this.loading = true;
  }
  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.loadDashboardData();
  }
  loadDashboardData() {
    if (!this.currentUser || !this.currentUser.id) {
      this.loading = false;
      return;
    }
    this.applicationService.getFreelancerApplications(this.currentUser.id).subscribe({
      next: (applications) => {
        this.stats.totalApplications = applications.length;
        this.stats.pendingApplications = applications.filter((a) => a.status === "PENDING").length;
        this.stats.acceptedApplications = applications.filter((a) => a.status === "ACCEPTED").length;
        this.stats.activeProjects = applications.filter((a) => a.status === "ACCEPTED").length;
        this.recentApplications = applications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()).slice(0, 5);
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading dashboard data:", err);
        this.loading = false;
      }
    });
  }
  navigateTo(route) {
    this.router.navigate([route]);
  }
  getStatusClass(status) {
    const statusMap = {
      "PENDING": "warning",
      "INTERVIEW_SCHEDULED": "info",
      "INTERVIEW_CONFIRMED": "primary",
      "ACCEPTED": "success",
      "REJECTED": "danger"
    };
    return statusMap[status] || "secondary";
  }
  static {
    this.\u0275fac = function FreelancerDashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FreelancerDashboardComponent)(\u0275\u0275directiveInject(ApplicationService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FreelancerDashboardComponent, selectors: [["app-freelancer-dashboard"]], decls: 67, vars: 8, consts: [[1, "dashboard-container"], [1, "welcome-header"], [1, "welcome-content"], [1, "welcome-title"], [1, "welcome-subtitle"], [1, "stats-grid"], [1, "stat-card", 3, "click"], [1, "stat-icon"], [1, "stat-content"], [1, "stat-value"], [1, "stat-label"], [1, "quick-actions-section"], [1, "section-title"], [1, "actions-grid"], [1, "action-card", 3, "click"], [1, "action-icon"], [1, "action-label"], ["class", "recent-section", 4, "ngIf"], ["class", "payment-section", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "recent-section"], [1, "section-header"], ["routerLink", "/my-applications", 1, "view-all-link"], [1, "applications-list"], ["class", "application-item", 4, "ngFor", "ngForOf"], [1, "application-item"], [1, "app-info"], [1, "app-title"], [1, "app-milestone"], [1, "app-date"], [1, "app-status"], [1, "payment-section"], [3, "userId", "userType"], [1, "empty-state"], [1, "empty-icon"], [1, "btn-primary", 3, "click"]], template: function FreelancerDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, "Here's what's happening with your freelance work");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 5)(8, "div", 6);
        \u0275\u0275listener("click", function FreelancerDashboardComponent_Template_div_click_8_listener() {
          return ctx.navigateTo("/my-applications");
        });
        \u0275\u0275elementStart(9, "div", 7);
        \u0275\u0275text(10, "\u{1F4CB}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 8)(12, "h3", 9);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "p", 10);
        \u0275\u0275text(15, "Total Applications");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(16, "div", 6);
        \u0275\u0275listener("click", function FreelancerDashboardComponent_Template_div_click_16_listener() {
          return ctx.navigateTo("/my-applications");
        });
        \u0275\u0275elementStart(17, "div", 7);
        \u0275\u0275text(18, "\u23F3");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div", 8)(20, "h3", 9);
        \u0275\u0275text(21);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "p", 10);
        \u0275\u0275text(23, "Pending Review");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(24, "div", 6);
        \u0275\u0275listener("click", function FreelancerDashboardComponent_Template_div_click_24_listener() {
          return ctx.navigateTo("/my-projects");
        });
        \u0275\u0275elementStart(25, "div", 7);
        \u0275\u0275text(26, "\u{1F4BC}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "div", 8)(28, "h3", 9);
        \u0275\u0275text(29);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "p", 10);
        \u0275\u0275text(31, "Active Projects");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(32, "div", 6);
        \u0275\u0275listener("click", function FreelancerDashboardComponent_Template_div_click_32_listener() {
          return ctx.navigateTo("/my-applications");
        });
        \u0275\u0275elementStart(33, "div", 7);
        \u0275\u0275text(34, "\u2705");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "div", 8)(36, "h3", 9);
        \u0275\u0275text(37);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "p", 10);
        \u0275\u0275text(39, "Accepted");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(40, "div", 11)(41, "h2", 12);
        \u0275\u0275text(42, "Quick Actions");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "div", 13)(44, "button", 14);
        \u0275\u0275listener("click", function FreelancerDashboardComponent_Template_button_click_44_listener() {
          return ctx.navigateTo("/projects");
        });
        \u0275\u0275elementStart(45, "span", 15);
        \u0275\u0275text(46, "\u{1F50D}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "span", 16);
        \u0275\u0275text(48, "Browse Projects");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(49, "button", 14);
        \u0275\u0275listener("click", function FreelancerDashboardComponent_Template_button_click_49_listener() {
          return ctx.navigateTo("/my-applications");
        });
        \u0275\u0275elementStart(50, "span", 15);
        \u0275\u0275text(51, "\u{1F4CB}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "span", 16);
        \u0275\u0275text(53, "My Applications");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(54, "button", 14);
        \u0275\u0275listener("click", function FreelancerDashboardComponent_Template_button_click_54_listener() {
          return ctx.navigateTo("/my-projects");
        });
        \u0275\u0275elementStart(55, "span", 15);
        \u0275\u0275text(56, "\u{1F4BC}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "span", 16);
        \u0275\u0275text(58, "Active Projects");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(59, "button", 14);
        \u0275\u0275listener("click", function FreelancerDashboardComponent_Template_button_click_59_listener() {
          return ctx.navigateTo("/submit-work");
        });
        \u0275\u0275elementStart(60, "span", 15);
        \u0275\u0275text(61, "\u{1F4E4}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "span", 16);
        \u0275\u0275text(63, "Submit Work");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(64, FreelancerDashboardComponent_div_64_Template, 8, 1, "div", 17)(65, FreelancerDashboardComponent_div_65_Template, 2, 2, "div", 18)(66, FreelancerDashboardComponent_div_66_Template, 9, 0, "div", 19);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1("Welcome back, ", ctx.currentUser == null ? null : ctx.currentUser.firstName, "! \u{1F44B}");
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate(ctx.stats.totalApplications);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.stats.pendingApplications);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.stats.activeProjects);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.stats.acceptedApplications);
        \u0275\u0275advance(27);
        \u0275\u0275property("ngIf", ctx.recentApplications.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.currentUser == null ? null : ctx.currentUser.id);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.stats.totalApplications === 0);
      }
    }, dependencies: [NgForOf, NgIf, RouterLink, PaymentDashboardComponent, DatePipe], styles: ["\n\n.dashboard-container[_ngcontent-%COMP%] {\n  padding: 2rem;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.welcome-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.welcome-content[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.1) 0%,\n      rgba(118, 75, 162, 0.1) 100%);\n  padding: 2.5rem;\n  border-radius: 16px;\n  border: 1px solid rgba(102, 126, 234, 0.2);\n}\n.welcome-title[_ngcontent-%COMP%] {\n  font-size: 2.25rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 0.5rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .welcome-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .welcome-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.welcome-subtitle[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  color: #718096;\n  margin: 0;\n}\n.dark-mode[_nghost-%COMP%]   .welcome-subtitle[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .welcome-subtitle[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1.5rem;\n  margin-bottom: 3rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  border-radius: 16px;\n  padding: 1.75rem;\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);\n}\n.dark-mode[_nghost-%COMP%]   .stat-card[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  flex-shrink: 0;\n}\n.stat-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  color: #667eea;\n  margin: 0 0 0.25rem 0;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: #718096;\n  margin: 0;\n  font-weight: 500;\n}\n.dark-mode[_nghost-%COMP%]   .stat-label[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.quick-actions-section[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 1.5rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .section-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.actions-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}\n.action-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  border-radius: 12px;\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.action-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.1) 0%,\n      rgba(118, 75, 162, 0.1) 100%);\n}\n.dark-mode[_nghost-%COMP%]   .action-card[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .action-card[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.action-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n}\n.action-label[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #1a202c;\n  text-align: center;\n}\n.dark-mode[_nghost-%COMP%]   .action-label[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .action-label[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.recent-section[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n}\n.view-all-link[_ngcontent-%COMP%] {\n  color: #667eea;\n  text-decoration: none;\n  font-weight: 500;\n  transition: all 0.2s ease;\n}\n.view-all-link[_ngcontent-%COMP%]:hover {\n  color: #764ba2;\n  transform: translateX(4px);\n}\n.applications-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.application-item[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  border-radius: 12px;\n  padding: 1.25rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  transition: all 0.3s ease;\n}\n.application-item[_ngcontent-%COMP%]:hover {\n  transform: translateX(4px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);\n}\n.dark-mode[_nghost-%COMP%]   .application-item[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .application-item[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.app-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.app-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1a202c;\n  margin: 0 0 0.25rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .app-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .app-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.app-milestone[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #667eea;\n  margin: 0 0 0.25rem 0;\n}\n.app-date[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #718096;\n  margin: 0;\n}\n.dark-mode[_nghost-%COMP%]   .app-date[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .app-date[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.app-status[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.app-status.warning[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.2);\n  color: #d97706;\n}\n.app-status.info[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.2);\n  color: #2563eb;\n}\n.app-status.primary[_ngcontent-%COMP%] {\n  background: rgba(102, 126, 234, 0.2);\n  color: #667eea;\n}\n.app-status.success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #16a34a;\n}\n.app-status.danger[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.2);\n  color: #dc2626;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 5rem;\n  display: block;\n  margin-bottom: 1.5rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 0.75rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #718096;\n  margin: 0 0 1.5rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 0.875rem 2rem;\n  border: none;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  font-weight: 500;\n  font-size: 1rem;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);\n}\n@media (max-width: 768px) {\n  .dashboard-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .actions-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .application-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n.payment-section[_ngcontent-%COMP%] {\n  margin-top: 3rem;\n}\n/*# sourceMappingURL=freelancer-dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FreelancerDashboardComponent, { className: "FreelancerDashboardComponent", filePath: "src\\app\\frontoffice\\freelancer-dashboard\\freelancer-dashboard.component.ts", lineNumber: 11 });
})();

// src/app/frontoffice/pipes/filter.pipe.ts
var FilterPipe = class _FilterPipe {
  transform(items, field, value) {
    if (!items || !field) {
      return items;
    }
    return items.filter((item) => item[field] === value);
  }
  static {
    this.\u0275fac = function FilterPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FilterPipe)();
    };
  }
  static {
    this.\u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "filter", type: _FilterPipe, pure: true });
  }
};

// src/app/frontoffice/my-applications/my-applications.component.ts
var _c0 = (a0) => ["/projects", a0];
function MyApplicationsComponent_option_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r1 = ctx.$implicit;
    \u0275\u0275property("value", opt_r1.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r1.label, " ");
  }
}
function MyApplicationsComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "div", 20);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading your applications...");
    \u0275\u0275elementEnd()();
  }
}
function MyApplicationsComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "span", 22);
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 23);
    \u0275\u0275listener("click", function MyApplicationsComponent_div_29_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadApplications());
    });
    \u0275\u0275text(6, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.error);
  }
}
function MyApplicationsComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 25);
    \u0275\u0275text(2, "\u{1F4ED}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No Applications Found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "You haven't applied to any projects yet.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 26);
    \u0275\u0275text(8, "Browse Projects");
    \u0275\u0275elementEnd()();
  }
}
function MyApplicationsComponent_div_31_div_1_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "strong");
    \u0275\u0275text(2, "Cover Letter:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const app_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(app_r4.coverLetter);
  }
}
function MyApplicationsComponent_div_31_div_1_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "strong");
    \u0275\u0275text(2, "Your Bid:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const app_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", app_r4.proposedBudget, " TND ");
  }
}
function MyApplicationsComponent_div_31_div_1_div_20_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "a", 50);
    \u0275\u0275text(2, " \u{1F517} Join Google Meet ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const app_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("href", app_r4.meetLink, \u0275\u0275sanitizeUrl);
  }
}
function MyApplicationsComponent_div_31_div_1_div_20_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", function MyApplicationsComponent_div_31_div_1_div_20_button_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const app_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.confirmInterview(app_r4.id));
    });
    \u0275\u0275text(1, " \u2705 Confirm Attendance ");
    \u0275\u0275elementEnd();
  }
}
function MyApplicationsComponent_div_31_div_1_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "div", 46)(2, "span", 47);
    \u0275\u0275text(3, "\u{1F4C5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "strong");
    \u0275\u0275text(6, "Interview Scheduled");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, MyApplicationsComponent_div_31_div_1_div_20_p_10_Template, 3, 1, "p", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, MyApplicationsComponent_div_31_div_1_div_20_button_11_Template, 2, 0, "button", 49);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const app_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 3, app_r4.interviewDate, "full"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", app_r4.meetLink);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", app_r4.status === "INTERVIEW_SCHEDULED");
  }
}
function MyApplicationsComponent_div_31_div_1_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "strong");
    \u0275\u0275text(2, "Feedback:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 53);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const app_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(app_r4.companyFeedback);
  }
}
function MyApplicationsComponent_div_31_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 30)(2, "span", 31);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 32);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 33)(8, "h3", 34);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 35)(11, "strong");
    \u0275\u0275text(12, "Milestone:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 36)(15, "strong");
    \u0275\u0275text(16, "Budget:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, MyApplicationsComponent_div_31_div_1_div_18_Template, 5, 1, "div", 37)(19, MyApplicationsComponent_div_31_div_1_div_19_Template, 4, 1, "div", 38)(20, MyApplicationsComponent_div_31_div_1_div_20_Template, 12, 6, "div", 39)(21, MyApplicationsComponent_div_31_div_1_div_21_Template, 5, 1, "div", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 41)(23, "a", 42);
    \u0275\u0275text(24, " \u{1F441}\uFE0F View Project ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const app_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getStatusClass(app_r4.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r2.getStatusIcon(app_r4.status), " ", app_r4.status.replace("_", " "), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 13, app_r4.appliedAt, "short"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(app_r4.projectTitle || "Project");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", app_r4.milestoneTitle || "N/A", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", app_r4.proposedBudget || 0, " TND ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", app_r4.coverLetter);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", app_r4.proposedBudget);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", app_r4.interviewDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", app_r4.companyFeedback);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(16, _c0, app_r4.projectId));
  }
}
function MyApplicationsComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275template(1, MyApplicationsComponent_div_31_div_1_Template, 25, 18, "div", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.filteredApplications);
  }
}
var MyApplicationsComponent = class _MyApplicationsComponent {
  constructor(applicationService, authService) {
    this.applicationService = applicationService;
    this.authService = authService;
    this.applications = [];
    this.filteredApplications = [];
    this.loading = false;
    this.error = "";
    this.selectedStatus = "ALL";
    this.statusOptions = [
      { value: "ALL", label: "All Applications" },
      { value: "PENDING", label: "Pending" },
      { value: "INTERVIEW_SCHEDULED", label: "Interview Scheduled" },
      { value: "INTERVIEW_CONFIRMED", label: "Interview Confirmed" },
      { value: "ACCEPTED", label: "Accepted" },
      { value: "REJECTED", label: "Rejected" }
    ];
  }
  ngOnInit() {
    this.loadApplications();
  }
  loadApplications() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id) {
      this.error = "User not authenticated";
      return;
    }
    this.loading = true;
    this.error = "";
    this.applicationService.getFreelancerApplications(currentUser.id).subscribe({
      next: (applications) => {
        this.applications = applications;
        this.filteredApplications = [...applications];
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading applications:", err);
        this.error = "Failed to load applications";
        this.loading = false;
      }
    });
  }
  filterByStatus() {
    if (this.selectedStatus === "ALL") {
      this.filteredApplications = [...this.applications];
    } else {
      this.filteredApplications = this.applications.filter((app) => app.status === this.selectedStatus);
    }
  }
  getStatusClass(status) {
    const statusMap = {
      "PENDING": "warning",
      "INTERVIEW_SCHEDULED": "info",
      "INTERVIEW_CONFIRMED": "primary",
      "ACCEPTED": "success",
      "REJECTED": "danger"
    };
    return statusMap[status] || "secondary";
  }
  getStatusIcon(status) {
    const iconMap = {
      "PENDING": "\u23F3",
      "INTERVIEW_SCHEDULED": "\u{1F4C5}",
      "INTERVIEW_CONFIRMED": "\u2705",
      "ACCEPTED": "\u{1F389}",
      "REJECTED": "\u274C"
    };
    return iconMap[status] || "\u{1F4CB}";
  }
  confirmInterview(applicationId) {
    if (!confirm("Confirm your attendance for this interview?")) {
      return;
    }
    this.applicationService.confirmInterview(applicationId).subscribe({
      next: () => {
        alert("Interview confirmed successfully!");
        this.loadApplications();
      },
      error: (err) => {
        console.error("Error confirming interview:", err);
        alert("Failed to confirm interview");
      }
    });
  }
  static {
    this.\u0275fac = function MyApplicationsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MyApplicationsComponent)(\u0275\u0275directiveInject(ApplicationService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyApplicationsComponent, selectors: [["app-my-applications"]], decls: 32, vars: 17, consts: [[1, "my-applications-container"], [1, "page-header"], [1, "header-content"], [1, "page-title"], [1, "page-subtitle"], [1, "filters-bar"], [1, "filter-group"], ["for", "statusFilter"], ["id", "statusFilter", 1, "filter-select", 3, "ngModelChange", "change", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "stats-summary"], [1, "stat-badge"], [1, "stat-badge", "success"], [1, "stat-badge", "warning"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "applications-grid", 4, "ngIf"], [3, "value"], [1, "loading-state"], [1, "spinner"], [1, "error-state"], [1, "error-icon"], [1, "btn-retry", 3, "click"], [1, "empty-state"], [1, "empty-icon"], ["routerLink", "/projects", 1, "btn-primary"], [1, "applications-grid"], ["class", "application-card", 4, "ngFor", "ngForOf"], [1, "application-card"], [1, "card-header"], [1, "status-badge"], [1, "application-date"], [1, "card-body"], [1, "project-title"], [1, "milestone-title"], [1, "milestone-budget"], ["class", "cover-letter", 4, "ngIf"], ["class", "proposed-amount", 4, "ngIf"], ["class", "interview-details", 4, "ngIf"], ["class", "feedback-section", 4, "ngIf"], [1, "card-footer"], [1, "btn-view-project", 3, "routerLink"], [1, "cover-letter"], [1, "proposed-amount"], [1, "interview-details"], [1, "interview-info"], [1, "interview-icon"], [4, "ngIf"], ["class", "btn-confirm-interview", 3, "click", 4, "ngIf"], ["target", "_blank", 1, "meet-link", 3, "href"], [1, "btn-confirm-interview", 3, "click"], [1, "feedback-section"], [1, "feedback-text"]], template: function MyApplicationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
        \u0275\u0275text(4, "\u{1F4CB} My Applications");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, "Track all your project applications and their status");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "label", 7);
        \u0275\u0275text(10, "Filter by Status:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "select", 8);
        \u0275\u0275twoWayListener("ngModelChange", function MyApplicationsComponent_Template_select_ngModelChange_11_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedStatus, $event) || (ctx.selectedStatus = $event);
          return $event;
        });
        \u0275\u0275listener("change", function MyApplicationsComponent_Template_select_change_11_listener() {
          return ctx.filterByStatus();
        });
        \u0275\u0275template(12, MyApplicationsComponent_option_12_Template, 2, 2, "option", 9);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 10)(14, "span", 11);
        \u0275\u0275text(15, " Total: ");
        \u0275\u0275elementStart(16, "strong");
        \u0275\u0275text(17);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "span", 12);
        \u0275\u0275text(19, " Accepted: ");
        \u0275\u0275elementStart(20, "strong");
        \u0275\u0275text(21);
        \u0275\u0275pipe(22, "filter");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "span", 13);
        \u0275\u0275text(24, " Pending: ");
        \u0275\u0275elementStart(25, "strong");
        \u0275\u0275text(26);
        \u0275\u0275pipe(27, "filter");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(28, MyApplicationsComponent_div_28_Template, 4, 0, "div", 14)(29, MyApplicationsComponent_div_29_Template, 7, 1, "div", 15)(30, MyApplicationsComponent_div_30_Template, 9, 0, "div", 16)(31, MyApplicationsComponent_div_31_Template, 2, 1, "div", 17);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedStatus);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.statusOptions);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.applications.length);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(22, 9, ctx.applications, "status", "ACCEPTED").length);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(27, 13, ctx.applications, "status", "PENDING").length);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.filteredApplications.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.filteredApplications.length > 0);
      }
    }, dependencies: [NgForOf, NgIf, RouterLink, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe, FilterPipe], styles: ["\n\n.my-applications-container[_ngcontent-%COMP%] {\n  padding: 2rem;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.header-content[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.1) 0%,\n      rgba(118, 75, 162, 0.1) 100%);\n  padding: 2rem;\n  border-radius: 16px;\n  border: 1px solid rgba(102, 126, 234, 0.2);\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 0.5rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .page-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #718096;\n  margin: 0;\n}\n.dark-mode[_nghost-%COMP%]   .page-subtitle[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 2rem;\n  padding: 1.5rem;\n  background: rgba(255, 255, 255, 0.8);\n  backdrop-filter: blur(10px);\n  border-radius: 12px;\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  flex-wrap: wrap;\n}\n.dark-mode[_nghost-%COMP%]   .filters-bar[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .filters-bar[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.8);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #4a5568;\n}\n.dark-mode[_nghost-%COMP%]   .filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #cbd5e0;\n}\n.filter-select[_ngcontent-%COMP%] {\n  padding: 0.625rem 1rem;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 8px;\n  background: white;\n  color: #1a202c;\n  font-size: 0.9375rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.filter-select[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n}\n.filter-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.dark-mode[_nghost-%COMP%]   .filter-select[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .filter-select[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border-color: rgba(255, 255, 255, 0.1);\n  color: #ffffff;\n}\n.stats-summary[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.stat-badge[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  background: rgba(0, 0, 0, 0.05);\n  font-size: 0.875rem;\n  color: #4a5568;\n}\n.stat-badge[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1a202c;\n  margin-left: 0.25rem;\n}\n.stat-badge.success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  color: #16a34a;\n}\n.stat-badge.success[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #15803d;\n}\n.stat-badge.warning[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.1);\n  color: #d97706;\n}\n.stat-badge.warning[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #b45309;\n}\n.dark-mode[_nghost-%COMP%]   .stat-badge[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .stat-badge[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: #cbd5e0;\n}\n.dark-mode[_nghost-%COMP%]   .stat-badge[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .stat-badge[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border: 4px solid rgba(102, 126, 234, 0.2);\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.error-icon[_ngcontent-%COMP%], \n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  display: block;\n  margin-bottom: 1rem;\n}\n.btn-retry[_ngcontent-%COMP%], \n.btn-primary[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 0.75rem 1.5rem;\n  border: none;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  text-decoration: none;\n  display: inline-block;\n}\n.btn-retry[_ngcontent-%COMP%]:hover, \n.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);\n}\n.applications-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));\n  gap: 1.5rem;\n}\n.application-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  border-radius: 16px;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n.application-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);\n}\n.dark-mode[_nghost-%COMP%]   .application-card[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .application-card[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.25rem;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.05) 0%,\n      rgba(118, 75, 162, 0.05) 100%);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n}\n.dark-mode[_nghost-%COMP%]   .card-header[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  border-bottom-color: rgba(255, 255, 255, 0.1);\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.status-badge.warning[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.2);\n  color: #d97706;\n}\n.status-badge.info[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.2);\n  color: #2563eb;\n}\n.status-badge.primary[_ngcontent-%COMP%] {\n  background: rgba(102, 126, 234, 0.2);\n  color: #667eea;\n}\n.status-badge.success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #16a34a;\n}\n.status-badge.danger[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.2);\n  color: #dc2626;\n}\n.application-date[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #718096;\n}\n.dark-mode[_nghost-%COMP%]   .application-date[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .application-date[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.project-title[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 1rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .project-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .project-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.milestone-title[_ngcontent-%COMP%], \n.milestone-budget[_ngcontent-%COMP%], \n.proposed-amount[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: #4a5568;\n  margin: 0.5rem 0;\n}\n.milestone-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.milestone-budget[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.proposed-amount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1a202c;\n}\n.dark-mode[_nghost-%COMP%]   .milestone-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .milestone-title[_ngcontent-%COMP%], \n.dark-mode[_nghost-%COMP%]   .milestone-budget[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .milestone-budget[_ngcontent-%COMP%], \n.dark-mode[_nghost-%COMP%]   .proposed-amount[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .proposed-amount[_ngcontent-%COMP%] {\n  color: #cbd5e0;\n}\n.dark-mode[_nghost-%COMP%]   .milestone-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .milestone-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.dark-mode[_nghost-%COMP%]   .milestone-budget[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .milestone-budget[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.dark-mode[_nghost-%COMP%]   .proposed-amount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .proposed-amount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.cover-letter[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 1rem;\n  background: rgba(102, 126, 234, 0.05);\n  border-left: 3px solid #667eea;\n  border-radius: 8px;\n}\n.cover-letter[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  color: #1a202c;\n}\n.cover-letter[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #4a5568;\n  font-size: 0.9375rem;\n  line-height: 1.6;\n}\n.dark-mode[_nghost-%COMP%]   .cover-letter[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .cover-letter[_ngcontent-%COMP%] {\n  background: rgba(102, 126, 234, 0.1);\n}\n.dark-mode[_nghost-%COMP%]   .cover-letter[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .cover-letter[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.dark-mode[_nghost-%COMP%]   .cover-letter[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .cover-letter[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #cbd5e0;\n}\n.interview-details[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 1rem;\n  background: rgba(59, 130, 246, 0.05);\n  border-left: 3px solid #3b82f6;\n  border-radius: 8px;\n}\n.interview-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: flex-start;\n}\n.interview-info[_ngcontent-%COMP%]   .interview-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.interview-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #1a202c;\n  margin-bottom: 0.25rem;\n}\n.interview-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0;\n  color: #4a5568;\n  font-size: 0.875rem;\n}\n.dark-mode[_nghost-%COMP%]   .interview-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .interview-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.dark-mode[_nghost-%COMP%]   .interview-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .interview-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #cbd5e0;\n}\n.meet-link[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  text-decoration: none;\n  font-weight: 500;\n}\n.meet-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.btn-confirm-interview[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 0.625rem 1.25rem;\n  border: none;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #10b981 0%,\n      #059669 100%);\n  color: white;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  width: 100%;\n}\n.btn-confirm-interview[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);\n}\n.feedback-section[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 1rem;\n  background: rgba(239, 68, 68, 0.05);\n  border-left: 3px solid #ef4444;\n  border-radius: 8px;\n}\n.feedback-section[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  color: #1a202c;\n}\n.dark-mode[_nghost-%COMP%]   .feedback-section[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .feedback-section[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.feedback-text[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #4a5568;\n  font-size: 0.9375rem;\n  line-height: 1.6;\n}\n.dark-mode[_nghost-%COMP%]   .feedback-text[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .feedback-text[_ngcontent-%COMP%] {\n  color: #cbd5e0;\n}\n.card-footer[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  background: rgba(0, 0, 0, 0.02);\n  border-top: 1px solid rgba(0, 0, 0, 0.08);\n}\n.dark-mode[_nghost-%COMP%]   .card-footer[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .card-footer[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.02);\n  border-top-color: rgba(255, 255, 255, 0.1);\n}\n.btn-view-project[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.625rem 1.25rem;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  text-decoration: none;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.btn-view-project[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);\n}\n@media (max-width: 768px) {\n  .my-applications-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .applications-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .filters-bar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .stats-summary[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n  }\n}\n/*# sourceMappingURL=my-applications.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyApplicationsComponent, { className: "MyApplicationsComponent", filePath: "src\\app\\frontoffice\\my-applications\\my-applications.component.ts", lineNumber: 11 });
})();

// src/app/frontoffice/my-projects/my-projects.component.ts
function MyProjectsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "div", 10);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading your projects...");
    \u0275\u0275elementEnd()();
  }
}
function MyProjectsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 12);
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 13);
    \u0275\u0275listener("click", function MyProjectsComponent_div_8_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadActiveProjects());
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
function MyProjectsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "span", 15);
    \u0275\u0275text(2, "\u{1F4C2}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No Active Projects");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "You don't have any active projects yet. Start by applying to available projects!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 16);
    \u0275\u0275text(8, "Browse Projects");
    \u0275\u0275elementEnd()();
  }
}
function MyProjectsComponent_div_10_div_1_p_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", project_r4.description, " ");
  }
}
function MyProjectsComponent_div_10_div_1_div_8_p_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "Deadline:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(4, 1, project_r4.milestone.deadline, "mediumDate"), " ");
  }
}
function MyProjectsComponent_div_10_div_1_div_8_p_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "Description:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", project_r4.milestone.description, " ");
  }
}
function MyProjectsComponent_div_10_div_1_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "h4", 32);
    \u0275\u0275text(2, "\u{1F4CB} Current Milestone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 33)(4, "p")(5, "strong");
    \u0275\u0275text(6, "Title:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p")(9, "strong");
    \u0275\u0275text(10, "Budget:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, MyProjectsComponent_div_10_div_1_div_8_p_12_Template, 5, 4, "p", 34)(13, MyProjectsComponent_div_10_div_1_div_8_p_13_Template, 4, 1, "p", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 35)(15, "div", 36)(16, "span");
    \u0275\u0275text(17, "Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 37);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 38);
    \u0275\u0275element(21, "div", 39);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const project_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", project_r4.milestone.title, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", project_r4.milestone.budget || 0, " TND");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", project_r4.milestone.deadline);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", project_r4.milestone.description);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r1.getProgressPercentage(project_r4.milestone), "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.getProgressPercentage(project_r4.milestone), "%");
  }
}
function MyProjectsComponent_div_10_div_1_div_9_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "Your Bid:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", project_r4.application.proposedAmount, " TND ");
  }
}
function MyProjectsComponent_div_10_div_1_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "h4", 32);
    \u0275\u0275text(2, "\u{1F4DD} Your Application");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 41)(4, "p")(5, "strong");
    \u0275\u0275text(6, "Applied:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, MyProjectsComponent_div_10_div_1_div_9_p_9_Template, 4, 1, "p", 34);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const project_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(8, 2, project_r4.application.appliedAt, "short"), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", project_r4.application.proposedAmount);
  }
}
function MyProjectsComponent_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 20)(2, "h3", 21);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 22);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 23);
    \u0275\u0275template(7, MyProjectsComponent_div_10_div_1_p_7_Template, 2, 1, "p", 24)(8, MyProjectsComponent_div_10_div_1_div_8_Template, 22, 7, "div", 25)(9, MyProjectsComponent_div_10_div_1_div_9_Template, 10, 5, "div", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 27)(11, "button", 28);
    \u0275\u0275listener("click", function MyProjectsComponent_div_10_div_1_Template_button_click_11_listener() {
      const project_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewProject(project_r4.id));
    });
    \u0275\u0275text(12, " \u{1F441}\uFE0F View Details ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 29);
    \u0275\u0275listener("click", function MyProjectsComponent_div_10_div_1_Template_button_click_13_listener() {
      const project_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitWork(project_r4.id, project_r4.milestone == null ? null : project_r4.milestone.id));
    });
    \u0275\u0275text(14, " \u{1F4E4} Submit Work ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const project_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(project_r4.title);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(project_r4.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", project_r4.status.replace("_", " "), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", project_r4.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", project_r4.milestone);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", project_r4.application);
  }
}
function MyProjectsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275template(1, MyProjectsComponent_div_10_div_1_Template, 15, 7, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.activeProjects);
  }
}
var MyProjectsComponent = class _MyProjectsComponent {
  constructor(projectService, applicationService, authService, router) {
    this.projectService = projectService;
    this.applicationService = applicationService;
    this.authService = authService;
    this.router = router;
    this.activeProjects = [];
    this.loading = false;
    this.error = "";
  }
  ngOnInit() {
    this.loadActiveProjects();
  }
  loadActiveProjects() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id) {
      this.error = "User not authenticated";
      return;
    }
    this.loading = true;
    this.error = "";
    this.applicationService.getFreelancerApplications(currentUser.id).subscribe({
      next: (applications) => {
        const acceptedApps = applications.filter((app) => app.status === "ACCEPTED");
        this.activeProjects = acceptedApps.map((app) => ({
          id: app.projectId,
          title: app.projectTitle || "Project",
          description: "",
          milestone: {
            id: app.milestoneId,
            title: app.milestoneTitle,
            budget: app.proposedBudget,
            status: "IN_PROGRESS"
          },
          application: app,
          status: "IN_PROGRESS"
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading active projects:", err);
        this.error = "Failed to load active projects";
        this.loading = false;
      }
    });
  }
  viewProject(projectId) {
    this.router.navigate(["/projects", projectId]);
  }
  submitWork(projectId, milestoneId) {
    this.router.navigate(["/submit-work"], {
      queryParams: { projectId, milestoneId }
    });
  }
  getStatusClass(status) {
    const statusMap = {
      "OPEN": "success",
      "IN_PROGRESS": "primary",
      "COMPLETED": "secondary",
      "CANCELLED": "danger"
    };
    return statusMap[status] || "secondary";
  }
  getProgressPercentage(milestone) {
    if (!milestone)
      return 0;
    if (milestone.status === "COMPLETED")
      return 100;
    if (milestone.status === "IN_PROGRESS")
      return 50;
    return 0;
  }
  static {
    this.\u0275fac = function MyProjectsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MyProjectsComponent)(\u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(ApplicationService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyProjectsComponent, selectors: [["app-my-projects"]], decls: 11, vars: 4, consts: [[1, "my-projects-container"], [1, "page-header"], [1, "header-content"], [1, "page-title"], [1, "page-subtitle"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "projects-grid", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "error-state"], [1, "error-icon"], [1, "btn-retry", 3, "click"], [1, "empty-state"], [1, "empty-icon"], ["routerLink", "/projects", 1, "btn-primary"], [1, "projects-grid"], ["class", "project-card", 4, "ngFor", "ngForOf"], [1, "project-card"], [1, "card-header"], [1, "project-title"], [1, "status-badge"], [1, "card-body"], ["class", "project-description", 4, "ngIf"], ["class", "milestone-section", 4, "ngIf"], ["class", "application-section", 4, "ngIf"], [1, "card-footer"], [1, "btn-action", "btn-view", 3, "click"], [1, "btn-action", "btn-submit", 3, "click"], [1, "project-description"], [1, "milestone-section"], [1, "section-title"], [1, "milestone-info"], [4, "ngIf"], [1, "progress-section"], [1, "progress-header"], [1, "progress-percentage"], [1, "progress-bar"], [1, "progress-fill"], [1, "application-section"], [1, "application-info"]], template: function MyProjectsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
        \u0275\u0275text(4, "\u{1F4BC} My Active Projects");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, "Projects you're currently working on");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(7, MyProjectsComponent_div_7_Template, 4, 0, "div", 5)(8, MyProjectsComponent_div_8_Template, 7, 1, "div", 6)(9, MyProjectsComponent_div_9_Template, 9, 0, "div", 7)(10, MyProjectsComponent_div_10_Template, 2, 1, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.activeProjects.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.activeProjects.length > 0);
      }
    }, dependencies: [NgForOf, NgIf, RouterLink, DatePipe], styles: ["\n\n.my-projects-container[_ngcontent-%COMP%] {\n  padding: 2rem;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.header-content[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.1) 0%,\n      rgba(118, 75, 162, 0.1) 100%);\n  padding: 2rem;\n  border-radius: 16px;\n  border: 1px solid rgba(102, 126, 234, 0.2);\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 0.5rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .page-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #718096;\n  margin: 0;\n}\n.dark-mode[_nghost-%COMP%]   .page-subtitle[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border: 4px solid rgba(102, 126, 234, 0.2);\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.error-icon[_ngcontent-%COMP%], \n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  display: block;\n  margin-bottom: 1rem;\n}\n.btn-retry[_ngcontent-%COMP%], \n.btn-primary[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 0.75rem 1.5rem;\n  border: none;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  text-decoration: none;\n  display: inline-block;\n}\n.btn-retry[_ngcontent-%COMP%]:hover, \n.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);\n}\n.projects-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));\n  gap: 2rem;\n}\n.project-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  border-radius: 16px;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n.project-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);\n}\n.dark-mode[_nghost-%COMP%]   .project-card[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .project-card[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.05) 0%,\n      rgba(118, 75, 162, 0.05) 100%);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n  gap: 1rem;\n}\n.dark-mode[_nghost-%COMP%]   .card-header[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  border-bottom-color: rgba(255, 255, 255, 0.1);\n}\n.project-title[_ngcontent-%COMP%] {\n  font-size: 1.375rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0;\n  flex: 1;\n}\n.dark-mode[_nghost-%COMP%]   .project-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .project-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.status-badge.primary[_ngcontent-%COMP%] {\n  background: rgba(102, 126, 234, 0.2);\n  color: #667eea;\n}\n.status-badge.success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #16a34a;\n}\n.status-badge.secondary[_ngcontent-%COMP%] {\n  background: rgba(107, 114, 128, 0.2);\n  color: #6b7280;\n}\n.status-badge.danger[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.2);\n  color: #dc2626;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.project-description[_ngcontent-%COMP%] {\n  color: #4a5568;\n  font-size: 0.9375rem;\n  line-height: 1.6;\n  margin: 0 0 1.5rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .project-description[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .project-description[_ngcontent-%COMP%] {\n  color: #cbd5e0;\n}\n.milestone-section[_ngcontent-%COMP%], \n.application-section[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n  padding: 1.25rem;\n  background: rgba(102, 126, 234, 0.05);\n  border-left: 3px solid #667eea;\n  border-radius: 8px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #1a202c;\n  margin: 0 0 1rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .section-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.milestone-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.application-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n  color: #4a5568;\n  font-size: 0.9375rem;\n}\n.milestone-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.application-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1a202c;\n  margin-right: 0.5rem;\n}\n.dark-mode[_nghost-%COMP%]   .milestone-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .milestone-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.dark-mode[_nghost-%COMP%]   .application-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .application-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #cbd5e0;\n}\n.dark-mode[_nghost-%COMP%]   .milestone-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .milestone-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.dark-mode[_nghost-%COMP%]   .application-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .application-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.progress-section[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.progress-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #4a5568;\n}\n.dark-mode[_nghost-%COMP%]   .progress-header[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .progress-header[_ngcontent-%COMP%] {\n  color: #cbd5e0;\n}\n.progress-percentage[_ngcontent-%COMP%] {\n  color: #667eea;\n  font-weight: 600;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  height: 8px;\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 4px;\n  overflow: hidden;\n}\n.dark-mode[_nghost-%COMP%]   .progress-bar[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .progress-bar[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.1);\n}\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 4px;\n  transition: width 0.5s ease;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  padding: 1.5rem;\n  background: rgba(0, 0, 0, 0.02);\n  border-top: 1px solid rgba(0, 0, 0, 0.08);\n}\n.dark-mode[_nghost-%COMP%]   .card-footer[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .card-footer[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.02);\n  border-top-color: rgba(255, 255, 255, 0.1);\n}\n.btn-action[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0.875rem 1.5rem;\n  border: none;\n  border-radius: 8px;\n  font-weight: 500;\n  font-size: 0.9375rem;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n.btn-action[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.btn-view[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.btn-view[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);\n}\n.btn-submit[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981 0%,\n      #059669 100%);\n  color: white;\n}\n.btn-submit[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);\n}\n@media (max-width: 768px) {\n  .my-projects-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .projects-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .card-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .card-footer[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=my-projects.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyProjectsComponent, { className: "MyProjectsComponent", filePath: "src\\app\\frontoffice\\my-projects\\my-projects.component.ts", lineNumber: 13 });
})();

// src/app/frontoffice/submit-work/submit-work.component.ts
function SubmitWorkComponent_option_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r2 = ctx.$implicit;
    \u0275\u0275property("value", project_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", project_r2.title, " ");
  }
}
function SubmitWorkComponent_div_16_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const milestone_r5 = ctx.$implicit;
    \u0275\u0275property("value", milestone_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", milestone_r5.title, " (", milestone_r5.budget, " TND) ");
  }
}
function SubmitWorkComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "label", 27);
    \u0275\u0275text(2, "Select Milestone *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 28);
    \u0275\u0275twoWayListener("ngModelChange", function SubmitWorkComponent_div_16_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.selectedMilestoneId, $event) || (ctx_r3.selectedMilestoneId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 10);
    \u0275\u0275text(5, "-- Select a milestone --");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, SubmitWorkComponent_div_16_option_6_Template, 2, 3, "option", 11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.selectedMilestoneId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r3.milestones);
  }
}
function SubmitWorkComponent_span_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u{1F4E4} Submit Work");
    \u0275\u0275elementEnd();
  }
}
function SubmitWorkComponent_span_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Submitting...");
    \u0275\u0275elementEnd();
  }
}
function SubmitWorkComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 30);
    \u0275\u0275text(2, "\u2705");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.successMessage);
  }
}
function SubmitWorkComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "span", 32);
    \u0275\u0275text(2, "\u274C");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.errorMessage);
  }
}
var SubmitWorkComponent = class _SubmitWorkComponent {
  constructor(route, router, applicationService, submissionService, authService) {
    this.route = route;
    this.router = router;
    this.applicationService = applicationService;
    this.submissionService = submissionService;
    this.authService = authService;
    this.activeProjects = [];
    this.milestones = [];
    this.selectedProjectId = "";
    this.selectedMilestoneId = "";
    this.workDescription = "";
    this.fileUrl = "";
    this.notes = "";
    this.submitting = false;
    this.successMessage = "";
    this.errorMessage = "";
  }
  ngOnInit() {
    this.loadActiveProjects();
    this.route.queryParams.subscribe((params) => {
      if (params["projectId"]) {
        this.selectedProjectId = params["projectId"];
        this.onProjectChange();
      }
      if (params["milestoneId"]) {
        this.selectedMilestoneId = params["milestoneId"];
      }
    });
  }
  loadActiveProjects() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id) {
      this.errorMessage = "User not authenticated";
      return;
    }
    this.applicationService.getFreelancerApplications(currentUser.id).subscribe({
      next: (applications) => {
        const acceptedApps = applications.filter((app) => app.status === "ACCEPTED");
        this.activeProjects = acceptedApps.map((app) => ({
          id: app.projectId,
          title: app.projectTitle || "Project",
          milestones: [{
            id: app.milestoneId,
            title: app.milestoneTitle,
            budget: app.proposedBudget
          }]
        }));
      },
      error: (err) => {
        console.error("Error loading projects:", err);
        this.errorMessage = "Failed to load projects";
      }
    });
  }
  onProjectChange() {
    const project = this.activeProjects.find((p) => p.id == this.selectedProjectId);
    this.milestones = project ? project.milestones : [];
    this.selectedMilestoneId = "";
  }
  submitWork() {
    if (!this.selectedMilestoneId || !this.workDescription || !this.fileUrl) {
      this.errorMessage = "Please fill in all required fields";
      return;
    }
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id) {
      this.errorMessage = "User not authenticated";
      return;
    }
    this.submitting = true;
    this.errorMessage = "";
    this.successMessage = "";
    const submissionData = {
      milestoneId: Number(this.selectedMilestoneId),
      freelancerId: currentUser.id,
      title: "Work Submission",
      description: this.workDescription,
      attachmentUrl: this.fileUrl
    };
    this.submissionService.submitWork(submissionData).subscribe({
      next: (response) => {
        this.successMessage = "Work submitted successfully! The client will review it soon.";
        this.submitting = false;
        setTimeout(() => {
          this.router.navigate(["/my-projects"]);
        }, 2e3);
      },
      error: (err) => {
        console.error("Error submitting work:", err);
        this.errorMessage = err.error?.error || "Failed to submit work";
        this.submitting = false;
      }
    });
  }
  static {
    this.\u0275fac = function SubmitWorkComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SubmitWorkComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ApplicationService), \u0275\u0275directiveInject(SubmissionService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SubmitWorkComponent, selectors: [["app-submit-work"]], decls: 39, vars: 11, consts: [["workForm", "ngForm"], [1, "submit-work-container"], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], [1, "submit-form-card"], [3, "ngSubmit"], [1, "form-group"], ["for", "project"], ["id", "project", "name", "project", "required", "", 1, "form-control", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "form-group", 4, "ngIf"], ["for", "description"], ["id", "description", "name", "description", "rows", "6", "placeholder", "Describe what you've completed, any challenges faced, and next steps...", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "fileUrl"], ["type", "url", "id", "fileUrl", "name", "fileUrl", "placeholder", "https://drive.google.com/... or https://github.com/...", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-hint"], ["for", "notes"], ["id", "notes", "name", "notes", "rows", "3", "placeholder", "Any additional information for the client...", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-actions"], ["type", "button", "routerLink", "/my-projects", 1, "btn-secondary"], ["type", "submit", 1, "btn-primary", 3, "disabled"], [4, "ngIf"], ["class", "success-message", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [3, "value"], ["for", "milestone"], ["id", "milestone", "name", "milestone", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "success-message"], [1, "success-icon"], [1, "error-message"], [1, "error-icon"]], template: function SubmitWorkComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1", 3);
        \u0275\u0275text(3, "\u{1F4E4} Submit Work");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 4);
        \u0275\u0275text(5, "Upload your deliverables for review");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 5)(7, "form", 6, 0);
        \u0275\u0275listener("ngSubmit", function SubmitWorkComponent_Template_form_ngSubmit_7_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.submitWork());
        });
        \u0275\u0275elementStart(9, "div", 7)(10, "label", 8);
        \u0275\u0275text(11, "Select Project *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "select", 9);
        \u0275\u0275twoWayListener("ngModelChange", function SubmitWorkComponent_Template_select_ngModelChange_12_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.selectedProjectId, $event) || (ctx.selectedProjectId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function SubmitWorkComponent_Template_select_change_12_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onProjectChange());
        });
        \u0275\u0275elementStart(13, "option", 10);
        \u0275\u0275text(14, "-- Select a project --");
        \u0275\u0275elementEnd();
        \u0275\u0275template(15, SubmitWorkComponent_option_15_Template, 2, 2, "option", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(16, SubmitWorkComponent_div_16_Template, 7, 2, "div", 12);
        \u0275\u0275elementStart(17, "div", 7)(18, "label", 13);
        \u0275\u0275text(19, "Work Description *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "textarea", 14);
        \u0275\u0275twoWayListener("ngModelChange", function SubmitWorkComponent_Template_textarea_ngModelChange_20_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.workDescription, $event) || (ctx.workDescription = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "div", 7)(22, "label", 15);
        \u0275\u0275text(23, "Deliverable URL *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "input", 16);
        \u0275\u0275twoWayListener("ngModelChange", function SubmitWorkComponent_Template_input_ngModelChange_24_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.fileUrl, $event) || (ctx.fileUrl = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "small", 17);
        \u0275\u0275text(26, " Provide a link to your work (Google Drive, GitHub, Dropbox, etc.) ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "div", 7)(28, "label", 18);
        \u0275\u0275text(29, "Additional Notes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "textarea", 19);
        \u0275\u0275twoWayListener("ngModelChange", function SubmitWorkComponent_Template_textarea_ngModelChange_30_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.notes, $event) || (ctx.notes = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(31, "div", 20)(32, "button", 21);
        \u0275\u0275text(33, " Cancel ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "button", 22);
        \u0275\u0275template(35, SubmitWorkComponent_span_35_Template, 2, 0, "span", 23)(36, SubmitWorkComponent_span_36_Template, 2, 0, "span", 23);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(37, SubmitWorkComponent_div_37_Template, 5, 1, "div", 24)(38, SubmitWorkComponent_div_38_Template, 5, 1, "div", 25);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const workForm_r6 = \u0275\u0275reference(8);
        \u0275\u0275advance(12);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedProjectId);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.activeProjects);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedProjectId);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.workDescription);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.fileUrl);
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.notes);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", !workForm_r6.valid || ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.successMessage);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errorMessage);
      }
    }, dependencies: [NgForOf, NgIf, RouterLink, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ["\n\n.submit-work-container[_ngcontent-%COMP%] {\n  padding: 2rem;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 0.5rem 0;\n}\n.dark-mode[_nghost-%COMP%]   .page-title[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #718096;\n  margin: 0;\n}\n.dark-mode[_nghost-%COMP%]   .page-subtitle[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.submit-form-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  border-radius: 16px;\n  padding: 2rem;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);\n}\n.dark-mode[_nghost-%COMP%]   .submit-form-card[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .submit-form-card[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 46, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 600;\n  color: #1a202c;\n  margin-bottom: 0.5rem;\n  font-size: 0.9375rem;\n}\n.dark-mode[_nghost-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.875rem 1rem;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 8px;\n  background: white;\n  color: #1a202c;\n  font-size: 0.9375rem;\n  font-family: inherit;\n  transition: all 0.2s ease;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-control[_ngcontent-%COMP%]::placeholder {\n  color: #a0aec0;\n}\n.dark-mode[_nghost-%COMP%]   .form-control[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border-color: rgba(255, 255, 255, 0.1);\n  color: #ffffff;\n}\n.dark-mode[_nghost-%COMP%]   .form-control[_ngcontent-%COMP%]::placeholder, .dark-mode   [_nghost-%COMP%]   .form-control[_ngcontent-%COMP%]::placeholder {\n  color: #718096;\n}\ntextarea.form-control[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 100px;\n}\n.form-hint[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.5rem;\n  font-size: 0.875rem;\n  color: #718096;\n}\n.dark-mode[_nghost-%COMP%]   .form-hint[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .form-hint[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  margin-top: 2rem;\n}\n.btn-primary[_ngcontent-%COMP%], \n.btn-secondary[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0.875rem 1.5rem;\n  border: none;\n  border-radius: 8px;\n  font-weight: 500;\n  font-size: 0.9375rem;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.btn-primary[_ngcontent-%COMP%]:disabled, \n.btn-secondary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.05);\n  color: #4a5568;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.1);\n}\n.dark-mode[_nghost-%COMP%]   .btn-secondary[_ngcontent-%COMP%], .dark-mode   [_nghost-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: #cbd5e0;\n}\n.dark-mode[_nghost-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover, .dark-mode   [_nghost-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n.success-message[_ngcontent-%COMP%], \n.error-message[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding: 1.25rem;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.success-message[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  border: 1px solid rgba(34, 197, 94, 0.3);\n  color: #16a34a;\n}\n.error-message[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  color: #dc2626;\n}\n.success-icon[_ngcontent-%COMP%], \n.error-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  flex-shrink: 0;\n}\n@media (max-width: 768px) {\n  .submit-work-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .submit-form-card[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=submit-work.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SubmitWorkComponent, { className: "SubmitWorkComponent", filePath: "src\\app\\frontoffice\\submit-work\\submit-work.component.ts", lineNumber: 13 });
})();

// src/app/frontoffice/frontoffice-routing.module.ts
var routes = [
  {
    path: "",
    component: FoLayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
        pathMatch: "full"
      },
      { path: "home", redirectTo: "", pathMatch: "full" },
      { path: "dashboard", component: FreelancerDashboardComponent },
      { path: "freelancer-dashboard", redirectTo: "dashboard", pathMatch: "full" },
      { path: "my-applications", component: MyApplicationsComponent },
      { path: "my-projects", component: MyProjectsComponent },
      { path: "submit-work", component: SubmitWorkComponent },
      { path: "courses-resources", component: CoursesResourcesComponent },
      { path: "events", component: EventsComponent },
      { path: "profile-settings", component: ProfileSettingsComponent },
      { path: "projects-milestones", component: ProjectsMilestonesComponent },
      { path: "subscription-management", component: SubscriptionManagementComponent },
      { path: "projects/:id", component: ProjectViewComponent },
      { path: "projects", component: BrowseProjectsComponent }
    ]
  }
];
var FrontofficeRoutingModule = class _FrontofficeRoutingModule {
  static {
    this.\u0275fac = function FrontofficeRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FrontofficeRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _FrontofficeRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/frontoffice/browse-milestones/browse-milestones.component.ts
function BrowseMilestonesComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "div", 11);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading available milestones...");
    \u0275\u0275elementEnd()();
  }
}
function BrowseMilestonesComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "span", 13);
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function BrowseMilestonesComponent_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 18);
    \u0275\u0275text(2, "\u{1F4CB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No available milestones found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6, "Check back later for new opportunities");
    \u0275\u0275elementEnd()();
  }
}
function BrowseMilestonesComponent_div_11_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 20)(2, "div")(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 21);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 22);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "p", 23);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 24)(12, "div", 25)(13, "span", 26);
    \u0275\u0275text(14, "\u{1F4B0} Budget");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 27);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 25)(19, "span", 26);
    \u0275\u0275text(20, "\u{1F4C5} Deadline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 27);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 28)(25, "button", 29);
    \u0275\u0275listener("click", function BrowseMilestonesComponent_div_11_div_2_Template_button_click_25_listener() {
      const milestone_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openApplicationModal(milestone_r3));
    });
    \u0275\u0275text(26, " Apply Now ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const milestone_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(milestone_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(milestone_r3.projectTitle);
    \u0275\u0275advance();
    \u0275\u0275classMap("badge-" + ctx_r0.getStatusClass(milestone_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", milestone_r3.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(milestone_r3.description);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(17, 8, milestone_r3.budget, "1.2-2"), " TND");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(23, 11, milestone_r3.deadline, "MMM d, y"));
  }
}
function BrowseMilestonesComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275template(1, BrowseMilestonesComponent_div_11_div_1_Template, 7, 0, "div", 15)(2, BrowseMilestonesComponent_div_11_div_2_Template, 27, 14, "div", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.filteredMilestones.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.filteredMilestones);
  }
}
function BrowseMilestonesComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275listener("click", function BrowseMilestonesComponent_div_12_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeApplicationModal());
    });
    \u0275\u0275elementStart(1, "div", 31);
    \u0275\u0275listener("click", function BrowseMilestonesComponent_div_12_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 32)(3, "h2");
    \u0275\u0275text(4, "Apply to Milestone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 33);
    \u0275\u0275listener("click", function BrowseMilestonesComponent_div_12_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeApplicationModal());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 34)(8, "div", 35)(9, "h3");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 21);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 36);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 37)(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 38)(23, "label");
    \u0275\u0275text(24, "Cover Letter *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "textarea", 39);
    \u0275\u0275twoWayListener("ngModelChange", function BrowseMilestonesComponent_div_12_Template_textarea_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.applicationFormData.coverLetter, $event) || (ctx_r0.applicationFormData.coverLetter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "small", 40);
    \u0275\u0275text(27, "Tip: Mention specific skills and past projects that relate to this milestone");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 38)(29, "label");
    \u0275\u0275text(30, "Proposed Budget (TND) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function BrowseMilestonesComponent_div_12_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.applicationFormData.proposedBudget, $event) || (ctx_r0.applicationFormData.proposedBudget = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "small", 40);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 42)(36, "button", 43);
    \u0275\u0275listener("click", function BrowseMilestonesComponent_div_12_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeApplicationModal());
    });
    \u0275\u0275text(37, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 44);
    \u0275\u0275listener("click", function BrowseMilestonesComponent_div_12_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitApplication());
    });
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.selectedMilestone == null ? null : ctx_r0.selectedMilestone.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.selectedMilestone == null ? null : ctx_r0.selectedMilestone.projectTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.selectedMilestone == null ? null : ctx_r0.selectedMilestone.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4B0} Budget: ", \u0275\u0275pipeBind2(18, 10, ctx_r0.selectedMilestone == null ? null : ctx_r0.selectedMilestone.budget, "1.2-2"), " TND");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4C5} Deadline: ", \u0275\u0275pipeBind2(21, 13, ctx_r0.selectedMilestone == null ? null : ctx_r0.selectedMilestone.deadline, "MMM d, y"), "");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.applicationFormData.coverLetter);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.applicationFormData.proposedBudget);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Original budget: ", \u0275\u0275pipeBind2(34, 16, ctx_r0.selectedMilestone == null ? null : ctx_r0.selectedMilestone.budget, "1.2-2"), " TND");
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.submitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.submitting ? "Submitting..." : "Submit Application", " ");
  }
}
var BrowseMilestonesComponent = class _BrowseMilestonesComponent {
  constructor(milestoneService, applicationService, authService) {
    this.milestoneService = milestoneService;
    this.applicationService = applicationService;
    this.authService = authService;
    this.milestones = [];
    this.filteredMilestones = [];
    this.loading = false;
    this.error = "";
    this.searchTerm = "";
    this.showApplicationModal = false;
    this.selectedMilestone = null;
    this.applicationFormData = {
      coverLetter: "",
      proposedBudget: null
    };
    this.submitting = false;
  }
  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    if (this.currentUser?.userType !== "FREELANCER") {
      this.error = "This page is only for freelancers";
      return;
    }
    this.loadAvailableMilestones();
  }
  loadAvailableMilestones() {
    this.loading = true;
    this.error = "";
    this.loading = false;
  }
  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredMilestones = this.milestones.filter((m) => m.title.toLowerCase().includes(term) || m.description?.toLowerCase().includes(term) || m.projectTitle?.toLowerCase().includes(term));
  }
  openApplicationModal(milestone) {
    this.selectedMilestone = milestone;
    this.applicationFormData = {
      coverLetter: "",
      proposedBudget: milestone.budget
    };
    this.showApplicationModal = true;
  }
  closeApplicationModal() {
    this.showApplicationModal = false;
    this.selectedMilestone = null;
  }
  submitApplication() {
    if (!this.selectedMilestone || !this.applicationFormData.coverLetter || !this.applicationFormData.proposedBudget) {
      alert("Please fill all required fields");
      return;
    }
    this.submitting = true;
    const request = {
      milestoneId: this.selectedMilestone.id,
      freelancerId: this.currentUser.id,
      coverLetter: this.applicationFormData.coverLetter,
      proposedBudget: this.applicationFormData.proposedBudget
    };
    this.applicationService.applyToMilestone(request).subscribe({
      next: () => {
        alert("Application submitted successfully!");
        this.closeApplicationModal();
        this.loadAvailableMilestones();
      },
      error: (err) => {
        alert(err.error || "Failed to submit application");
        this.submitting = false;
      }
    });
  }
  getStatusClass(status) {
    const statusMap = {
      "PENDING": "warning",
      "IN_PROGRESS": "primary",
      "COMPLETED": "success",
      "PAID": "success"
    };
    return statusMap[status] || "secondary";
  }
  static {
    this.\u0275fac = function BrowseMilestonesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrowseMilestonesComponent)(\u0275\u0275directiveInject(MilestoneService), \u0275\u0275directiveInject(ApplicationService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BrowseMilestonesComponent, selectors: [["app-browse-milestones"]], decls: 13, vars: 5, consts: [[1, "browse-milestones-page"], [1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "search-bar"], ["type", "text", "placeholder", "\u{1F50D} Search milestones by title, description, or project...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "milestones-grid", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "error-state"], [1, "error-icon"], [1, "milestones-grid"], ["class", "empty-state", 4, "ngIf"], ["class", "milestone-card", 4, "ngFor", "ngForOf"], [1, "empty-state"], [1, "empty-icon"], [1, "milestone-card"], [1, "card-header"], [1, "project-name"], [1, "badge"], [1, "description"], [1, "card-meta"], [1, "meta-item"], [1, "meta-label"], [1, "meta-value"], [1, "card-actions"], [1, "btn-apply", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "milestone-info"], [1, "milestone-desc"], [1, "info-row"], [1, "form-group"], ["placeholder", "Explain why you're the best fit for this milestone. Include your relevant experience and approach...", "rows", "6", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "form-hint"], ["type", "number", "placeholder", "Enter your proposed budget", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-secondary", 3, "click"], [1, "btn-primary", 3, "click", "disabled"]], template: function BrowseMilestonesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "Available Milestones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Find and apply to projects that match your skills");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 4)(8, "input", 5);
        \u0275\u0275twoWayListener("ngModelChange", function BrowseMilestonesComponent_Template_input_ngModelChange_8_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275listener("input", function BrowseMilestonesComponent_Template_input_input_8_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, BrowseMilestonesComponent_div_9_Template, 4, 0, "div", 6)(10, BrowseMilestonesComponent_div_10_Template, 5, 1, "div", 7)(11, BrowseMilestonesComponent_div_11_Template, 3, 2, "div", 8)(12, BrowseMilestonesComponent_div_12_Template, 40, 19, "div", 9);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showApplicationModal);
      }
    }, dependencies: [NgForOf, NgIf, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel, DecimalPipe, DatePipe], styles: ["\n\n.browse-milestones-page[_ngcontent-%COMP%] {\n  padding: 2rem;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.page-header[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 0 0 0.5rem 0;\n}\n.page-header[_ngcontent-%COMP%]   .page-sub[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin: 0;\n}\n.search-bar[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.search-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1rem 1.5rem;\n  border: 2px solid #e9ecef;\n  border-radius: 12px;\n  font-size: 1rem;\n  transition: all 0.3s;\n}\n.search-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);\n}\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n}\n.loading-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #667eea;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n.loading-state[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%], \n.loading-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  display: block;\n  margin-bottom: 1rem;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 1.1rem;\n}\n.loading-state[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #adb5bd;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.milestones-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n  gap: 1.5rem;\n}\n.milestone-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  transition: all 0.3s;\n  border: 2px solid transparent;\n}\n.milestone-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  border-color: #667eea;\n}\n.milestone-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1rem;\n}\n.milestone-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  color: #2c3e50;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.milestone-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .project-name[_ngcontent-%COMP%] {\n  color: #667eea;\n  font-size: 0.9rem;\n  margin: 0;\n  font-weight: 500;\n}\n.milestone-card[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 0.95rem;\n  line-height: 1.6;\n  margin-bottom: 1rem;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.milestone-card[_ngcontent-%COMP%]   .card-meta[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n  padding: 1rem;\n  background: #f8f9fa;\n  border-radius: 8px;\n}\n.milestone-card[_ngcontent-%COMP%]   .card-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.milestone-card[_ngcontent-%COMP%]   .card-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%]   .meta-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6c757d;\n}\n.milestone-card[_ngcontent-%COMP%]   .card-meta[_ngcontent-%COMP%]   .meta-item[_ngcontent-%COMP%]   .meta-value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.milestone-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.btn-apply[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 0.75rem 2rem;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.btn-apply[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.btn-apply[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 0.4rem 0.8rem;\n  border-radius: 6px;\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n.badge.badge-warning[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n}\n.badge.badge-primary[_ngcontent-%COMP%] {\n  background: #cfe2ff;\n  color: #084298;\n}\n.badge.badge-success[_ngcontent-%COMP%] {\n  background: #d1e7dd;\n  color: #0f5132;\n}\n.badge.badge-secondary[_ngcontent-%COMP%] {\n  background: #e9ecef;\n  color: #6c757d;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  width: 90%;\n  max-width: 600px;\n  max-height: 90vh;\n  overflow-y: auto;\n  animation: _ngcontent-%COMP%_slideUp 0.3s;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e9ecef;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #2c3e50;\n  font-size: 1.5rem;\n}\n.modal-header[_ngcontent-%COMP%]   .modal-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 2rem;\n  color: #6c757d;\n  cursor: pointer;\n  line-height: 1;\n  padding: 0;\n  width: 32px;\n  height: 32px;\n}\n.modal-header[_ngcontent-%COMP%]   .modal-close[_ngcontent-%COMP%]:hover {\n  color: #2c3e50;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  padding: 1.5rem;\n  border-radius: 8px;\n  margin-bottom: 1.5rem;\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  color: #2c3e50;\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .project-name[_ngcontent-%COMP%] {\n  color: #667eea;\n  font-weight: 600;\n  margin-bottom: 0.75rem;\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .milestone-desc[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin-bottom: 1rem;\n}\n.modal-body[_ngcontent-%COMP%]   .milestone-info[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2rem;\n  font-size: 0.9rem;\n  color: #6c757d;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%], \n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem;\n  border: 2px solid #e9ecef;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  font-family: inherit;\n  transition: all 0.3s;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus, \n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 120px;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-hint[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.5rem;\n  font-size: 0.85rem;\n  color: #6c757d;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e9ecef;\n}\n.modal-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border: none;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.modal-footer[_ngcontent-%COMP%]   button.btn-secondary[_ngcontent-%COMP%] {\n  background: #e9ecef;\n  color: #6c757d;\n}\n.modal-footer[_ngcontent-%COMP%]   button.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #dee2e6;\n}\n.modal-footer[_ngcontent-%COMP%]   button.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.modal-footer[_ngcontent-%COMP%]   button.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.modal-footer[_ngcontent-%COMP%]   button.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n@media (max-width: 768px) {\n  .milestones-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .modal-content[_ngcontent-%COMP%] {\n    width: 95%;\n    margin: 1rem;\n  }\n}\n/*# sourceMappingURL=browse-milestones.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BrowseMilestonesComponent, { className: "BrowseMilestonesComponent", filePath: "src\\app\\frontoffice\\browse-milestones\\browse-milestones.component.ts", lineNumber: 12 });
})();

// src/app/frontoffice/frontoffice.module.ts
var FrontofficeModule = class _FrontofficeModule {
  static {
    this.\u0275fac = function FrontofficeModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FrontofficeModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _FrontofficeModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      FrontofficeRoutingModule,
      SharedModule
    ] });
  }
};
export {
  FrontofficeModule
};
//# sourceMappingURL=chunk-54YORYJG.js.map
