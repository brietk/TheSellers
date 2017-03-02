import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { SellersService } from './sellers.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { SellerDlgComponent } from './seller-dlg/seller-dlg.component';
import { SellersComponent } from './sellers/sellers.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    SellerDlgComponent,
    ProductCardComponent,
    SellersComponent,
    ProductsComponent,
    SellersComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
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
  entryComponents: [SellerDlgComponent, ProductCardComponent]
})
export class AppModule { }
