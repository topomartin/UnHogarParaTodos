import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './page/adminpage.component';
import { MaterialModule } from '../../material.module';
import { NgModule } from '@angular/core';
import { InnerTabComponent } from './components/innertab.component/innertab.component'
import { DeleteDialogComponent } from './components/delete.dialog.component/delete.dialog.component';
import { CreateUpdateDialogComponent } from './components/create-update.dialog.component/create-update.dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminPageComponent,
    InnerTabComponent,
    DeleteDialogComponent,
    CreateUpdateDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [AdminPageComponent]
})
export class AdminModule {}
