import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedBookmark } from './shared-bookmark';

describe('SharedBookmark', () => {
  let component: SharedBookmark;
  let fixture: ComponentFixture<SharedBookmark>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedBookmark]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedBookmark);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
