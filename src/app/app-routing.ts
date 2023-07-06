import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':component',
    loadComponent: () => import("./views/doc/doc.component").then(comp => comp.DocComponent),
  },
  {
    path: '**',
    loadComponent: () => import("./views/doc/doc.component").then(comp => comp.DocComponent),
  },
];
