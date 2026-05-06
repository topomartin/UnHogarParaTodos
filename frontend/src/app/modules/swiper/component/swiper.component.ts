import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-swipper-component',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  standalone:false
})
export class SwiperComponent implements OnInit {

  @Input() elements: any[] = [];

  ngOnInit(): void{
    console.log(this.elements);
  }
  ngAfterViewInit(){
    console.log(this.elements);
  }

  navigateToDetail(id: number) {
    console.log('navigate', id);
  }

  getImageUrl(path: string) {
    return `http://localhost:7200${path}`;
  }

  handleImageError(event: any, element: any) {
    event.target.src = 'https://picsum.photos/600/400';
  }
}
