import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cartData: any = [];
  loading: boolean = false;
  totalPrice: number = 0;

  constructor(private cartService: CartService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.getCartData();
    
  }

  handleQuantity(event:any, bookID:string){
    let quantity = event.target.value;
    quantity = parseInt(quantity);
    this.cartService.updateQuantity(quantity, bookID).subscribe((res)=>{
      this.getCartData();
    },
    (err)=>{
      console.log(err)
    })
  }

  removeCartItem(bookID: string){
    this.cartService.removeItemFromCart(bookID).subscribe((res)=>{
      this.toastr.success("Removed")
      this.getCartData();
    },
    (err)=>{
      console.log(err)
    })
  }

  getCartData(){
    this.loading = true;
    this.cartService.getItemsOfCart().subscribe((res)=>{
      this.cartData = res.items;
      this.calculateTotalPrice();
      this.loading = false;
    },
    (err)=> {
      console.log(err)
      this.loading = false;
    })
  }

  // calculate subtotal
  calculateTotalPrice(){
    this.totalPrice = 0;
    this.cartData.forEach((item: any)=>{
      this.totalPrice = this.totalPrice + (item.book.price * (item.quantity || 1))
    })
    this.cartService.setTotalAmount(this.totalPrice);
  }

}
