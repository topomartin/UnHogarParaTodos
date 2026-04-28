import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './page/adminpage.component';
import { MaterialModule } from '../../material.module';
import { NgModule } from '@angular/core';
import { InnerTabComponent } from './components/innertab.component/innertab.component'

@NgModule({
  declarations: [AdminPageComponent, InnerTabComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [AdminPageComponent]
})
export class AdminModule {}
