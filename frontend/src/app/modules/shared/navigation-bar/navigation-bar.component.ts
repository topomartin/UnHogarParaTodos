import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../../services/authentication.service";

export interface MenuToggleEvent {
  isMenuOpen: boolean;
}

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  standalone: false,
})


export class NavigationBarComponent implements OnInit {
  textState: 'hidden' | 'visible' = 'hidden';
  currentUser!: string;

  @Output() toggleMenuEvent: EventEmitter<any> = new EventEmitter<MenuToggleEvent>();

  public isMenuOpen = true;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.currentUser = user ? user.username : '';
    });
  }

  logout(): void {
    // Limpiar sesión
    this.authService.logout();
    this.currentUser = '';      // borra la sesión visible en la barra (el nombre de usuario)

    // localStorage.removeItem('access_token'); // si usas JWT (limpiar token)

    // Redirigir a login
    this.router.navigate(['/login']);
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleMenuEvent.emit({ toggleMenu: this.isMenuOpen });
  }
}
