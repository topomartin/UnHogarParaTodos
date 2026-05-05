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
import { ViewImageDialogComponent } from '../view-image.dialog.componet/viewImage.dialog.component';

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

  public page: number = 1;
  public pageSize: number = 5;
  public totalItems: number = 0;

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
  get fullColumnsData(): any[] {
    const fullColumnsData =  [...this.columns.filter((column: any)=>{return column.type != null && column.type == 'option' }).map(c => c)];
    return  fullColumnsData;
  }
  get displayedColumns(): string[] {
    return [...this.columns.filter(
      (column: any)=>{
        return column.type == null || (column.type == 'option' && column.options.showColumn == true)}).map(c => c.key), 'acciones'];
  }

  customAction(customAction: string, row: any, key?: string | undefined) {
  switch (customAction) {

    case 'viewImage':
      this.viewImage(row);
      break;
    case 'info':
      const modelName =  key ? key.split('.')[0] : null;
      this.getInfo(modelName!, row[`${modelName}`]);
      break;

    default:
      console.warn('Acción no reconocida');
  }
}

  create(){
    this.createSchemaSubscription = this.dataService.getCreateSchema(this.modelName).subscribe({
      next: (schema)=>{
        const dialogRef = this.dialog.open(CreateUpdateDialogComponent, {
            disableClose: true,
            data: {
              title: `Nuevo ${this.modelName}`,
              mode: 'create',
              schema: schema
            }
          });
        dialogRef.afterClosed().subscribe({
          next: (result) =>{
            this.createSubscription = this.dataService.create(`${this.modelName}`, result).subscribe({
              next: (data)=>{
                this.snackBar.open(`${this.modelName} creado correctamente'` , 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
                this.loadData();
                this.createSubscription.unsubscribe();
              },
              error: (err: any) =>{
                console.log(err);
              }
          })
            console.log(result);
          },
          error: (err: any)=>{
            console.log(err);
          }
        });
        this.createSchemaSubscription.unsubscribe();
      },
      error: (err: any)=>{
        console.log(err);
      }
    })

  }


  edit(row: any) {
    this.updateSchemaSubscription = this.dataService.getUpdateSchema(this.modelName).subscribe({
      next: (schema)=>{
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
      },
      error: (err: any)=>{
        console.log(err);
      }

  })

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

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.dataService.delete(this.modelName,row).subscribe({
            next: data=>{
              this.snackBar.open(`${this.modelName} eliminado correctamente'` , 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
              this.loadData();
            },
            error: (e)=>{
              console.log(e);
            }
          })
        }
      },
      error: (error)=>{
        console.log(error);
      }
    });
  }


  viewImage(row: any){
    const dialogRef = this.dialog.open(ViewImageDialogComponent, {
          disableClose: false,
          data: {
            title: `Ver imágenes de ${row.name}`,
            data: row.images
          }
        });
  }

  getInfo(modelName: string, row: any){
    this.dataService.getInfoSchema(modelName).subscribe(
      {next:
        (schema)=>{
          const dialogRef = this.dialog.open(CreateUpdateDialogComponent, {
          disableClose: true,
          data: {
            title: `Info ${modelName}`,
            mode: 'info',
            schema: schema,
            data: row
          }
        });
        }
      }
    )
  }

  private loadData(): void {
    let filter ={
      page: this.page,
      limit: this.pageSize
    }
    this.dataSubscription = this.dataService.list(`${this.modelName}` ,filter).subscribe({
      next: (response: any) => {
        if (this.modelName == 'user')
          this.dataSource.data = response;
        else {
          this.dataSource.data = response.data;
          this.totalItems = response.meta.total;
        }
        this.dataSubscription.unsubscribe()
      },
      error: (err: any) => {
        console.error('Error cargando usuarios', err);
      }
    });
  }

  getNestedValue(row: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], row);
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }
}
