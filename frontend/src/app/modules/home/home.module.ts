import { NgModule } from "@angular/core";
import { HomeComponent } from "./component/home.component";
import { SwiperCustomModule } from "../swiper/swiper.module";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SwiperCustomModule, TranslateModule],
  exports: []
})
export class HomepageModule {}
