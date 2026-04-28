export interface IColumnItem {
  key: string;
  label: string;
}

export interface ITabItem {
  modelName: string;
  displayedColumns: IColumnItem[];
}
