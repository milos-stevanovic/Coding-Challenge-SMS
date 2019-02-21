import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from "@angular/router";
import { DataGridComponent } from './data-grid/data-grid.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GridFilterComponent } from './data-grid/grid-filter/grid-filter.component';
import { GridViewComponent } from './data-grid/grid-view/grid-view.component';
import {MatDatepickerModule, MatInputModule, MatNativeDateModule, MatSortModule} from "@angular/material";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import { NavigationComponent } from './navigation/navigation.component';


const appRoutes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'grid', component: DataGridComponent},
  { path: 'form-validation', component: FormValidationComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataGridComponent,
    FormValidationComponent,
    GridFilterComponent,
    GridViewComponent,
    NavigationComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    MatSortModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatInputModule
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
