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

// src/app/features/auth/login/login.component.ts
function LoginComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "span");
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
function LoginComponent_span_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Se connecter");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 22);
  }
}
var LoginComponent = class _LoginComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.email = "";
    this.password = "";
    this.loading = false;
    this.error = "";
  }
  onSubmit() {
    if (!this.email || !this.password)
      return;
    this.loading = true;
    this.error = "";
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        if (res.role === "ORGANIZER") {
          this.router.navigate(["/organizer/dashboard"]);
        } else {
          this.router.navigate(["/client/projects"]);
        }
      },
      error: (err) => {
        this.error = err.error || "Identifiants invalides";
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 32, vars: 6, consts: [[1, "auth-page"], [1, "auth-bg"], [1, "blob", "blob1"], [1, "blob", "blob2"], [1, "blob", "blob3"], [1, "auth-card", "fade-in"], [1, "auth-logo"], [1, "logo-icon"], [1, "logo-text"], [1, "auth-title"], [1, "auth-subtitle"], ["class", "alert alert-danger", 4, "ngIf"], [3, "ngSubmit"], [1, "form-group"], ["type", "email", "name", "email", "placeholder", "vous@exemple.com", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "password", "name", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "btn", "btn-primary", "w-full", "btn-lg", 3, "disabled"], [4, "ngIf"], ["class", "spinner", 4, "ngIf"], [1, "auth-link"], ["routerLink", "/auth/register"], [1, "alert", "alert-danger"], [1, "spinner"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275element(2, "div", 2)(3, "div", 3)(4, "div", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 5)(6, "div", 6)(7, "div", 7);
        \u0275\u0275text(8, "M");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "span", 8);
        \u0275\u0275text(10, "Marketplace");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "h1", 9);
        \u0275\u0275text(12, "Bon retour \u{1F44B}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "p", 10);
        \u0275\u0275text(14, "Connectez-vous \xE0 votre compte");
        \u0275\u0275elementEnd();
        \u0275\u0275template(15, LoginComponent_div_15_Template, 4, 1, "div", 11);
        \u0275\u0275elementStart(16, "form", 12);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_16_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(17, "div", 13)(18, "label");
        \u0275\u0275text(19, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_20_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "div", 13)(22, "label");
        \u0275\u0275text(23, "Mot de passe");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "input", 15);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_24_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "button", 16);
        \u0275\u0275template(26, LoginComponent_span_26_Template, 2, 0, "span", 17)(27, LoginComponent_span_27_Template, 1, 0, "span", 18);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "p", 19);
        \u0275\u0275text(29, " Pas encore de compte ? ");
        \u0275\u0275elementStart(30, "a", 20);
        \u0275\u0275text(31, "Cr\xE9er un compte");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.email);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterLink], styles: ['\n\n.auth-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n  padding: 20px;\n}\n.auth-bg[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n}\n.blob[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.15;\n  animation: _ngcontent-%COMP%_float 8s ease-in-out infinite;\n}\n.blob1[_ngcontent-%COMP%] {\n  width: 400px;\n  height: 400px;\n  background: var(--primary);\n  top: -100px;\n  left: -100px;\n  animation-delay: 0s;\n}\n.blob2[_ngcontent-%COMP%] {\n  width: 350px;\n  height: 350px;\n  background: var(--secondary);\n  bottom: -100px;\n  right: -50px;\n  animation-delay: 3s;\n}\n.blob3[_ngcontent-%COMP%] {\n  width: 250px;\n  height: 250px;\n  background: var(--accent);\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  animation-delay: 5s;\n}\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% {\n    transform: translateY(0) scale(1);\n  }\n  50% {\n    transform: translateY(-30px) scale(1.05);\n  }\n}\n.auth-card[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  width: 100%;\n  max-width: 420px;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 24px;\n  padding: 40px;\n  box-shadow: var(--shadow-lg);\n}\n.auth-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 32px;\n}\n.logo-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--secondary));\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: "Syne", sans-serif;\n  font-weight: 800;\n  font-size: 20px;\n  color: white;\n}\n.logo-text[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-weight: 800;\n  font-size: 20px;\n  letter-spacing: -0.02em;\n}\n.auth-title[_ngcontent-%COMP%] {\n  font-family: "Syne", sans-serif;\n  font-size: 28px;\n  font-weight: 800;\n  margin-bottom: 8px;\n}\n.auth-subtitle[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 15px;\n  margin-bottom: 28px;\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  border-radius: var(--radius-sm);\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background: rgba(255, 71, 87, 0.1);\n  border: 1px solid rgba(255, 71, 87, 0.3);\n  color: var(--danger);\n}\n.spinner[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 18px;\n  height: 18px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.auth-link[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--text-muted);\n  font-size: 14px;\n  margin-top: 24px;\n}\n.auth-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--primary);\n  text-decoration: none;\n  font-weight: 600;\n}\n.auth-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=login.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\features\\auth\\login\\login.component.ts", lineNumber: 14 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-ZQVEQTRE.js.map
