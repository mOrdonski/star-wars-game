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
import { PeopleCardComponent } from '../../cards/people/people.component';
import { config } from '../../shared/config';
import { Game } from '../../shared/interfaces/game.gateway';
import { StarWarsPeople } from '../../shared/interfaces/star-wars-people';
import { StarWarsService } from '../../shared/services/star-wars.service';
import { getResult } from '../../shared/utils/get-result';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [
    CommonModule,
    PeopleCardComponent,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    ErrorCardComponent,
  ],
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent implements Game {
  private readonly starWarsService = inject(StarWarsService);

  selectedGameResource: 'mass' | 'height' = 'mass';
  selectOptions = config.peopleOptions;
  twoRandomPeoples$: Observable<{
    leftCard: Partial<StarWarsPeople>;
    rightCard: Partial<StarWarsPeople>;
  }> = new Observable();
  winner: WritableSignal<string> = signal('');
  leftScore: WritableSignal<number> = signal(0);
  rightScore: WritableSignal<number> = signal(0);

  play(): void {
    this.twoRandomPeoples$ = forkJoin({
      leftCard: this.starWarsService
        .getRandomPeople()
        .pipe(catchError((error) => of({}))),
      rightCard: this.starWarsService
        .getRandomPeople()
        .pipe(catchError((error) => of({}))),
    }).pipe(
      tap(({ leftCard, rightCard }) => this.countResults(leftCard, rightCard))
    );
  }

  countResults(
    leftCard: Partial<StarWarsPeople>,
    rightCard: Partial<StarWarsPeople>
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
