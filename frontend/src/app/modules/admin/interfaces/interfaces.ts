export type ColumnType = 'text' | 'number' | 'date' | 'enum';

export interface IColumnItem {
  key: string;
  label: string;
  type?: ColumnType;
  options?: string[];

}

export interface ITabItem {
  modelName: string;
  canCreate: boolean;
  canUpdate: boolean;
}

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'date' | 'select';
  required?: boolean;
  values?:string[];
  readonly?: boolean;
}

export interface FormSchema {
  fields: FormField[];
}



