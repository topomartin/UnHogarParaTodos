import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/component/login.component';
import { RegisterComponent } from './modules/register/component/register.component';
import { VerPerfilComponent } from './modules/VerPerfil/component/verperfil.component';
import { EditarPerfilComponent } from './modules/editarperfil/component/editarperfil.component';
import { ListaAnimalComponent } from "./modules/listaanimal/component/listaanimal.component";
import { DetalleAnimalComponent } from "./modules/detallesanimal/component/detalleanimal.component";
import { AdoptarAnimalComponent } from "./modules/adoptaranimal/component/adoptaranimal.component";
import { RegisterFosterComponent } from "./modules/registerfoster/component/registerfoster.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'infoanimal/:id', component: DetalleAnimalComponent },
  { path: 'profile', component: VerPerfilComponent },
  { path: 'edit-profile', component: EditarPerfilComponent },
  { path: 'adopt/:id', component: AdoptarAnimalComponent },
  // Paginas a ver en menu-nav
  {
    path: 'listaanimal',
    component: ListaAnimalComponent,
    data: {
      title: 'Lista Animales',
      icon: 'pets',
      showInMenu: true
      // roles: ['USER', 'ADMIN', 'WORKER'] // Limitar a dichos roles, por defecto se muestra sin log
    }
  },
  {
    path: 'registerfoster',
    component: RegisterFosterComponent,
    data: {
      title: 'Acogida',
      icon: 'home',
      showInMenu: true
      // roles: ['USER', 'ADMIN', 'WORKER'] // Limitar a dichos roles, por defecto se muestra sin log
    }
  }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
