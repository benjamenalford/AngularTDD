import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutModule } from '../../../node_modules/@angular/cdk/layout';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
} from '../../../node_modules/@angular/material';
import { BrowserAnimationsModule } from '../../../node_modules/@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
  , exports: [
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
})
export class SharedModule { }
