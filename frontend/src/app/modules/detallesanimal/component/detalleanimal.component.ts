import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-detalleanimal',
  templateUrl: './detalleanimal.component.html',
  styleUrls: ['./detalleanimal.component.scss'],
  standalone: false
})
export class DetalleAnimalComponent implements OnInit {

  public animal: any;
  public profile: any;
  public loading: boolean = true;
  public animalNotFound: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.getAnimal(id);
    }
  }

  getAnimal(id: string) {
    this.loading = true;

    this.apiService.get('animal/' + id).subscribe(
      (data) => {
        if (data) {
          this.animal = data;
          this.profile = data.profile;
          console.log('ANIMAL COMPLETO:', data);
        } else {
          this.animalNotFound = true;
        }

        this.loading = false;
        this.cdr.detectChanges();
      },
      (error) => {
        this.loading = false;
        this.animalNotFound = true;
        console.error(error);
        this.cdr.detectChanges();
      }
    );
  }

  // 🔥 EDAD EN AÑOS Y MESES
  getAgeData(birthDate: string) {
    const today = new Date();
    const birth = new Date(birthDate);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (today.getDate() < birth.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    return {
      years,
      months: months < 0 ? 0 : months
    };
  }

  // 🔥 CATEGORÍA AUTOMÁTICA
  getAgeCategory(birthDate: string): string {
    const { years } = this.getAgeData(birthDate);

    if (years < 1) return 'cachorro';
    if (years < 7) return 'adulto';
    return 'senior';
  }

  getAdoptionRecommendation(birthDate: string): string {
    const { years } = this.getAgeData(birthDate);

    if (years < 1) {
      return 'Ideal para familias activas y con tiempo para cuidados intensivos.';
    }

    if (years < 7) {
      return 'Perfecto para familias equilibradas o personas con experiencia.';
    }

    return 'Recomendado para familias tranquilas o personas mayores.';
  }

  getFamilyCompatibility(birthDate: string): string {
    const { years } = this.getAgeData(birthDate);

    if (years < 1) return 'Alta energía / niños mayores';
    if (years < 7) return 'Familias activas / niños';
    return 'Familias tranquilas / sin mucha actividad';
  }
}
