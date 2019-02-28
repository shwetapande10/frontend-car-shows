import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsShowHierarchyComponent } from './cars-show-hierarchy.component';

describe('CarsShowHierarchyComponent', () => {
  let component: CarsShowHierarchyComponent;
  let fixture: ComponentFixture<CarsShowHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsShowHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsShowHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
