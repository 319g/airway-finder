import { Injectable } from '@angular/core';
import { Route } from '../interfaces/route.interface';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  constructor() { }

  public routesAreLoaded(control: FormControl): ValidationErrors | null {

    const routes = control.value;
    console.log(routes)

    if(!routes || routes.length <= 0) return {
      routesNotLoaded: true
    };

    return null
  }

}
