import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ]
})
export class MaterialModule { }
