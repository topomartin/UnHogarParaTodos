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
    this.apiService.get('animal/' + id).subscribe(
      (data) => {
        this.animal = data;
        console.log('Animal detalle:', this.animal);

        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al obtener animal', error);
      }
    );
  }

}