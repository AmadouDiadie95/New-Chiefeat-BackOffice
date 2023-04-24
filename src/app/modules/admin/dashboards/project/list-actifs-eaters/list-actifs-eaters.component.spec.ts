import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActifsEatersComponent } from './list-actifs-eaters.component';

describe('ListActifsEatersComponent', () => {
  let component: ListActifsEatersComponent;
  let fixture: ComponentFixture<ListActifsEatersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActifsEatersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActifsEatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
