import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocComponent } from 'src/app/views/doc/doc.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DocComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
