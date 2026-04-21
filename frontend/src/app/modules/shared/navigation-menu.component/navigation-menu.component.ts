import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthenticationService, IUser } from '../../../services/authentication.service';

interface IPage {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
  standalone: false,
  animations: [
    trigger('animateText', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden <=> visible', animate('300ms ease-in-out'))
    ])
  ]
})
export class NavigationMenuComponent implements OnInit, AfterViewInit {

  public sideNavState = true;
  public linkText = true;
  public isOpen = false;
  public pages: any[] = [];

  @ViewChild('menu', { read: ElementRef }) menu!: ElementRef;

  @Output() isMenuOpenEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  private currentUser: IUser | null = null;

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;

      this.buildMenu();
    });
  }

  ngAfterViewInit(): void {
    const isDesktop = window.innerWidth > 1280;

    this.isOpen = isDesktop;

    this.menu.nativeElement.style.width = isDesktop ? '220px' : '0';

    this.isMenuOpenEvent.emit({ isMenuOpen: isDesktop });
  }

  toggleMenu(event: { isMenuOpen: boolean }): void {
    this.isOpen = event.isMenuOpen;

    this.menu.nativeElement.style.width = this.isOpen ? '220px' : '0';
  }

  closeMenu(): void {
    this.isOpen = false;

    this.menu.nativeElement.style.width = '0';

    this.isMenuOpenEvent.emit({
      isMenuOpen: false
    });
  }

  toggleText(): void {
    this.linkText = !this.linkText;
  }

  private buildMenu(): void {
    this.pages = this.router.config
      .filter(route => route.data?.['showInMenu'])
      .filter(route => {
        const roles = route.data?.['roles'];

        // si no hay roles → público
        if (!roles) return true;

        // si no hay usuario → no mostrar rutas protegidas
        if (!this.currentUser) return false;

        // validar rol
        return roles.includes(this.currentUser.role);
      })
      .map(route => ({
        link: '/' + (route.path ?? ''),
        name: route.data?.['title'],
        icon: route.data?.['icon']
      }));
  }
}
