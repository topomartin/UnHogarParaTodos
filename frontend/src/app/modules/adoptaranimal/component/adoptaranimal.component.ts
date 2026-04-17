import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-adoptaranimal',
  templateUrl: './adoptaranimal.component.html',
  styleUrls: ['./adoptaranimal.component.scss'],
  standalone: false
})
export class AdoptarAnimalComponent implements OnInit {

  public form!: FormGroup;
  public animalId!: number;
  public animalName: string = '';
  public loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.animalId = Number(this.route.snapshot.paramMap.get('id'));

    // 🔥 traer nombre del animal
    this.apiService.get('animal/' + this.animalId).subscribe((animal: any) => {
      this.animalName = animal.name;
    });

    this.form = new FormGroup({

      // 👤 Datos personales
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),

      address: new FormControl('', Validators.required),
      floor: new FormControl(''),   // opcional
      door: new FormControl(''),    // opcional

      hasJob: new FormControl('', Validators.required),
      job: new FormControl(''),

      // 🧑‍🤝‍🧑 Situación personal
      peopleInHome: new FormControl('', Validators.required),
      agesOfPeople: new FormControl('', Validators.required),
      relationship: new FormControl('', Validators.required),
      allergies: new FormControl('', Validators.required),

      // 🏠 Domicilio
      homeType: new FormControl('', Validators.required),
      sizeM2: new FormControl('', Validators.required),
      movingSoon: new FormControl('', Validators.required),
      outdoorSpace: new FormControl('', Validators.required),

      // 🐾 Motivación y experiencia con animales
      reasonAdoption: new FormControl('', Validators.required),
      hasOtherAnimals: new FormControl('', Validators.required),
      otherAnimalsCount: new FormControl(''),
      hadAnimalsBefore: new FormControl('', Validators.required),
      whatHappenedPreviousAnimals: new FormControl('')

    });
  }

  onSubmit() {
  if (this.form.invalid) return;

  const user = this.authService.getCurrentUser();

  // 🔒 si no está logeado
  if (!user || !user.id) {
    alert('Debes iniciar sesión');
    this.router.navigate(['/login']);
    return;
  }

  const data = {
    animal_id: this.animalId,
    user_id: user.id,
    status: 'pending',
    formData: this.form.value
  };

  this.apiService.post('adoption/create', data).subscribe(
    () => {
      alert('Solicitud enviada correctamente');
      this.router.navigate(['/listaanimal']);
    },
    (error) => {
      console.error(error);
    }
  );
}
}