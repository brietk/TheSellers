import { Component, OnInit } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  products: SellerProduct[];
  //sellers: Seller[];
  private seller: Seller;
  
  id2: number;
  name: Seller;
  error: string;

  constructor(private modalService: NgbModal, private service: SellersService, 
  private router: Router,  private route: ActivatedRoute) { }

  refreshList(){
      this.service.getSellerProducts(this.id2).subscribe(result => {
      this.products = result;
    });
  }

  ngOnInit() {
    this.id2 = this.route.snapshot.params['id'];
    console.log("sellerrid " + this.id2);
    this.refreshList();

    var successHandler = (result)=> { this.seller = result;}
    var errorHandler = (err) => { 
      console.log("something failed with status: " + err.status);
      if(err.status == 404) {
        console.log("yes, it faild");
        this.error = "Sorry seller with id: " + this.id2 + " does not exist";
      }
    }
    this.service.getSellerById(this.id2).subscribe(successHandler, errorHandler);
  }

  addProduct() {

    const modalInstance = this.modalService.open(ProductDlgComponent);
    modalInstance.componentInstance.productName =  "Súkkulaðirúsínur";
    modalInstance.componentInstance.price = 500;
    modalInstance.componentInstance.quantityInStock = 40;
  
  modalInstance.result.then(obj =>{
    console.log("Dialog was closed using OK");
    this.service.postProduct(this.id2, obj.productName, obj.price, obj.quantityInStock, obj.imagePath).subscribe(data => {
    this.refreshList();
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
