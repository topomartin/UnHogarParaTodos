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
    role: new FormControl('', Validators.required)
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
    if (this.registerForm.valid) {
      console.log('Login data:', this.registerForm.value);
      this.authenticationService.login(this.registerForm.value as any).subscribe(
        result=>{
          console.log('aquí ha pasado algo');
        }
      )
    }
  }
    
}