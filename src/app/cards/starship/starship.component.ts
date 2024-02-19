import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { StarWarsStarship } from '../../shared/interfaces/star-wars-starship';

@Component({
  selector: 'app-starship-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './starship.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipCardComponent {
  @Input() starship!: Partial<StarWarsStarship>;
}
