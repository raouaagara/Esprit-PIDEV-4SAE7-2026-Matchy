$file = "src/app/freelancer/dashboard/dashboard.component.html"
$content = Get-Content $file -Raw -Encoding UTF8

$content = $content -replace '(?s)<!-- Planificateur de disponibilit.*?</div>\s*</div>\s*</div>', '      <!-- Availability -->
      <div class="panel panel-availability">
        <div class="panel-head">
          <div class="panel-title">
            <span class="panel-icon-wrap">📅</span>
            <h3>My Availability</h3>
            <span class="status-badge" [ngClass]="getAvailabilityClass()">
              {{ getAvailabilityLabel() }}
            </span>
          </div>
        </div>
        <div class="availability-body">
          <div class="avail-big">
            <div class="avail-circle">
              <span class="avail-num">{{ availability.occupiedSlots }}</span>
              <span class="avail-of">/ {{ availability.maxSlots }}</span>
            </div>
            <div class="avail-desc">
              <div class="avail-label">Slots used</div>
              <div class="avail-slots">
                <div class="slot" *ngFor="let i of range(availability.maxSlots)" [class.slot-used]="i < availability.occupiedSlots"></div>
              </div>
              <p class="avail-from">Available from: <strong>{{ availability.availableFrom }}</strong></p>
            </div>
          </div>
        </div>
      </div>'

$content | Set-Content $file -Encoding UTF8
Write-Host "Done!"
