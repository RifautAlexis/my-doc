import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injectable, Input, OnInit, Output, inject } from '@angular/core';

@Injectable({providedIn: 'root'})
@Component({
  selector: 'my-test',
  standalone: true,
  templateUrl: './my-test.component.html',
  styleUrls: ['./my-test.component.scss'],
  imports: [CommonModule],
})
export class MyTestComponent implements OnInit {

  @Input({required: true}) myInput: number = 0;

  @Output() myOutput: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    console.log('CONSTRUCTOR');
  }

  ngOnInit() {
    console.log('ON INIT');
  }

  myFunction(myString: string, myNumber: number): number {
    console.log('MY FUNCTION', myString, myNumber);
    return 55;
  }
}
