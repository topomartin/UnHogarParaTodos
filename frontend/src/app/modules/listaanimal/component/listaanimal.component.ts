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

  // Paginacion
  public paginatedAnimals: any[] = [];
  public itemsPerPage: number = 5;
  public currentPage: number = 1;
  public totalPages: number = 1;

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

        this.updatePagination();
        console.log('Animales:', this.animales);

        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al obtener animales', error);
      }
    );
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedAnimals = this.animales.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.animales.length / this.itemsPerPage);
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  verDetalle(id: number) {
  this.router.navigate(['/infoanimal', id]);
}

}
