import { Component, OnInit, Input } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

}
