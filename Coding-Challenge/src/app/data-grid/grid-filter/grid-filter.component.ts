import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatInput} from "@angular/material";

@Component({
  selector: 'app-grid-filter',
  templateUrl: './grid-filter.component.html',
  styleUrls: ['./grid-filter.component.css']
})
export class GridFilterComponent implements OnInit {
  @ViewChild('input', { read: MatInput}) input: MatInput;
  @Output() filterGridFromComponent = new EventEmitter<any>();
  @Output() clearGridFromComponent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  //Emit dates values to parent data-grid component
  filterDates(startDateInput,endDateInput){
    const datesSelectedValues = { start_date : startDateInput.value , end_date : endDateInput.value };
    this.filterGridFromComponent.emit(datesSelectedValues)
  }

  //Clear dates values and emit event for to parent data-grid component and set data source to default value
  clearDates(startDateInput,endDateInput){
    startDateInput.value =  endDateInput.value = "";
    this.clearGridFromComponent.emit();
  }


}
