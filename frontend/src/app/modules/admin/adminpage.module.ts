import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './page/adminpage.component';
import { MaterialModule } from '../../material.module';
import { NgModule } from '@angular/core';
import { InnerTabComponent } from './components/innertab.component/innertab.component'
import { DeleteDialogComponent } from './components/delete.dialog.component/delete.dialog.component';
import { CreateUpdateDialogComponent } from './components/create-update.dialog.component/create-update.dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewImageDialogComponent } from './components/view-image.dialog.componet/viewImage.dialog.component';
import { SwiperCustomModule } from '../swiper/swiper.module';

@NgModule({
  declarations: [
    AdminPageComponent,
    InnerTabComponent,
    DeleteDialogComponent,
    CreateUpdateDialogComponent,
    ViewImageDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SwiperCustomModule
  ],
  exports: [AdminPageComponent]
})
export class AdminModule {}
