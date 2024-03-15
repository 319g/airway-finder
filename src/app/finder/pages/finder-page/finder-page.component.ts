import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutesService } from '../../services/routes.service';
import { ValidatorsService } from '../../services/validators.service';
import { Route } from '../../interfaces/route.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'finder-finder-page',
  templateUrl: './finder-page.component.html'
})
export class FinderPageComponent implements OnInit {

  public selectedRoute?: Route;

  public selectedEntryPoint?: string;
  public selectedEntrySuggestions: string[] = [];
  public selectedExitPoint?: string;
  public selectedExitSuggestions: string[] = [];

  public myForm: FormGroup = this.fb.group({
    entryPoint: ['', [Validators.required, this.validatorService.routesAreLoaded]],
    exitPoint: ['', [Validators.required, this.validatorService.routesAreLoaded]]
  });

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private routesService: RoutesService
  ) { }

  get entryPoint(): string {

    return this.myForm.value['entryPoint'];
  }

  get exitPoint(): string {

    return this.myForm.value['exitPoint'];
  }

  ngOnInit(): void {

    this.myForm.reset();
    this.routesService.loadSavedRoutes();
  }

  public getFieldError(field: string): string | null {

    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};
    for(const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Campo obligatório';

        case 'routesNotLoaded':
          return 'No hay ningún archivo de rutas cargado';
      }
    }

    return null;
  }

  public onResetForm(): void {

    this.myForm.reset();
  }

  public searchEntryPoint() {

    const value = this.myForm.controls['entryPoint'].value;
    const search = new RegExp(value, 'i');
    const suggestions = this.routesService.routes
      .filter(route => search.test(route.PUNTO_FINAL))
      .map(route => route.PUNTO_FINAL);

    this.selectedEntrySuggestions = [...new Set(suggestions)];
  }

  public searchExitPoint() {

    const value = this.myForm.controls['exitPoint'].value;
    const search = new RegExp(value, 'i');
    const suggestions = this.routesService.routes
      .filter(route => search.test(route.PUNTO_FINAL))
      .map(route => route.PUNTO_FINAL);

    this.selectedExitSuggestions = [...new Set(suggestions)];
  }

  public onSelectedEntry(event: MatAutocompleteSelectedEvent): void {
    if(!event.option.value) {
      this.selectedEntryPoint = undefined;
      return;
    }

    const option = event.option.value;
    this.myForm.controls['entryPoint'].setValue(option);
    this.selectedEntryPoint = option;
  }

  public onSelectedExit(event: MatAutocompleteSelectedEvent): void {
    if(!event.option.value) {
      this.selectedExitPoint = undefined;
      return;
    }

    const option = event.option.value;
    this.myForm.controls['exitPoint'].setValue(option);
    this.selectedExitPoint = option;
  }

  public onSubmit(): void {

    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const resp = this.routesService.findRoute(this.entryPoint, this.exitPoint);
    if(!resp) return;

    this.selectedRoute = resp;
  }

}
