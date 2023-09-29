import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { PageEvent } from '@angular/material/paginator';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RespPostOrPut } from '../edit-product/edit-product.component';
export interface RespGetProducts {
  ok: boolean;
  products: Products;
}

export interface Products {
  docs: Product[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: number;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  // Propiedades para la lista de productos
  products: Product[] = []; // Almacena la lista de productos
  limit: number = 10; // Cantidad de productos por página
  page: number = 0; // Página actual
  pageSizeOptions = [5, 10, 25, 100]; // Opciones de tamaño de página
  showFirstLastButtons = true; // Mostrar botones de primera y última página
  hidePageSize = false; // Ocultar el selector de tamaño de página
  length = 0; // Total de productos en la lista
  searchTerm: string = ''; // Término de búsqueda

  constructor(
    private productService: ProductService, // Servicio para gestionar productos
    private router: Router, // Para navegar a otras rutas
    private confirmationDialogService: ConfirmationDialogService, // Servicio para confirmación de eliminación
    private notificationService: NotificationService // Servicio para mostrar notificaciones
  ) {}

  ngOnInit() {
    // Cargar la lista de productos al inicializar el componente
    this.getProducts();
  }

  // Método para obtener la lista de productos desde el servidor
  getProducts() {
    this.productService
      .getProducts(this.limit, this.page, this.searchTerm)
      .subscribe((data: RespGetProducts | any) => {
    
        // Actualizar la lista de productos y la cantidad total
        this.length = data.products.totalDocs;
        this.products = data.products.docs;
      });
  }

  // Método para aplicar un filtro de búsqueda
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchTerm = filterValue;
    this.page=0;
    this.getProducts(); // Actualizar la lista de productos con el término de búsqueda
  }

  // Método para editar un producto
  editProduct(productId?: string) {
    // Navegar a la ruta de edición con el ID del producto
    this.router.navigate(['products/edit/', productId]);
  }

  // Método para confirmar y eliminar un producto
  confirmDeleteProduct(productId?: string) {
    const dialogRef = this.confirmationDialogService.openConfirmationDialog();

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        if (productId) {
          this.productService
            .deleteProduct(productId)
            .subscribe((data: RespPostOrPut | any) => {
              // Manejar la respuesta del servidor (éxito o error)
              if (data.ok) {
                this.notificationService.showSuccess(data.msg);
                // Redirigir a la lista de productos u otra página
                this.getProducts()
              } else {
                this.notificationService.showError(data.msg);
              }
            });
        }
      }
    });
  }

  // Método para cambiar de página
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getProducts(); // Actualizar la lista de productos cuando cambie la página
  }
}
