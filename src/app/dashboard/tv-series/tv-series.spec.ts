import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSeries } from './tv-series';

describe('TvSeries', () => {
  let component: TvSeries;
  let fixture: ComponentFixture<TvSeries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvSeries]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvSeries);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
