import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-my-chips',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './my-chips.component.html',
  styleUrls: ['./my-chips.component.scss']
})
export class MyChipsComponent {
  @Input() label: string = '';
}
