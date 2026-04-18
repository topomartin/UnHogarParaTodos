import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

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
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({

      // 👤 Datos personales
      fullName: new FormControl('', Validators.required),
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

    const user = this.authService.getCurrentUser();

    const data = {
      user_id: user.id,

      full_name: this.form.value.fullName,
      phone: this.form.value.phone,
      age: Number(this.form.value.age),
      address: this.form.value.address,

      housing_type: this.form.value.homeType,
      square_meters: Number(this.form.value.sizeM2),

      has_garden: this.form.value.hasGarden === 'true',
      has_terrace: this.form.value.hasTerrace === 'true',

      has_other_animals: this.form.value.hasAnimals === 'true',
      has_experience: this.form.value.hasFosterExperience === 'true',

      available_time: this.form.value.availabilityTime,
      max_animals: Number(this.form.value.maxAnimals),

      motivation: this.form.value.motivation,

      status: 'pending'
    };

    this.apiService.post('foster/create', data).subscribe(
      () => {
        alert('Solicitud enviada correctamente');
        this.router.navigate(['/profile']);
      },
      (err) => console.error(err)
    );
  }
}