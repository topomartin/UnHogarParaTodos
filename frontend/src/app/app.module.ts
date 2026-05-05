import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { HomeComponent } from './modules/home/component/home.component';
import { LoginComponent } from './modules/login/component/login.component';
import { RegisterComponent } from './modules/register/component/register.component';
import { VerPerfilComponent } from './modules/VerPerfil/component/verperfil.component';
import { EditarPerfilComponent } from './modules/editarperfil/component/editarperfil.component';
import { ListaAnimalComponent } from './modules/listaanimal/component/listaanimal.component';
import { DetalleAnimalComponent } from './modules/detallesanimal/component/detalleanimal.component';
import { AnimalRequestFormComponent } from './modules/animalrequestform/component/animalrequestform.component';
import { AdoptarAnimalComponent } from './modules/adoptaranimal/component/adoptaranimal.component';
import { RegisterFosterComponent } from './modules/registerfoster/component/registerfoster.component';
import { SponsorAnimalComponent } from './modules/sponsor-animal/component/sponsor-animal.component';
import { ContactComponent } from './modules/appcontact/component/appcontact.component';
import { TestComponent } from './modules/test/component/test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationMenuComponent } from './modules/shared/navigation-menu.component/navigation-menu.component';
import { NavigationBarComponent } from './modules/shared/navigation-bar/navigation-bar.component';
import { FooterComponent } from './modules/shared/footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './modules/admin/adminpage.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VerPerfilComponent,
    EditarPerfilComponent,
    ListaAnimalComponent,
    DetalleAnimalComponent,
    AdoptarAnimalComponent,
    RegisterFosterComponent,
    SponsorAnimalComponent,
    ContactComponent,
    NavigationMenuComponent,
    NavigationBarComponent,
    FooterComponent,
    HomeComponent,
    AnimalRequestFormComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    AdminModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
