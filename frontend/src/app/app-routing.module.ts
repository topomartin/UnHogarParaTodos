import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/component/login.component';
import { RegisterComponent } from './modules/register/component/register.component';
import { VerPerfilComponent } from './modules/VerPerfil/component/verperfil.component';
import { EditarPerfilComponent } from './modules/editarperfil/component/editarperfil.component';
import { ListaAnimalComponent } from "./modules/listaanimal/component/listaanimal.component";
import { DetalleAnimalComponent } from "./modules/detallesanimal/component/detalleanimal.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'listaanimal', component: ListaAnimalComponent },
  { path: 'infoanimal/:id', component: DetalleAnimalComponent },
  { path: 'profile', component: VerPerfilComponent },
  { path: 'edit-profile', component: EditarPerfilComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
