import {
  HttpClient,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-JJBAUJRA.js";

// src/app/core/services/project.service.ts
var ProjectService = class _ProjectService {
  constructor(http) {
    this.http = http;
    this.apiUrl = "http://localhost:8085/api/projects";
  }
  getAll() {
    return this.http.get(this.apiUrl);
  }
  getMy() {
    return this.http.get(`${this.apiUrl}/my`);
  }
  create(data) {
    return this.http.post(this.apiUrl, data);
  }
  update(id, data) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  delete(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getDashboard() {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }
  static {
    this.\u0275fac = function ProjectService_Factory(t) {
      return new (t || _ProjectService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProjectService, factory: _ProjectService.\u0275fac, providedIn: "root" });
  }
};

export {
  ProjectService
};
//# sourceMappingURL=chunk-VJ6DNUD7.js.map
