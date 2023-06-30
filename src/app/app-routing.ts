import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./views/home/home.component").then(comp => comp.HomeComponent),
  },
  {
    path: ':component',
    loadComponent: () => import("./views/doc/doc.component").then(comp => comp.DocComponent),
  },
];
