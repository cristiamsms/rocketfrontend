import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-history-modal',
  templateUrl: './change-history-modal.component.html',
  styleUrls: ['./change-history-modal.component.css'],
})
export class ChangeHistoryModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {} // Aquí puedes recibir datos del componente anterior

  // Puedes acceder a los datos en la plantilla HTML, por ejemplo: {{ data.productName }}
}