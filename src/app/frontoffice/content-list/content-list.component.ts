import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Content } from "../models/content.model";
import { ContentService } from "../services/content.service";

@Component({
  selector: "app-content-list",
  templateUrl: "./content-list.component.html",
  styleUrls: ["./content-list.component.scss"],
})
export class ContentListComponent implements OnInit {
  contents: Content[] = [];
  filteredContents: Content[] = [];
  selectedFilter: string = "all";

  constructor(
    private contentService: ContentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadContents();
  }

  loadContents(): void {
    this.contentService.getAllContents().subscribe({
      next: (contents) => {
        this.contents = contents;
        this.filteredContents = contents;
      },
      error: (error) => console.error("Error loading contents:", error),
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

  viewContent(contentId: number): void {
    // route defined in frontoffice-routing is "content/:id"
    this.router.navigate(["/content", contentId]);
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
