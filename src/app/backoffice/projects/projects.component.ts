import { Component, OnInit } from "@angular/core";
import { Project } from "../../frontoffice/models/models";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchTerm = "";
  selectedStatus: string = "all";

  ngOnInit(): void {
    this.filteredProjects = [...this.projects];
  }

  onSearch(): void {
    this.filteredProjects = this.projects.filter((p) => {
      const lowerTerm = this.searchTerm.toLowerCase();
      const matchSearch =
        !this.searchTerm ||
        p.title.toLowerCase().includes(lowerTerm) ||
        (p.category ? p.category.toLowerCase().includes(lowerTerm) : false);
      const matchStatus =
        this.selectedStatus === "all" || p.status === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }

  getStatusClass(status?: string): string {
    if (!status) {
      return "primary";
    }
    const map: Record<string, string> = {
      open: "success",
      in_progress: "primary",
      delivered: "warning",
      completed: "success",
      cancelled: "danger",
    };
    return map[status] || "primary";
  }
}
