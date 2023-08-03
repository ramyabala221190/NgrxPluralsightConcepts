import { Component, OnInit, OnDestroy, Input, SimpleChange, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';
import { Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { Product } from '../product';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductEditComponent implements OnInit, OnDestroy { 
  pageTitle = 'Product Edit';
  errorMessage = '';
  productForm: FormGroup;

  @Input('selectedProduct')selectedProduct: Product | null;
  @Output('deleteProduct$')deleteProduct$=new EventEmitter<Product>();
  @Output('createProduct$')createProduct$=new EventEmitter<Product>();
  @Output('updateProduct$')updateProduct$=new EventEmitter<Product>();
  @Output('clearProduct$')clearProduct$=new EventEmitter<any>();



  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnChanges(changes:SimpleChange){
    this.displayProduct(this.selectedProduct);
  }

  ngOnInit(): void {
    // Define the form group
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ''
    });

    // Watch for changes to the currently selected product
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.displayProduct(currentProduct)
    // );
    // this.product$=this.store.select(getCurrentProduct)
    // .pipe(
    //   tap((currentProduct:Product)=>{
    //     this.displayProduct(currentProduct);
    //   })
    // )

    // Watch for value changes for validation
    this.productForm.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.productForm)
    );
  }

  ngOnDestroy(): void {
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.productForm);
  }

  displayProduct(product: Product | null): void {
    // Set the local product property
    //this.product = product;

    if (product) {
      // Reset the form back to pristine
      this.productForm.reset();

      // Display the appropriate page title
      if (product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${product.productName}`;
      }

      // Update the data on the form
      this.productForm.patchValue({
        productName: product.productName,
        productCode: product.productCode,
        starRating: product.starRating,
        description: product.description
      });
    }
  }

  cancelEdit(product: Product): void {
    // Redisplay the currently selected product
    // replacing any edits made
    this.displayProduct(product);
  }

  deleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        this.deleteProduct$.emit(product)
        // this.store.dispatch(ProductActions.deleteProduct({currentProductId:product.id}));
       
      }
    } else {
      // No need to delete, it was never saved
     // this.clearProduct()
     this.clearProduct$.emit()
    }
  }

  saveProduct(originalProduct: Product): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const product = { ...originalProduct, ...this.productForm.value };

        if (product.id === 0) {
          this.createProduct$.emit(product)
          // this.store.dispatch(ProductActions.createProduct({product:product}));
        } else {
         // this.store.dispatch(ProductActions.updateProduct({product:product}));
         this.updateProduct$.emit(product)
        }
      }
    }
  }

  

}
