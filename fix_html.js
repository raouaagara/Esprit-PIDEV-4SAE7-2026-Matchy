const fs = require('fs');
const path = 'C:/xampp3/htdocs/matchy-final/frontend/src/app/client/dashboard/dashboard.component.html';

const raw = fs.readFileSync(path);
const content = Buffer.from(raw).toString('latin1');
const fixed = Buffer.from(content, 'latin1').toString('utf8')
  // Fix broken chars
  .replace(/ðŸ'‹/g, '\u{1F44B}')
  .replace(/ï¼‹/g, '+')
  .replace(/â€¦/g, '...')
  .replace(/ðŸ"/g, '\u{1F4C1}')
  .replace(/ðŸŸ¢/g, '\u{1F7E2}')
  .replace(/âš™ï¸/g, '\u2699\uFE0F')
  .replace(/âœ…/g, '\u2705')
  .replace(/ðŸ""/g, '\u{1F514}')
  .replace(/ðŸ…/g, '\u{1F3C5}')
  .replace(/ðŸ"¦/g, '\u{1F4E6}')
  .replace(/â€"/g, '-')
  .replace(/Â·/g, '·')
  .replace(/â†'/g, '→')
  .replace(/ðŸ"‚/g, '\u{1F4C2}')
  .replace(/ðŸ"­/g, '\u{1F4ED}')
  .replace(/ðŸ"•/g, '\u{1F515}')
  .replace(/ðŸ"'/g, '\u{1F512}')
  .replace(/ðŸ'¤/g, '\u{1F464}')
  .replace(/ðŸ§'â€ðŸ'»/g, '\u{1F9D1}\u200D\u{1F4BB}')
  .replace(/ðŸ›¡ï¸/g, '\u{1F6E1}\uFE0F')
  .replace(/sÃ©curisÃ©/g, 'sécurisé')
  .replace(/libÃ©rÃ©s/g, 'libérés')
  .replace(/aprÃ¨s/g, 'après')
  .replace(/Ã /g, 'à')
  .replace(/BÃ©nÃ©ficiaire/g, 'Bénéficiaire')
  .replace(/libÃ©ration/g, 'libération')
  .replace(/RÃ©fÃ©rence/g, 'Référence')
  .replace(/NumÃ©ro/g, 'Numéro')
  .replace(/redirigÃ©/g, 'redirigé')
  .replace(/placÃ©s/g, 'placés')
  .replace(/â€¢/g, '•')
  .replace(/â—¼/g, '◼')
  .replace(/âˆ'/g, '−')
  .replace(/âœ•/g, '✕')
  .replace(/â†—/g, '↗')
  .replace(/ðŸ"—/g, '\u{1F517}')
  .replace(/ðŸ'¬/g, '\u{1F4AC}')
  .replace(/ðŸ"Ž/g, '\u{1F50E}')
  .replace(/âœï¸/g, '\u270F\uFE0F')
  .replace(/ðŸ"/g, '\u{1F501}')
  .replace(/ðŸ'³/g, '\u{1F4B3}')
  .replace(/ðŸ"±/g, '\u{1F4F1}')
  .replace(/ðŸ¦/g, '\u{1F3E6}')
  .replace(/ðŸ›¡/g, '\u{1F6E1}')
  .replace(/ðŸ"/g, '\u{1F510}')
  .replace(/âš ï¸/g, '\u26A0\uFE0F')
  .replace(/ðŸŽ‰/g, '\u{1F389}')
  .replace(/â•/g, '═')
  .replace(/â"€/g, '─')
  .replace(/effectuÃ©/g, 'effectué')
  .replace(/TerminÃ©/g, 'Terminé')
  .replace(/marquÃ©/g, 'marqué')
  .replace(/SÃ©curisation/g, 'Sécurisation')
  // Update badges section
  .replace(
    `<div class="badges-section animate-fade-up" *ngIf="badges.length > 0" style="animation-delay:0.28s">
  <div class="badges-header">
    <h3><span>\u{1F3C5}</span> My Achievements</h3>
    <span class="badges-count">{{ badges.length }} badge{{ badges.length > 1 ? "s" : "" }} earned</span>
  </div>
  <div class="badges-grid">
    <div class="badge-item" *ngFor="let b of badges">
      <div class="badge-icon">{{ b.icon }}</div>
      <div class="badge-info">
        <span class="badge-title">{{ b.title }}</span>
        <span class="badge-desc">{{ b.description }}</span>
      </div>
    </div>
  </div>
</div>`,
    `<div class="badges-section animate-fade-up" style="animation-delay:0.28s">
  <div class="badges-header">
    <h3><span>\u{1F3C5}</span> My Achievements</h3>
    <span class="badges-count">{{ earnedCount }} badges earned</span>
  </div>
  <div class="badges-grid">
    <div class="badge-item" *ngFor="let b of mergedBadges" [class.locked]="b.locked">
      <div class="badge-icon" [class.grayscale]="b.locked">{{ b.icon }}</div>
      <div class="badge-info">
        <span class="badge-title">{{ b.name }}</span>
        <span class="badge-desc">{{ b.desc }}</span>
      </div>
      <span class="lock-icon" *ngIf="b.locked">\u{1F512}</span>
    </div>
  </div>
</div>`
  );

fs.writeFileSync(path, fixed, 'utf8');
console.log('OK - HTML fixed!');