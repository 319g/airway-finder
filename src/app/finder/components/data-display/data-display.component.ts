import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Direction, Route } from '../../interfaces/route.interface';
import { Fix } from '../../interfaces/fix.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'finder-data-display',
  templateUrl: './data-display.component.html'
})
export class DataDisplayComponent implements OnChanges {

  @Input()
  public route?: Route;

  public entryFix?: Fix;
  public exitFix?: Fix;
  public dataSource?: any
  public displayedColumns: string[] = ['airwayName', 'entryFixName', 'exitFixName', 'flightLevel', 'evenOrOdd'];

  ngOnChanges(): void {

    this.entryFix = this.route?.path[0];
    this.exitFix = this.route?.path.at(-1);
    this.dataSource = new MatTableDataSource([{
      airwayName: this.entryFix?.DESIGNATOR_TXT,
      entryFixName: this.getEntryFix(),
      exitFixName: this.getExitFix(),
      flightLevel: `FL${this.entryFix?.DISTVERTLOWER_VAL} - FL${this.entryFix?.DISTVERTUPPER_VAL}`,
      evenOrOdd: this.getFlEvenOrOdd()
    }]);
  }

  private getEntryFix() {

    if(this.route?.direction === Direction.FORWARD) return this.entryFix?.PUNTO_FINAL;
    return this.exitFix?.PUNTO_FINAL;
  }

  private getExitFix() {

    if(this.route?.direction === Direction.FORWARD) return this.exitFix?.PUNTO_FINAL;
    return this.entryFix?.PUNTO_FINAL;
  }

  private getFlEvenOrOdd() {

    if(this.route?.isEven) return 'Par';
    return 'Impar';
  }

}
