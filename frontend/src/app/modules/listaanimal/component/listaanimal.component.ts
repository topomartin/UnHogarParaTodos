import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-listaanimal',
  templateUrl: './listaanimal.component.html',
  styleUrls: ['./listaanimal.component.scss'],
  standalone: false
})

export class ListaAnimalComponent implements OnInit {

  public animales: any[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAnimales();
  }

  // 🔥 OBTENER ANIMALES DESDE BACKEND
  getAnimales() {
    this.apiService.post('animal', {}).subscribe(
      (data) => {
        this.animales = data;
        console.log('Animales:', this.animales);

        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al obtener animales', error);
      }
    );
  }

  verDetalle(id: number) {
  this.router.navigate(['/infoanimal', id]);
}

}