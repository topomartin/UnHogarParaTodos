import { Component, OnInit } from '@angular/core';
import { ITabItem } from '../interfaces/interfaces';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss'],
  standalone: false
})
export class AdminPageComponent implements OnInit {

  public tabs: ITabItem[] = [
    {
      modelName: 'user',
      displayedColumns: [
        { key: 'id', label: 'ID' },
        { key: 'username', label: 'Usuario' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Rol' }
      ]
    },
    {
      modelName: 'animal',
      displayedColumns: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nombre' },
        { key: 'type', label: 'Tipo' },
        { key: 'status', label: 'Estado' },
        { key: 'birth_date', label: 'Nacimiento' },
      ]
    },
    {
      modelName: 'animal_request',
      displayedColumns: [
        { key: 'id', label: 'ID' },
        { key: 'animal:id', label: 'Animal' },
        { key: 'user_id', label: 'usuario' },
      ]
    },
    {
      modelName: 'sponsorship',
      displayedColumns: [
        { key: 'id', label: 'ID' },
        { key: 'amount', label: 'Cantidad' },
        { key: 'frequency', label: 'Frecuencia' },
        { key: 'startDate', label: 'Inicio' },
      ]
    }
  ];

  ngOnInit(): void {
  }
}
