import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

interface Animal {
  id: number;
  name: string;
  type: string;
  status: string;
  birth_date: string;
  age?: string;  
  images?: AnimalImage[];
  image_url: string;
}

interface AnimalImage {
  image_url: string;
  is_main: boolean;
}

interface AdoptedAnimal {
  id: number;
  name: string;
  image_url: string;
  adopted_at: string;
  adopter_name: string | null;
  images?: AnimalImage[];
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})

export class HomeComponent implements OnInit {

  // info
  animals: Animal[] = [];
  adoptedAnimals: AdoptedAnimal[] = [];

  loading = false;
  isAdoptedMock = false;

  swiper?: Swiper;
  adoptedSwiper?: Swiper;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loadAnimals();
    this.loadAdoptions();
  }

  getImageUrl(path: string) {
    return `http://localhost:7200${path}`;
  }

  // =========================
  //  CARRUSEL 1: DISPONIBLES
  // =========================
  loadAnimals(): void {
    this.loading = true;


    this.apiService.post('animal', {
      page: 1,
      limit: 10,
      filter: {
        status: 'available'
      },
      sort:{field: 'RANDOM()', order: 'DESC'}
    }).subscribe({
      next: (res: { data: Animal[] }) => {

        const available = (res.data || []);

        const shuffled = available
          .map((a: Animal) => ({ a, sort: Math.random() }))
          .sort((x, y) => x.sort - y.sort)
          .map(x => x.a);

        // FORZADA image_url mientras no hay image y calculateAge mientras no haya en backend
        this.animals = shuffled.slice(0, 5).map(a => {

          const images = a.images || [];

          const main = images.find((img: any) => img.is_main) || images[0];

          return {
            ...a,
            image_url: main
              ? this.apiService.getImageUrl(main.image_url)
              : `https://picsum.photos/600/400?random=${a.id}`,
            age: this.calculateAge(a.birth_date)
          };
        });

        this.loading = false;

        this.cdr.detectChanges();
        setTimeout(() => {
          requestAnimationFrame(() => {
            this.initSwiper();
          });
        });
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // =========================
  //  CARRUSEL 2: ADOPTADOS
  // =========================
  loadAdoptions(): void {

    this.apiService.post('animal', {
      page: 1,
      limit: 8,
      filter: {
        status: 'adopted'
      }
    }).subscribe({
      next: async (res: any) => {
        const data = res.data || [];

        const result = await Promise.all(
          data.map( async (animal: any) => {
            const images = animal.images || [];
            const main = images.find((img: any) => img.is_main) || images[0];
            const adopterName = await this.getAdopterName(animal.id);

            return {
              name: animal.name,
              image_url: main
                ? this.apiService.getImageUrl(main.image_url)
                : `https://picsum.photos/600/400?random=${animal.id}`,
              adopted_at: animal.updated_at ? this.getTimeSince(animal.updated_at) : null,
              adopter_name: adopterName || null
            };
          })
        );

        this.adoptedAnimals = result;

        this.isAdoptedMock = this.adoptedAnimals.length === 0;

        // reload si carga
        if (this.adoptedSwiper) {
          this.adoptedSwiper.destroy(true, true);
          this.adoptedSwiper = undefined;
        }

        this.cdr.detectChanges();

        if (this.adoptedAnimals.length > 0) {
          setTimeout(() => {
            requestAnimationFrame(() => {
              this.initAdoptedSwiper();
            });
          });
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  private getAdopterName(animalId: number): Promise<string | null> {
    return this.apiService.post('animal-requests', {
      page: 1,
      limit: 1,
      filter: {
        animal_id: animalId,
        status: 'approved',
        type: 'adoption'
      }
    }).toPromise()
      .then((res: any) => {
        const req = res.data?.[0];
        return req?.user?.name ?? null;
      })
      .catch(() => null);
  }

  // info
  private getFallbackAdoptedAnimals(): AdoptedAnimal[] {
    return [
      {
        id: -1,
        name: 'Luna',
        image_url: 'https://picsum.photos/600/400?random=101',
        adopted_at: 'Hace 2 meses',
        adopter_name: 'Familia García'
      },
      {
        id: -2,
        name: 'Max',
        image_url: 'https://picsum.photos/600/400?random=102',
        adopted_at: 'Hace 3 semanas',
        adopter_name: 'Ana López'
      },
      {
        id: -3,
        name: 'Nala',
        image_url: 'https://picsum.photos/600/400?random=103',
        adopted_at: 'Hace 1 mes',
        adopter_name: null
      }
    ];
  }

  // =========================
  //  AGE LOGIC (DB birth_date)
  // =========================
  calculateAge(birthDate: string): string {

    const today = new Date();
    const birth = new Date(birthDate);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years > 0) return `${years} año${years > 1 ? 's' : ''}`;
    if (months > 0) return `${months} mes${months > 1 ? 'es' : ''}`;

    return `${days} día${days > 1 ? 's' : ''}`;
  }

  // =========================
  //  ADOPTION TIME FORMAT
  // =========================
  getTimeSince(date: string): string {

    const diff = Date.now() - new Date(date).getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);

    if (months > 0) return `Hace ${months} mes${months > 1 ? 'es' : ''}`;
    if (days > 0) return `Hace ${days} día${days > 1 ? 's' : ''}`;

    return 'Recién adoptado';
  }

  // =========================
  //  SWIPER PRINCIPAL
  // =========================
  initSwiper(): void {
    this.swiper = new Swiper('.swiper', {
      modules: [Navigation, Autoplay, Pagination],
      loop: true,
      centeredSlides: true,

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },

      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },

      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 0 },
        768: { slidesPerView: 1.1, spaceBetween: 10 },
        1024: { slidesPerView: 1.2, spaceBetween: 20 }
      }
    });
  }

  // =========================
  //  SWIPER ADOPTADOS
  // =========================
  initAdoptedSwiper(): void {
    console.log('ADOPTED LENGTH:', this.adoptedAnimals.length);
    if (!this.adoptedAnimals || this.adoptedAnimals.length === 0) return;

    setTimeout(() => {

      this.adoptedSwiper = new Swiper('.swiper-adopted', {
        modules: [Navigation, Pagination],

        loop: false,
        slidesPerView: 1.1,
        spaceBetween: 20,

        centeredSlides: true,

        navigation: {
          nextEl: '.swiper-adopted .swiper-button-next',
          prevEl: '.swiper-adopted .swiper-button-prev'
        },

        pagination: {
          el: '.swiper-adopted .swiper-pagination',
          clickable: true
        }
      });

    }, 50);
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/infoanimal', id]);
  }

  handleImageError(event: any): void {
    event.target.src = 'https://picsum.photos/600/400';
  }
}
