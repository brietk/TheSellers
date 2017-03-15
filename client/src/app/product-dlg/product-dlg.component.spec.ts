/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDlgComponent } from './product-dlg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProductDlgComponent', () => {
  let component: ProductDlgComponent;
  let fixture: ComponentFixture<ProductDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDlgComponent],
      imports: [ReactiveFormsModule],
      providers: [NgbActiveModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
