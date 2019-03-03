import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import * as _ from 'underscore';
import {CarsShowHierarchyService}  from './cars-show-hierarchy.service';

@Component({
  selector: 'app-cars-show-hierarchy',
  templateUrl: './cars-show-hierarchy.component.html',
  styleUrls: ['./cars-show-hierarchy.component.scss']
})
export class CarsShowHierarchyComponent implements OnInit {

  treeControl = new NestedTreeControl<CARSDATA>(node => node.children);
  dataSource = new MatTreeNestedDataSource<CARSDATA>();
  errorMessage = "";

  constructor(private carsService:CarsShowHierarchyService) { }

  ngOnInit() {
    this.loadData()
  }

  hasChildren = (_: number, node: CARSDATA) => !!node.children && node.children.length > 0;

  loadData(){
    this.carsService.getData().subscribe(
      data => {
        console.log(data);
        this.errorMessage = "";
        if(!data.length)
          this.errorMessage = "No data found!";
        this.dataSource.data = data;
      },
      error => {
        console.log(error);
        this.errorMessage = "Error in fetching data!";
        this.dataSource.data = [];
      }
    )
  }

}