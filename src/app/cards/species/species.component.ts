import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { StarWarsSpecies } from '../../shared/interfaces/star-wars-species';

@Component({
  selector: 'app-species-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './species.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesCardComponent {
  @Input() species!: Partial<StarWarsSpecies>;
}
