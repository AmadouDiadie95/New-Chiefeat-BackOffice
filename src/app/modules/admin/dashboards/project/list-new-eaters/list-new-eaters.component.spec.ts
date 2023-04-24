import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewEatersComponent } from './list-new-eaters.component';

describe('ListNewEatersComponent', () => {
  let component: ListNewEatersComponent;
  let fixture: ComponentFixture<ListNewEatersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNewEatersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNewEatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
