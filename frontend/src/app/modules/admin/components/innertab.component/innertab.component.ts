import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminPageService } from '../../service/admin-data.service';
import { IColumnItem, ITabItem } from '../../interfaces/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDialogComponent } from '../delete.dialog.component/delete.dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private dataService: AdminPageService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  get displayedColumns(): string[] {
  return [...this.columns.map(c => c.key), 'acciones'];
}

  create(){
    console.log(`Crear nuevo ${this.modelName}`)
  }


  edit(row: any) {
    console.log('Editar', row);
  }

  delete(row: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '420px',
      disableClose: true,
      data: {
        title: 'Confirmar eliminación',
        message: `¿Seguro que deseas borrar el id:"${row.id}" de ${this.modelName}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.delete(this.modelName,row).subscribe(
          data=>{
            this.snackBar.open(`${this.modelName} eliminado correctamente'` , 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.loadData();
          }
        )
      }
    });
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

  getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}
}
