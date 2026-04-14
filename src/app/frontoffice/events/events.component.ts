import { Component, OnInit } from '@angular/core';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'webinar' | 'workshop' | 'meetup' | 'conference';
  icon: string;
  color: string;
  attendees: number;
  maxAttendees: number;
  isFeatured: boolean;
  isOnline: boolean;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  activeFilter = 'all';
  filters = ['all', 'webinar', 'workshop', 'meetup', 'conference'];

  events: Event[] = [
    { id: 1, title: 'Freelance Tunisia Summit 2025', description: 'The biggest freelance event in Tunisia. Network, learn and grow with 500+ professionals.', date: '2025-03-15', time: '09:00', location: 'Tunis, TN', type: 'conference', icon: '🏆', color: '#f59e0b', attendees: 380, maxAttendees: 500, isFeatured: true, isOnline: false },
    { id: 2, title: 'UX Design Masterclass', description: 'Live workshop with industry experts covering the latest UX research methods.', date: '2025-03-20', time: '14:00', location: 'Online', type: 'workshop', icon: '🎨', color: '#a855f7', attendees: 72, maxAttendees: 100, isFeatured: false, isOnline: true },
    { id: 3, title: 'Freelancers Meetup Sfax', description: 'Monthly informal gathering of freelancers in Sfax. Share experiences and connections.', date: '2025-03-25', time: '18:00', location: 'Sfax, TN', type: 'meetup', icon: '☕', color: '#22c55e', attendees: 34, maxAttendees: 50, isFeatured: false, isOnline: false },
    { id: 4, title: 'Client Acquisition Webinar', description: 'Learn proven strategies to find and retain high-paying clients as a freelancer.', date: '2025-04-02', time: '11:00', location: 'Online', type: 'webinar', icon: '📡', color: '#4f6ef7', attendees: 210, maxAttendees: 500, isFeatured: true, isOnline: true },
    { id: 5, title: 'No-Code Tools Workshop', description: 'Master tools like Webflow, Bubble and Make to accelerate your freelance workflow.', date: '2025-04-10', time: '15:00', location: 'Online', type: 'workshop', icon: '⚡', color: '#06b6d4', attendees: 45, maxAttendees: 80, isFeatured: false, isOnline: true },
  ];

  get filteredEvents(): Event[] {
    return this.events.filter(e => this.activeFilter === 'all' || e.type === this.activeFilter);
  }

  get featuredEvent(): Event | undefined {
    return this.events.find(e => e.isFeatured);
  }

  ngOnInit(): void {}

  getAttendancePercent(event: Event): number {
    return Math.round((event.attendees / event.maxAttendees) * 100);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
}
