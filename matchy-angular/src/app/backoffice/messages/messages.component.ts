import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from '../../frontoffice/services/message.service';
import { ProjectService } from '../../frontoffice/services/project.service';
import { AuthService } from '../../frontoffice/services/auth.service';
import { Message, CreateMessageRequest, Project } from '../../frontoffice/models/models';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-bo-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('fileInput') private fileInput!: ElementRef;

  projects: Project[] = [];
  selectedProject: Project | null = null;
  messages: Message[] = [];
  newMessage: string = '';
  loading = false;
  sending = false;
  currentUser: any;
  pollingSubscription?: Subscription;
  selectedFile: File | null = null;
  uploadingFile = false;

  constructor(
    private messageService: MessageService,
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.loadProjects();
  }

  ngOnDestroy() {
    this.stopPolling();
  }

  loadProjects() {
    this.loading = true;
    // Load company's projects
    this.projectService.getCompanyProjects(this.currentUser.id).subscribe({
      next: (projects: Project[]) => {
        this.projects = projects;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading projects:', error);
        this.loading = false;
      }
    });
  }

  selectProject(project: Project) {
    this.selectedProject = project;
    this.loadMessages();
    this.startPolling();
  }

  loadMessages() {
    if (!this.selectedProject) return;

    this.messageService.getChatThread(this.selectedProject.id, this.currentUser.id)
      .subscribe({
        next: (messages) => {
          this.messages = messages;
          this.scrollToBottom();
          this.markAsRead();
        },
        error: (error) => {
          console.error('Error loading messages:', error);
        }
      });
  }

  sendMessage() {
    if ((!this.newMessage.trim() && !this.selectedFile) || !this.selectedProject || this.sending) return;

    this.sending = true;

    // If there's a file, upload it first
    if (this.selectedFile) {
      this.uploadFile();
    } else {
      this.sendTextMessage();
    }
  }

  sendTextMessage(attachmentUrl?: string, attachmentName?: string) {
    if (!this.selectedProject) return;

    const request: CreateMessageRequest = {
      projectId: this.selectedProject.id,
      senderId: this.currentUser.id,
      receiverId: null, // Broadcast to all project members
      content: this.newMessage.trim(),
      attachmentUrl: attachmentUrl,
      attachmentName: attachmentName
    };

    this.messageService.sendMessage(request).subscribe({
      next: () => {
        this.newMessage = '';
        this.selectedFile = null;
        this.sending = false;
        this.loadMessages();
      },
      error: (error) => {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
        this.sending = false;
      }
    });
  }

  uploadFile() {
    if (!this.selectedFile) return;

    this.uploadingFile = true;
    this.messageService.uploadAttachment(this.selectedFile).subscribe({
      next: (response) => {
        this.uploadingFile = false;
        this.sendTextMessage(response.url, response.name);
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        alert('Failed to upload file. Please try again.');
        this.uploadingFile = false;
        this.sending = false;
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      this.selectedFile = file;
    }
  }

  removeSelectedFile() {
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  startPolling() {
    this.stopPolling();
    if (this.selectedProject) {
      this.pollingSubscription = interval(5000) // Poll every 5 seconds
        .pipe(
          switchMap(() => 
            this.messageService.getChatThread(this.selectedProject!.id, this.currentUser.id)
          )
        )
        .subscribe({
          next: (messages) => {
            const hadNewMessages = messages.length > this.messages.length;
            this.messages = messages;
            if (hadNewMessages) {
              this.scrollToBottom();
              this.markAsRead();
            }
          },
          error: (error) => {
            console.error('Error polling messages:', error);
          }
        });
    }
  }

  stopPolling() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  markAsRead() {
    if (this.selectedProject) {
      this.messageService.markThreadAsRead(this.selectedProject.id, this.currentUser.id)
        .subscribe();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = 
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  isMyMessage(message: Message): boolean {
    return message.senderId === this.currentUser.id;
  }

  formatTime(date: string | Date): string {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  formatDate(date: string | Date): string {
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: messageDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  }

  shouldShowDateSeparator(index: number): boolean {
    if (index === 0) return true;
    
    const currentDate = new Date(this.messages[index].createdAt).toDateString();
    const previousDate = new Date(this.messages[index - 1].createdAt).toDateString();
    
    return currentDate !== previousDate;
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  getFileIcon(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const iconMap: { [key: string]: string } = {
      'pdf': '📄',
      'doc': '📝',
      'docx': '📝',
      'xls': '📊',
      'xlsx': '📊',
      'ppt': '📊',
      'pptx': '📊',
      'zip': '📦',
      'rar': '📦',
      'jpg': '🖼️',
      'jpeg': '🖼️',
      'png': '🖼️',
      'gif': '🖼️',
      'mp4': '🎥',
      'avi': '🎥',
      'mp3': '🎵',
      'wav': '🎵'
    };
    return iconMap[ext || ''] || '📎';
  }

  isImage(fileName: string): boolean {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '');
  }
}
