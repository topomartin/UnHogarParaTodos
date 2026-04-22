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

  public animal : any;
  public loading: boolean = true;
  public animalNotFound: boolean = false;
  public images: any[] = [];
  public mainImage: string = '';


  constructor(
    private router: ActivatedRoute,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

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
        } else {
          this.animalNotFound = true;
        }

        this.loadImages(+id);

        this.loading = false;
        this.cdr.detectChanges();
      },
      (error) => {
        this.loading = false;
        console.error('Error al obtener animal', error);
        this.animalNotFound = true;
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

}
