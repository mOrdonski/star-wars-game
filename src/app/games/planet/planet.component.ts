import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { catchError, forkJoin, Observable, of, tap } from 'rxjs';

import { ErrorCardComponent } from '../../cards/error/error.component';
import { PlanetCardComponent } from '../../cards/planet/planet.component';
import { config } from '../../shared/config';
import { Game } from '../../shared/interfaces/game.gateway';
import { StarWarsPlanet } from '../../shared/interfaces/star-wars-planet';
import { StarWarsService } from '../../shared/services/star-wars.service';
import { getResult } from '../../shared/utils/get-result';

@Component({
  selector: 'app-planet',
  standalone: true,
  imports: [
    CommonModule,
    PlanetCardComponent,
    MatButtonModule,
    ErrorCardComponent,
    NgSelectModule,
    FormsModule,
  ],
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetComponent implements Game {
  private readonly starWarsService = inject(StarWarsService);

  selectedGameResource:
    | 'diameter'
    | 'rotation_period'
    | 'orbital_period'
    | 'gravity'
    | 'population' = 'diameter';
  selectOptions = config.planetOptions;
  twoRandomPlanets$: Observable<{
    leftCard: Partial<StarWarsPlanet>;
    rightCard: Partial<StarWarsPlanet>;
  }> = new Observable();
  winner: WritableSignal<string> = signal('');
  leftScore: WritableSignal<number> = signal(0);
  rightScore: WritableSignal<number> = signal(0);

  play(): void {
    this.twoRandomPlanets$ = forkJoin({
      leftCard: this.starWarsService
        .getRandomPlanet()
        .pipe(catchError((error) => of({}))),
      rightCard: this.starWarsService
        .getRandomPlanet()
        .pipe(catchError((error) => of({}))),
    }).pipe(
      tap(({ leftCard, rightCard }) => this.countResults(leftCard, rightCard))
    );
  }

  countResults(
    leftCard: Partial<StarWarsPlanet>,
    rightCard: Partial<StarWarsPlanet>
  ): void {
    const leftResult = leftCard.result
      ? leftCard.result.properties[this.selectedGameResource]
      : 'error';

    const rightResult = rightCard.result
      ? rightCard.result.properties[this.selectedGameResource]
      : 'error';

    const result = getResult(leftResult, rightResult);

    this.winner.set(result);

    this.addPoints(result);
  }

  resetScore(): void {
    this.leftScore.set(0);
    this.rightScore.set(0);
  }

  addPoints(result: string): void {
    if (result === 'left') {
      this.leftScore.set(this.leftScore() + 1);
    }
    if (result === 'right') {
      this.rightScore.set(this.rightScore() + 1);
    }
    if (result === 'draw') {
      this.leftScore.set(this.leftScore() + 1);
      this.rightScore.set(this.rightScore() + 1);
    }
  }
}
