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
        console.log('Animal detalle:', this.animal);

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

}
