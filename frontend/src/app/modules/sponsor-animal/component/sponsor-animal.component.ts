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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.animalId = Number(this.route.snapshot.paramMap.get('id'));

    // obtener nombre animal
    this.apiService.get('animal/' + this.animalId).subscribe((res: any) => {
      this.animalName = res.name;
    });

    this.form = new FormGroup({
      amount: new FormControl('', Validators.required),
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
      message: this.form.value.message
    };

    this.apiService.post('donation/create', data).subscribe(
      () => {
        alert('Gracias por apadrinar ❤️');
      },
      (err) => console.error(err)
    );
  }
}