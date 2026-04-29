import "./chunk-ASLTLD6L.js";

// src/app/features/organizer/organizer.routes.ts
var organizerRoutes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "dashboard",
    loadComponent: () => import("./chunk-JMSD4SET.js").then((m) => m.DashboardComponent)
  },
  {
    path: "projects",
    loadComponent: () => import("./chunk-O5KYIDCJ.js").then((m) => m.OrgProjectsComponent)
  }
];
export {
  organizerRoutes
};
//# sourceMappingURL=chunk-UGG7OCVG.js.map
