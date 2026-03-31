import { Component, OnInit, signal } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-verperfil',
  templateUrl: './verperfil.component.html',
  styleUrls: ['./verperfil.component.scss'],
  standalone: false
})

export class VerPerfilComponent implements OnInit {

ngOnInit(): void {}

constructor(private router: Router) {}

editarPerfil() {
  console.log('Ir a editar perfil');
  this.router.navigate(['/editperfil']);
}

}