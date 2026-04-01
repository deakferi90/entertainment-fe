import { TestBed } from '@angular/core/testing';

import { EntertaimentState } from './entertaiment-state';

describe('EntertaimentState', () => {
  let service: EntertaimentState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntertaimentState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
