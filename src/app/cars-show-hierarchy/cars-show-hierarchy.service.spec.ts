import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarsShowHierarchyService } from './cars-show-hierarchy.service';
import { environment } from 'src/environments/environment';
import {testdata} from './cars-show-data-spec';

describe('CarsShowHierarchyService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: CarsShowHierarchyService = TestBed.get(CarsShowHierarchyService);
    expect(service).toBeTruthy();
  });

  it('should load empty data', (done) => {
    const service: CarsShowHierarchyService = TestBed.get(CarsShowHierarchyService);
    expect(service).toBeTruthy();
    service.getData().subscribe(
      data => {
        expect(data).toEqual([])
        done();
      }
    );
    let mockRequest = httpMock.expectOne(environment.car_shows_url);
    mockRequest.flush({makes:[]});
    httpMock.verify();
  });

  it('should load valid data', (done) => {
    const service: CarsShowHierarchyService = TestBed.get(CarsShowHierarchyService);
    expect(service).toBeTruthy();
    service.getData().subscribe(
      data => {
        expect(data.length).toBeTruthy()
        done();
      }
    );
    let mockRequest = httpMock.expectOne(environment.car_shows_url);
    mockRequest.flush(testdata.data);
    httpMock.verify();
  });

});
