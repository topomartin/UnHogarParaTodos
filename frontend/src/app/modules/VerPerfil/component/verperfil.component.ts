import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthenticationService, IUser } from "../../../services/authentication.service";

@Component({
  selector: 'app-verperfil',
  templateUrl: './verperfil.component.html',
  styleUrls: ['./verperfil.component.scss'],
  standalone: false
})
export class VerPerfilComponent implements OnInit {

  public user: IUser | null = null; // usuario actual
  public loading: boolean = true;   // para controlar el estado de carga

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      console.warn('No hay usuario logueado');
      this.loading = false;
      return;
    }

    // mostrar datos de localStorage primero
    this.user = currentUser;
    this.loading = false;

    // refrescar datos desde backend
    this.authService.getUserById(currentUser.id).subscribe(
      res => this.user = res,
      err => {
        console.error('Error al cargar perfil', err);
      }
    );
  }

  editarPerfil() {
    this.router.navigate(['/editperfil']);
  }
}