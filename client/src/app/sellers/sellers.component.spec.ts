/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";

import { SellersComponent } from './sellers.component';
import { SellersService } from '../sellers.service';
import { Observable } from "rxjs/Rx";

//NgbModal
//SellersService
//router
//ActivatedRoute
describe('SellersComponent', () => {
  const mockService = {
    successGetSellerId: true,
    sellersList: [{
      id: 1, 
      name: "Hannes",
      category: "test",
      imagePath: ""
    }],
    getSellerById: function(id) {
      return {
        subscribe: function(fnSuccess, fnError) {
          if(mockService.successGetSellerId === true) {
            fnSuccess(mockService.sellersList);
          } else {
            fnError(); 
          }
        }
      }
    }

  }


  let component: SellersComponent;
  let fixture: ComponentFixture<SellersComponent>;

  var mockModal = {
//modalservice hvða er það?? það er notað til að opna sellerdlgcomponent
open: jasmine.createSpy("open")
  };
  var mockRouter = {
	navigate: jasmine.createSpy("navigate")	
};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellersComponent ],
      providers: [{
        provide: SellersService,
        useValue: mockService
      }, {
        provide: NgbModal, 
       // useValue:
      },
      {
        provide: Router, 
        useValue: mockRouter
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

//aðra describe blokk ef öfugt (failar)
  describe("should test if user with id exists", () => {
    mockService.successGetSellerId = true;
    mockService.sellersList = [];
    xit("when sellers service returns seller with given id", inject([Router], (router: Router) => {
      spyOn(mockService, "successGetSellerId").and.returnValue(Observable.of(true));
      mockService.successGetSellerId = true;
      expect(router.navigate).toHaveBeenCalled();
      //gera inspect að það element se bara synilegt en ekki annap'?
    }))
  });
});


/*when sellers service returns empty ist of products", () => {
    mockService.successGetSellerId = true;
    mockService.sellersList = [];
    it("should display a message indicating that no produucts are to be displayed", () => {
      //gera inspect að það element se bara synilegt en ekki annap'?

    })*/