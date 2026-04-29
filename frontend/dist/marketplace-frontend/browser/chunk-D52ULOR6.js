import {
  ChatPanelComponent,
  ChatService,
  NotificationService,
  NotificationToastComponent,
  require_entry,
  require_stomp_umd
} from "./chunk-7AG26UB3.js";
import "./chunk-RSNS7LQS.js";
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
  Subject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-JJBAUJRA.js";
import {
  __spreadValues,
  __toESM
} from "./chunk-ASLTLD6L.js";

// src/app/core/services/websocket.service.ts
var import_stompjs = __toESM(require_stomp_umd());
var SockJS = __toESM(require_entry());
var WebSocketService = class _WebSocketService {
  constructor() {
    this.stompClient = null;
    this.newProjectSubject = new Subject();
    this.deletedProjectSubject = new Subject();
  }
  connect() {
    if (this.stompClient?.connected)
      return;
    this.stompClient = new import_stompjs.Client({
      webSocketFactory: () => new SockJS("http://localhost:8085/ws"),
      reconnectDelay: 5e3,
      onConnect: () => {
        this.stompClient.subscribe("/topic/projects", (msg) => {
          this.newProjectSubject.next(JSON.parse(msg.body));
        });
        this.stompClient.subscribe("/topic/project-deleted", (msg) => {
          this.deletedProjectSubject.next(JSON.parse(msg.body));
        });
      }
    });
    this.stompClient.activate();
  }
  disconnect() {
    this.stompClient?.deactivate();
    this.stompClient = null;
  }
  onNewProject() {
    return this.newProjectSubject.asObservable();
  }
  onProjectDeleted() {
    return this.deletedProjectSubject.asObservable();
  }
  static {
    this.\u0275fac = function WebSocketService_Factory(t) {
      return new (t || _WebSocketService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WebSocketService, factory: _WebSocketService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/client/projects/projects.component.ts
var _c0 = () => [1, 2, 3, 4, 5, 6];
function ProjectsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "span", 27);
    \u0275\u0275text(2, "\u{1F514}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 28);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.totalUnread > 99 ? "99+" : ctx_r0.totalUnread);
  }
}
function ProjectsComponent_button_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function ProjectsComponent_button_30_Template_button_click_0_listener() {
      const cat_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.filterCategory(cat_r3));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.selectedCategory === cat_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cat_r3 === "all" ? "\u2728 Tous" : cat_r3, " ");
  }
}
function ProjectsComponent_div_31_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 32);
  }
}
function ProjectsComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275template(1, ProjectsComponent_div_31_div_1_Template, 1, 0, "div", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c0));
  }
}
function ProjectsComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34);
    \u0275\u0275text(2, "\u{1F50D}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Aucun projet trouv\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Essayez une autre recherche ou cat\xE9gorie");
    \u0275\u0275elementEnd()();
  }
}
function ProjectsComponent_div_33_div_1_img_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 56);
  }
  if (rf & 2) {
    const project_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", project_r5.imageUrl, \u0275\u0275sanitizeUrl)("alt", project_r5.title);
  }
}
function ProjectsComponent_div_33_div_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const project_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((project_r5.category == null ? null : project_r5.category.charAt(0)) || "\u{1F4E6}");
  }
}
function ProjectsComponent_div_33_div_1_span_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", project_r5.unreadCount > 9 ? "9+" : project_r5.unreadCount, " ");
  }
}
function ProjectsComponent_div_33_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 38);
    \u0275\u0275template(2, ProjectsComponent_div_33_div_1_img_2_Template, 1, 2, "img", 39)(3, ProjectsComponent_div_33_div_1_div_3_Template, 3, 1, "div", 40);
    \u0275\u0275elementStart(4, "div", 41)(5, "span", 42);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 43)(8, "div", 44)(9, "span", 45);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "h3", 46);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 47);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 48)(16, "div", 49)(17, "div", 50);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "span", 51);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 52)(24, "div", 53);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 54);
    \u0275\u0275listener("click", function ProjectsComponent_div_33_div_1_Template_button_click_27_listener() {
      const project_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openChat(project_r5));
    });
    \u0275\u0275text(28, " \u{1F4AC} Chatter ");
    \u0275\u0275template(29, ProjectsComponent_div_33_div_1_span_29_Template, 2, 1, "span", 55);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const project_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", project_r5.imageUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !project_r5.imageUrl);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("badge-success", project_r5.status === "AVAILABLE")("badge-danger", project_r5.status === "SOLD_OUT");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", project_r5.status === "AVAILABLE" ? "\u2705 Disponible" : "\u274C \xC9puis\xE9", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(project_r5.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(project_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(project_r5.description);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.getInitials(project_r5.organizerName));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(project_r5.organizerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", project_r5.soldCount, " vendus");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(26, 15, project_r5.price, "EUR", "symbol", "1.0-0"));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", project_r5.unreadCount && project_r5.unreadCount > 0);
  }
}
function ProjectsComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275template(1, ProjectsComponent_div_33_div_1_Template, 30, 20, "div", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.filteredProjects);
  }
}
function ProjectsComponent_app_chat_panel_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-chat-panel", 59);
    \u0275\u0275listener("close", function ProjectsComponent_app_chat_panel_35_Template_app_chat_panel_close_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeChat());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("project", ctx_r0.activeChatProject);
  }
}
var ProjectsComponent = class _ProjectsComponent {
  constructor(projectService, authService, wsService, notifService, chatService, router) {
    this.projectService = projectService;
    this.authService = authService;
    this.wsService = wsService;
    this.notifService = notifService;
    this.chatService = chatService;
    this.router = router;
    this.projects = [];
    this.filteredProjects = [];
    this.loading = true;
    this.selectedCategory = "all";
    this.searchQuery = "";
    this.activeChatProject = null;
    this.totalUnread = 0;
    this.categories = ["all", "Web", "Mobile", "Design", "Data", "IA", "Marketing", "Autre"];
  }
  ngOnInit() {
    this.loadProjects();
    this.wsService.connect();
    this.notifService.connect();
    this.notifService.requestBrowserPermission();
    this.wsSub = this.wsService.onNewProject().subscribe((project) => {
      const idx = this.projects.findIndex((p) => p.id === project.id);
      if (idx >= 0)
        this.projects[idx] = __spreadValues(__spreadValues({}, this.projects[idx]), project);
      else
        this.projects = [project, ...this.projects];
      this.applyFilter();
    });
    this.wsDelSub = this.wsService.onProjectDeleted().subscribe((id) => {
      this.projects = this.projects.filter((p) => p.id !== id);
      this.applyFilter();
    });
    this.notifSub = this.notifService.notifications$.subscribe((notif) => {
      const project = this.projects.find((p) => p.id === notif.projectId);
      if (project && this.activeChatProject?.id !== notif.projectId) {
        project.unreadCount = (project.unreadCount || 0) + 1;
        this.updateTotalUnread();
      }
    });
    this.notifService.unreadCount$.subscribe((c) => this.totalUnread = c);
  }
  ngOnDestroy() {
    this.wsSub?.unsubscribe();
    this.wsDelSub?.unsubscribe();
    this.notifSub?.unsubscribe();
    this.wsService.disconnect();
    this.notifService.disconnect();
  }
  loadProjects() {
    this.loading = true;
    this.projectService.getAll().subscribe({
      next: (data) => {
        this.projects = data;
        this.applyFilter();
        this.loading = false;
        this.loadUnreadCounts();
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  loadUnreadCounts() {
    this.projects.forEach((project) => {
      this.chatService.getUnreadCount(project.id).subscribe({
        next: (r) => {
          project.unreadCount = r.count;
          this.updateTotalUnread();
        },
        error: () => {
        }
      });
    });
  }
  updateTotalUnread() {
    this.totalUnread = this.projects.reduce((sum, p) => sum + (p.unreadCount || 0), 0);
  }
  applyFilter() {
    let result = [...this.projects];
    if (this.selectedCategory !== "all")
      result = result.filter((p) => p.category === this.selectedCategory);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.organizerName.toLowerCase().includes(q));
    }
    this.filteredProjects = result;
  }
  filterCategory(cat) {
    this.selectedCategory = cat;
    this.applyFilter();
  }
  onSearch(event) {
    this.searchQuery = event.target.value;
    this.applyFilter();
  }
  openChat(project) {
    this.activeChatProject = project;
    project.unreadCount = 0;
    this.updateTotalUnread();
    this.chatService.markRead(project.id).subscribe();
  }
  closeChat() {
    this.activeChatProject = null;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }
  getInitials(name) {
    return name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";
  }
  static {
    this.\u0275fac = function ProjectsComponent_Factory(t) {
      return new (t || _ProjectsComponent)(\u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(WebSocketService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(ChatService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectsComponent, selectors: [["app-projects"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 36, vars: 9, consts: [[1, "client-layout"], [1, "navbar"], [1, "nav-brand"], [1, "logo-icon"], [1, "logo-text"], [1, "nav-center"], ["type", "text", "placeholder", "\u{1F50D}  Rechercher un projet...", 1, "search-input", 3, "input"], [1, "nav-right"], ["class", "notif-bell", 4, "ngIf"], [1, "user-badge"], [1, "avatar"], [1, "user-info"], [1, "user-name"], [1, "user-role"], [1, "btn", "btn-secondary", "btn-sm", 3, "click"], [1, "main-content"], [1, "hero"], [1, "hero-title"], [1, "highlight"], [1, "hero-sub"], [1, "categories"], ["class", "cat-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], ["class", "loading-grid", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "projects-grid", 4, "ngIf"], [3, "project", "close", 4, "ngIf"], [1, "notif-bell"], [1, "bell-icon"], [1, "bell-badge"], [1, "cat-btn", 3, "click"], [1, "loading-grid"], ["class", "skeleton-card", 4, "ngFor", "ngForOf"], [1, "skeleton-card"], [1, "empty-state"], [1, "empty-icon"], [1, "projects-grid"], ["class", "project-card fade-in", 4, "ngFor", "ngForOf"], [1, "project-card", "fade-in"], [1, "project-img"], ["onerror", "this.style.display='none'", 3, "src", "alt", 4, "ngIf"], ["class", "project-img-placeholder", 4, "ngIf"], [1, "project-badge"], [1, "badge"], [1, "project-body"], [1, "project-category"], [1, "badge", "badge-primary"], [1, "project-title"], [1, "project-desc"], [1, "project-meta"], [1, "organizer"], [1, "org-avatar"], [1, "sold-count"], [1, "project-footer"], [1, "project-price"], [1, "btn", "btn-primary", "btn-chat", 3, "click"], ["class", "unread-badge", 4, "ngIf"], ["onerror", "this.style.display='none'", 3, "src", "alt"], [1, "project-img-placeholder"], [1, "unread-badge"], [3, "close", "project"]], template: function ProjectsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4, "M");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "span", 4);
        \u0275\u0275text(6, "Marketplace");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "input", 6);
        \u0275\u0275listener("input", function ProjectsComponent_Template_input_input_8_listener($event) {
          return ctx.onSearch($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 7);
        \u0275\u0275template(10, ProjectsComponent_div_10_Template, 5, 1, "div", 8);
        \u0275\u0275elementStart(11, "div", 9)(12, "div", 10);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "div", 11)(15, "span", 12);
        \u0275\u0275text(16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "span", 13);
        \u0275\u0275text(18, "Client");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(19, "button", 14);
        \u0275\u0275listener("click", function ProjectsComponent_Template_button_click_19_listener() {
          return ctx.logout();
        });
        \u0275\u0275text(20, "D\xE9connexion");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(21, "main", 15)(22, "div", 16)(23, "h1", 17);
        \u0275\u0275text(24, "D\xE9couvrez des projets ");
        \u0275\u0275elementStart(25, "span", 18);
        \u0275\u0275text(26, "exceptionnels");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "p", 19);
        \u0275\u0275text(28);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 20);
        \u0275\u0275template(30, ProjectsComponent_button_30_Template, 2, 3, "button", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275template(31, ProjectsComponent_div_31_Template, 2, 2, "div", 22)(32, ProjectsComponent_div_32_Template, 7, 0, "div", 23)(33, ProjectsComponent_div_33_Template, 2, 1, "div", 24);
        \u0275\u0275elementEnd();
        \u0275\u0275element(34, "app-notification-toast");
        \u0275\u0275template(35, ProjectsComponent_app_chat_panel_35_Template, 1, 1, "app-chat-panel", 25);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275property("ngIf", ctx.totalUnread > 0);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.getInitials((ctx.authService.currentUser == null ? null : ctx.authService.currentUser.name) || ""));
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.authService.currentUser == null ? null : ctx.authService.currentUser.name);
        \u0275\u0275advance(12);
        \u0275\u0275textInterpolate1("", ctx.filteredProjects.length, " projets disponibles");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.categories);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredProjects.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredProjects.length > 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.activeChatProject);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, CurrencyPipe, ChatPanelComponent, NotificationToastComponent], styles: ['\n\n.client-layout[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--bg);\n  display: flex;\n  flex-direction: column;\n}\n.navbar[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  background: rgba(15, 15, 26, 0.85);\n  -webkit-backdrop-filter: blur(20px);\n  backdrop-filter: blur(20px);\n  border-bottom: 1px solid var(--border);\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  padding: 0 32px;\n  height: 70px;\n}\n.nav-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 180px;\n}\n.logo-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--secondary));\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: "Syne", sans-serif;\n  font-weight: 800;\n  font-size: 16px;\n  color: white;\n}\n.logo-text[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-weight: 800;\n  font-size: 18px;\n}\n.nav-center[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 480px;\n}\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 16px;\n  background: var(--bg2);\n  border: 1px solid var(--border);\n  border-radius: 30px;\n  color: var(--text);\n  font-family: inherit;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--primary);\n  box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.1);\n}\n.nav-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-left: auto;\n}\n.user-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--secondary));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 13px;\n  color: white;\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.2;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n}\n.user-role[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 40px 32px;\n  max-width: 1400px;\n  margin: 0 auto;\n  width: 100%;\n}\n.hero[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.hero-title[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-size: 36px;\n  font-weight: 800;\n  margin-bottom: 8px;\n}\n.highlight[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--secondary));\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n.hero-sub[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 16px;\n}\n.categories[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-bottom: 32px;\n}\n.cat-btn[_ngcontent-%COMP%] {\n  padding: 8px 18px;\n  border-radius: 20px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  border: 1px solid var(--border);\n  background: var(--surface);\n  color: var(--text-muted);\n  transition: all 0.2s;\n  font-family: inherit;\n}\n.cat-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary);\n  color: var(--text);\n}\n.cat-btn.active[_ngcontent-%COMP%] {\n  background: var(--primary);\n  border-color: var(--primary);\n  color: #fff;\n}\n.loading-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 24px;\n}\n.skeleton-card[_ngcontent-%COMP%] {\n  height: 380px;\n  border-radius: var(--radius);\n  background:\n    linear-gradient(\n      90deg,\n      var(--surface) 25%,\n      var(--surface2) 50%,\n      var(--surface) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  to {\n    background-position: -200% 0;\n  }\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 20px;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  margin-bottom: 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n}\n.projects-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 24px;\n}\n.project-card[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  overflow: hidden;\n  transition: transform 0.2s, box-shadow 0.2s;\n  display: flex;\n  flex-direction: column;\n}\n.project-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow);\n}\n.project-img[_ngcontent-%COMP%] {\n  height: 180px;\n  position: relative;\n  overflow: hidden;\n  background: var(--bg3);\n}\n.project-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.project-img-placeholder[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 48px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--bg3),\n      var(--surface2));\n}\n.project-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n}\n.project-body[_ngcontent-%COMP%] {\n  padding: 16px;\n  flex: 1;\n}\n.project-category[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.project-title[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-weight: 700;\n  font-size: 17px;\n  margin-bottom: 8px;\n  line-height: 1.3;\n}\n.project-desc[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 13px;\n  line-height: 1.5;\n  margin-bottom: 16px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.project-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 13px;\n  color: var(--text-muted);\n}\n.organizer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.org-avatar[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--secondary));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 10px;\n  font-weight: 700;\n  color: white;\n}\n.sold-count[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.project-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-top: 1px solid var(--border);\n}\n.project-price[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-weight: 800;\n  font-size: 20px;\n  color: var(--accent);\n}\n.btn-chat[_ngcontent-%COMP%] {\n  gap: 6px;\n  position: relative;\n}\n.unread-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background: #ef4444;\n  color: white;\n  font-size: 10px;\n  font-weight: 700;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 4px;\n  border-radius: 10px;\n  margin-left: 4px;\n  animation: _ngcontent-%COMP%_pulse 1.5s infinite;\n}\n.notif-bell[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 38px;\n  height: 38px;\n  cursor: pointer;\n}\n.bell-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.bell-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: #ef4444;\n  color: white;\n  font-size: 10px;\n  font-weight: 700;\n  min-width: 16px;\n  height: 16px;\n  padding: 0 3px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid var(--bg, #0d0d1a);\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.15);\n  }\n}\n@media (max-width: 768px) {\n  .navbar[_ngcontent-%COMP%] {\n    padding: 0 16px;\n  }\n  .nav-center[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .main-content[_ngcontent-%COMP%] {\n    padding: 24px 16px;\n  }\n  .projects-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=projects.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectsComponent, { className: "ProjectsComponent", filePath: "src\\app\\features\\client\\projects\\projects.component.ts", lineNumber: 21 });
})();
export {
  ProjectsComponent
};
//# sourceMappingURL=chunk-D52ULOR6.js.map
