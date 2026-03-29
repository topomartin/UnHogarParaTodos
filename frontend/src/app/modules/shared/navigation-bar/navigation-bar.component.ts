import { Component, EventEmitter, OnInit, Output } from '@angular/core';


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

  constructor() {}

  ngOnInit(): void {
  }

  logout(): void {
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleMenuEvent.emit({ toggleMenu: this.isMenuOpen });
  }
}
