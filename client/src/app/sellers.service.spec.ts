/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { SellersService, Seller, SellerProduct } from './sellers.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions,RequestOptions, RequestMethod } from  '@angular/http';
import { Observable } from 'rxjs/Observable';

describe('SellersService', () => {
  let mockSeller  = {
    name: 'Dabs',
    category: 'forritari',
    imagePath:''
  };
  let mockSellerProduct  = {
    name: 'glas',
    price: '200',
    quantityInStock: '200',
    path: ''
  };
    let mockSeller2  = {
    id: 1,
    name: 'Dabs',
    category: 'forritari',
    imagePath:''
  };
  let mockSellerProduct2 = {
    name: 'glas',
    price: '200',
    quantityInStock: '200',
    imagePath: ''
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellersService, MockBackend, BaseRequestOptions, {
        provide: Http,
        useFactory: (mockBackend: MockBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(mockBackend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }], 
    });
  });

  describe('GET for sellers and products', () => {
    it('Get all sellers - should try to get request to proper url', 
    inject([SellersService, MockBackend], fakeAsync((service: SellersService, backend: MockBackend) => {
        backend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:5000/api/sellers');
          expect(connection.request.method).toBe(RequestMethod.Get);
        });
        service.getSellers();
      }))
    );

    it('Get seller with id, id = 1 here, should try to get request to proper url', 
    inject([SellersService, MockBackend], fakeAsync((service: SellersService, backend: MockBackend) => {
        backend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:5000/api/sellers/1');
          expect(connection.request.method).toBe(RequestMethod.Get);
        });
        service.getSellerById(1);
      }))
    );
  
    it('Get all products from a given seller, id = 1 here, should try to get request to proper url', 
    inject([SellersService, MockBackend], fakeAsync((service: SellersService, backend: MockBackend) => {
        backend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:5000/api/sellers/1/products');
          expect(connection.request.method).toBe(RequestMethod.Get);
        });
        service.getSellerProducts(1);
      }))
    );
  });

  describe('POST for sellers and products', () => {
    it('should Post a seller, should try to get request to the proper URL', 
    inject([SellersService, MockBackend], fakeAsync((service: SellersService, backend: MockBackend) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe("http://localhost:5000/api/sellers");
      expect(connection.request.method).toBe(RequestMethod.Post);
          expect(connection.request.text()).toBe(JSON.stringify(mockSeller));
    });
    service.postSeller(2,'Dabs', 'forritari', '');
  })));


  it('should Post a product where sellerid = 1, should try to get request to the proper URL ', 
  inject([SellersService, MockBackend], fakeAsync((service: SellersService, backend: MockBackend) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe("http://localhost:5000/api/sellers/1/products");
      expect(connection.request.method).toBe(RequestMethod.Post);
          expect(connection.request.text()).toBe(JSON.stringify(mockSellerProduct));
    });
    service.postProduct(1,'glas','200','200', '');
  })));
  });

 describe('PUT for sellers and products', () => {
    it('should Put(change) a seller, should try to get request to the proper URL', 
    inject([SellersService, MockBackend], fakeAsync((service: SellersService, backend: MockBackend) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe("http://localhost:5000/api/sellers/1");
      expect(connection.request.method).toBe(RequestMethod.Put);
          expect(connection.request.text()).toBe(JSON.stringify(mockSeller2));
    });
    service.putSeller(1,'Dabs', 'forritari', '');
  })));
  it('should Put(change) a product of seller 1 and product 1, should try to get request to the proper URL', 
    inject([SellersService, MockBackend], fakeAsync((service: SellersService, backend: MockBackend) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe("http://localhost:5000/api/sellers/1/products/1");
      expect(connection.request.method).toBe(RequestMethod.Put);
      expect(connection.request.text()).toBe(JSON.stringify(mockSellerProduct2));
    });
    service.putProduct(1, 1, 'glas', '200', '200', '');
  })));
 });

  describe('DELETE for products', () => {
     it('should Delete a product 1 of seller 1 , should try to get request to the proper URL', 
    inject([SellersService, MockBackend], fakeAsync((service: SellersService, backend: MockBackend) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe("http://localhost:5000/api/sellers/1/products/1");
      expect(connection.request.method).toBe(RequestMethod.Delete);
    });
    //returns nothing - product is deleted
    service.deleteProduct(1, 1);
  })));
 });

  it('should ...', inject([SellersService], (service: SellersService) => {
    expect(service).toBeTruthy();
  }));
});