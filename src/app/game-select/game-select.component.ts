import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { PeopleComponent } from '../games/people/people.component';
import { StarshipComponent } from '../games/starship/starship.component';

@Component({
  selector: 'app-game-select',
  standalone: true,
  imports: [CommonModule, MatTabsModule, PeopleComponent, StarshipComponent],
  templateUrl: './game-select.component.html',
  styleUrls: ['./game-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSelectComponent {}
