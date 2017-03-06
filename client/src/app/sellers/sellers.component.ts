import { Component, OnInit } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';
import { Router, ActivatedRoute } from "@angular/router";

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
  private router: Router,  private route: ActivatedRoute) { }

refreshList(){
      this.service.getSellers().subscribe(result => {
      this.sellers = result;
    });
}

  ngOnInit() {
    //this.id = this.route.snapshot.params['id'];
    //console.log("sellerrid " + this.id);
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
    this.service.postSeller(this.id, obj.name, obj.category, obj.imagePath).subscribe(data => {
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