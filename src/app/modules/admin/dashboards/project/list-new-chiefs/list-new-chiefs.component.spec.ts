import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewChiefsComponent } from './list-new-chiefs.component';

describe('ListNewChiefsComponent', () => {
  let component: ListNewChiefsComponent;
  let fixture: ComponentFixture<ListNewChiefsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNewChiefsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNewChiefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
