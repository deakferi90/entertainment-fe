import { TestBed } from '@angular/core/testing';

import { MoviesData } from './movies-data';

describe('MoviesData', () => {
  let service: MoviesData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
