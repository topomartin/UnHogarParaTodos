import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/component/home.component';
import { LoginComponent } from './modules/login/component/login.component';
import { RegisterComponent } from './modules/register/component/register.component';
import { VerPerfilComponent } from './modules/VerPerfil/component/verperfil.component';
import { EditarPerfilComponent } from './modules/editarperfil/component/editarperfil.component';
import { ListaAnimalComponent } from "./modules/listaanimal/component/listaanimal.component";
import { DetalleAnimalComponent } from "./modules/detallesanimal/component/detalleanimal.component";
import { AdoptarAnimalComponent } from "./modules/adoptaranimal/component/adoptaranimal.component";
import { RegisterFosterComponent } from "./modules/registerfoster/component/registerfoster.component";
import { SponsorAnimalComponent } from './modules/sponsor-animal/component/sponsor-animal.component';
import { ContactComponent } from './modules/appcontact/component/appcontact.component';
import { AdminPageComponent } from './modules/admin/page/adminpage.component';
import { AnimalRequestFormComponent } from './modules/animalrequestform/component/animalrequestform.component';
import { PrivacyPolicyComponent } from './modules/privacy-policy/privacy-policy';
import { TestComponent } from './modules/test/component/test.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'infoanimal/:id', component: DetalleAnimalComponent },
  { path: 'profile', component: VerPerfilComponent },
  { path: 'edit-profile', component: EditarPerfilComponent },
  { path: 'adopt/:id', component: AdoptarAnimalComponent },
  { path: 'sponsor/:id', component: SponsorAnimalComponent },
  { path: 'animal-request/:id/:type', component: AnimalRequestFormComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'test', component: TestComponent },

  // Paginas a ver en menu-nav
  {
    path: 'home',
    component: HomeComponent,
    data: {
      icon: 'home',
      showInMenu: true
      // roles: ['USER', 'ADMIN', 'WORKER'] // Limitar a dichos roles, por defecto se muestra sin log
    }
  },
  {
    path: 'listaanimal',
    component: ListaAnimalComponent,
    data: { // Se quita title ya que se usara el i18n para mostrar el texto con path
      icon: 'pets',
      showInMenu: true
      // roles: ['USER', 'ADMIN', 'WORKER'] // Limitar a dichos roles, por defecto se muestra sin log
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      icon: 'mail',
      showInMenu: true
    }
  },
  {
    path: 'test',
    component: TestComponent,
    data: {
      icon: 'fact_check',
      showInMenu: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
