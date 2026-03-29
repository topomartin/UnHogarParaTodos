import { NgModule } from "@angular/core";

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatListModule,
    MatMenuModule
  ],
  exports:[MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatListModule,
    MatMenuModule
  ]
})
export class MaterialModule {}
