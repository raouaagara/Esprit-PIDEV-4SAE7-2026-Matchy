import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../frontoffice/services/review.service';
import { Review } from '../../frontoffice/models/models';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  loading = false;

  constructor(
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.loading = true;
    this.reviewService.getAllReviews().subscribe({
      next: (data: Review[]) => {
        this.reviews = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading reviews:', err);
        this.loading = false;
      }
    });
  }

  getStarsArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}
