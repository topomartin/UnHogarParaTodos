import { NgModule } from "@angular/core";
import { AppComponent } from './app.component';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material.module";
import { LoginComponent } from "./modules/login/component/login.component";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations:[AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  bootstrap:[AppComponent]
})
export class AppModule {}
