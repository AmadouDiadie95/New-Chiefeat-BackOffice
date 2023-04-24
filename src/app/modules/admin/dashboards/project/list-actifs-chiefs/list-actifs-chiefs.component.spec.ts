import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActifsChiefsComponent } from './list-actifs-chiefs.component';

describe('ListActifsChiefsComponent', () => {
  let component: ListActifsChiefsComponent;
  let fixture: ComponentFixture<ListActifsChiefsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActifsChiefsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActifsChiefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
