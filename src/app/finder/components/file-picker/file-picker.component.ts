import { Component, EventEmitter, Output } from '@angular/core';
import { Fix } from '../../interfaces/fix.interface';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'finder-file-picker',
  templateUrl: './file-picker.component.html'
})
export class FilePickerComponent {

  @Output()
  routesEmiter = new EventEmitter<Fix[]>();

  public routes: Fix[] = [];

  constructor(
    private csvService: RoutesService
  ) {}

  public onFileSelected(): void {

    const input = document.getElementById('fileInput') as HTMLInputElement;

    if(!input.files) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;

      this.csvService.saveCsv(text);
    };
    reader.readAsText(input.files[0]);
  }

}
