import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sponsor-animal',
  templateUrl: './sponsor-animal.component.html',
  styleUrls: ['./sponsor-animal.component.scss'],
  standalone: false
})
export class SponsorAnimalComponent implements OnInit {

  form!: FormGroup;
  animalId!: number;
  animalName: string = '';
  today: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    const now = new Date();
    this.today = now.toISOString().split('T')[0];
    
    this.animalId = Number(this.route.snapshot.paramMap.get('id'));

    // obtener nombre animal
    this.apiService.get('animal/' + this.animalId).subscribe((res: any) => {
      this.animalName = res.name;
    });

    this.form = new FormGroup({
      amount: new FormControl('', Validators.required),
      frequency: new FormControl('monthly', Validators.required),
      startDate: new FormControl('', Validators.required),
      message: new FormControl('')
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const user = this.authService.getCurrentUser();

    const data = {
      user_id: user.id,
      animal_id: this.animalId,

      amount: Number(this.form.value.amount),
      message: this.form.value.message,

      // 🔥 NUEVOS CAMPOS IMPORTANTES
      frequency: this.form.value.frequency,

      startDate: this.form.value.startDate
        ? new Date(this.form.value.startDate).toISOString()
        : null
    };

    console.log('DONATION DATA:', data);

    this.apiService.post('donation/create', data).subscribe(
      () => {
        alert('Gracias por apadrinar ❤️');
      },
      (err) => console.error(err)
    );
  }
}