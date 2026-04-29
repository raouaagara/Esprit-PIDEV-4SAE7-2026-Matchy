(window as any).global = window;
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

registerLocaleData(localeFr, 'fr');

// ZegoCloud logs internal errors via console.error and lets WebSocket failures through.
// Patch console.error/warn to drop these before they reach the DevTools console.
const _ce = console.error.bind(console);
const _cw = console.warn.bind(console);
const isZego = (...a: unknown[]) =>
  a.some(x => {
    const s = String(x ?? '');
    return s.includes('createSpan')
        || s.includes('zego-uikit-prebuilt')
        || s.includes('coolfcloud.com')
        || s.includes('coolzcloud.com')
        || s.includes('webliveroom856544200');
  });
console.error = (...a: unknown[]) => { if (!isZego(...a)) _ce(...a); };
console.warn  = (...a: unknown[]) => { if (!isZego(...a)) _cw(...a); };

// Also catch any uncaught exceptions that escape to the window level
window.addEventListener('error', (ev) => {
  if (ev.filename?.includes('zego-uikit-prebuilt') || ev.message?.includes('createSpan')) {
    ev.preventDefault();
  }
}, true);
window.addEventListener('unhandledrejection', (ev) => {
  const s = String(ev.reason?.message ?? ev.reason ?? '');
  if (s.includes('createSpan') || String(ev.reason?.stack ?? '').includes('zego-uikit-prebuilt')) {
    ev.preventDefault();
  }
});

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
