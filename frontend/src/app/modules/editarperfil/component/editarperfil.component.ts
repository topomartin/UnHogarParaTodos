import { Component, OnInit, signal } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.scss'],
  standalone: false
})

export class EditarPerfilComponent implements OnInit {

ngOnInit(): void {}

constructor(private router: Router) {}

user = {
  username: '',
  email: '',
  password: '',
  role: 'USER'
};

guardarCambios() {
  console.log('Datos guardados (temporal):', this.user);

  // 🔁 Redirige al perfil
  this.router.navigate(['/perfil']);
}

}