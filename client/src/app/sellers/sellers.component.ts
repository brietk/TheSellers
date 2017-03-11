import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { AppComponent }   from '../app.component';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})

export class SellersComponent implements OnInit {

    sellers: Seller[];
    id: number;
    error: string;
    name: Seller;

constructor(private modalService: NgbModal, private service: SellersService, 
  private router: Router,  private route: ActivatedRoute, public toastr: ToastsManager, vcr: ViewContainerRef, private app: AppComponent) {
    this.toastr.setRootViewContainerRef(vcr);
   }


refreshList(){
      this.service.getSellers().subscribe(result => {
      this.sellers = result;
    });
}

  ngOnInit() {
    this.refreshList();

    var successHandler = (result)=> { this.sellers = result;}
    var errorHandler = (err) => { 
      console.log("something failed with status: " + err.status);
      if(err.status == 404) {
        console.log("yes, it failed in sellers.component.ts");
        this.error = "Sorry seller with id: " + this.id + " does not exist";
      }
    }
    this.service.getSellerById(this.id).subscribe(successHandler, errorHandler);
  }
  

  addSeller(){ 
  const modalInstance = this.modalService.open(SellerDlgComponent);
  modalInstance.componentInstance.name =  "";
  modalInstance.componentInstance.category = "";
  modalInstance.componentInstance.imagePath =  "";
   modalInstance.result.then(obj =>{
    console.log("Dialog was closed using OK");
    console.log("Dlg obj: "+obj);
    this.service.postSeller(this.id, obj.name, obj.category, obj.imagePath).subscribe(data => {
      this.refreshList();
      this.toastr.success('Nýjum seljanda bætt við!', null, this.app.options);
    }, error => {
      console.log(error.json());
    });
    
  }).catch(err => {
    console.log("Dialog was cancelled");
    console.log(err);
  });
  
}
  toast()
  {
      this.toastr.success('Nýjum seljanda bætt við!', null, this.app.options);
  }
}