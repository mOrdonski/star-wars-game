import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { StarWarsPlanet } from '../../shared/interfaces/star-wars-planet';

@Component({
  selector: 'app-planet-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './planet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetCardComponent {
  @Input() planet!: Partial<StarWarsPlanet>;
}
