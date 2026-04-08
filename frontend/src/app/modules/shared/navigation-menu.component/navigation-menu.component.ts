import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';


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

export class NavigationMenuComponent implements OnInit {

  public sideNavState = true;
  public linkText = true;

  public pages: IPage[] = [
    {name: 'Lista Animales', link: '/listaanimal', icon: 'list_alt'},
    {name: 'Perfil', link: '/profile', icon: 'list_alt'}
  ];

  @ViewChild('menu', { read: ElementRef }) menu!: ElementRef;

  @Output() isMenuOpenEvent: EventEmitter<any> = new EventEmitter();

  textState: 'hidden' | 'visible' = 'hidden';

  constructor(){}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const isDesktop = window.innerWidth > 1280;
    this.menu.nativeElement.style.width = isDesktop ? '120px' : '0';
    this.isMenuOpenEvent.emit({ isMenuOpen: isDesktop });
  }

  toggleMenu(event: { toggleMenu: boolean }): void {
    this.menu.nativeElement.style.width = event.toggleMenu ? '120px' : '0';
  }

  toggleText() {
    this.textState = this.textState === 'hidden' ? 'visible' : 'hidden';
  }


}
