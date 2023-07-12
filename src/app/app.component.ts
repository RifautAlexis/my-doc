import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, MatSidenavModule, MatListModule, NgFor],
})
export class AppComponent {
  navigationItems = [
    { name: 'Button', route: '/button' },
    { name: 'Card', route: '/card' },
  ];
}
