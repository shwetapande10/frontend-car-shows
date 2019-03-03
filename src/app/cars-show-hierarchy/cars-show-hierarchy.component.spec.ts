import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarsShowHierarchyComponent } from './cars-show-hierarchy.component';
import {MatTreeModule} from '@angular/material/tree'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {CarsShowHierarchyService} from './cars-show-hierarchy.service';
import {Observable} from 'rxjs';
import {CARSDATA} from './cars-show-hierarchy.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, tick} from '@angular/core/testing'


class MockCarsDataService{
  getData(): Observable<CARSDATA[]> {
    return new Observable<CARSDATA[]>((observer) => {
      let testdata = [{"name":"George Motors","children":[{"name":"George 15","children":[{"name":"Cartopia"},{"name":"Melbourne Motor Show"},{"name":"New York Car Show"}]}]},{"name":"Hondaka","children":[{"name":"Elisa","children":[{"name":"Carographic"},{"name":"Melbourne Motor Show"},{"name":"New York Car Show"}]},{"name":"Ellen","children":[{"name":"Cartopia"}]}]},{"name":"Julio Mechannica","children":[{"name":"Mark 1","children":[{"name":"New York Car Show"}]},{"name":"Mark 2","children":[{"name":"Carographic"},{"name":"Cartopia"}]},{"name":"Mark 4","children":[{"name":"Carographic"}]},{"name":"Mark 4S","children":[{"name":"Melbourne Motor Show"}]}]},{"name":"Moto Tourismo","children":[{"name":"Cyclissimo","children":[{"name":"Cartopia"},{"name":"Melbourne Motor Show"},{"name":"New York Car Show"}]},{"name":"Delta 16","children":[{"name":"Cartopia"}]},{"name":"Delta 4","children":[{"name":"Cartopia"},{"name":"Melbourne Motor Show"}]}]}];
      observer.next(testdata)
    });
  }
}
describe('CarsShowHierarchyComponent', () => {
  let component: CarsShowHierarchyComponent;
  let fixture: ComponentFixture<CarsShowHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        HttpClientTestingModule
      ],
      declarations: [ CarsShowHierarchyComponent ],
      providers: [MockCarsDataService]
    })
    .overrideComponent(
      CarsShowHierarchyComponent,
      {set: {providers: [{provide: CarsShowHierarchyService, useClass: MockCarsDataService}]}})
    .compileComponents();
    TestBed.overrideComponent(
      CarsShowHierarchyComponent,
      {set: {providers: [{provide: CarsShowHierarchyService, useClass: MockCarsDataService}]}}
  );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsShowHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hold data', () => {
    expect(component.dataSource.data.length == 4).toBeTruthy();
  });

  it('should render first node', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-tree-node').textContent).toContain('George Motors');
  });

  it('should hold child nodes', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.car-shows-tree-invisible .mat-nested-tree-node').textContent).toContain('George 15  Cartopia  Melbourne Motor Show  New York Car Show');
  });

  it('should show nodes on arrow click', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-nested-tree-node[aria-expanded="false"]')).toBeTruthy();
    expect(compiled.querySelector('.mat-nested-tree-node[aria-expanded="true"]')).toBeFalsy();
    let discloseButton = compiled.querySelector('button[aria-label="toggle George Motors"]');
    discloseButton.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.mat-nested-tree-node[aria-expanded="true"]')).toBeTruthy();
    expect(compiled.querySelector('.car-shows-tree-invisible .mat-nested-tree-node').textContent).not.toContain('George 15  Cartopia  Melbourne Motor Show  New York Car Show');
  });

});
