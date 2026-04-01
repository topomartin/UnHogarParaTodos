import { Component, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})

export class RegisterComponent implements OnInit {

  public hidePassword = true;

  public registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    gdpr_consent: new FormControl(false, Validators.requiredTrue)
  });

  constructor(private authenticationService: AuthenticationService){}

  ngOnInit(): void {}

  hide() {
    return this.hidePassword;
  }

  clickEvent(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {

      this.authenticationService.register(this.registerForm.value as any).subscribe(
        result => {
          console.log('Usuario creado', result);

          // 🔥 auto login opcional
          this.authenticationService.login({
            username: this.registerForm.value.username!,
            password: this.registerForm.value.password!
          }).subscribe();
        },
        error => {
          console.error('Error en registro', error);
        }
      );
    }
  }
}