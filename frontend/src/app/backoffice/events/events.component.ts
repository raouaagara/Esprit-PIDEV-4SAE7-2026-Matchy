import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bo-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class BoEventsComponent implements OnInit {
  searchTerm = '';
  selectedType = 'all';
  types = ['all', 'webinar', 'workshop', 'meetup', 'conference'];

  events = [
    { id: 1, title: 'Freelance Tunisia Summit 2025', type: 'conference', date: '2025-03-15', location: 'Tunis, TN', attendees: 380, maxAttendees: 500, status: 'upcoming', isOnline: false },
    { id: 2, title: 'UX Design Masterclass', type: 'workshop', date: '2025-03-20', location: 'Online', attendees: 72, maxAttendees: 100, status: 'upcoming', isOnline: true },
    { id: 3, title: 'Freelancers Meetup Sfax', type: 'meetup', date: '2025-03-25', location: 'Sfax, TN', attendees: 34, maxAttendees: 50, status: 'upcoming', isOnline: false },
    { id: 4, title: 'Client Acquisition Webinar', type: 'webinar', date: '2025-04-02', location: 'Online', attendees: 210, maxAttendees: 500, status: 'upcoming', isOnline: true },
  ];

  get filteredEvents() {
    return this.events.filter(e => {
      const matchType = this.selectedType === 'all' || e.type === this.selectedType;
      const matchSearch = !this.searchTerm || e.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchType && matchSearch;
    });
  }

  ngOnInit(): void {}

  getAttendancePercent(e: any): number {
    return Math.round((e.attendees / e.maxAttendees) * 100);
  }
}
