import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Project } from "../../frontoffice/models/models";
import { ProjectService } from "../../frontoffice/services/project.service";
import { AuthService } from "../../frontoffice/services/auth.service";

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
  loading = false;
  error: string | null = null;

  // Modal state
  showModal = false;
  isEditMode = false;
  saving = false;
  modalError = "";
  formData: any = {
    title: "",
    description: "",
    totalBudget: 0,
    deadline: "",
    status: "OPEN"
  };
  editingProjectId: number | null = null;

  // Delete confirmation modal
  showDeleteModal = false;
  deletingProjectId: number | null = null;
  deletingProjectTitle: string = "";
  deleting = false;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.error = "Please login to view projects";
      return;
    }

    this.loading = true;
    this.error = null;

    this.projectService.getCompanyProjects(currentUser.id).subscribe({
      next: (data) => {
        this.projects = data;
        this.filteredProjects = [...this.projects];
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading projects:", err);
        this.error = "Failed to load projects. Please try again.";
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.filteredProjects = this.projects.filter((p) => {
      const lowerTerm = this.searchTerm.toLowerCase();
      const matchSearch =
        !this.searchTerm ||
        p.title.toLowerCase().includes(lowerTerm) ||
        (p.description ? p.description.toLowerCase().includes(lowerTerm) : false);
      const matchStatus =
        this.selectedStatus === "all" || p.status === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.editingProjectId = null;
    this.formData = {
      title: "",
      description: "",
      totalBudget: 0,
      deadline: "",
      status: "OPEN"
    };
    this.modalError = "";
    this.showModal = true;
  }

  openEditModal(project: Project): void {
    this.isEditMode = true;
    this.editingProjectId = project.id;
    this.formData = {
      title: project.title,
      description: project.description,
      totalBudget: project.totalBudget,
      deadline: project.deadline,
      status: project.status
    };
    this.modalError = "";
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.modalError = "";
  }

  saveProject(): void {
    // Validation
    if (!this.formData.title || !this.formData.description || !this.formData.totalBudget || !this.formData.deadline) {
      this.modalError = "Please fill in all required fields";
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.modalError = "User not authenticated";
      return;
    }

    this.saving = true;
    this.modalError = "";

    if (this.isEditMode && this.editingProjectId) {
      // Update existing project
      this.projectService.updateProject(this.editingProjectId, this.formData).subscribe({
        next: () => {
          this.saving = false;
          this.closeModal();
          this.loadProjects();
        },
        error: (err) => {
          console.error("Error updating project:", err);
          this.modalError = "Failed to update project. Please try again.";
          this.saving = false;
        }
      });
    } else {
      // Create new project
      const createData = {
        ...this.formData,
        companyId: currentUser.id
      };

      this.projectService.createProject(createData).subscribe({
        next: () => {
          this.saving = false;
          this.closeModal();
          this.loadProjects();
        },
        error: (err) => {
          console.error("Error creating project:", err);
          this.modalError = "Failed to create project. Please try again.";
          this.saving = false;
        }
      });
    }
  }

  openDeleteModal(project: Project): void {
    this.deletingProjectId = project.id;
    this.deletingProjectTitle = project.title;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deletingProjectId = null;
    this.deletingProjectTitle = "";
  }

  confirmDelete(): void {
    if (!this.deletingProjectId) return;

    this.deleting = true;
    this.projectService.deleteProject(this.deletingProjectId).subscribe({
      next: () => {
        this.projects = this.projects.filter(p => p.id !== this.deletingProjectId);
        this.onSearch();
        this.deleting = false;
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error("Error deleting project:", err);
        this.modalError = "Failed to delete project. It may have milestones attached.";
        this.deleting = false;
      }
    });
  }

  viewProject(id: number): void {
    this.router.navigate(["/backoffice/projects", id]);
  }

  getStatusClass(status?: string): string {
    if (!status) {
      return "primary";
    }
    const map: Record<string, string> = {
      OPEN: "success",
      IN_PROGRESS: "primary",
      COMPLETED: "success",
      CANCELLED: "danger",
    };
    return map[status] || "primary";
  }

  getStatusLabel(status?: string): string {
    if (!status) return "Open";
    const map: Record<string, string> = {
      OPEN: "Open",
      IN_PROGRESS: "In Progress",
      COMPLETED: "Completed",
      CANCELLED: "Cancelled",
    };
    return map[status] || status;
  }
}
