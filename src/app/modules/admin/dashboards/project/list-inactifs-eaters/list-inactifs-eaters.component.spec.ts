import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInactifsEatersComponent } from './list-inactifs-eaters.component';

describe('ListInactifsEatersComponent', () => {
  let component: ListInactifsEatersComponent;
  let fixture: ComponentFixture<ListInactifsEatersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInactifsEatersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInactifsEatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
