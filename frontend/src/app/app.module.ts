import { NgModule } from "@angular/core";
import { AppComponent } from './app.component';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material.module";
import { LoginComponent } from "./modules/login/component/login.component";
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationMenuComponent } from "./modules/shared/navigation-menu.component/navigation-menu.component";
import { NavigationBarComponent } from "./modules/shared/navigation-bar/navigation-bar.component";
import { CommonModule } from "@angular/common";



@NgModule({
  declarations:[AppComponent, LoginComponent, NavigationMenuComponent , NavigationBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  bootstrap:[AppComponent]
})
export class AppModule {}
