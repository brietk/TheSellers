import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//dabs segir að þetta eigi að vera í sér skrá.
import { SellerProduct } from '../sellers.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product: SellerProduct;

  @Output()
  productUpdated = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  OnEdit() {
    //samtalsglugga væri hægt - nuna harðkoða
    //her erum við að syna að það hafa orðnar breytingar með harðkoða
    this.product.name = "smuu";
    this.productUpdated.emit(this.product);
  }

}
