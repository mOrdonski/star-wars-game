import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { PeopleComponent } from '../games/people/people.component';
import { PlanetComponent } from '../games/planet/planet.component';
import { SpeciesComponent } from '../games/species/species.component';
import { StarshipComponent } from '../games/starship/starship.component';

@Component({
  selector: 'app-game-select',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    PeopleComponent,
    PlanetComponent,
    StarshipComponent,
    SpeciesComponent,
  ],
  templateUrl: './game-select.component.html',
  styleUrls: ['./game-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSelectComponent {}
