import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
<<<<<<< HEAD
    modalInstance.componentInstance.isEditMode = false;
    //modalInstance.componentInstance.name =  "Súkkulaðirúsínur";
    //modalInstance.componentInstance.price = 500;
    //modalInstance.componentInstance.quantityInStock = 40;
=======
    modalInstance.componentInstance.name =  "";
    modalInstance.componentInstance.price = "";
    modalInstance.componentInstance.quantityInStock = "";
>>>>>>> 785d66620f1d8c108d871fe912085a759b6335fe
  
  modalInstance.result.then(obj =>{
    console.log("Dialog was closed using OK");
    this.service.postProduct(this.id2, obj.name, obj.price, obj.quantityInStock, obj.imagePath).subscribe(data => {
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

  showSuccess() {
    alert("haaaa");
        this.toastr.success('You are awesome!', 'Success!');
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
  
