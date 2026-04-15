import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-registerfoster',
  templateUrl: './registerfoster.component.html',
  styleUrls: ['./registerfoster.component.scss'],
  standalone: false
})
export class RegisterFosterComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({

      // 👤 Datos personales
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),

      // 🏠 Vivienda
      homeType: new FormControl('', Validators.required),
      sizeM2: new FormControl('', Validators.required),
      hasGarden: new FormControl('', Validators.required),
      hasTerrace: new FormControl('', Validators.required),

      // 🐾 Animales
      hasAnimals: new FormControl('', Validators.required),
      animalsDetails: new FormControl(''),

      // 🏡 Experiencia foster
      hasFosterExperience: new FormControl('', Validators.required),
      fosterExperienceDetails: new FormControl(''),

      // ⏱️ Disponibilidad
      availabilityTime: new FormControl('', Validators.required),
      maxAnimals: new FormControl('', Validators.required),

      // ❤️ Motivación
      motivation: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.apiService.post('foster/create', this.form.value).subscribe(
      () => {
        alert('Solicitud de casa de acogida enviada');
        this.router.navigate(['/']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}