import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import * as _ from 'underscore';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

@Component({
  selector: 'app-cars-show-hierarchy',
  templateUrl: './cars-show-hierarchy.component.html',
  styleUrls: ['./cars-show-hierarchy.component.scss']
})
export class CarsShowHierarchyComponent implements OnInit {

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  constructor() { }

  ngOnInit() {
    this.dataSource.data = getData().makes;
    console.log(this.dataSource.data)
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

}

function getData() {
  var arr = [{"name":"New York Car Show","cars":[{"make":"Hondaka","model":"Elisa"},{"make":"George Motors","model":"George 15"},{"make":"Julio Mechannica","model":"Mark 1"},{"make":"Moto Tourismo","model":"Cyclissimo"},{"make":"Edison Motors","model":""}]},{"name":"Melbourne Motor Show","cars":[{"make":"Julio Mechannica","model":"Mark 4S"},{"make":"Hondaka","model":"Elisa"},{"make":"Moto Tourismo","model":"Cyclissimo"},{"make":"George Motors","model":"George 15"},{"make":"Moto Tourismo","model":"Delta 4"}]},{"name":"Cartopia","cars":[{"make":"Moto Tourismo","model":"Cyclissimo"},{"make":"George Motors","model":"George 15"},{"make":"Hondaka","model":"Ellen"},{"make":"Moto Tourismo","model":"Delta 16"},{"make":"Moto Tourismo","model":"Delta 4"},{"make":"Julio Mechannica","model":"Mark 2"}]},{"name":"Carographic","cars":[{"make":"Hondaka","model":"Elisa"},{"make":"Hondaka","model":"Elisa"},{"make":"Julio Mechannica","model":"Mark 4"},{"make":"Julio Mechannica","model":"Mark 2"},{"make":"Moto Tourismo"},{"make":"Julio Mechannica","model":"Mark 4"}]},{"cars":[{"make":"Moto Tourismo","model":"Delta 4"}]}]

  if(!arr.map) return ""
  let carsArr = _.chain(arr).map((show)=> {
    return _.map(show.cars, (car) => {
        let carobj = {make:car.make, model:car.model, showname:""};
        carobj.showname = show.name; 
        return carobj})
  }).flatten().value();

  let makes = _.groupBy(_.sortBy(carsArr, "make"), "make");
  _.each(makes, (make, makeKey) => {
    let models = _.groupBy(_.sortBy(make,"model"), "model")
    models = _.chain(models).keys().map(key=>models[key]).value()
    //console.log(models);
    makes[makeKey] = {'model':_.groupBy(_.sortBy(make,"model"), "model")};
    _.each(makes[makeKey].model, (model, key) => {
        let shownames = _.chain(model).groupBy("showname").keys().without("","undefined").value().sort()
        console.log("showname")
        shownames = _.map(shownames,name=>{return {'name':name}});
        console.log(shownames)
        makes[makeKey].model[key] = {'shows':shownames};
        if(key == "" || key == "undefined"){
          var shows = makes[makeKey].shows;
          shows = shows && shows.length? shows:[]
          shows.push(shownames)
          makes[makeKey].shows = shows
          delete makes[makeKey].model[key]
        }
    });
  });
  //console.log(_.chain(makes).keys().value())

  //console.log(makes);

  makes = _.chain(makes).keys().map(makeName=> {
    let data = {}
    if(makes[makeName].shows)
    {
      data.children = makes[makeName].shows
    }
    let models = _.chain(makes[makeName].model).keys().map(modelName=>{
      let model = {}
      model.name = modelName
      model.children = makes[makeName].model[modelName].shows
      //console.log(model.shows)
      return model
    }).value()
    data.name = makeName
    if(models.length)
    data.children = models
    if(makes.shows){
      data.children = makes.shows
    }
    return data
  }).value()
  let data = {makes:makes};
  console.log(JSON.stringify(data));

  //console.log(data.make.Hondaka.model.Elisa.shows)
  
  return JSON.parse(JSON.stringify(data));
}
