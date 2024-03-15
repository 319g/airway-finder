import { Component, Input, OnInit } from '@angular/core';
import { Route } from '../../interfaces/route.interface';

@Component({
  selector: 'finder-data-display',
  templateUrl: './data-display.component.html'
})
export class DataDisplayComponent {

  @Input()
  public route?: Route

}
