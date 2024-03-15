import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinderPageComponent } from './pages/finder-page/finder-page.component';

const routes: Routes = [
  {
    path: '',
    component: FinderPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinderRoutingModule { }
