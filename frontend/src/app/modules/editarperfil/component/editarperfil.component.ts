import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthenticationService, IUser } from '../../../services/authentication.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.scss'],
  standalone: false
})
export class EditarPerfilComponent implements OnInit {

  public editForm!: FormGroup;
  public user!: IUser;

  public hidePassword = true;
  public hideConfirmPassword = true;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    this.user = currentUser;

    this.editForm = new FormGroup({
      username: new FormControl(this.user.username, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl('', Validators.minLength(6)),
      confirmPassword: new FormControl(''),
    }, { validators: this.passwordsMatch });
  }

  // Validación de contraseñas iguales
  passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    if (pass && confirm && pass !== confirm) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (!this.editForm.valid) return;

    const { username, email, password } = this.editForm.value;
    const updateData: Partial<IUser> = { username, email };
    if (password) updateData.password = password;

    this.authService.updateProfile(this.user.id, updateData).subscribe(
      res => {
        alert('Perfil actualizado correctamente!');
        this.router.navigate(['/perfil']);
      },
      err => {
        console.error('Error al actualizar perfil', err);
      }
    );
  }
}