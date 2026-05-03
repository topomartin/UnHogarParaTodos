import { Component, Input, model, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminPageService } from '../../service/admin-data.service';
import { IColumnItem, ITabItem } from '../../interfaces/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDialogComponent } from '../delete.dialog.component/delete.dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs/internal/Subscription';
import { CreateUpdateDialogComponent } from '../create-update.dialog.component/create-update.dialog.component';

@Component({
  selector: 'app-innertab',
  templateUrl: './innertab.component.html',
  styleUrls: ['./innertab.component.scss'],
  standalone: false
})
export class InnerTabComponent implements OnInit {

  //@Input() columns: IColumnItem[] = [];
  @Input() modelName!: string;
  @Input() canCreate: boolean = false;
  @Input() canUpdate: boolean = false;

  public columns: IColumnItem[] = [];
  private gridSchemaSubscription!: Subscription;
  private dataSubscription!: Subscription;
  private createSchemaSubscription!: Subscription;
  private updateSchemaSubscription!: Subscription;
  private createSubscription!: Subscription;
  private updateSubscription!: Subscription;

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: AdminPageService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getGridSchema();
  }

  ngAfterViewInit() {
    this.loadData();
    this.dataSource.paginator = this.paginator;
  }
  onDestroy(){
    this.gridSchemaSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
    this.createSchemaSubscription.unsubscribe();
    this.updateSchemaSubscription.unsubscribe();
    this.createSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
  }
  async getGridSchema(){
    this.gridSchemaSubscription = this.dataService.getGridSchema(this.modelName).subscribe(data=>{
      this.columns = data.displayedColumns;
      this.gridSchemaSubscription.unsubscribe();
    });
  }

  get displayedColumns(): string[] {
    return [...this.columns.map(c => c.key), 'acciones'];
  }

  create(){
    this.createSchemaSubscription = this.dataService.getCreateSchema(this.modelName).subscribe(
      (schema)=>{
        const dialogRef = this.dialog.open(CreateUpdateDialogComponent, {
            disableClose: true,
            data: {
              title: `Nuevo ${this.modelName}`,
              mode: 'create',
              schema: schema
            }
          });
        dialogRef.afterClosed().subscribe(
          (result) =>{
            this.createSubscription = this.dataService.create(`${this.modelName}`, result).subscribe(
              (data)=>{
                this.snackBar.open(`${this.modelName} creado correctamente'` , 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
                this.loadData();
                this.createSubscription.unsubscribe();
              }
            )
            console.log(result);
          }
        );
        this.createSchemaSubscription.unsubscribe();
      }

    )

  }


  edit(row: any) {
    this.updateSchemaSubscription = this.dataService.getUpdateSchema(this.modelName).subscribe(
      (schema)=>{
        const dialogRef = this.dialog.open(CreateUpdateDialogComponent, {
          disableClose: true,
          data: {
            title: `Editar ${this.modelName}`,
            mode: 'update',
            schema: schema,
            data: row
          }
        });
        this.updateSchemaSubscription.unsubscribe();
        dialogRef.afterClosed().subscribe(
          (result)=>{
            result.id = row.id;
            this.updateSubscription = this.dataService.update(`${this.modelName}`, result).subscribe(
              (data)=>{
                this.snackBar.open(`${this.modelName} modificado correctamente'` , 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
                this.loadData();
                this.updateSubscription.unsubscribe();
              }
            )
          }
        )
      }

    )

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
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
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
    this.dataSubscription = this.dataService.list(`${this.modelName}` ,filter).subscribe({
      next: (data: any) => {
        if (this.modelName == 'user')
        this.dataSource.data = data;
        else {this.dataSource.data = data.data;
              this.paginator = data.meta;
        }
        this.dataSubscription.unsubscribe()
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
