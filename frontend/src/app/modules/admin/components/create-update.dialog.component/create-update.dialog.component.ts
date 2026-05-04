import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormSchema } from '../../interfaces/interfaces';

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update.dialog.component.html',
  styleUrls: ['./create-update.dialog.component.scss'],
  standalone: false
})
export class CreateUpdateDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      schema: FormSchema;
      mode?: 'create' | 'update';
      data?: any;
    }
  ) {}

  ngOnInit(): void {
    const group: any = {};

    this.data.schema.fields.forEach((field: any) => {
      const initialValue = field.joinValue
        ? this.getNestedValue(this.data.data, field.joinLabel)
        : this.data.data?.[field.key] ?? field.default ?? '';
      group[field.key] = [{value: initialValue, disabled: field.readonly == true}, field.required ? Validators.required : [] ];
    });

    this.form = this.fb.group(group);

    if (this.data.data) {
      this.form.patchValue(this.data.data);
    }
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  get actionLabel(): string {
    return this.data.mode === 'update' ? 'Actualizar' : 'Crear';
  }

  getNestedValue(row: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], row);
  }
}
