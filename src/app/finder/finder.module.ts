import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinderRoutingModule } from './finder-routing.module';
import { FinderPageComponent } from './pages/finder-page/finder-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FilePickerComponent } from './components/file-picker/file-picker.component';


@NgModule({
  declarations: [
    FinderPageComponent,
    FilePickerComponent
  ],
  imports: [
    CommonModule,
    FinderRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class FinderModule { }
