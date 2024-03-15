import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  constructor() { }

  public routesAreLoaded(): ValidationErrors | null {

    const routes = localStorage.getItem('routes');

    if(!routes) return {
      routesNotLoaded: true
    };

    return null
  }

}
