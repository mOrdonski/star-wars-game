import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { StarWarsPeople } from '../../shared/interfaces/star-wars-people';

@Component({
  selector: 'app-people-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './people.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleCardComponent {
  @Input() people!: Partial<StarWarsPeople>;
}
