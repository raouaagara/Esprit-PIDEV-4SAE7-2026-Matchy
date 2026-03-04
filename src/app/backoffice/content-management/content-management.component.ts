import { Component, OnInit } from "@angular/core";
import { Content } from "../../frontoffice/models/content.model";
import { ContentService } from "../../frontoffice/services/content.service";

@Component({
  selector: "app-content-management",
  templateUrl: "./content-management.component.html",
  styleUrls: ["./content-management.component.scss"],
})
export class ContentManagementComponent implements OnInit {
  contents: Content[] = [];
  filteredContents: Content[] = [];
  selectedFilter: string = "all";
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentContent: Content = this.getEmptyContent();

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.loadContents();
  }

  loadContents(): void {
    this.contentService.getAllContents().subscribe({
      next: (contents: Content[]) => {
        console.log("[DEBUG] Contents reçus:", contents);
        this.contents = contents.map((c) => {
          const copy: any = { ...c };
          if (copy.contentId != null) {
            copy.contentId = Number(copy.contentId);
          }
          delete copy.assessment;
          delete copy.certifications;
          return copy as Content;
        });
        console.log("[DEBUG] Contents mappés:", this.contents);
        this.filteredContents = this.contents;
      },
      error: (error: any) => {
        console.error("[DEBUG] Erreur lors du chargement des contents:", error);
      },
    });
  }

  filterContents(type: string): void {
    this.selectedFilter = type;
    if (type === "all") {
      this.filteredContents = this.contents;
    } else {
      this.filteredContents = this.contents.filter(
        (content) => content.type === type.toUpperCase(),
      );
    }
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.currentContent = this.getEmptyContent();
    this.showModal = true;
  }

  openEditModal(content: Content): void {
    this.isEditMode = true;
    this.currentContent = { ...content };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.currentContent = this.getEmptyContent();
  }

  saveContent(): void {
    console.log(
      "[DEBUG SAVE] Saving content with payload:",
      this.currentContent,
    );
    if (this.isEditMode) {
      this.contentService.updateContent(this.currentContent).subscribe({
        next: (res) => {
          console.log("[DEBUG SAVE] Update content succeeded:", res);
          this.loadContents();
          this.closeModal();
        },
        error: (err) => {
          console.error("[DEBUG SAVE] Update content failed:", err);
          this.loadContents();
          this.closeModal();
        },
      });
    } else {
      this.contentService.createContent(this.currentContent).subscribe({
        next: (res) => {
          console.log("[DEBUG SAVE] Create content succeeded:", res);
          this.loadContents();
          this.closeModal();
        },
        error: (err) => {
          console.error("[DEBUG SAVE] Create content failed:", err);
          this.loadContents();
          this.closeModal();
        },
      });
    }
  }

  deleteContent(content: Content): void {
    if (confirm(`Are you sure you want to delete "${content.title}"?`)) {
      this.contentService.deleteContent(content.contentId!).subscribe({
        next: () => this.loadContents(),
        error: (error: any) => console.error("Error deleting content:", error),
      });
    }
  }

  getEmptyContent(): Content {
    return {
      title: "",
      description: "",
      type: "COURS",
      authorId: 1,
    };
  }

  getContentIcon(type: string): string {
    switch (type) {
      case "COURS":
        return "📚";
      case "ARTICLE":
        return "📝";
      case "VIDEO":
        return "🎥";
      default:
        return "📄";
    }
  }

  getContentBadgeClass(type: string): string {
    switch (type) {
      case "COURS":
        return "badge-cours";
      case "ARTICLE":
        return "badge-article";
      case "VIDEO":
        return "badge-video";
      default:
        return "badge-default";
    }
  }
}
