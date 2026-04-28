import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminPageService } from '../../service/admin-data.service';
import { IColumnItem, ITabItem } from '../../interfaces/interfaces';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-innertab',
  templateUrl: './innertab.component.html',
  styleUrls: ['./innertab.component.scss'],
  standalone: false
})
export class InnerTabComponent implements OnInit {

  @Input() columns: IColumnItem[] = [];
  @Input() modelName!: string;

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: AdminPageService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  get displayedColumns(): string[] {
  return [...this.columns.map(c => c.key), 'acciones'];
}


  edit(row: any) {
    console.log('Editar', row);
  }

  delete(row: any) {
    console.log('Borrar', row);
  }

  private loadData(): void {
    let filter ={
      page: 1,
      limit: 10
    }
    this.dataService.list(`${this.modelName}` ,filter).subscribe({
      next: (data: any) => {
        if (this.modelName == 'user')
        this.dataSource.data = data;
        else {this.dataSource.data = data.data;
              this.paginator = data.meta;
        }
      },
      error: (err: any) => {
        console.error('Error cargando usuarios', err);
      }
    });
  }
}
