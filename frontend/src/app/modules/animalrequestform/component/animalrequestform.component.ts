import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-animalrequestform',
  templateUrl: './animalrequestform.component.html',
  styleUrls: ['./animalrequestform.component.scss'],
  standalone: false
})
export class AnimalRequestFormComponent implements OnInit {

  form!: FormGroup;
  animalId!: number;
  type!: 'ADOPTION' | 'FOSTERING';
  animalName = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.animalId = Number(this.route.snapshot.paramMap.get('id'));
    this.type = this.route.snapshot.paramMap.get('type') as any;

    // animal info
    this.apiService.get('animal/' + this.animalId).subscribe((animal: any) => {
      this.animalName = animal.name;
    });

    this.form = new FormGroup({

      // USER PROFILE
      fullname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      age: new FormControl(null, Validators.required),
      address: new FormControl('', Validators.required),

      housing_type: new FormControl('', Validators.required),
      square_meters: new FormControl(null, Validators.required),

      has_garden: new FormControl(false),
      has_terrace: new FormControl(false),

      has_other_animals: new FormControl(false),
      experience: new FormControl(false),

      available_time: new FormControl(''),
      max_animals: new FormControl(''),

      lifestyle: new FormControl(''),
      noise_tolerance: new FormControl(''),
      time_at_home: new FormControl(''),

      motivation: new FormControl('', Validators.required),
    });
  }

  private cleanPayload(data: any) {
    const cleaned: any = {};

    Object.keys(data).forEach(key => {
      const value = data[key];

      if (
        value !== '' &&
        value !== null &&
        value !== undefined
      ) {
        cleaned[key] = value;
      }
    });

    return cleaned;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const user = this.authService.getCurrentUser();

    if (!user?.id) {
      this.router.navigate(['/login']);
      return;
    }

    const rawData = {
      userId: user.id,
      ...this.form.value,

      age: Number(this.form.value.age),
      square_meters: Number(this.form.value.square_meters),
      max_animals: this.form.value.max_animals
        ? Number(this.form.value.max_animals)
        : undefined
    };

    const profilePayload = this.cleanPayload(rawData);

    // USER PROFILE
    this.apiService.post(`user-profile/${user.id}/upsert`, profilePayload).subscribe({
      next: () => {

        // ANIMAL REQUEST
        const requestPayload = {
          user_id: user.id,
          animal_id: this.animalId,
          type: this.type === 'ADOPTION' ? 'adoption' : 'foster'
        };

        this.apiService.post('animal-requests/create', requestPayload).subscribe({
          next: () => {
            alert('Solicitud enviada correctamente');
            this.router.navigate(['/listaanimal']);
          },
          error: (err) => console.error(err)
        });

      },
      error: (err) => console.error(err)
    });
  }
}
