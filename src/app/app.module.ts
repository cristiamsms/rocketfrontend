import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon'; // Importa MatIconModule
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component'; // Importa ReactiveFormsModule
import { MatDialogModule } from '@angular/material/dialog';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { ChangeHistoryModalComponent } from './components/change-history-modal/change-history-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    EditProductComponent,
    ConfirmationDialogComponent,
    ViewProductComponent,
    ChangeHistoryModalComponent
  ],
  imports: [
    HttpClientModule,
    MatChipsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
