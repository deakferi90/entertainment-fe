import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMenu } from './dashboard';

describe('Dashboard', () => {
  let component: DashboardMenu;
  let fixture: ComponentFixture<DashboardMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
