import { Component, OnInit } from '@angular/core';
import { ITabItem } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';
import { AdminPageService } from '../service/admin-data.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss'],
  standalone: false
})
export class AdminPageComponent implements OnInit {

  private tabsSchemaSubscription!: Subscription;

  public tabs: ITabItem[] = [
    //{
    //  modelName: 'user',
    //  canCreate: false,
    //  canUpdate: false
    //},
    //{
    //  modelName: 'animal',
    //  canCreate: true,
    //  canUpdate: false
    //},
    //{
    //  modelName: 'animal-requests',
    //  canCreate: false,
    //  canUpdate: true
    //},
    //{
    //  modelName: 'sponsorship',
    //  canCreate: false,
    //  canUpdate: false
    //}
  ];

  constructor(private dataService: AdminPageService){}

  ngOnInit(): void {
    this.getTabsSchema();
  }

  getTabsSchema(){
    const modelName = 'admin-page'
    this.tabsSchemaSubscription = this.dataService.getGridSchema(modelName).subscribe(data=>{
      this.tabs = data.displayedTabs;
      this.tabsSchemaSubscription.unsubscribe();
    });

  }
}
