import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationsCanceledsComponent } from './list-reservations-canceleds.component';

describe('ListReservationsCanceledsComponent', () => {
  let component: ListReservationsCanceledsComponent;
  let fixture: ComponentFixture<ListReservationsCanceledsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReservationsCanceledsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReservationsCanceledsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
