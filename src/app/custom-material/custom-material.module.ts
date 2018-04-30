import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//material imports
import { 
  MatButtonModule, 
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatMenuModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
  ],
  declarations: []
})
export class CustomMaterialModule { }
