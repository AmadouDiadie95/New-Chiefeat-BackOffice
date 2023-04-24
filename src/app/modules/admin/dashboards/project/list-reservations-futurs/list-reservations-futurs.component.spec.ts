import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationsFutursComponent } from './list-reservations-futurs.component';

describe('ListReservationsFutursComponent', () => {
  let component: ListReservationsFutursComponent;
  let fixture: ComponentFixture<ListReservationsFutursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReservationsFutursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReservationsFutursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
