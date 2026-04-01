import { Component, OnInit, signal } from "@angular/core";
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})

export class LoginComponent implements OnInit {

  public hidePassword = true;

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router   // <- nombre exacto "router"
  ) {}

  ngOnInit(): void {}
  /**
   *
   * @returns value of hidePassword
   */
  hide() {
    return this.hidePassword;
  }

  /**
   *
   * @param event
   */
  clickEvent(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
      this.authenticationService.login(this.loginForm.value as any).subscribe(
        result=>{
          this.router.navigate(['/perfil']);
        }
      )
    }
  }
  
goToRegister() {
    this.router.navigate(['/register']);   // <-- Redirige al componente Register
  }

  onCancel() {
    this.loginForm.reset();
  }
}
