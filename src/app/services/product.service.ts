import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../shared/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl =
    'https://rocketbackend-bf9aa0065d67.herokuapp.com/api/product'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  // Obtener lista de productos paginados y opcionalmente filtrados por término de búsqueda
  getProducts(limit: number, page: number, search?: string) {
    // Construir los parámetros de consulta
    const params = new HttpParams()
      .set('limit', limit.toString()) // Cantidad de productos por página
      .set('page', page.toString()) // Página actual
      .set('search', search?.toString() || ''); // Término de búsqueda (opcional)

    // Agregar los parámetros de consulta a la solicitud GET
    return this.http.get(`${this.baseUrl}`, { params });
  }

  // Obtener un producto por su ID
  getProductById(id: string) {
    // Realizar una solicitud GET al endpoint específico del producto
    return this.http.get(`${this.baseUrl}/by/${id}`);
  }
  // Obtener el historial de un producto por su ID
  getHistoryById(id: string) {
    // Realizar una solicitud GET al endpoint específico del historial del producto
    return this.http.get(`${this.baseUrl}/history/s${id}`);
  }
  // Agregar un nuevo producto
  addProduct(productData: Product) {
    // Realizar una solicitud POST para agregar un nuevo producto
    return this.http.post(`${this.baseUrl}`, productData);
  }

  // Editar un producto existente
  editProduct(productData: Product) {
    // Realizar una solicitud PUT para editar un producto
    return this.http.put(`${this.baseUrl}/edit/`, productData);
  }

  // Eliminar un producto por su ID
  deleteProduct(productId: string) {
    // Realizar una solicitud DELETE para eliminar un producto
    return this.http.delete(`${this.baseUrl}/delete/${productId}`);
  }
}
