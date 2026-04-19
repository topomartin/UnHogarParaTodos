import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser, AuthenticationService } from "../../../services/authentication.service";

export interface MenuToggleEvent {
  isMenuOpen: boolean;
}

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  standalone: false,
})
export class NavigationBarComponent {

  user$: Observable<IUser | null>;

  @Output() toggleMenuEvent: EventEmitter<MenuToggleEvent> = new EventEmitter<MenuToggleEvent>();

  @ViewChild('menuTrigger') menuTrigger: any;

  public isMenuOpen = true;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.user$ = this.authService.user$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleMenuEvent.emit({ isMenuOpen: this.isMenuOpen });
  }

  navigateAndClose(route: string): void {
    this.router.navigate([route]);
    this.menuTrigger?.closeMenu();
  }

  isAdminOrWorker(user: IUser | null): boolean {
    return user?.role === 'ADMIN' || user?.role === 'WORKER';
  }
}
