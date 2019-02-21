import {Component, EventEmitter, Input, Output} from '@angular/core';
import {JsonModel} from "../json.model";
import {Sort} from "@angular/material";


@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent  {

  @Input() dataGridViewSource: JsonModel[] ;
  @Output('matSortChange') sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();

  //emit sort event with sorting values to parent data-grid component
  sortChangeAction(event){
    this.sortChange.emit(event);
  }
  constructor() {

  }



}
