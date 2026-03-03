import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { ProjectService } from '../../core/services/project.service';
import { ProposalService } from '../../core/services/proposal.service';
import { Project } from '../../core/models/models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-fl-projects',
  template: `
    <div class="page">
      <div class="page-header">
        <div><h1 class="page-title">Browse Projects</h1><p class="page-sub">Find your next opportunity</p></div>
      </div>

      <!-- ── MATCHING RECOMMENDATIONS ── -->
      <div class="matching-section" *ngIf="recommendations.length > 0">
        <div class="matching-header">
          <h2 class="matching-title">🎯 Recommended for You</h2>
          <span class="matching-sub">Based on your skills and experience</span>
        </div>
        <div class="matching-grid">
          <div class="match-card" *ngFor="let m of recommendations">
            <div class="match-top">
              <span class="match-category">{{ m.freelancerSkills }}</span>
              <span class="match-score" [class]="getScoreClass(m.totalScore)">
                {{ m.totalScore }}% match
              </span>
            </div>
            <h3 class="match-title">{{ m.freelancerName }}</h3>
            <div class="match-skills" *ngIf="m.matchedSkills">
              <span class="match-skills-label">✅ Your skills match:</span>
              <span class="match-skills-tags">{{ m.matchedSkills }}</span>
            </div>
            <div class="match-breakdown">
              <div class="breakdown-item">
                <span class="breakdown-label">Skills</span>
                <div class="breakdown-bar">
                  <div class="breakdown-fill skills" [style.width.%]="(m.skillsScore / 40) * 100"></div>
                </div>
                <span class="breakdown-val">{{ m.skillsScore }}/40</span>
              </div>
              <div class="breakdown-item">
                <span class="breakdown-label">Budget</span>
                <div class="breakdown-bar">
                  <div class="breakdown-fill budget" [style.width.%]="(m.budgetScore / 25) * 100"></div>
                </div>
                <span class="breakdown-val">{{ m.budgetScore }}/25</span>
              </div>
              <div class="breakdown-item">
                <span class="breakdown-label">Experience</span>
                <div class="breakdown-bar">
                  <div class="breakdown-fill experience" [style.width.%]="(m.experienceScore / 20) * 100"></div>
                </div>
                <span class="breakdown-val">{{ m.experienceScore }}/20</span>
              </div>
              <div class="breakdown-item">
                <span class="breakdown-label">Activity</span>
                <div class="breakdown-bar">
                  <div class="breakdown-fill activity" [style.width.%]="(m.activityScore / 15) * 100"></div>
                </div>
                <span class="breakdown-val">{{ m.activityScore }}/15</span>
              </div>
            </div>
            <div class="match-footer">
              <span class="recommendation-badge" [class]="getRecoClass(m.recommendation)">
                {{ m.recommendation }}
              </span>
              <button class="btn-apply-match" (click)="openProposalModalById(m.freelancerId)"
                [disabled]="alreadyApplied(m.freelancerId)">
                {{ alreadyApplied(m.freelancerId) ? '✅ Applied' : 'Apply Now' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ── SEARCH & FILTER ── -->
      <div class="search-bar">
        <input class="search-input" placeholder="Search projects..." [(ngModel)]="searchTerm" (input)="applyFilter()">
        <select class="form-select" [(ngModel)]="categoryFilter" (change)="applyFilter()">
          <option value="">All categories</option>
          <option>Web Development</option><option>Mobile App</option><option>UI/UX Design</option>
          <option>Backend</option><option>DevOps</option><option>Other</option>
        </select>
      </div>

      <div class="loading-state" *ngIf="isLoading"><div class="spinner"></div><span>Loading projects...</span></div>

      <div class="project-grid" *ngIf="!isLoading">
        <div class="empty" *ngIf="filtered.length === 0">No projects found matching your criteria.</div>
        <div class="project-card" *ngFor="let p of filtered">
          <div class="card-top">
            <span class="category-tag">{{ p.category }}</span>
            <span class="budget-tag" *ngIf="p.budget">💰 {{ p.budget }} TND</span>
          </div>
          <h3 class="card-title">{{ p.title }}</h3>
          <p class="card-desc">{{ p.description }}</p>
          <div class="skills-row" *ngIf="p.requiredSkills && p.requiredSkills.length > 0">
            <span class="skill-tag" *ngFor="let s of p.requiredSkills">{{ s }}</span>
          </div>
          <div class="card-meta">
            <span *ngIf="p.deadline">📅 Deadline: {{ p.deadline | date:'dd/MM/yyyy' }}</span>
            <span>📝 {{ p.proposalsCount || 0 }} proposals</span>
          </div>
          <button class="btn-apply" (click)="openProposalModal(p)" [disabled]="alreadyApplied(p.id!)">
            {{ alreadyApplied(p.id!) ? '✅ Applied' : 'Apply Now' }}
          </button>
        </div>
      </div>

      <!-- ── PROPOSAL MODAL ── -->
      <div class="modal-overlay" *ngIf="selectedProject" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()" *ngIf="selectedProject as proj">
          <div class="modal-header">
            <div>
              <h3>Apply to: {{ proj.title }}</h3>
              <span class="modal-category">{{ proj.category }}</span>
            </div>
            <button class="modal-close" (click)="closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <div class="field-header">
                <label>Cover Letter *</label>
                <button class="btn-ai" (click)="generateCoverLetter()" [disabled]="isGenerating" [class.loading]="isGenerating">
                  <span>✨</span>
                  {{ isGenerating ? 'Generating...' : 'Generate with AI' }}
                </button>
              </div>
              <textarea class="form-input form-textarea"
                placeholder="Why are you the best fit for this project? Or click ✨ Generate with AI..."
                [(ngModel)]="proposal.coverLetter"></textarea>
              <div class="ai-error" *ngIf="aiError">⚠️ {{ aiError }}</div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Your Budget (TND)</label>
                <input class="form-input" type="number" placeholder="Proposed budget" [(ngModel)]="proposal.proposedBudget">
              </div>
              <div class="form-group">
                <label>Delivery Time</label>
                <input class="form-input" placeholder="e.g. 2 weeks" [(ngModel)]="proposal.deliveryTime">
              </div>
            </div>
            <div class="error" *ngIf="submitError">{{ submitError }}</div>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" (click)="closeModal()">Cancel</button>
            <button class="btn-submit" (click)="submitProposal()" [disabled]="isSubmitting">
              {{ isSubmitting ? 'Sending...' : '🚀 Submit Proposal' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./projects.component.scss']
})
export class FlProjectsComponent implements OnInit {
  projects: Project[] = [];
  filtered: Project[] = [];
  recommendations: any[] = [];
  appliedProjectIds: Set<number> = new Set();
  isLoading = true;
  searchTerm = '';
  categoryFilter = '';
  selectedProject: Project | null = null;
  isSubmitting = false;
  isGenerating = false;
  submitError = '';
  aiError = '';
  proposal = { coverLetter: '', proposedBudget: 0, deliveryTime: '' };

  private api = environment.apiUrl;

  constructor(
    public authService: AuthService,
    private projectService: ProjectService,
    private proposalService: ProposalService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.projectService.getOpen().subscribe({
      next: p => { this.projects = p; this.applyFilter(); this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });

    const userId = this.authService.currentUser?.id;
    if (userId) {
      // Load applied proposals
      this.proposalService.getAll(undefined, userId).subscribe(proposals => {
        proposals.forEach(p => { if (p.projectId) this.appliedProjectIds.add(p.projectId); });
      });

      // Load matching recommendations
      this.loadRecommendations(userId);
    }
  }

  loadRecommendations(userId: number | string): void {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
    this.http.get<any[]>(`http://localhost:8081/api/matching/freelancer/${userId}`, { headers })
      .subscribe({
        next: (data) => { this.recommendations = data.slice(0, 3); }, // top 3
        error: ()    => { this.recommendations = []; }
      });
  }

  // Open modal for a recommendation card
  openProposalModalById(projectId: number): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) this.openProposalModal(project);
  }

  applyFilter(): void {
    this.filtered = this.projects.filter(p => {
      const matchSearch = !this.searchTerm ||
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchCat = !this.categoryFilter || p.category === this.categoryFilter;
      return matchSearch && matchCat;
    });
  }

  alreadyApplied(id: number): boolean { return this.appliedProjectIds.has(id); }

  openProposalModal(p: Project): void {
    this.selectedProject = p;
    this.proposal = { coverLetter: '', proposedBudget: p.budget || 0, deliveryTime: '' };
    this.submitError = '';
    this.aiError = '';
  }

  closeModal(): void { this.selectedProject = null; }

  generateCoverLetter(): void {
    if (!this.selectedProject) return;
    this.isGenerating = true;
    this.aiError = '';
    const user = this.authService.currentUser;
    const prompt = `Write a professional freelance cover letter for this project:
Title: ${this.selectedProject.title}
Category: ${this.selectedProject.category}
Description: ${this.selectedProject.description || ''}
${this.selectedProject.requiredSkills?.length ? 'Required skills: ' + this.selectedProject.requiredSkills.join(', ') : ''}
${this.selectedProject.budget ? 'Budget: ' + this.selectedProject.budget + ' TND' : ''}
Freelancer: ${user?.firstName || user?.name || 'the freelancer'}
Skills: ${user?.skills || 'various skills'}
Requirements: 3-4 sentences, professional, mention relevant experience, write in English only.`;

    this.http.post<{ description: string }>(`${this.api}/ai/generate-description`, {
      title: prompt, category: this.selectedProject.category
    }).subscribe({
      next: (res) => { this.proposal.coverLetter = res.description; this.isGenerating = false; },
      error: (err) => { this.aiError = err?.error?.error || 'Failed to generate.'; this.isGenerating = false; }
    });
  }

  submitProposal(): void {
    if (!this.proposal.coverLetter) { this.submitError = 'Please write a cover letter'; return; }
    this.isSubmitting = true;
    this.submitError = '';
    const user = this.authService.currentUser;
    const payload = {
      projectId:       this.selectedProject!.id,
      projectTitle:    this.selectedProject!.title,
      freelancerId:    user?.id,
      freelancerName:  user?.name,
      freelancerEmail: user?.email,
      clientId:        this.selectedProject!.clientId,
      clientEmail:     this.selectedProject!.clientEmail,
      coverLetter:     this.proposal.coverLetter,
      proposedBudget:  this.proposal.proposedBudget,
      deliveryTime:    this.proposal.deliveryTime,
      status:          'PENDING' as const
    };
    this.proposalService.create(payload).subscribe({
      next: () => {
        this.appliedProjectIds.add(this.selectedProject!.id!);
        this.isSubmitting = false;
        this.closeModal();
      },
      error: () => { this.submitError = 'Error submitting proposal'; this.isSubmitting = false; }
    });
  }

  getScoreClass(score: number): string {
    if (score >= 75) return 'score-excellent';
    if (score >= 50) return 'score-good';
    if (score >= 25) return 'score-fair';
    return 'score-low';
  }

  getRecoClass(reco: string): string {
    if (reco === 'Excellent Match') return 'reco-excellent';
    if (reco === 'Good Match')      return 'reco-good';
    if (reco === 'Fair Match')      return 'reco-fair';
    return 'reco-low';
  }
}