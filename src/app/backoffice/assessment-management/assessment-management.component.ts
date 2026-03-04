import { Component, OnInit } from "@angular/core";
import { Assessment } from "../../frontoffice/models/content.model";
import { AssessmentService } from "../../frontoffice/services/assessment.service";
import { ContentService } from "../../frontoffice/services/content.service";
import { Content } from "../../frontoffice/models/content.model";

@Component({
  selector: "app-assessment-management",
  templateUrl: "./assessment-management.component.html",
  styleUrls: ["./assessment-management.component.scss"],
})
export class AssessmentManagementComponent implements OnInit {
  assessments: Assessment[] = [];
  filteredAssessments: Assessment[] = [];
  contents: Content[] = [];
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentAssessment: Assessment = this.getEmptyAssessment();

  constructor(
    private assessmentService: AssessmentService,
    private contentService: ContentService,
  ) {}

  ngOnInit(): void {
    this.loadAssessments();
    this.loadContents();
  }

  loadAssessments(): void {
    this.assessmentService.getAllAssessments().subscribe({
      next: (assessments: Assessment[]) => {
        console.log("[DEBUG] Assessments reçus:", assessments);
        this.assessments = assessments.map((a) => {
          let cid: number | undefined;
          if (a.contentId != null) {
            cid = Number(a.contentId);
          } else if (a.content && a.content.contentId != null) {
            cid = Number(a.content.contentId);
          }
          const ass = {
            ...a,
            contentId: cid,
          } as Assessment & { contentTitle?: string };
          if (!ass.contentTitle && ass.contentId != null) {
            ass.contentTitle = this.getContentTitle(ass.contentId);
          }
          return ass;
        });
        console.log("[DEBUG] Assessments mappés:", this.assessments);
        this.filteredAssessments = [...this.assessments];
      },
      error: (error: any) => {
        console.error(
          "[DEBUG] Erreur lors du chargement des assessments:",
          error,
        );
      },
    });
  }

  loadContents(): void {
    this.contentService.getAllContents().subscribe({
      next: (contents: Content[]) => {
        // normalize id type
        this.contents = contents.map((c) => ({
          ...c,
          contentId: c.contentId != null ? Number(c.contentId) : undefined,
        }));
        this.updateAssessmentTitles();
      },
      error: (error: any) => console.error("Error loading contents:", error),
    });
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.currentAssessment = this.getEmptyAssessment();
    this.showModal = true;
  }

  openEditModal(assessment: Assessment): void {
    this.isEditMode = true;
    // make sure the id is a number so the select can match
    this.currentAssessment = {
      ...assessment,
      contentId:
        assessment.contentId != null ? Number(assessment.contentId) : undefined,
    };
    this.showModal = true;
    console.log(
      "Opening edit modal with contentId:",
      this.currentAssessment.contentId,
    );
  }

  closeModal(): void {
    this.showModal = false;
    this.currentAssessment = this.getEmptyAssessment();
  }

  private sanitizeAssessment(a: Assessment): Assessment {
    return {
      ...a,
      contentId: a.contentId != null ? Number(a.contentId) : undefined,
    };
  }

  saveAssessment(): void {
    const payload = this.sanitizeAssessment(this.currentAssessment);
    console.log("[DEBUG SAVE] Saving assessment with payload:", payload);
    if (this.isEditMode) {
      this.assessmentService.updateAssessment(payload).subscribe({
        next: (res) => {
          console.log("[DEBUG SAVE] Update assessment succeeded:", res);
          this.loadAssessments();
          this.closeModal();
        },
        error: (err) => {
          console.error("[DEBUG SAVE] Update assessment failed:", err);
          this.loadAssessments();
          this.closeModal();
        },
      });
    } else {
      this.assessmentService.createAssessment(payload).subscribe({
        next: (res) => {
          console.log("[DEBUG SAVE] Create assessment succeeded:", res);
          this.loadAssessments();
          this.closeModal();
        },
        error: (err) => {
          console.error("[DEBUG SAVE] Create assessment failed:", err);
          this.loadAssessments();
          this.closeModal();
        },
      });
    }
  }

  deleteAssessment(assessment: Assessment): void {
    if (confirm(`Are you sure you want to delete this assessment?`)) {
      this.assessmentService
        .deleteAssessment(assessment.assessmentId!)
        .subscribe({
          next: () => this.loadAssessments(),
          error: (error) => console.error("Error deleting assessment:", error),
        });
    }
  }

  getEmptyAssessment(): Assessment {
    return {
      questions: "",
      passingScore: 60,
      duration: 30,
      contentId: undefined,
    };
  }

  getContentTitle(contentId?: number | string): string {
    if (contentId == null || contentId === "") return "No content linked";
    const id = Number(contentId);
    const content = this.contents.find((c) => Number(c.contentId) === id);
    return content ? content.title : "No content linked";
  }

  private updateAssessmentTitles(): void {
    if (!this.assessments.length) return;
    this.assessments = this.assessments.map((a) => {
      const upd = { ...a } as any;
      if (!upd.contentTitle && upd.contentId != null) {
        upd.contentTitle = this.getContentTitle(upd.contentId);
      }
      return upd;
    });
    this.filteredAssessments = [...this.assessments];
  }

  getDifficultyBadgeClass(passingScore: number): string {
    if (passingScore >= 80) return "badge-hard";
    if (passingScore >= 60) return "badge-medium";
    return "badge-easy";
  }

  getDifficultyLabel(passingScore: number): string {
    if (passingScore >= 80) return "Hard";
    if (passingScore >= 60) return "Medium";
    return "Easy";
  }
}
