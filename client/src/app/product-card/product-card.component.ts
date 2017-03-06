import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellersService, SellerProduct } from '../sellers.service';
import { Router, ActivatedRoute } from "@angular/router";
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  id2: number;

  @Input()
  product: SellerProduct;

  @Output()
  productUpdated = new EventEmitter();
  constructor(private modalService: NgbModal, private service: SellersService,
    private route: ActivatedRoute, private products: ProductsComponent) { }

  ngOnInit() {
    this.id2 = this.route.snapshot.params['id'];
  }

  OnEdit() {

    const modalInstance = this.modalService.open(ProductDlgComponent);
    modalInstance.componentInstance.name = this.product.name;
    modalInstance.componentInstance.price = this.product.price;
    modalInstance.componentInstance.quantityInStock = this.product.quantityInStock;
    modalInstance.componentInstance.imagePath = this.product.imagePath;
    modalInstance.componentInstance.isEditMode = true;

    modalInstance.result.then(obj => {
      console.log("Dialog was closed using OK");
      this.service.putProduct(this.id2, this.product.id, obj.name, obj.price, obj.quantityInStock, obj.imagePath).subscribe(data => {
        this.products.refreshList();
      }, error => {
        console.log(error.json());
      });
      console.log(obj);
    }).catch(err => {
      console.log("Dialog was cancelled");
      console.log(err);
    });
  }
}
