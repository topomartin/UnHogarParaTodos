import { NgModule } from "@angular/core";
import { HomeComponent } from "./component/home.component";
import { SwiperCustomModule } from "../swiper/swiper.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SwiperCustomModule],
  exports: []
})
export class HomepageModule {}
