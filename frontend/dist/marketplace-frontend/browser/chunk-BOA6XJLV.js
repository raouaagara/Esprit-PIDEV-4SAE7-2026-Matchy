import "./chunk-ASLTLD6L.js";

// src/app/features/auth/auth.routes.ts
var authRoutes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadComponent: () => import("./chunk-ZQVEQTRE.js").then((m) => m.LoginComponent)
  },
  {
    path: "register",
    loadComponent: () => import("./chunk-AUWQQFJN.js").then((m) => m.RegisterComponent)
  }
];
export {
  authRoutes
};
//# sourceMappingURL=chunk-BOA6XJLV.js.map
