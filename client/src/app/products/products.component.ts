import { Component, OnInit } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';
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
  constructor(private modalService: NgbModal, private service: SellersService, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.id2 = this.route.snapshot.params['id'];
    console.log("selerrid " + this.id2);
    this.service.getSellerProducts(this.id2).subscribe(result => {
      this.products = result;
    });

    var successHandler = (result)=> { this.seller = result;}
    var errorHandler = (err) => { console.log("something failed");//TODO
  }
    this.service.getSellerById(this.id2).subscribe(successHandler, errorHandler);

  

  }

}

