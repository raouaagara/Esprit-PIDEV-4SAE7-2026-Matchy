import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeSubject: BehaviorSubject<boolean>;
  public darkMode$: Observable<boolean>;

  constructor() {
    // Check localStorage for saved preference
    const savedMode = localStorage.getItem('darkMode');
    const isDark = savedMode === 'true';
    
    this.darkModeSubject = new BehaviorSubject<boolean>(isDark);
    this.darkMode$ = this.darkModeSubject.asObservable();
    
    // Apply initial theme
    this.applyTheme(isDark);
  }

  toggleDarkMode(): void {
    const newMode = !this.darkModeSubject.value;
    
    // Add transitioning class for lightening effect
    document.body.classList.add('dark-mode-transitioning');
    
    // Apply theme
    this.darkModeSubject.next(newMode);
    this.applyTheme(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    // Remove transitioning class after animation
    setTimeout(() => {
      document.body.classList.remove('dark-mode-transitioning');
    }, 600);
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
