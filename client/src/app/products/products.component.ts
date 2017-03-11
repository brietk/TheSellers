import { Component,Pipe,PipeTransform,  OnInit, Input, ViewContainerRef } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';
import { Router, ActivatedRoute } from "@angular/router";
import { SellersComponent } from '../sellers/sellers.component';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { AppComponent }   from '../app.component';

// https://plnkr.co/edit/DHLVc0?p=info
@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {

    static _orderByComparator(a:any, b:any):number{
    
      if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
        //Isn't a number so lowercase the string to properly compare
        if(a.toLowerCase() < b.toLowerCase()) return 1;
        if(a.toLowerCase() > b.toLowerCase()) return -1;
      }
      else{
        //Parse strings as numbers to compare properly
        if(parseFloat(a) < parseFloat(b)) return 1;
        if(parseFloat(a) > parseFloat(b)) return -1;
      }
    
      return 0; //equal each other
    }

    transform(input:any, [config = '+']): any{
        
        if(!Array.isArray(input)) return input;

        if(!Array.isArray(config) || (Array.isArray(config) && config.length == 1)){
            var propertyToCheck:string = !Array.isArray(config) ? config : config[0];
            var desc = propertyToCheck.substr(0, 1) == '-';
            
            //Basic array
            if(!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+'){
                return !desc ? input.sort() : input.sort().reverse();
            }
            else {
                var property:string = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;

                return input.sort(function(a:any,b:any){
                    return !desc 
                        ? OrderBy._orderByComparator(a[property], b[property]) 
                        : -OrderBy._orderByComparator(a[property], b[property]);
                });
            }
        }
        else {
            //Loop over property of the array in order and sort
            return input.sort(function(a:any,b:any){
                for(var i:number = 0; i < config.length; i++){
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];

                    var comparison = !desc 
                        ? OrderBy._orderByComparator(a[property], b[property]) 
                        : -OrderBy._orderByComparator(a[property], b[property]);
                    
                    //Don't return 0 yet in case of needing to sort by next property
                    if(comparison != 0) return comparison;
                }

                return 0; //equal each other
            });
        }
    }
}
    

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ ToastsManager ]
})
export class ProductsComponent implements OnInit {

  products: SellerProduct[];
  sellers: Seller[];
  private seller: Seller;  
  id2: number;
  error: string;
  isEditModeSeller: boolean; 
 
  constructor(private modalService: NgbModal, private service: SellersService, 
  private router: Router,  private route: ActivatedRoute, public toastr: ToastsManager, 
  vcr: ViewContainerRef, private app: AppComponent) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  refreshList(){
      this.service.getSellerProducts(this.id2).subscribe(result => {
      this.products = result;
    });
  }

  refreshListSeller(){
      this.service.getSellerById(this.id2).subscribe(result => {
      this.seller = result;
    });
}

  ngOnInit() {
    this.id2 = this.route.snapshot.params['id'];
    
    console.log("sellerrid " + this.id2);
    this.refreshList();
    this.refreshListSeller();

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
    modalInstance.componentInstance.imagePath="";
  
  modalInstance.result.then(obj =>{
    console.log("Dialog was closed using OK");
    this.service.postProduct(this.id2, obj.name, obj.price, obj.quantityInStock, obj.imagePath).subscribe(data => {
    this.refreshList();
    this.toastr.success('Vara skráð!', null, this.app.options);
      }, error => {
          console.log(error.json());
      });
    console.log(obj);
  }).catch(err => {
    console.log("Dialog was cancelled");
    console.log(err);
  });

}

  editSeller() {

    const modalInstance = this.modalService.open(SellerDlgComponent);
    modalInstance.componentInstance.imagePath = this.seller.id;
    console.log(this.id2);
    modalInstance.componentInstance.name = this.seller.name;
    console.log(this.seller.name);
    modalInstance.componentInstance.category = this.seller.category;
    console.log(this.seller.category);
    modalInstance.componentInstance.imagePath = this.seller.imagePath
    console.log(this.seller.imagePath);
    modalInstance.componentInstance.isEditModeSeller = true;

    modalInstance.result.then(obj => {
      console.log("Dialog was closed using OK");
      this.toastr.success('Seljanda breytt!', null, this.app.options);
      this.service.putSeller(this.seller.id, obj.name, obj.category, obj.imagePath).subscribe(data => {
      this.refreshListSeller();

      
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

  
    this.toastr.success('Vara skráð!', null, this.app.options);
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