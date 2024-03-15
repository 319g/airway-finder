import { Injectable } from '@angular/core';
import { Route } from '../interfaces/route.interface';

@Injectable({providedIn: 'root'})
export class RoutesService {

  private _routes: Route[] = [];

  constructor() { }

  get routes (): Route[] {
    return [...this._routes]
  }

  public saveCsv(csvText: string): void {

    const lines = csvText.split('\n');
    const headers = lines[0].split(';');
    const routes: Route[] = [];


    for(let i = 1; i < lines.length; i++) {
      let obj: Partial<Route> = {};
      const currentLine = lines[i].split(';');

      headers.forEach((header, index) => {
        obj[header as keyof Route] = currentLine[index];
      });

      routes.push(obj as Route);
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

  public findRoute(entryPoint: string, exitPoint: string) {

    const entryItems = this.routes.filter(route => route.PUNTO_INICIO === entryPoint);
    const exitItems = this.routes.filter(route => route.PUNTO_FINAL === exitPoint);

    let entry: Route;
    let exit: Route;

    entryItems.find(entryItem => {

      const match = exitItems.find(exitItem => {
        if(entryItem.DESIGNATOR_TXT === exitItem.DESIGNATOR_TXT) {
          exit = exitItem;
          return true;
        }

        return false;
      });

      if(match) {
        entry = entryItem;
        return true;
      }
      return false;
    });

    console.log(entryItems)
    console.log(exitItems)
    console.log(entry!)
    console.log(exit!)
  }

}
