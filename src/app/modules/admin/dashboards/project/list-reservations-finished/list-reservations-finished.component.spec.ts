import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationsFinishedComponent } from './list-reservations-finished.component';

describe('ListReservationsFinishedComponent', () => {
  let component: ListReservationsFinishedComponent;
  let fixture: ComponentFixture<ListReservationsFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReservationsFinishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReservationsFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
