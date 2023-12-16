import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private purchaseAPI = "https://bookhavenx-be.onrender.com/purchase";
  private token: string = "";
  private userID: string = "";

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  getPurchaseList(): Observable<any>{
    this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });


    return this.http.get(this.purchaseAPI, {headers})
  }

  createPurchase(payload: any): Observable<any>{
    this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });


    return this.http.post<any>(`${this.purchaseAPI}/create`, payload , {headers})
  }

  deletePurchase(purchaseID: string) :Observable<any>{
    this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this.http.delete<any>(`${this.purchaseAPI}/delete/${purchaseID}`, {headers})
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
}
