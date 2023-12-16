import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { PurchaseService } from '../../core/services/purchase.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  delivery_address:string =  "";
  pincode:number | string =  "";
  cardholder:string =  "";
  cardNumber:number | string =  "";
  cardType:string = "";
  expiry_date:string =  "";
  cvv:number | string = "";
  books: any = [];
  mapppedBooks: any = [];
  totalAmount: number = 0;
  loading: boolean = false;

  constructor(private router: Router, private cartService: CartService, private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.cartService.getItemsOfCart().subscribe((res)=>{
      this.books = res.items;
      this.mapBooks();
    },
    (err)=>{
      console.log(err)
    })
  }

  onSubmit(){
    this.totalAmount = this.cartService.getTotalAmount()
    if(this.delivery_address && this.pincode && this.cardNumber && this.cardholder && this.cardType && this.expiry_date && this.cvv){
      let payload = {
        delivery_address: this.delivery_address,
        pincode: this.pincode,
        books: this.mapBooks(),
        amount: this.totalAmount,
        payment_details: [this.cardholder , this.cardNumber ],
      }
      this.loading = true;
      this.purchaseService.createPurchase(payload).subscribe((res)=>{
        this.loading = false;
        this.cartService.clearCartAfterPurchase().subscribe((res)=>{
        },
        (err)=>{
          console.log(err)
        })
        this.router.navigate(["order-confirmed"])
      },
      (err)=>{
        console.log(err)
        this.loading = false;
      })
    }
  }

  mapBooks(){
    let mappedBooks = this.books.map((item: any)=>{
      return {...item.book, quantity: item.quantity}
    })
    return mappedBooks;
  }

  handleValidCardNo(){
    this.cardNumber = +this.cardNumber.toString().replace(/\D/g, "").slice(0, 16)

  }
}
