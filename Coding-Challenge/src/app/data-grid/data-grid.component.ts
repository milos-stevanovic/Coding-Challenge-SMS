import { Component, OnInit } from '@angular/core';
import {DataGridService} from "./data-grid.service";
import {JsonModel} from "./json.model";
import {Sort} from "@angular/material";

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
  providers: [DataGridService]
})
export class DataGridComponent implements OnInit {
  private gridIsLoaded = false; // TODO: After grid is loaded show gridview in meanwhile show "Grid is loading"
  public dataSource: JsonModel[];
  private defaultSource: JsonModel[];


  constructor(private dataService: DataGridService) { } //impalement data service. We can also transfer data to other components. But it is small application we can use Input(), Output() EventEmitter

  ngOnInit() {
    //populate dataSource from json file onInit
    fetch('assets/data.json')
      .then(result => result.json())
      .then(rowData => this.dataSource = this.defaultSource = rowData );
  }

  //Method for sorting selected column
  sortData(sort: Sort) {
    const data = this.dataSource.slice(); //Give same new object with slice()
    if (!sort.active || sort.direction === '') {
      this.dataSource = this.defaultSource; //Sort is in default mode
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'city': return this.compare(a.city, b.city, isAsc);
        case 'start_date': return this.compareDates(a.start_date, b.start_date, isAsc);
        case 'end_date': return this.compareDates(a.end_date, b.end_date, isAsc);
        case 'price': return this.compare(a.price, b.price, isAsc);
        case 'status': return this.compare(a.status, b.status, isAsc);
        case 'color': return this.compare(a.color, b.color, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string , b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareDates(a: Date , b: Date, isAsc: boolean){
    const dateA = new Date(a);
    const dateB = new Date(b);
    return (dateA.getTime() < dateB.getTime() ? -1 : 1) * (isAsc ? 1 : -1);
  }

  //Filter gridSource with selected dates TODO: Create filter condition builder
  filterGridData(selectedDates){
    // Both date selectors is passed to method
    if(selectedDates.start_date && selectedDates.end_date){
      const selectedStartDate = new Date (selectedDates.start_date);
      const selectedEndDate = new Date (selectedDates.end_date);
      this.dataSource = this.defaultSource.filter( (dates) => {
        const startDate = new Date(dates.start_date);
        const endDate = new Date(dates.end_date);
        return selectedEndDate.getTime() == endDate.getTime() && selectedStartDate.getTime() == startDate.getTime();
      });

    }else if(selectedDates.start_date ){
      // Start date selectors is passed to method
      const selectedStartDate = new Date (selectedDates.start_date);
      this.dataSource = this.defaultSource.filter( (dates) => {
        const startDate = new Date(dates.start_date);
        return selectedStartDate.getTime() == startDate.getTime();
      });
    }else if(selectedDates.end_date){
      // End date selectors is passed to method
      const selectedEndDate = new Date (selectedDates.end_date);
      this.dataSource = this.defaultSource.filter( (dates) => {
        const endDate = new Date(dates.end_date);
        return selectedEndDate.getTime() == endDate.getTime()
      });
    }else{ this.dataSource = this.defaultSource }//no filter is selected: Could use validation on date pickers to remove this method
  }

  //Clear Data source to default values
  clearGridData(){
    this.dataSource = this.defaultSource;
  }

  //TODO: Create pagination for data grid-view
}
