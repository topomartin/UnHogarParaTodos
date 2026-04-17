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

  public currentPage: number = 1;
  public itemsPerPage: number = 10;

  public totalPages: number = 1;
  public totalItems: number = 0;

  public searchText: string = '';
  public selectedType: string = '';
  public selectedStatus: string = '';

  public loading: boolean = false;
  private searchTimeout: any;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAnimales();
  }

  // 🔥 OBTENER ANIMALES DESDE BACKEND
  getAnimales() {
    this.loading = true;

    const body = {
      page: this.currentPage,
      limit: this.itemsPerPage,
      filter: {
        name: this.searchText || undefined,
        type: this.selectedType ? this.selectedType.toLowerCase() : undefined,
        status: this.selectedStatus ? this.selectedStatus.toUpperCase() : undefined
      }
    };

    this.apiService.post('animal', body).subscribe(
      (response: any) => {

        this.animales = response.data;

        this.totalItems = response.meta.total;
        this.totalPages = response.meta.lastPage;
        this.currentPage = response.meta.page;

        this.loading = false;

        this.cdr.detectChanges();

        console.log('Animales:', this.animales);
        console.log('Meta:', response.meta);
      },
      (error) => {
        this.loading = false;
        console.error('Error al obtener animales', error);
      }
    );
  }

  // Pagination
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAnimales();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAnimales();
    }
  }

  // Filter
  applyFilters() {
    if (this.loading) return;
    this.currentPage = 1;
    this.getAnimales();
  }

  onSearchChange() {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.applyFilters();
    }, 500); 
  }

  verDetalle(id: number) {
    this.router.navigate(['/infoanimal', id]);
  }

}
