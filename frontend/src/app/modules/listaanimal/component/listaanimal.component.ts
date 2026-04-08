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

  // Pagination
  public paginatedAnimals: any[] = [];
  public itemsPerPage: number = 5;
  public currentPage: number = 1;
  public totalPages: number = 1;

  // Filter
  public searchText: string = '';
  public selectedType: string = '';
  public selectedStatus: string = '';
  public typeOptions: string[] = [];
  public statusOptions: string[] = [];
  public filteredAnimals: any[] = [];

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

        // Filter
        this.typeOptions = Array.from(new Set(this.animales.map(a => a.type)));
        this.statusOptions = Array.from(new Set(this.animales.map(a => a.status)));

        this.filteredAnimals = [...this.animales];

        // Pagination
        this.updatePagination();

        console.log('Animales:', this.animales);

        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al obtener animales', error);
      }
    );
  }

  // Pagination
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedAnimals = this.filteredAnimals.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredAnimals.length / this.itemsPerPage);
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

  // Filter
  applyFilters() {
    this.filteredAnimals = this.animales.filter(animal => {
      const matchesText = animal.name.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesType = this.selectedType
        ? animal.type.toLowerCase() === this.selectedType.toLowerCase()
        : true;

      const matchesStatus = this.selectedStatus
        ? animal.status.toLowerCase() === this.selectedStatus.toLowerCase()
        : true;

      return matchesText && matchesType && matchesStatus;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  verDetalle(id: number) {
    this.router.navigate(['/infoanimal', id]);
  }

}
