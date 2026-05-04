import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './page/adminpage.component';
import { MaterialModule } from '../../material.module';
import { NgModule } from '@angular/core';
import { InnerTabComponent } from './components/innertab.component/innertab.component'
import { DeleteDialogComponent } from './components/delete.dialog.component/delete.dialog.component';

@NgModule({
  declarations: [AdminPageComponent, InnerTabComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [AdminPageComponent]
})
export class AdminModule {}
