import {Component, EventEmitter, Input, Output, QueryList, ViewChildren} from '@angular/core';

import {JsonModel} from "../json.model";
import {Sort} from "@angular/material";


@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent  {

  @Input() dataGridViewSource: JsonModel[];
  @Output('matSortChange') sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();
  @ViewChildren('rows') rows: QueryList<any>;
  private isRendered = false;

  //emit sort event with sorting values to parent data-grid component
  sortChangeAction(event){
    this.sortChange.emit(event);
  }
  constructor() {}

  ngAfterViewInit() {
    // Show "Grid is populating..." On Load
    this.rows.changes.subscribe(t => {
      if(!this.isRendered)
        this.isRendered = true;
    })
  }
}
