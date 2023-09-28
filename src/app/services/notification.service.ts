

import { Injectable } from '@angular/core';
import Toastify from 'toastify-js'; // Importa Toastify

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  showSuccess(message: string) {
    Toastify({
      text: message,
      duration: 3000, // Duración en milisegundos

      backgroundColor: '#4CAF50', // Color de fondo de la notificación de éxito
    }).showToast();
  }

  showError(message: string) {
    Toastify({
      text: message,
      duration: 3000, // Duración en milisegundos

      backgroundColor: '#F44336', // Color de fondo de la notificación de error
    }).showToast();
  }
}