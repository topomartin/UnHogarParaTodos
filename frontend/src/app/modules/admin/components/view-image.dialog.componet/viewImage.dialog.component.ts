import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UploadService } from '../../../../services/upload.service';

@Component({
  selector: 'app-viewImage-dialog',
  templateUrl: './viewImage.dialog.component.html',
  styleUrls: ['./viewImage.dialog.component.scss'],
  standalone: false
})
export class ViewImageDialogComponent implements OnInit {

  selectedFiles: File[] = [];
  loading = false;

  constructor(
    private uploadService: UploadService,
    private dialogRef: MatDialogRef<ViewImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      data?: any;
      elementId: number;
    }
  ) {}
  ngOnInit(): void {
    console.log (this.data.title);
  }
  onFileSelected(event: any) {
  this.selectedFiles = Array.from(event.target.files);
}

  ngOnDestroy(): void {

  }
  upload() {
    if (!this.selectedFiles) return;

    this.loading = true;

    this.uploadService.uploadImage('animal-image', this.data.elementId ,this.selectedFiles).subscribe({
      next: (res) => {
        //this.result = res;
        this.loading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

}


