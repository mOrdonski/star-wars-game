import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CardsQuantity } from '../cards-quantity.enum.';
import { config } from '../config';
import { StarWarsPeople } from '../interfaces/star-wars-people';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private readonly http = inject(HttpClient);

  getRandomPeople(): Observable<Partial<StarWarsPeople>> {
    const randomNumber = this.getRandomNumber(CardsQuantity.peoples);

    return this.http.get<Partial<StarWarsPeople>>(
      `${config.SWApiUrl}people/${randomNumber}`
    );
  }

  getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }
}
