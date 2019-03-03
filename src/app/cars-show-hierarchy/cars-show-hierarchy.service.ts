import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isArray } from 'util';
import { environment } from '../../environments/environment';

const httpOptions: any = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CarsShowHierarchyService {
  constructor(private http: HttpClient) { }

  getData(): Observable<CARSDATA[]> {
    return new Observable<CARSDATA[]>((observer) => {
      let url  = environment.car_shows_url;
      this.http.get<any>(url, httpOptions).subscribe(
        data => {
          this.validateData(data) ? observer.next(this.transformData(data)) : observer.error("Error: "+data)
        },
        error => {
          if(!error || !error.error)
            error = {error: "Unknown error"}
          observer.error(error.error);
        }
      )
    }
    );
  }

  validateData(data: any): boolean {
    if (data && data.makes && isArray(data.makes)) {
      return true;
    }
    return false;
  }

  transformData(data: any): CARSDATA[] {
    let transformedData: CARSDATA[] = [];
    let tempjson = data.makes;
    if(tempjson.length){
      this.renameChildKeys(tempjson);
    }
    transformedData = <CARSDATA[]>JSON.parse(JSON.stringify(tempjson));
    return transformedData;
  }

  renameChildKeys(data : any) {
    return data.map(child => {
      let childkey = this.getChildKey(child); 
      if(childkey){
        child.children = this.renameChildKeys(child[childkey]);
        delete child[childkey];
      }
      return child;
    })
  }

  getChildKey(object:any){
    let _obj = Object.assign({},object);
    delete _obj.name;
    let keys = Object.keys(_obj);
    return keys && keys.length ? keys[0] : null;
  }

}
