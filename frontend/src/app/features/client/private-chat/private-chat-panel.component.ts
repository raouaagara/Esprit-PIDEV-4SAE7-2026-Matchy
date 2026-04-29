import {
  Component, Input, Output, EventEmitter,
  OnInit, OnDestroy, ViewChild, ElementRef,
  AfterViewChecked, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PrivateChatService } from '../../../core/services/private-chat.service';
import { AuthService } from '../../../core/services/auth.service';
import { PrivateChatMessage } from '../../../shared/models/models';

@Component({
  selector: 'app-private-chat-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './private-chat-panel.component.html',
  styleUrls: ['./private-chat-panel.component.css']
})
export class PrivateChatPanelComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() freelancerId!: number;
  @Input() freelancerName!: string;
  @Input() projectId!: number;
  @Input() projectTitle = '';
  @Output() close = new EventEmitter<void>();

  @ViewChild('messagesEnd') messagesEnd!: ElementRef;
  @ViewChild('msgInput') msgInput!: ElementRef<HTMLTextAreaElement>;

  messages: PrivateChatMessage[] = [];
  newMessage = '';
  loading = false;
  sending = false;
  freelancerOnline = false;
  roomKey = '';
  private shouldScroll = false;
  private roomSub?: Subscription;
  private statusSub?: Subscription;

  constructor(
    private privateChatService: PrivateChatService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const me = this.authService.currentUser;
    if (!me) return;

    this.roomKey = this.privateChatService.buildRoomKey(me.id, this.freelancerId, this.projectId);

    this.privateChatService.connect(me.id);
    this.loadMessages();

    this.privateChatService.getUserStatus(this.freelancerId).subscribe({
      next: s => { this.freelancerOnline = s.online; this.cdr.detectChanges(); },
      error: () => {}
    });

    this.statusSub = this.privateChatService.watchUserStatus(this.freelancerId).subscribe(s => {
      this.freelancerOnline = s.online;
      this.cdr.detectChanges();
    });

    this.roomSub = this.privateChatService.subscribeToRoom(this.roomKey).subscribe(msg => {
      this.messages = [...this.messages, msg];
      this.shouldScroll = true;
      if (msg.senderId !== me.id) {
        this.privateChatService.markRead(this.roomKey).subscribe();
      }
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.roomSub?.unsubscribe();
    this.statusSub?.unsubscribe();
    if (this.roomKey) {
      this.privateChatService.unsubscribeFromRoom(this.roomKey);
    }
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  loadMessages() {
    if (!this.roomKey) return;
    this.loading = true;
    this.privateChatService.getMessages(this.roomKey).subscribe({
      next: msgs => {
        this.messages = msgs;
        this.loading = false;
        this.shouldScroll = true;
        this.cdr.detectChanges();
        this.privateChatService.markRead(this.roomKey).subscribe();
      },
      error: () => { this.loading = false; }
    });
  }

  sendMessage() {
    const content = this.newMessage.trim();
    if (!content || this.sending) return;

    this.sending = true;
    const backup = this.newMessage;
    this.newMessage = '';

    this.privateChatService.sendMessage(
      content, this.freelancerId, this.projectId, this.roomKey
    ).subscribe({
      next: msg => {
        this.messages = [...this.messages, msg];
        this.shouldScroll = true;
        this.sending = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.sending = false;
        this.newMessage = backup;
      }
    });
  }

  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  isMe(msg: PrivateChatMessage): boolean {
    return msg.senderId === this.authService.currentUser?.id;
  }

  getInitials(name: string): string {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
  }

  formatTime(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom() {
    try {
      this.messagesEnd?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch {}
  }
}
