import { Component, OnInit } from '@angular/core';
import { SellersService, Seller } from './sellers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Söluaðilar!';

// array
  private sellers: Seller[];
 // private seller: Seller;

  constructor(private service: SellersService) {}

  ngOnInit(){
    this.service.getSellers().subscribe(result => {
      this.sellers = result;
    });

    //harðkoðað með 2 - værum að sækja úr urlinu og fa þar svar
    /*var successHandler =(result) => {
      this.seller = result;
    };

    var errorHandler = (err) => {
      //TODO display toastr
      console.log("Something failed");
    };
    this.service.getSellerById(2).subscribe(successHandler, errorHandler);*/
    /*this.service.getSellerById(2).subscribe(result => {
      this.seller = result;
    })*/
  }

}
