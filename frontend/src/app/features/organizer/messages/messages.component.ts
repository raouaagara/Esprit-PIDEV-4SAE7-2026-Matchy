import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../core/services/chat.service';
import { AuthService } from '../../../core/services/auth.service';
import { ProjectService } from '../../../core/services/project.service';
import { Project, ChatMessage } from '../../../shared/models/models';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLTextAreaElement>;

  // Conversations
  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  selectedProject: Project | null = null;

  // Messages
  messages: ChatMessage[] = [];
  newMessage = '';
  loadingMessages = false;
  sending = false;

  // Recherche
  searchQuery = '';

  // État utilisateur
  onlineUsers = new Set<string>();

  // Subscriptions
  private wsSub?: Subscription;
  private typingSub?: Subscription;
  private presenceSub?: Subscription;
  private typingUsers = new Map<string, any>();

  constructor(
    private chatService: ChatService,
    public authService: AuthService,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}


logout() {
  this.authService.logout();
  this.router.navigate(['/auth/login']);
}

  ngOnInit() {
    this.loadConversations();
    this.setupPresence();
  }

  ngOnDestroy() {
    this.wsSub?.unsubscribe();
    this.typingSub?.unsubscribe();
    this.presenceSub?.unsubscribe();
    this.typingUsers.forEach(h => clearTimeout(h));
    if (this.selectedProject) {
      this.chatService.disconnectFromProject(this.selectedProject.id);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  // Charger toutes les conversations (projets)
  loadConversations() {
    this.projectService.getMy().subscribe({
      next: (projects) => {
        this.conversations = projects.map(project => ({
          projectId: project.id,
          projectTitle: project.title,
          projectCategory: project.category,
          projectImage: project.imageUrl,
          lastMessage: null,
          lastMessageTime: null,
          unreadCount: 0,
          isOnline: false,
          participantName: project.organizerName,
          participantId: project.organizerId,
          participantRole: 'ORGANIZER'
        }));

        // Charger le dernier message pour chaque conversation
        this.conversations.forEach(conv => {
          this.chatService.getMessages(conv.projectId).subscribe({
            next: (msgs) => {
              if (msgs.length > 0) {
                const last = msgs[msgs.length - 1];
                conv.lastMessage = last.content || (last.fileName || 'Fichier');
                conv.lastMessageTime = last.sentAt;
                // Remplacer isRead par readBy (vérifier si l'utilisateur a lu)
                const currentUserId = this.authService.currentUser?.id;
                conv.unreadCount = msgs.filter(m => 
                  m.senderId !== currentUserId && 
                  currentUserId &&
                  (!m.readBy || !m.readBy.includes(currentUserId))
                ).length;
              }
              this.cdr.detectChanges();
            }
          });
        });
      },
      error: () => {}
    });
  }

  // Sélectionner une conversation
  selectConversation(conversation: Conversation) {
    if (this.selectedConversation?.projectId === conversation.projectId) return;

    // Déconnecter l'ancien projet
    if (this.selectedProject) {
      this.chatService.disconnectFromProject(this.selectedProject.id);
      this.wsSub?.unsubscribe();
      this.typingSub?.unsubscribe();
    }

    this.selectedConversation = conversation;
    this.loadingMessages = true;

    // Charger les détails du projet - utiliser getMy puis find
    this.projectService.getMy().subscribe({
      next: (projects) => {
        const project = projects.find(p => p.id === conversation.projectId);
        if (project) {
          this.selectedProject = project;
          this.loadMessages();
          this.connectToProject();
          this.markAsRead();
        } else {
          this.loadingMessages = false;
        }
      },
      error: () => {
        this.loadingMessages = false;
      }
    });
  }

  // Charger les messages
  loadMessages() {
    if (!this.selectedProject) return;

    this.chatService.getMessages(this.selectedProject.id).subscribe({
      next: (msgs) => {
        this.messages = msgs;
        this.loadingMessages = false;
        this.cdr.detectChanges();
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: () => {
        this.loadingMessages = false;
      }
    });
  }

  // Se connecter au projet pour recevoir les messages en temps réel
  connectToProject() {
    if (!this.selectedProject) return;

    this.wsSub = this.chatService.connectToProject(this.selectedProject.id).subscribe({
      next: (msg) => {
        if (msg.deleted) {
          this.messages = this.messages.filter(m => m.id !== msg.id);
          return;
        }
        const idx = this.messages.findIndex(m => m.id === msg.id);
        if (idx >= 0) {
          this.messages[idx] = msg;
        } else {
          this.messages = [...this.messages, msg];
          // Marquer comme lu si c'est l'utilisateur courant
          if (msg.senderId !== this.authService.currentUser?.id) {
            this.markAsRead();
          }
          // Mettre à jour la dernière conversation
          this.updateConversationLastMessage(msg);
        }
        this.cdr.detectChanges();
      }
    });

    // Typing indicator
    this.typingSub = this.chatService.subscribeToTyping(this.selectedProject.id).subscribe({
      next: (event) => {
        const myName = this.authService.currentUser?.name || '';
        if (event.userName === myName) return;
        const existing = this.typingUsers.get(event.userName);
        if (existing) clearTimeout(existing);
        const handle = setTimeout(() => {
          this.typingUsers.delete(event.userName);
          this.cdr.markForCheck();
        }, 3000);
        this.typingUsers.set(event.userName, handle);
        this.cdr.markForCheck();
      }
    });
  }

  // Marquer les messages comme lus
  markAsRead() {
    if (!this.selectedProject) return;
    this.chatService.markRead(this.selectedProject.id).subscribe({
      next: () => {
        if (this.selectedConversation) {
          this.selectedConversation.unreadCount = 0;
        }
      },
      error: () => {}
    });
  }

  // Mettre à jour le dernier message dans la liste des conversations
  updateConversationLastMessage(msg: ChatMessage) {
    const conv = this.conversations.find(c => c.projectId === msg.projectId);
    if (conv) {
      conv.lastMessage = msg.content || (msg.fileName || 'Fichier');
      conv.lastMessageTime = msg.sentAt;
      if (msg.senderId !== this.authService.currentUser?.id && 
          this.selectedConversation?.projectId !== msg.projectId) {
        conv.unreadCount++;
      }
      this.cdr.detectChanges();
    }
  }

  // Envoyer un message
  sendMessage() {
    const content = this.newMessage.trim();
    if (!content || !this.selectedProject || this.sending) return;

    this.sending = true;
    const backup = this.newMessage;
    this.newMessage = '';
    this.adjustTextarea();

    this.chatService.sendMessage(this.selectedProject.id, content).subscribe({
      next: () => {
        this.sending = false;
      },
      error: () => {
        this.sending = false;
        this.newMessage = backup;
      }
    });
  }

  // Envoyer un message avec Entrée
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  // Ajuster la hauteur du textarea
  adjustTextarea() {
    const ta = this.messageInput?.nativeElement;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 100) + 'px';
    }
  }

  // Envoyer l'indicateur de frappe
  onTyping() {
    if (!this.selectedProject) return;
    this.chatService.sendTyping(this.selectedProject.id).subscribe({ error: () => {} });
  }

  // Configurer la présence en ligne
  setupPresence() {
    // Simuler des utilisateurs en ligne (à remplacer par votre logique réelle)
    setInterval(() => {
      this.conversations.forEach(conv => {
        conv.isOnline = Math.random() > 0.7;
      });
      this.cdr.detectChanges();
    }, 30000);
  }

  // Formater l'heure (pour la liste des conversations)
  formatTime(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    if (days === 1) return 'Hier';
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  }

  // Formater l'heure du message (dans le chat)
  formatMessageTime(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  // Obtenir les initiales pour l'avatar
  getInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  // Vérifier si le message est de l'utilisateur courant
  isMe(msg: ChatMessage): boolean {
    return msg.senderId === this.authService.currentUser?.id;
  }

  // Filtrer les conversations par recherche
  get filteredConversations(): Conversation[] {
    if (!this.searchQuery.trim()) return this.conversations;
    const query = this.searchQuery.toLowerCase();
    return this.conversations.filter(c =>
      c.projectTitle.toLowerCase().includes(query) ||
      (c.participantName?.toLowerCase().includes(query))
    );
  }

  // Obtenir le texte de frappe
  get typingText(): string {
    const names = Array.from(this.typingUsers.keys());
    if (names.length === 0) return '';
    if (names.length === 1) return `${names[0]} est en train d'écrire...`;
    if (names.length === 2) return `${names[0]} et ${names[1]} écrivent...`;
    return `${names.length} personnes écrivent...`;
  }

  // Faire défiler vers le bas
  scrollToBottom() {
    try {
      this.messagesEnd?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch {}
  }

  // Retour au dashboard
  goBack() {
    this.router.navigate(['/organizer/dashboard']);
  }

  // Vérifier si c'est mobile
  get isMobile(): boolean {
    return window.innerWidth <= 768;
  }
}

// Interface pour une conversation
export interface Conversation {
  projectId: number;
  projectTitle: string;
  projectCategory: string;
  projectImage?: string;
  lastMessage: string | null;
  lastMessageTime: string | null;
  unreadCount: number;
  isOnline: boolean;
  participantName: string;
  participantId: number;
  participantRole: string;
}