import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-RSNS7LQS.js";
import {
  AuthService,
  CommonModule,
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
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-JJBAUJRA.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/auth/register/register.component.ts
function RegisterComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "span");
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error, " ");
  }
}
function RegisterComponent_span_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Cr\xE9er mon compte");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_span_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 27);
  }
}
var RegisterComponent = class _RegisterComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.name = "";
    this.email = "";
    this.password = "";
    this.role = "CLIENT";
    this.loading = false;
    this.error = "";
  }
  onSubmit() {
    if (!this.name || !this.email || !this.password)
      return;
    this.loading = true;
    this.error = "";
    this.authService.register({ name: this.name, email: this.email, password: this.password, role: this.role }).subscribe({
      next: (res) => {
        if (res.role === "ORGANIZER") {
          this.router.navigate(["/organizer/dashboard"]);
        } else {
          this.router.navigate(["/client/projects"]);
        }
      },
      error: (err) => {
        this.error = err.error || "Erreur lors de l'inscription";
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function RegisterComponent_Factory(t) {
      return new (t || _RegisterComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 53, vars: 11, consts: [[1, "auth-page"], [1, "auth-bg"], [1, "blob", "blob1"], [1, "blob", "blob2"], [1, "auth-card", "fade-in"], [1, "auth-logo"], [1, "logo-icon"], [1, "logo-text"], [1, "auth-title"], [1, "auth-subtitle"], ["class", "alert alert-danger", 4, "ngIf"], [3, "ngSubmit"], [1, "form-group"], ["type", "text", "name", "name", "placeholder", "Votre nom", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "email", "name", "email", "placeholder", "vous@exemple.com", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "password", "name", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "role-selector"], [1, "role-option", 3, "click"], [1, "role-icon"], [1, "role-label"], [1, "role-desc"], ["type", "submit", 1, "btn", "btn-primary", "w-full", "btn-lg", 3, "disabled"], [4, "ngIf"], ["class", "spinner", 4, "ngIf"], [1, "auth-link"], ["routerLink", "/auth/login"], [1, "alert", "alert-danger"], [1, "spinner"]], template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275element(2, "div", 2)(3, "div", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "div", 6);
        \u0275\u0275text(7, "M");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "span", 7);
        \u0275\u0275text(9, "Marketplace");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "h1", 8);
        \u0275\u0275text(11, "Cr\xE9er un compte \u2728");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "p", 9);
        \u0275\u0275text(13, "Rejoignez notre marketplace");
        \u0275\u0275elementEnd();
        \u0275\u0275template(14, RegisterComponent_div_14_Template, 4, 1, "div", 10);
        \u0275\u0275elementStart(15, "form", 11);
        \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_15_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(16, "div", 12)(17, "label");
        \u0275\u0275text(18, "Nom complet");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "input", 13);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_19_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.name, $event) || (ctx.name = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div", 12)(21, "label");
        \u0275\u0275text(22, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_23_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "div", 12)(25, "label");
        \u0275\u0275text(26, "Mot de passe");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "input", 15);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_27_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "div", 12)(29, "label");
        \u0275\u0275text(30, "Je suis");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "div", 16)(32, "div", 17);
        \u0275\u0275listener("click", function RegisterComponent_Template_div_click_32_listener() {
          return ctx.role = "CLIENT";
        });
        \u0275\u0275elementStart(33, "span", 18);
        \u0275\u0275text(34, "\u{1F6CD}\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "span", 19);
        \u0275\u0275text(36, "Client");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "span", 20);
        \u0275\u0275text(38, "J'ach\xE8te des projets");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(39, "div", 17);
        \u0275\u0275listener("click", function RegisterComponent_Template_div_click_39_listener() {
          return ctx.role = "ORGANIZER";
        });
        \u0275\u0275elementStart(40, "span", 18);
        \u0275\u0275text(41, "\u{1F680}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "span", 19);
        \u0275\u0275text(43, "Organisateur");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "span", 20);
        \u0275\u0275text(45, "Je vends des projets");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(46, "button", 21);
        \u0275\u0275template(47, RegisterComponent_span_47_Template, 2, 0, "span", 22)(48, RegisterComponent_span_48_Template, 1, 0, "span", 23);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(49, "p", 24);
        \u0275\u0275text(50, " D\xE9j\xE0 un compte ? ");
        \u0275\u0275elementStart(51, "a", 25);
        \u0275\u0275text(52, "Se connecter");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(14);
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.name);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.email);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("active", ctx.role === "CLIENT");
        \u0275\u0275advance(7);
        \u0275\u0275classProp("active", ctx.role === "ORGANIZER");
        \u0275\u0275advance(7);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterLink], styles: ['\n\n.auth-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n  padding: 20px;\n}\n.auth-bg[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n}\n.blob[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.15;\n  animation: _ngcontent-%COMP%_float 8s ease-in-out infinite;\n}\n.blob1[_ngcontent-%COMP%] {\n  width: 400px;\n  height: 400px;\n  background: var(--primary);\n  top: -100px;\n  right: -100px;\n}\n.blob2[_ngcontent-%COMP%] {\n  width: 350px;\n  height: 350px;\n  background: var(--accent);\n  bottom: -100px;\n  left: -50px;\n  animation-delay: 3s;\n}\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-30px);\n  }\n}\n.auth-card[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  width: 100%;\n  max-width: 460px;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 24px;\n  padding: 40px;\n  box-shadow: var(--shadow-lg);\n}\n.auth-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 32px;\n}\n.logo-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--secondary));\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: "Syne", sans-serif;\n  font-weight: 800;\n  font-size: 20px;\n  color: white;\n}\n.logo-text[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-weight: 800;\n  font-size: 20px;\n  letter-spacing: -0.02em;\n}\n.auth-title[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-size: 28px;\n  font-weight: 800;\n  margin-bottom: 8px;\n}\n.auth-subtitle[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 15px;\n  margin-bottom: 28px;\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  border-radius: var(--radius-sm);\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background: rgba(255, 71, 87, 0.1);\n  border: 1px solid rgba(255, 71, 87, 0.3);\n  color: var(--danger);\n}\n.role-selector[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.role-option[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  padding: 16px 12px;\n  background: var(--bg2);\n  border: 2px solid var(--border);\n  border-radius: var(--radius-sm);\n  cursor: pointer;\n  transition: all 0.2s;\n  text-align: center;\n}\n.role-option[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary);\n  background: var(--bg3);\n}\n.role-option.active[_ngcontent-%COMP%] {\n  border-color: var(--primary);\n  background: rgba(108, 99, 255, 0.1);\n}\n.role-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.role-label[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n}\n.role-desc[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n}\n.spinner[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 18px;\n  height: 18px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.auth-link[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--text-muted);\n  font-size: 14px;\n  margin-top: 24px;\n}\n.auth-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--primary);\n  text-decoration: none;\n  font-weight: 600;\n}\n.auth-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=register.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src\\app\\features\\auth\\register\\register.component.ts", lineNumber: 14 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-AUWQQFJN.js.map
