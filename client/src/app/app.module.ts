import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { SellersService } from './sellers.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { SellerDlgComponent } from './seller-dlg/seller-dlg.component';
import { SellersComponent } from './sellers/sellers.component';
import { ProductsComponent } from './products/products.component';
import { ProductDlgComponent } from './product-dlg/product-dlg.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SellerDlgComponent,
    ProductCardComponent,
    SellersComponent,
    ProductsComponent,
    SellersComponent,
    ProductsComponent,
    ProductDlgComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    RouterModule.forRoot([{
      path: "",
      redirectTo: "sellers",
      pathMatch: "full"
    }, {
      path: "sellers",
      component: SellersComponent
    }, {
      path: "sellers/:id",
      component: ProductsComponent
    },{
      path: "sellers/:id/products",
      component: ProductsComponent
    }])
  ],
  providers: [SellersService],
  bootstrap: [AppComponent],
  entryComponents: [SellerDlgComponent, ProductDlgComponent, ProductCardComponent]
})
export class AppModule { }
