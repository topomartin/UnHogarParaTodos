import { Component, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
   title = ('Un Hogar para Todos');
   constructor(private translate: TranslateService) {
      this.translate.addLangs(['es', 'ca', 'en']);
      this.translate.setDefaultLang('ca');

      this.translate.use('ca'); // idioma inicial
    }
}
