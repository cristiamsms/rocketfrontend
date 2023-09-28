import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormControl } from '@angular/forms'; // Importa FormControl para formControl
import { Product } from 'src/app/shared/product.model';

import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productId?: string;
  product: Product = {
    name: '',
    description: '',
    sku: '',
    image: '',
    labels: [], // Inicializa labels como un arreglo vacío
    price: 0,
    stock: 0,
  };
  labelControl = new FormControl(); // Define un FormControl para las etiquetas

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
  addLabel(event: any): void {
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
        .subscribe((data: any) => {
          this.product = data.producto;
        });
    }
  }

  onSubmit() {
    if (this.productId) {
      this.productService.editProduct(this.product).subscribe((data: any) => {
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
      this.productService.addProduct(this.product).subscribe((data: any) => {
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