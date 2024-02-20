import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CardsQuantity } from '../cards-quantity.enum';
import { config } from '../config';
import { StarWarsPeople } from '../interfaces/star-wars-people';
import { StarWarsPlanet } from '../interfaces/star-wars-planet';
import { StarWarsSpecies } from '../interfaces/star-wars-species';
import { StarWarsStarship } from '../interfaces/star-wars-starship';

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

  getRandomStarship(): Observable<Partial<StarWarsStarship>> {
    const randomNumber = this.getRandomNumber(CardsQuantity.starships);

    return this.http.get<Partial<StarWarsStarship>>(
      `${config.SWApiUrl}starships/${randomNumber}`
    );
  }

  getRandomSpecies(): Observable<Partial<StarWarsSpecies>> {
    const randomNumber = this.getRandomNumber(CardsQuantity.species);
    return this.http.get<Partial<StarWarsSpecies>>(
      `${config.SWApiUrl}species/${randomNumber}`
    );
  }

  getRandomPlanet(): Observable<Partial<StarWarsPlanet>> {
    const randomNumber = this.getRandomNumber(CardsQuantity.planets);

    return this.http.get<Partial<StarWarsPlanet>>(
      `${config.SWApiUrl}planets/${randomNumber}`
    );
  }

  getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }
}
