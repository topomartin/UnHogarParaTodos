import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser, AuthenticationService } from "../../../services/authentication.service";
import { TranslateService } from '@ngx-translate/core';

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
  selectedLanguage: string = 'ca';

  @Output() toggleMenuEvent: EventEmitter<MenuToggleEvent> = new EventEmitter<MenuToggleEvent>();

  @ViewChild('menuTrigger') menuTrigger: any;

  public isMenuOpen = true;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.user$ = this.authService.user$;
    const savedLang = localStorage.getItem('lang') || 'ca';
    this.selectedLanguage = savedLang;
    this.translate.use(savedLang);
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

  getSelectedFlagPath(): string {
    return `flags/${this.selectedLanguage}.svg`;
  }
  
  getSelectedLangName(): string {
    const names: any = { 'ca': 'Català', 'es': 'Español', 'en': 'English' };
    return names[this.selectedLanguage] || '';
  }

  changeLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  isAdminOrWorker(user: IUser | null): boolean {
    return user?.role === 'ADMIN' || user?.role === 'WORKER';
  }
}
