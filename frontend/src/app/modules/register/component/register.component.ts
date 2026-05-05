import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent implements OnInit {

  public hidePassword = true;
  public hideConfirmPassword = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  // 🔥 VALIDATOR PASSWORD MATCH CORREGIDO
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;

    if (!password || !confirm) return null;

    return password === confirm ? null : { passwordMismatch: true };
  }

  public registerForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        this.passwordStrengthValidator
      ]),

      confirmPassword: new FormControl('', Validators.required),

      gdpr_consent: new FormControl(false, Validators.requiredTrue)
    },
    { validators: this.passwordMatchValidator }
  );

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-]/.test(value);

    if (!value) return null;

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      return { pattern: true };
    }

    return null;
  }

  // 🔥 PASSWORD VÁLIDA (para mostrar confirm password)
  isPasswordValid(): boolean {
    return this.registerForm.get('password')?.valid ?? false;
  }

  // TOGGLES
  togglePassword(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPassword(event: Event) {
    event.preventDefault();
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  isInvalid(controlName: string, error?: string): boolean {
    const control = this.registerForm.get(controlName);

    if (!control) return false;

    const isTouched = control.touched || control.dirty;

    return error
      ? control.hasError(error) && isTouched
      : control.invalid && isTouched;
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { confirmPassword, ...data } = this.registerForm.value;

    this.authenticationService.register(data as any).subscribe(
      result => {
        console.log('Usuario creado', result);

        this.authenticationService.login({
          username: this.registerForm.value.username!,
          password: this.registerForm.value.password!
        }).subscribe({
          next: () => this.router.navigate(['/home']),
          error: err => console.error(err)
        });
      },
      error => console.error('Error en registro', error)
    );
  }
}