import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInactifsChiefsComponent } from './list-inactifs-chiefs.component';

describe('ListInactifsChiefsComponent', () => {
  let component: ListInactifsChiefsComponent;
  let fixture: ComponentFixture<ListInactifsChiefsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInactifsChiefsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInactifsChiefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
