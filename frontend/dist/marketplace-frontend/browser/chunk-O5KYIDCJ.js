import {
  ChatPanelComponent,
  ChatService,
  NotificationService,
  NotificationToastComponent
} from "./chunk-7AG26UB3.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-RSNS7LQS.js";
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
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-JJBAUJRA.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/organizer/projects/org-projects.component.ts
var _c0 = () => [1, 2, 3, 4, 5, 6];
function OrgProjectsComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2705 ", ctx_r0.successMsg, "");
  }
}
function OrgProjectsComponent_div_39_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 29);
  }
}
function OrgProjectsComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275template(1, OrgProjectsComponent_div_39_div_1_Template, 1, 0, "div", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c0));
  }
}
function OrgProjectsComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31);
    \u0275\u0275text(2, "\u{1F4ED}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Aucun projet pour l'instant");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Cr\xE9ez votre premier projet et commencez \xE0 vendre !");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 32);
    \u0275\u0275listener("click", function OrgProjectsComponent_div_40_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openCreate());
    });
    \u0275\u0275text(8, "Cr\xE9er un projet");
    \u0275\u0275elementEnd()();
  }
}
function OrgProjectsComponent_div_41_div_1_img_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 54);
  }
  if (rf & 2) {
    const project_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", project_r4.imageUrl, \u0275\u0275sanitizeUrl)("alt", project_r4.title);
  }
}
function OrgProjectsComponent_div_41_div_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", project_r4.title.charAt(0), " ");
  }
}
function OrgProjectsComponent_div_41_div_1_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", project_r4.unreadCount > 9 ? "9+" : project_r4.unreadCount, " ");
  }
}
function OrgProjectsComponent_div_41_div_1_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u{1F5D1}\uFE0F Supprimer");
    \u0275\u0275elementEnd();
  }
}
function OrgProjectsComponent_div_41_div_1_span_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 57);
  }
}
function OrgProjectsComponent_div_41_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35);
    \u0275\u0275template(2, OrgProjectsComponent_div_41_div_1_img_2_Template, 1, 2, "img", 36)(3, OrgProjectsComponent_div_41_div_1_div_3_Template, 2, 1, "div", 37);
    \u0275\u0275elementStart(4, "span", 38);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 39)(7, "div", 40)(8, "span", 41);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 42);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "h3", 43);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 44);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 45)(17, "div", 46);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 47)(21, "button", 48);
    \u0275\u0275listener("click", function OrgProjectsComponent_div_41_div_1_Template_button_click_21_listener() {
      const project_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openChat(project_r4));
    });
    \u0275\u0275text(22, " \u{1F4AC} ");
    \u0275\u0275template(23, OrgProjectsComponent_div_41_div_1_span_23_Template, 2, 1, "span", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 50);
    \u0275\u0275listener("click", function OrgProjectsComponent_div_41_div_1_Template_button_click_24_listener() {
      const project_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openEdit(project_r4));
    });
    \u0275\u0275text(25, "\u270F\uFE0F Modifier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 51);
    \u0275\u0275listener("click", function OrgProjectsComponent_div_41_div_1_Template_button_click_26_listener() {
      const project_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.deleteProject(project_r4.id));
    });
    \u0275\u0275template(27, OrgProjectsComponent_div_41_div_1_span_27_Template, 2, 0, "span", 52)(28, OrgProjectsComponent_div_41_div_1_span_28_Template, 1, 0, "span", 53);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const project_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", project_r4.imageUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !project_r4.imageUrl);
    \u0275\u0275advance();
    \u0275\u0275classProp("badge-success", project_r4.status === "AVAILABLE")("badge-danger", project_r4.status === "SOLD_OUT");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", project_r4.status === "AVAILABLE" ? "Disponible" : "\xC9puis\xE9", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(project_r4.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", project_r4.soldCount, " vendus");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(project_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(project_r4.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(19, 16, project_r4.price, "EUR", "symbol", "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", project_r4.unreadCount && project_r4.unreadCount > 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.deleting === project_r4.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.deleting !== project_r4.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.deleting === project_r4.id);
  }
}
function OrgProjectsComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275template(1, OrgProjectsComponent_div_41_div_1_Template, 29, 21, "div", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.projects);
  }
}
function OrgProjectsComponent_app_chat_panel_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-chat-panel", 58);
    \u0275\u0275listener("close", function OrgProjectsComponent_app_chat_panel_43_Template_app_chat_panel_close_0_listener() {
      \u0275\u0275restoreView(_r5);
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
function OrgProjectsComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275listener("click", function OrgProjectsComponent_div_44_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275elementEnd();
  }
}
function OrgProjectsComponent_div_45_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 78);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", ctx_r0.errorMsg, "");
  }
}
function OrgProjectsComponent_div_45_option_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 79);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r8 = ctx.$implicit;
    \u0275\u0275property("value", cat_r8);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r8);
  }
}
function OrgProjectsComponent_div_45_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80);
    \u0275\u0275element(1, "img", 81);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.form.imageUrl, \u0275\u0275sanitizeUrl);
  }
}
function OrgProjectsComponent_div_45_span_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.editingProject ? "Mettre \xE0 jour" : "Publier le projet");
  }
}
function OrgProjectsComponent_div_45_span_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 82);
  }
}
function OrgProjectsComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60)(1, "div", 61)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 62);
    \u0275\u0275listener("click", function OrgProjectsComponent_div_45_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275text(5, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 63);
    \u0275\u0275template(7, OrgProjectsComponent_div_45_div_7_Template, 2, 1, "div", 64);
    \u0275\u0275elementStart(8, "div", 65)(9, "label");
    \u0275\u0275text(10, "Titre du projet *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 66);
    \u0275\u0275twoWayListener("ngModelChange", function OrgProjectsComponent_div_45_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.title, $event) || (ctx_r0.form.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 65)(13, "label");
    \u0275\u0275text(14, "Description *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "textarea", 67);
    \u0275\u0275twoWayListener("ngModelChange", function OrgProjectsComponent_div_45_Template_textarea_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.description, $event) || (ctx_r0.form.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 68)(17, "div", 65)(18, "label");
    \u0275\u0275text(19, "Prix (\u20AC) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 69);
    \u0275\u0275twoWayListener("ngModelChange", function OrgProjectsComponent_div_45_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.price, $event) || (ctx_r0.form.price = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 65)(22, "label");
    \u0275\u0275text(23, "Cat\xE9gorie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "select", 70);
    \u0275\u0275twoWayListener("ngModelChange", function OrgProjectsComponent_div_45_Template_select_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.category, $event) || (ctx_r0.form.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(25, OrgProjectsComponent_div_45_option_25_Template, 2, 2, "option", 71);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 65)(27, "label");
    \u0275\u0275text(28, "URL de l'image (optionnel)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 72);
    \u0275\u0275twoWayListener("ngModelChange", function OrgProjectsComponent_div_45_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.imageUrl, $event) || (ctx_r0.form.imageUrl = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(30, OrgProjectsComponent_div_45_div_30_Template, 2, 1, "div", 73);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 74)(32, "button", 75);
    \u0275\u0275listener("click", function OrgProjectsComponent_div_45_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275text(33, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 76);
    \u0275\u0275listener("click", function OrgProjectsComponent_div_45_Template_button_click_34_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveProject());
    });
    \u0275\u0275template(35, OrgProjectsComponent_div_45_span_35_Template, 2, 1, "span", 52)(36, OrgProjectsComponent_div_45_span_36_Template, 1, 0, "span", 77);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.editingProject ? "\u270F\uFE0F Modifier le projet" : "\u{1F680} Nouveau Projet");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.errorMsg);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.price);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.category);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.categories);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.imageUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.form.imageUrl);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.saving || !ctx_r0.form.title || !ctx_r0.form.price);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.saving);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.saving);
  }
}
var OrgProjectsComponent = class _OrgProjectsComponent {
  constructor(projectService, authService, notifService, chatService, router) {
    this.projectService = projectService;
    this.authService = authService;
    this.notifService = notifService;
    this.chatService = chatService;
    this.router = router;
    this.projects = [];
    this.loading = true;
    this.showModal = false;
    this.editingProject = null;
    this.saving = false;
    this.deleting = null;
    this.successMsg = "";
    this.errorMsg = "";
    this.activeChatProject = null;
    this.totalUnread = 0;
    this.form = {
      title: "",
      description: "",
      price: 0,
      category: "Web",
      imageUrl: ""
    };
    this.categories = ["Web", "Mobile", "Design", "Data", "IA", "Marketing", "Autre"];
  }
  ngOnInit() {
    this.loadProjects();
    this.notifService.connect();
    this.notifService.requestBrowserPermission();
    this.notifService.unreadCount$.subscribe((c) => this.totalUnread = c);
    this.notifSub = this.notifService.notifications$.subscribe((notif) => {
      const project = this.projects.find((p) => p.id === notif.projectId);
      if (project && this.activeChatProject?.id !== notif.projectId) {
        project.unreadCount = (project.unreadCount || 0) + 1;
      }
    });
  }
  ngOnDestroy() {
    this.notifSub?.unsubscribe();
    this.notifService.disconnect();
  }
  openChat(project) {
    this.activeChatProject = project;
    project.unreadCount = 0;
    this.chatService.markRead(project.id).subscribe();
  }
  closeChat() {
    this.activeChatProject = null;
  }
  loadProjects() {
    this.loading = true;
    this.projectService.getMy().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  openCreate() {
    this.editingProject = null;
    this.form = { title: "", description: "", price: 0, category: "Web", imageUrl: "" };
    this.showModal = true;
  }
  openEdit(project) {
    this.editingProject = project;
    this.form = {
      title: project.title,
      description: project.description,
      price: project.price,
      category: project.category,
      imageUrl: project.imageUrl || ""
    };
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.editingProject = null;
    this.errorMsg = "";
  }
  saveProject() {
    if (!this.form.title || !this.form.price)
      return;
    this.saving = true;
    this.errorMsg = "";
    const obs = this.editingProject ? this.projectService.update(this.editingProject.id, this.form) : this.projectService.create(this.form);
    obs.subscribe({
      next: (project) => {
        if (this.editingProject) {
          this.projects = this.projects.map((p) => p.id === project.id ? project : p);
          this.successMsg = "Projet mis \xE0 jour avec succ\xE8s !";
        } else {
          this.projects = [project, ...this.projects];
          this.successMsg = "Projet cr\xE9\xE9 et publi\xE9 avec succ\xE8s !";
        }
        this.saving = false;
        this.closeModal();
        setTimeout(() => this.successMsg = "", 3e3);
      },
      error: (err) => {
        this.errorMsg = err.error || "Erreur lors de la sauvegarde";
        this.saving = false;
      }
    });
  }
  deleteProject(id) {
    if (!confirm("Supprimer ce projet ?"))
      return;
    this.deleting = id;
    this.projectService.delete(id).subscribe({
      next: () => {
        this.projects = this.projects.filter((p) => p.id !== id);
        this.deleting = null;
        this.successMsg = "Projet supprim\xE9.";
        setTimeout(() => this.successMsg = "", 3e3);
      },
      error: () => {
        this.deleting = null;
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
  static {
    this.\u0275fac = function OrgProjectsComponent_Factory(t) {
      return new (t || _OrgProjectsComponent)(\u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(ChatService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrgProjectsComponent, selectors: [["app-org-projects"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 46, vars: 10, consts: [[1, "org-layout"], [1, "sidebar"], [1, "sidebar-brand"], [1, "logo-icon"], [1, "logo-text"], [1, "sidebar-nav"], ["routerLink", "/organizer/dashboard", "routerLinkActive", "active", 1, "nav-item"], [1, "nav-icon"], ["routerLink", "/organizer/projects", "routerLinkActive", "active", 1, "nav-item"], [1, "sidebar-footer"], [1, "user-info"], [1, "user-avatar"], [1, "user-name"], [1, "user-role"], [1, "btn", "btn-secondary", "btn-sm", "w-full", 3, "click"], [1, "main"], [1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "btn", "btn-primary", "btn-lg", 3, "click"], ["class", "alert alert-success fade-in", 4, "ngIf"], ["class", "projects-grid", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [3, "project", "close", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["class", "modal", 4, "ngIf"], [1, "alert", "alert-success", "fade-in"], [1, "projects-grid"], ["class", "skeleton-card", 4, "ngFor", "ngForOf"], [1, "skeleton-card"], [1, "empty-state"], [1, "empty-icon"], [1, "btn", "btn-primary", "mt-3", 3, "click"], ["class", "project-card fade-in", 4, "ngFor", "ngForOf"], [1, "project-card", "fade-in"], [1, "project-img"], ["onerror", "this.style.display='none'", 3, "src", "alt", 4, "ngIf"], ["class", "project-img-placeholder", 4, "ngIf"], [1, "badge", "project-status"], [1, "project-body"], [1, "project-top"], [1, "badge", "badge-primary"], [1, "sold-badge"], [1, "project-title"], [1, "project-desc"], [1, "project-footer"], [1, "project-price"], [1, "project-actions"], [1, "btn", "btn-chat", "btn-sm", 3, "click"], ["class", "unread-badge", 4, "ngIf"], [1, "btn", "btn-secondary", "btn-sm", 3, "click"], [1, "btn", "btn-danger", "btn-sm", 3, "click", "disabled"], [4, "ngIf"], ["class", "spinner-sm", 4, "ngIf"], ["onerror", "this.style.display='none'", 3, "src", "alt"], [1, "project-img-placeholder"], [1, "unread-badge"], [1, "spinner-sm"], [3, "close", "project"], [1, "modal-overlay", 3, "click"], [1, "modal"], [1, "modal-header"], [1, "close-btn", 3, "click"], [1, "modal-body"], ["class", "alert alert-danger", 4, "ngIf"], [1, "form-group"], ["type", "text", "placeholder", "Ex: Application e-commerce", 1, "form-control", 3, "ngModelChange", "ngModel"], ["rows", "4", "placeholder", "D\xE9crivez votre projet en d\xE9tail...", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "grid-2"], ["type", "number", "placeholder", "0", "min", "0", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-control", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "url", "placeholder", "https://...", 1, "form-control", 3, "ngModelChange", "ngModel"], ["class", "img-preview", 4, "ngIf"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["class", "spinner", 4, "ngIf"], [1, "alert", "alert-danger"], [3, "value"], [1, "img-preview"], ["alt", "Preview", "onerror", "this.style.display='none'", 3, "src"], [1, "spinner"]], template: function OrgProjectsComponent_Template(rf, ctx) {
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
        \u0275\u0275listener("click", function OrgProjectsComponent_Template_button_click_25_listener() {
          return ctx.logout();
        });
        \u0275\u0275text(26, "D\xE9connexion");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(27, "main", 15)(28, "div", 16)(29, "div")(30, "h1", 17);
        \u0275\u0275text(31, "Mes Projets \u{1F4E6}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "p", 18);
        \u0275\u0275text(33);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "button", 19);
        \u0275\u0275listener("click", function OrgProjectsComponent_Template_button_click_34_listener() {
          return ctx.openCreate();
        });
        \u0275\u0275elementStart(35, "span");
        \u0275\u0275text(36, "+");
        \u0275\u0275elementEnd();
        \u0275\u0275text(37, " Nouveau Projet ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(38, OrgProjectsComponent_div_38_Template, 2, 1, "div", 20)(39, OrgProjectsComponent_div_39_Template, 2, 2, "div", 21)(40, OrgProjectsComponent_div_40_Template, 9, 0, "div", 22)(41, OrgProjectsComponent_div_41_Template, 2, 1, "div", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275element(42, "app-notification-toast");
        \u0275\u0275template(43, OrgProjectsComponent_app_chat_panel_43_Template, 1, 1, "app-chat-panel", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275template(44, OrgProjectsComponent_div_44_Template, 1, 0, "div", 24)(45, OrgProjectsComponent_div_45_Template, 37, 12, "div", 25);
      }
      if (rf & 2) {
        \u0275\u0275advance(19);
        \u0275\u0275textInterpolate(ctx.getInitials((ctx.authService.currentUser == null ? null : ctx.authService.currentUser.name) || ""));
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.authService.currentUser == null ? null : ctx.authService.currentUser.name);
        \u0275\u0275advance(11);
        \u0275\u0275textInterpolate1("", ctx.projects.length, " projet(s) publi\xE9s");
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.successMsg);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.projects.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.projects.length > 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.activeChatProject);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showModal);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, CurrencyPipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, RouterLink, ChatPanelComponent, NotificationToastComponent], styles: ['\n\n.org-layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 260px;\n  min-height: 100vh;\n  flex-shrink: 0;\n  background: var(--surface);\n  border-right: 1px solid var(--border);\n  display: flex;\n  flex-direction: column;\n  padding: 24px 16px;\n  position: sticky;\n  top: 0;\n  height: 100vh;\n}\n.sidebar-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 0 8px;\n  margin-bottom: 40px;\n}\n.logo-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--secondary));\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: "Syne", sans-serif;\n  font-weight: 800;\n  font-size: 16px;\n  color: white;\n}\n.logo-text[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-weight: 800;\n  font-size: 18px;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border-radius: var(--radius-sm);\n  color: var(--text-muted);\n  text-decoration: none;\n  font-weight: 500;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: var(--surface2);\n  color: var(--text);\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background: rgba(108, 99, 255, 0.15);\n  color: var(--primary);\n  font-weight: 600;\n}\n.nav-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: 24px;\n  border-top: 1px solid var(--border);\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--secondary));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 14px;\n  color: white;\n  flex-shrink: 0;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 2px;\n}\n.user-role[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.main[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 40px;\n  overflow: auto;\n  background: var(--bg);\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 32px;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-size: 32px;\n  font-weight: 800;\n  margin-bottom: 4px;\n}\n.page-sub[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 15px;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: var(--radius-sm);\n  font-size: 14px;\n  margin-bottom: 20px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: rgba(67, 233, 123, 0.1);\n  border: 1px solid rgba(67, 233, 123, 0.3);\n  color: var(--success);\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background: rgba(255, 71, 87, 0.1);\n  border: 1px solid rgba(255, 71, 87, 0.3);\n  color: var(--danger);\n}\n.projects-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 24px;\n}\n.skeleton-card[_ngcontent-%COMP%] {\n  height: 360px;\n  border-radius: var(--radius);\n  background:\n    linear-gradient(\n      90deg,\n      var(--surface) 25%,\n      var(--surface2) 50%,\n      var(--surface) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  to {\n    background-position: -200% 0;\n  }\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 20px;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  margin-bottom: 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n}\n.project-card[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.project-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: var(--shadow);\n}\n.project-img[_ngcontent-%COMP%] {\n  height: 160px;\n  position: relative;\n  overflow: hidden;\n  background: var(--bg3);\n}\n.project-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.project-img-placeholder[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 48px;\n  font-weight: 800;\n  color: white;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--secondary));\n}\n.project-status[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}\n.project-body[_ngcontent-%COMP%] {\n  padding: 16px;\n  flex: 1;\n}\n.project-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n.sold-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n  font-weight: 600;\n}\n.project-title[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-weight: 700;\n  font-size: 16px;\n  margin-bottom: 8px;\n  line-height: 1.3;\n}\n.project-desc[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 13px;\n  line-height: 1.5;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.project-footer[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border-top: 1px solid var(--border);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n}\n.project-price[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-weight: 800;\n  font-size: 20px;\n  color: var(--accent);\n}\n.project-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.6);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  z-index: 300;\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 560px;\n  max-width: calc(100vw - 32px);\n  max-height: 90vh;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 20px;\n  z-index: 301;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  animation: _ngcontent-%COMP%_modalIn 0.25s ease;\n  box-shadow: var(--shadow-lg);\n}\n@keyframes _ngcontent-%COMP%_modalIn {\n  from {\n    opacity: 0;\n    transform: translate(-50%, -48%) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translate(-50%, -50%) scale(1);\n  }\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 24px;\n  border-bottom: 1px solid var(--border);\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-weight: 700;\n  font-size: 18px;\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: var(--bg2);\n  border: 1px solid var(--border);\n  color: var(--text-muted);\n  cursor: pointer;\n  font-size: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: var(--danger);\n  color: white;\n  border-color: var(--danger);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n  overflow-y: auto;\n  flex: 1;\n}\n.img-preview[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  border-radius: var(--radius-sm);\n  overflow: hidden;\n  max-height: 150px;\n}\n.img-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  object-fit: cover;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid var(--border);\n  background: var(--bg2);\n}\n.spinner[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n.spinner-sm[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 14px;\n  height: 14px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.btn-chat[_ngcontent-%COMP%] {\n  background: rgba(108, 99, 255, 0.15);\n  border: 1px solid var(--primary, #6c63ff);\n  color: var(--primary, #6c63ff);\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.btn-chat[_ngcontent-%COMP%]:hover {\n  background: rgba(108, 99, 255, 0.25);\n}\n.unread-badge[_ngcontent-%COMP%] {\n  background: #ef4444;\n  color: white;\n  font-size: 10px;\n  font-weight: 700;\n  min-width: 16px;\n  height: 16px;\n  padding: 0 4px;\n  border-radius: 8px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  animation: _ngcontent-%COMP%_pulse 1.5s infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.15);\n  }\n}\n@media (max-width: 768px) {\n  .sidebar[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .main[_ngcontent-%COMP%] {\n    padding: 20px 16px;\n  }\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .projects-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=org-projects.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrgProjectsComponent, { className: "OrgProjectsComponent", filePath: "src\\app\\features\\organizer\\projects\\org-projects.component.ts", lineNumber: 21 });
})();
export {
  OrgProjectsComponent
};
//# sourceMappingURL=chunk-O5KYIDCJ.js.map
