import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { catchError, forkJoin, Observable, of, tap } from 'rxjs';

import { ErrorCardComponent } from '../../cards/error/error.component';
import { LoadingCardComponent } from '../../cards/loading/loading.component';
import { StarshipCardComponent } from '../../cards/starship/starship.component';
import { config } from '../../shared/config';
import { Game } from '../../shared/interfaces/game.gateway';
import { StarWarsStarship } from '../../shared/interfaces/star-wars-starship';
import { StarWarsService } from '../../shared/services/star-wars.service';
import { getResult } from '../../shared/utils/get-result';

@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [
    CommonModule,
    StarshipCardComponent,
    LoadingCardComponent,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    ErrorCardComponent,
  ],
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipComponent implements Game {
  private readonly starWarsService = inject(StarWarsService);

  selectedGameResource:
    | 'cost_in_credits'
    | 'length'
    | 'crew'
    | 'passengers'
    | 'hyperdrive_rating' = 'cost_in_credits';
  selectOptions = config.starshipOptions;
  twoRandomStarships$: Observable<{
    leftCard: Partial<StarWarsStarship>;
    rightCard: Partial<StarWarsStarship>;
  }> = new Observable();
  winner: WritableSignal<string> = signal('');
  leftScore: WritableSignal<number> = signal(0);
  rightScore: WritableSignal<number> = signal(0);
  loading: WritableSignal<boolean> = signal(false);

  play(): void {
    this.loading.set(true);
    this.twoRandomStarships$ = forkJoin({
      leftCard: this.starWarsService
        .getRandomStarship()
        .pipe(catchError((error) => of({}))),
      rightCard: this.starWarsService
        .getRandomStarship()
        .pipe(catchError((error) => of({}))),
    }).pipe(
      tap(({ leftCard, rightCard }) => this.countResults(leftCard, rightCard)),
      tap(() => this.loading.set(false))
    );
  }

  countResults(
    leftCard: Partial<StarWarsStarship>,
    rightCard: Partial<StarWarsStarship>
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
