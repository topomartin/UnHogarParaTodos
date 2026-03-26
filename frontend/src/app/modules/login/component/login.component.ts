import { Component, OnInit, signal } from "@angular/core";
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

  constructor(private authenticationService: AuthenticationService){}

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
          console.log('aquí ha pasado algo');
        }
      )
    }
  }

  onCancel() {
    this.loginForm.reset();
  }
}
