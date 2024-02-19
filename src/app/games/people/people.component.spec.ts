import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { of } from 'rxjs';

import { people } from '../../shared/mock';
import { StarWarsService } from '../../shared/services/star-wars.service';
import { PeopleComponent } from './people.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let starWarsServiceSpy: jasmine.SpyObj<StarWarsService>;

  beforeEach(async () => {
    starWarsServiceSpy = jasmine.createSpyObj('StarWarsService', [
      'getRandomPeople',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        PeopleComponent,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: StarWarsService, useValue: starWarsServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectOptions', () => {
    expect(component.selectOptions).toBeTruthy();
  });

  it('should execute countResults method after play()', () => {
    starWarsServiceSpy.getRandomPeople.and.returnValues(of({}), of({}));

    spyOn(component, 'countResults').and.callThrough();

    component.play();

    component.twoRandomPeoples$.subscribe();

    expect(component.countResults).toHaveBeenCalled();
  });

  it('should set winner to right on countResults()', () => {
    const leftPeople = {
      ...people,
      result: {
        ...people.result,
        properties: {
          ...people.result.properties,
          mass: '1',
        },
      },
    };
    const rightPeople = {
      ...people,
      result: {
        ...people.result,
        properties: {
          ...people.result.properties,
          mass: '2',
        },
      },
    };

    component.countResults(leftPeople, rightPeople);
    expect(component.winner()).toBe('right');
  }),
    it('should set winner to left on countResults()', () => {
      const leftPeople = {
        ...people,
        result: {
          ...people.result,
          properties: {
            ...people.result.properties,
            mass: '2',
          },
        },
      };
      const rightPeople = {
        ...people,
        result: {
          ...people.result,
          properties: {
            ...people.result.properties,
            mass: '1',
          },
        },
      };

      component.countResults(leftPeople, rightPeople);
      expect(component.winner()).toBe('left');
    });

  it('should set winner to draw on countResults()', () => {
    const leftPeople = {
      ...people,
      result: {
        ...people.result,
        properties: {
          ...people.result.properties,
          mass: '1',
        },
      },
    };
    const rightPeople = {
      ...people,
      result: {
        ...people.result,
        properties: {
          ...people.result.properties,
          mass: '1',
        },
      },
    };

    component.countResults(leftPeople, rightPeople);
    expect(component.winner()).toBe('draw');
  });

  it('should reset score correctly on resetScore()', () => {
    component.leftScore.set(1);
    component.rightScore.set(1);

    component.resetScore();
    expect(component.leftScore()).toBe(0);
    expect(component.rightScore()).toBe(0);
  });

  it('should add points correctly on addPoints()', () => {
    component.leftScore.set(1);
    component.rightScore.set(1);

    component.addPoints('left');
    expect(component.leftScore()).toBe(2);

    component.addPoints('right');
    expect(component.rightScore()).toBe(2);

    component.addPoints('draw');
    expect(component.leftScore()).toBe(3);
    expect(component.rightScore()).toBe(3);
  });
});
