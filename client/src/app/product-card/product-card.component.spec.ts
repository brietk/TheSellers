import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCardComponent } from './product-card.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { HttpModule, Http } from '@angular/http';
import { Router, ActivatedRoute, RouterModule, Routes } from "@angular/router";
import { SellersService, Seller } from '../sellers.service';
import { Observable } from "rxjs/Rx";
import { SellersComponent } from '../sellers/sellers.component';
import { ProductsComponent, OrderBy } from '../products/products.component';

class SellersServiceMock {
  value: Seller;
   postSeller(id: number, name: string, category: string, imagePath: string): Observable<Seller> {
      return Observable.of(this.value);
    }
}

var mockRouter = {
  navigate: jasmine.createSpy("navigate")
}

var mockModal = {
    modalservice: jasmine.createSpy("modalservice")
};

let mockService = new SellersServiceMock();

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardComponent, SellersComponent, ProductsComponent, OrderBy ],
      imports: [RouterModule, ToastModule.forRoot(), RouterModule.forRoot([{
      path: "",
      redirectTo: "sellers",
      pathMatch: "full"
    }, {
      path: "sellers",
      component: SellersComponent
    }, {
      path: "sellers/:id",
      component: ProductsComponent
    },{
      path: "sellers/:id/products",
      component: ProductsComponent
      }]) 
      ],
      //imports: [ToastModule.forRoot(), NgbModule.forRoot(), HttpModule, RouterModule],
      providers: [{
        provide: SellersService,
        useValue: mockService
      }, {
        provide: NgbModal,
        useValue: mockModal
      },
      {
        provide: Router,
        useValue: mockRouter
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
