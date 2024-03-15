import { Injectable } from '@angular/core';
import { Fix } from '../interfaces/fix.interface';
import { Direction, Route } from '../interfaces/route.interface';

@Injectable({providedIn: 'root'})
export class RoutesService {

  private _routes: Fix[] = [];

  constructor() { }

  get routes (): Fix[] {
    return [...this._routes]
  }

  public saveCsv(csvText: string): void {

    const lines = csvText.split('\n');
    const headers = lines[0].split(';');
    const routes: Fix[] = [];


    for(let i = 1; i < lines.length; i++) {
      let obj: Partial<Fix> = {};
      const currentLine = lines[i].split(';');

      headers.forEach((header, index) => {
        obj[header as keyof Fix] = currentLine[index];
      });

      routes.push(obj as Fix);
    }

    this._routes = routes;
    this.saveRoutes();
  }

  private saveRoutes(): void {

    localStorage.removeItem('routes');
    localStorage.setItem('routes', JSON.stringify(this._routes));
  }

  public loadSavedRoutes(): void {

    const routes = localStorage.getItem('routes');
    if(!routes || routes.length <= 0) return;
    this._routes = JSON.parse(routes);
  }

  public findRoute(entryPoint: string, exitPoint: string): Route | null {

    const entryItems = this.routes.filter(route => route.PUNTO_INICIO === entryPoint);
    const exitItems = this.routes.filter(route => route.PUNTO_FINAL === exitPoint);

    let entry: Partial<Fix> = {};
    let exit: Partial<Fix> = {};

    entryItems.find((entryItem) => {

      const match = exitItems.find((exitItem) => {
        if(entryItem.DESIGNATOR_TXT === exitItem.DESIGNATOR_TXT) {
          exit = exitItem as Fix;
          return true;
        }

        return false;
      });

      if(match) {
        entry = entryItem as Fix;
        return true;
      }
      return false;
    });

    if(Object.keys(entry).length == 0 || Object.keys(exit).length == 0) return null;

    const entryIndex = this.routes.indexOf(entry as Fix);
    const exitIndex = this.routes.indexOf(exit as Fix);

    if(entryIndex < 0 || exitIndex < 0) return null;

    if(entryIndex < exitIndex) {
      const fixes = this.routes.slice(entryIndex, exitIndex);
      return {
        path: fixes,
        direction: Direction.FORWARD,
        isEven: fixes[0].DIRECTION_CODE_PAR_EVEN === Direction.FORWARD
      }
    }

    const fixes = this.routes.slice(exitIndex, entryIndex);
    return {
      path: fixes,
      direction: Direction.BACKWARD,
      isEven: fixes[0].DIRECTION_CODE_PAR_EVEN === Direction.BACKWARD
    }
  }

}
