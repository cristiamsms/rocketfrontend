import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/product.model';

import { MatDialog } from '@angular/material/dialog';
import { ChangeHistoryModalComponent } from 'src/app/components/change-history-modal/change-history-modal.component';
import { RespGet } from '../edit-product/edit-product.component';
export interface HistoryResp {
  ok: boolean;
  historial: Historial[];
}

export interface Historial {
  _id: string;
  productId: string;
  precioAnterior: number;
  stockAnterior: number;
  fechaCambio: Date;
  __v: number;
}
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,

    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // Obtener el ID del producto desde la URL utilizando ActivatedRoute
    this.productId = this.route.snapshot.params['id'];

    // Cargar los datos del producto al inicializar el componente
    this.loadProductData();
  }

  // Método para cargar los datos del producto
  loadProductData() {
    // Utilizar el servicio para obtener los datos del producto por su ID
    if (this.productId) {
      this.productService
        .getProductById(this.productId)
        .subscribe((data: RespGet | any) => {
          // Asignar los datos del producto recibidos desde el servicio al objeto product
          this.product = data.producto;
        });
    }
  }

  openChangeHistoryModal(): void {
    if (this.productId) {
      this.productService
        .getHistoryById(this.productId)
        .subscribe((data: HistoryResp | any) => {
          // Asignar los datos del producto recibidos desde el servicio al objeto product
          const dialogRef = this.dialog.open(ChangeHistoryModalComponent, {
            width: '800px', // Personaliza el ancho del modal según tus necesidades
            data: {
              productName: this.product.name,
              history: data.historial,
            },
          });

          dialogRef.afterClosed().subscribe((result) => {});
        });
    }
  }
}
