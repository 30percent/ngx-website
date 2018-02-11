import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//material imports
import { 
  MatButtonModule, 
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule
  ],
  declarations: []
})
export class CustomMaterialModule { }
