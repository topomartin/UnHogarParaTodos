import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
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
  public images: any[] = [];
  public mainImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
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

        this.loadImages(+id);

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

  loadImages(animalId: number) {
    this.apiService.getAnimalImages(animalId).subscribe((imgs) => {

      this.images = (imgs || []).map(img => ({
        ...img,
        image_url: this.apiService.getImageUrl(img.image_url)
      }));

      const main = this.images.find(i => i.is_main) || this.images[0];

      this.mainImage = main
        ? this.apiService.getImageUrl(main.image_url)
        : '';

      this.cdr.detectChanges();
    });
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

    if (years < 1) return 'ANIMAL.AGE_CATEGORIES.PUPPY';
    if (years < 7) return 'ANIMAL.AGE_CATEGORIES.ADULT';
    return 'ANIMAL.AGE_CATEGORIES.SENIOR';
  }

  getAdoptionRecommendation(birthDate: string): string {
    const { years } = this.getAgeData(birthDate);

    if (years < 1) {
      return 'ANIMAL.ADOPTION_RECOMMENDATIONS.PUPPY';
    }

    if (years < 7) {
      return 'ANIMAL.ADOPTION_RECOMMENDATIONS.ADULT';
    }

    return 'ANIMAL.ADOPTION_RECOMMENDATIONS.SENIOR';
  }

  getFamilyCompatibility(birthDate: string): string {
    const { years } = this.getAgeData(birthDate);

    if (years < 1) return 'ANIMAL.FAMILY_COMPATIBILITY.PUPPY';
    if (years < 7) return 'ANIMAL.FAMILY_COMPATIBILITY.ADULT';
    return 'ANIMAL.FAMILY_COMPATIBILITY.SENIOR';
  }

  adoptarAnimal(id: number) { 
    this.router.navigate(['/animal-request', id, 'ADOPTION']);
  }

  apadrinarAnimal(id: number) {
    this.router.navigate(['/sponsor', id]);
  }

  acogerAnimal(id: number) {
    this.router.navigate(['/animal-request', id, 'FOSTER']);
  }

}
