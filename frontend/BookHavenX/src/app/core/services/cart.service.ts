import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartAPI = "https://bookhavenx-be.onrender.com/cart";
  private token: string = "";
  private userID: string = "";
  private totalAmount: number = 0;


  constructor(private http: HttpClient, private store: Store<AppState>) { }


  addToCart(book: any): Observable<any>{
    this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.cartAPI}/add`, {book}, {headers})
  }


  updateQuantity(quantity: number, bookID: string):Observable<any>{
    this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.patch<any>(`${this.cartAPI}/update-quantity/${bookID}`, {quantity}, {headers})
  }

  getItemsOfCart():Observable<any>{
    this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.cartAPI}/items`, {headers})
  }

  removeItemFromCart(bookID: string):Observable<any>{
    this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete<any>(`${this.cartAPI}/remove/${bookID}`, {headers})
  }

  clearCartAfterPurchase():Observable<any>{
    this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.cartAPI}/complete-purchase`, {}, {headers})
  }


  getUserID(): void{
    this.store.select((state)=> state.auth.userID).subscribe((userID)=>{
      this.userID = userID 
    })
  }

  getToken(): void{
    this.store.select((state)=> state.auth.token).subscribe((token)=>{
      this.token = token 
    })
  }

  setTotalAmount(amount: number){
    this.totalAmount = amount;
  }

  getTotalAmount(): number{
    return this.totalAmount;
  }
}
