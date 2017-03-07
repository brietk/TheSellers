import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ ToastsManager ]
})

export class ProductsComponent implements OnInit {
  
  products: SellerProduct[];
  private seller: Seller;
  
  id2: number;
  error: string;


  options: ToastOptions = { showCloseButton : false,
                                    animate : "fade",
                                    positionClass: "toast-bottom-right",
                                    maxShown: 5,
                                    newestOnTop: true,
                                    toastLife: 5000,
                                    enableHTML: false,
                                    dismiss: "auto",
                                    messageClass: "ProductAdded",
                                    titleClass: ""};

  constructor(private modalService: NgbModal, private service: SellersService, 
  private router: Router,  private route: ActivatedRoute, public toastr: ToastsManager, 
  vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

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

    modalInstance.componentInstance.isEditMode = false;
    modalInstance.componentInstance.name = "";
    modalInstance.componentInstance.price = "";
    modalInstance.componentInstance.quantityInStock = "";
  
  modalInstance.result.then(obj =>{
    console.log("Dialog was closed using OK");
    this.service.postProduct(this.id2, obj.name, obj.price, obj.quantityInStock, obj.imagePath).subscribe(data => {
    this.refreshList();
    this.toastr.success('Vara skráð!', null, this.options);
      }, error => {
          console.log(error.json());
      });
    console.log(obj);
  }).catch(err => {
    console.log("Dialog was cancelled");
    console.log(err);
  });

}


  showSuccess() {

  
    this.toastr.success('Vara skráð!', null, this.options);
}

  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }
  
  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  }
} 
  
