import {
  ProjectService
} from "./chunk-VJ6DNUD7.js";
import {
  AuthService,
  CommonModule,
  CurrencyPipe,
  NgForOf,
  NgIf,
  Router,
  RouterLink,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-JJBAUJRA.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/organizer/dashboard/dashboard.component.ts
var _c0 = () => [1, 2, 3, 4];
var _c1 = () => [1, 2, 3];
function DashboardComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "div", 32);
    \u0275\u0275text(3, "\u{1F4E6}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 33);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 34);
    \u0275\u0275text(7, "Projets total");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 35)(9, "div", 32);
    \u0275\u0275text(10, "\u{1F3AF}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 33);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 34);
    \u0275\u0275text(14, "Projets vendus");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 36)(16, "div", 32);
    \u0275\u0275text(17, "\u{1F4B0}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 33);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 34);
    \u0275\u0275text(22, "Revenu total");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 37)(24, "div", 32);
    \u0275\u0275text(25, "\u{1F3F7}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 33);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 34);
    \u0275\u0275text(29, "Cat\xE9gories");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.stats.totalProjects);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.stats.totalSold);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(20, 4, ctx_r0.stats.totalRevenue, "EUR", "symbol", "1.0-0"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate((ctx_r0.stats.categoryStats == null ? null : ctx_r0.stats.categoryStats.length) || 0);
  }
}
function DashboardComponent_div_39_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 39);
  }
}
function DashboardComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275template(1, DashboardComponent_div_39_div_1_Template, 1, 0, "div", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c0));
  }
}
function DashboardComponent_div_41_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 44);
    \u0275\u0275element(4, "div", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 46);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r2.category);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.getBarWidth(cat_r2.count));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r2.count);
  }
}
function DashboardComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "h2", 25);
    \u0275\u0275text(2, "Projets par cat\xE9gorie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 40);
    \u0275\u0275template(4, DashboardComponent_div_41_div_4_Template, 7, 4, "div", 41);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.stats.categoryStats);
  }
}
function DashboardComponent_div_48_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 49);
  }
}
function DashboardComponent_div_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, DashboardComponent_div_48_div_1_Template, 1, 0, "div", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c1));
  }
}
function DashboardComponent_div_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "p");
    \u0275\u0275text(2, "Aucun projet. ");
    \u0275\u0275elementStart(3, "a", 51);
    \u0275\u0275text(4, "Cr\xE9ez votre premier projet !");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardComponent_div_50_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "div", 55)(2, "div", 56);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "p", 57);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 58);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 59)(10, "span", 60);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 61);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", "linear-gradient(135deg,#6C63FF,#FF6584)");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r3.title.charAt(0), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r3.category);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(12, 11, p_r3.price, "EUR", "symbol", "1.0-0"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("badge-success", p_r3.status === "AVAILABLE")("badge-danger", p_r3.status === "SOLD_OUT");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r3.status === "AVAILABLE" ? "Disponible" : "\xC9puis\xE9", " ");
  }
}
function DashboardComponent_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275template(1, DashboardComponent_div_50_div_1_Template, 15, 16, "div", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.recentProjects);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(projectService, authService, router) {
    this.projectService = projectService;
    this.authService = authService;
    this.router = router;
    this.stats = null;
    this.recentProjects = [];
    this.loading = true;
  }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.loading = true;
    this.projectService.getDashboard().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: () => {
      }
    });
    this.projectService.getMy().subscribe({
      next: (projects) => {
        this.recentProjects = projects.slice(0, 5);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }
  getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  }
  getBarWidth(count) {
    if (!this.stats?.categoryStats?.length)
      return "0%";
    const max = Math.max(...this.stats.categoryStats.map((c) => c.count));
    return max > 0 ? `${count / max * 100}%` : "0%";
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)(\u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 51, vars: 9, consts: [[1, "org-layout"], [1, "sidebar"], [1, "sidebar-brand"], [1, "logo-icon"], [1, "logo-text"], [1, "sidebar-nav"], ["routerLink", "/organizer/dashboard", "routerLinkActive", "active", 1, "nav-item"], [1, "nav-icon"], ["routerLink", "/organizer/projects", "routerLinkActive", "active", 1, "nav-item"], [1, "sidebar-footer"], [1, "user-info"], [1, "user-avatar"], [1, "user-name"], [1, "user-role"], [1, "btn", "btn-secondary", "btn-sm", "w-full", 3, "click"], [1, "main"], [1, "page-header"], [1, "page-title"], [1, "page-sub"], ["routerLink", "/organizer/projects", 1, "btn", "btn-primary"], ["class", "stats-grid", 4, "ngIf"], [1, "content-grid"], ["class", "card", 4, "ngIf"], [1, "card"], [1, "card-header"], [1, "card-title"], ["routerLink", "/organizer/projects", 1, "card-link"], ["class", "loading-list", 4, "ngIf"], ["class", "empty-list", 4, "ngIf"], ["class", "project-list", 4, "ngIf"], [1, "stats-grid"], [1, "stat-card", "stat-purple"], [1, "stat-icon"], [1, "stat-value"], [1, "stat-label"], [1, "stat-card", "stat-green"], [1, "stat-card", "stat-orange"], [1, "stat-card", "stat-blue"], ["class", "stat-skeleton", 4, "ngFor", "ngForOf"], [1, "stat-skeleton"], [1, "chart-bars"], ["class", "chart-row", 4, "ngFor", "ngForOf"], [1, "chart-row"], [1, "chart-label"], [1, "bar-track"], [1, "bar-fill"], [1, "chart-count"], [1, "loading-list"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "empty-list"], ["routerLink", "/organizer/projects"], [1, "project-list"], ["class", "project-row", 4, "ngFor", "ngForOf"], [1, "project-row"], [1, "project-row-info"], [1, "project-row-img"], [1, "project-row-title"], [1, "project-row-cat"], [1, "project-row-right"], [1, "project-row-price"], [1, "badge"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4, "M");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "span", 4);
        \u0275\u0275text(6, "Marketplace");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "nav", 5)(8, "a", 6)(9, "span", 7);
        \u0275\u0275text(10, "\u{1F4CA}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " Dashboard ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "a", 8)(13, "span", 7);
        \u0275\u0275text(14, "\u{1F4E6}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, " Mes Projets ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 9)(17, "div", 10)(18, "div", 11);
        \u0275\u0275text(19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div")(21, "p", 12);
        \u0275\u0275text(22);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "p", 13);
        \u0275\u0275text(24, "Organisateur");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(25, "button", 14);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_25_listener() {
          return ctx.logout();
        });
        \u0275\u0275text(26, "D\xE9connexion");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(27, "main", 15)(28, "div", 16)(29, "div")(30, "h1", 17);
        \u0275\u0275text(31, "Dashboard \u{1F4CA}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "p", 18);
        \u0275\u0275text(33);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "a", 19)(35, "span");
        \u0275\u0275text(36, "+");
        \u0275\u0275elementEnd();
        \u0275\u0275text(37, " Nouveau Projet ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(38, DashboardComponent_div_38_Template, 30, 9, "div", 20)(39, DashboardComponent_div_39_Template, 2, 2, "div", 20);
        \u0275\u0275elementStart(40, "div", 21);
        \u0275\u0275template(41, DashboardComponent_div_41_Template, 5, 1, "div", 22);
        \u0275\u0275elementStart(42, "div", 23)(43, "div", 24)(44, "h2", 25);
        \u0275\u0275text(45, "Projets r\xE9cents");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "a", 26);
        \u0275\u0275text(47, "Voir tout \u2192");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(48, DashboardComponent_div_48_Template, 2, 2, "div", 27)(49, DashboardComponent_div_49_Template, 5, 0, "div", 28)(50, DashboardComponent_div_50_Template, 2, 1, "div", 29);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(19);
        \u0275\u0275textInterpolate(ctx.getInitials((ctx.authService.currentUser == null ? null : ctx.authService.currentUser.name) || ""));
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.authService.currentUser == null ? null : ctx.authService.currentUser.name);
        \u0275\u0275advance(11);
        \u0275\u0275textInterpolate1("Bienvenue, ", ctx.authService.currentUser == null ? null : ctx.authService.currentUser.name, " !");
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.stats);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.stats);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.stats == null ? null : ctx.stats.categoryStats == null ? null : ctx.stats.categoryStats.length);
        \u0275\u0275advance(7);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.recentProjects.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.recentProjects.length > 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, CurrencyPipe, RouterLink], styles: ['\n\n.org-layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 260px;\n  min-height: 100vh;\n  flex-shrink: 0;\n  background: var(--surface);\n  border-right: 1px solid var(--border);\n  display: flex;\n  flex-direction: column;\n  padding: 24px 16px;\n  position: sticky;\n  top: 0;\n  height: 100vh;\n}\n.sidebar-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 0 8px;\n  margin-bottom: 40px;\n}\n.logo-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--secondary));\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: "Syne", sans-serif;\n  font-weight: 800;\n  font-size: 16px;\n  color: white;\n}\n.logo-text[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-weight: 800;\n  font-size: 18px;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border-radius: var(--radius-sm);\n  color: var(--text-muted);\n  text-decoration: none;\n  font-weight: 500;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: var(--surface2);\n  color: var(--text);\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background: rgba(108, 99, 255, 0.15);\n  color: var(--primary);\n  font-weight: 600;\n}\n.nav-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: 24px;\n  border-top: 1px solid var(--border);\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--secondary));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 14px;\n  color: white;\n  flex-shrink: 0;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 2px;\n}\n.user-role[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.main[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 40px;\n  overflow: auto;\n  background: var(--bg);\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 36px;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-size: 32px;\n  font-weight: 800;\n  margin-bottom: 4px;\n}\n.page-sub[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 15px;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 20px;\n  margin-bottom: 32px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  padding: 24px;\n  border-radius: var(--radius);\n  border: 1px solid var(--border);\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.stat-purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(108, 99, 255, 0.15),\n      rgba(108, 99, 255, 0.05));\n  border-color: rgba(108, 99, 255, 0.3);\n}\n.stat-green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(67, 233, 123, 0.15),\n      rgba(67, 233, 123, 0.05));\n  border-color: rgba(67, 233, 123, 0.3);\n}\n.stat-orange[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(247, 183, 49, 0.15),\n      rgba(247, 183, 49, 0.05));\n  border-color: rgba(247, 183, 49, 0.3);\n}\n.stat-blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(38, 179, 255, 0.15),\n      rgba(38, 179, 255, 0.05));\n  border-color: rgba(38, 179, 255, 0.3);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  margin-bottom: 12px;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-size: 30px;\n  font-weight: 800;\n  margin-bottom: 4px;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  font-weight: 500;\n}\n.stat-skeleton[_ngcontent-%COMP%] {\n  height: 120px;\n  border-radius: var(--radius);\n  background:\n    linear-gradient(\n      90deg,\n      var(--surface) 25%,\n      var(--surface2) 50%,\n      var(--surface) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  to {\n    background-position: -200% 0;\n  }\n}\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n.card[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  padding: 24px;\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n.card-title[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-weight: 700;\n  font-size: 17px;\n  margin-bottom: 20px;\n}\n.card-header[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.card-link[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--primary);\n  text-decoration: none;\n  font-weight: 600;\n}\n.card-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.chart-bars[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.chart-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.chart-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  width: 80px;\n  flex-shrink: 0;\n  color: var(--text-muted);\n}\n.bar-track[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 10px;\n  background: var(--bg2);\n  border-radius: 5px;\n  overflow: hidden;\n}\n.bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 5px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      var(--secondary));\n  transition: width 0.8s ease;\n}\n.chart-count[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  width: 24px;\n  text-align: right;\n}\n.skeleton-row[_ngcontent-%COMP%] {\n  height: 56px;\n  border-radius: var(--radius-sm);\n  margin-bottom: 8px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--bg2) 25%,\n      var(--bg3) 50%,\n      var(--bg2) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n}\n.empty-list[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 14px;\n  text-align: center;\n  padding: 24px 0;\n}\n.empty-list[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--primary);\n  text-decoration: none;\n  font-weight: 600;\n}\n.project-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.project-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px;\n  border-radius: var(--radius-sm);\n  background: var(--bg2);\n  border: 1px solid var(--border);\n  transition: background 0.2s;\n}\n.project-row[_ngcontent-%COMP%]:hover {\n  background: var(--bg3);\n}\n.project-row-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.project-row-img[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 14px;\n  color: white;\n  flex-shrink: 0;\n}\n.project-row-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 2px;\n}\n.project-row-cat[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n}\n.project-row-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.project-row-price[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  color: var(--accent);\n}\n@media (max-width: 1100px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .content-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .sidebar[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .main[_ngcontent-%COMP%] {\n    padding: 20px 16px;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\features\\organizer\\dashboard\\dashboard.component.ts", lineNumber: 15 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-JMSD4SET.js.map
