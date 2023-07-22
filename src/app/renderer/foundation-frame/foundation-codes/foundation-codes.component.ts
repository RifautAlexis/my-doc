import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'foundation-codes',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './foundation-codes.component.html',
  styleUrls: ['./foundation-codes.component.scss']
})
export class FoundationCodesComponent {
  
  private _filesCode : Record<string, string> = {};

  @Input({required: true})
  public get filesCode() : Record<string, string> {
    return this._filesCode;
  }
  public set filesCode(data : Record<string, string>) {
    this._filesCode = data;
    this.filesNames = Object.keys(data);
  }

  filesNames: string[] = [];
  
}
