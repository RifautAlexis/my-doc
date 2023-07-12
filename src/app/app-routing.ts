import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':component',
    loadComponent: () => import("./renderer/doc/doc.component").then(comp => comp.DocComponent),
  },
  {
    path: '**',
    loadComponent: () => import("./renderer/doc/doc.component").then(comp => comp.DocComponent),
  },
];
