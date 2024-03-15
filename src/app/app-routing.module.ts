import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'airway-finder',
    loadChildren: () => import('./finder/finder.module').then(m => m.FinderModule)
  },
  {
    path: '**',
    redirectTo: 'airway-finder'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
