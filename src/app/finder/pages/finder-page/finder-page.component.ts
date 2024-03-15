import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutesService } from '../../services/routes.service';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'finder-finder-page',
  templateUrl: './finder-page.component.html'
})
export class FinderPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    entryPoint: ['', [Validators.required]],
    exitPoint: ['', [Validators.required]]
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

  public onSubmit(): void {

    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.routesService.findRoute(this.entryPoint, this.exitPoint);
  }

}
