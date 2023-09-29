import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormControl } from '@angular/forms'; // Importa FormControl para formControl
import { Product } from 'src/app/shared/product.model';

import { NotificationService } from 'src/app/services/notification.service';
import { MatChipInputEvent } from '@angular/material/chips';
export interface RespGet {
  ok: boolean;
  producto: Product;
}
export interface RespPostOrPut {
  ok: boolean;
  msg: string;
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productId?: string;
  product: Product | any = {
    name: '',
    description: '',
    sku: '',
    image: '',
    labels: [], // Inicializa labels como un arreglo vacío
    price: 0,
    stock: 0,
  };
  labelControl = new FormControl(); // Define un FormControl para las etiquetas
  public requiredFieldsError: string = '';
  public campoFaltante: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params['id']; // Obtener el ID del producto desde la URL
    this.loadProductData();
  }

  // Métodos para agregar y eliminar etiquetas
  addLabel(event: MatChipInputEvent): void {
    const value = event.value.trim();
    if (value && !this.product.labels.includes(value)) {
      this.product.labels.push(value);
      this.labelControl.reset(); // Restablece el input de etiquetas
    }
  }

  removeLabel(label: string): void {
    const index = this.product.labels.indexOf(label);
    if (index >= 0) {
      this.product.labels.splice(index, 1);
    }
  }

  loadProductData() {
    // Utilizar el servicio para obtener los datos del producto por su ID
    if (this.productId) {
      this.productService
        .getProductById(this.productId)
        .subscribe((data: RespGet | any) => {
          this.product = data.producto;
        });
    }
  }

  onSubmit() {
    // Reinicia los mensajes de error y el campo faltante
    this.requiredFieldsError = '';
    this.campoFaltante = '';

    // Define un objeto con los nombres de los campos requeridos y sus mensajes de error
    const requiredFields: Record<string, string> = {
      name: 'Nombre',
      description: 'Descripción',
      sku: 'SKU',
      image: 'Imagen',
      price: 'Precio',
      stock: 'Stock',
    };

    // Recorre el objeto de campos requeridos
    for (const fieldName in requiredFields) {
      if (!this.product[fieldName]) {
        this.requiredFieldsError = `El campo ${requiredFields[fieldName]} es requerido.`;
        this.campoFaltante = fieldName;
        return; // Detén la validación en el primer campo faltante que encuentres
      }
    }
    if (this.productId) {
      this.productService
        .editProduct(this.product)
        .subscribe((data: RespPostOrPut | any) => {
          // Manejar la respuesta del servidor (éxito o error)

          if (data.ok) {
            this.notificationService.showSuccess(data.msg);
            // Redirigir a la lista de productos u otra página
            this.router.navigate(['/products']);
          } else {
            this.notificationService.showError(data.msg);
          }
        });
    } else {
      this.productService
        .addProduct(this.product)
        .subscribe((data: RespPostOrPut | any) => {
          // Manejar la respuesta del servidor (éxito o error)
          if (data.ok) {
            this.notificationService.showSuccess(data.msg);
            // Redirigir a la lista de productos u otra página
            this.router.navigate(['/products']);
          } else {
            this.notificationService.showError(data.msg);
          }
        });
    }
  }
}
