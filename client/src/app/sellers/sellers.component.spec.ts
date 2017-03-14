/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager, ToastOptions, ToastModule } from 'ng2-toastr/ng2-toastr';
import { SellersComponent } from './sellers.component';
import { SellersService, Seller } from '../sellers.service';
import { Observable } from "rxjs/Rx";
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, RouterModule, Routes } from "@angular/router";

//NgbModal
//SellersService
//router
//ActivatedRoute

class SellersServiceMock {
  value: Seller;
   postSeller(id: number, name: string, category: string, imagePath: string): Observable<Seller> {
      return Observable.of(this.value);
    }
}

class mockHTTP {
  
}

var mockModal = {
    modalservice: jasmine.createSpy("modalservice")
};

var mockRouter = {
  navigate: jasmine.createSpy("navigate")
}

let mockService = new SellersServiceMock();

describe('SellersComponent', () => {
  const mockService = {
    successGetSellerId: true,
    success: true,
    sellersList: [{
      id: 1,
      name: "Hannes",
      category: "test",
      imagePath: ""
    }],
    //þurfum að sækja toastr gögn, hvernig sem það er nú gert

    getSellers: function() {
      return {
        subscribe: function (fnSuccess, fnError) {
          if (mockService.successGetSellerId === true) {
            fnSuccess(mockService.sellersList);
          } else {
            fnError();
          }
        }
      }
    },
    getSellerById: function (id) {
      return {
        subscribe: function (fnSuccess, fnError) {
          if (mockService.successGetSellerId === true) {
            fnSuccess(mockService.sellersList);
          } else {
            fnError();
          }
        }
      }
    },
  }

  let component: SellersComponent;
  let fixture: ComponentFixture<SellersComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, ToastModule.forRoot()],
      declarations: [SellersComponent],
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
    fixture = TestBed.createComponent(SellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('add seller', () => {
    mockService.successGetSellerId = true;
    //mockService.sellersList = [];

    it("it should display a modal dialog if the user tries to add a new seller", inject([SellersService,  NgbModal], (ngbModal: NgbModal, sellersService: SellersService) => {
      spyOn(mockService, 'postSeller').and.returnValue(Observable.of(this.value));
      spyOn(mockModal, 'modalservice').and.returnValue("");
      mockService.successGetSellerId = true;
      component.addSeller();
      expect(mockModal.modalservice).toHaveBeenCalled();
    }));

    xit("it should try to add a new seller if the modal dialog is closed using the OK button", inject([ToastsManager, SellersService], (toastsManager: ToastsManager, sellersService: SellersService) => {
      spyOn(mockService, 'addSeller').and.returnValue(Observable.of(this.value));
      
      mockService.successGetSellerId = false;
      component.addSeller();
      //expect().toHaveBeenCalled();
    }));
  });


/*describe("should test if user with id exists", () => {
    mockService.successGetSellerId = true;
    mockService.sellersList = [];
    xit("when sellers service returns seller with given id", inject([Router], (router: Router) => {
      spyOn(mockService, "successGetSellerId").and.returnValue(Observable.of(true));
      mockService.successGetSellerId = true;
      expect(router.navigate).toHaveBeenCalled();
      //gera inspect að það element se bara synilegt en ekki annap'?
    }))
  });
});*/


/*when sellers service returns empty ist of products", () => {
    mockService.successGetSellerId = true;
    mockService.sellersList = [];
    it("should display a message indicating that no produucts are to be displayed", () => {
      //gera inspect að það element se bara synilegt en ekki annap'?*/

    })