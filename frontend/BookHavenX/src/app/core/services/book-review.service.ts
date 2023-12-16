import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';

export interface postBookReviewInterface{
    review: string;
    rating: number;
    bookID: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookReviewService {
  private bookReviewAPI = "https://bookhavenx-be.onrender.com/review"
  private token:string = "";
  constructor(private http: HttpClient, private store: Store<AppState>) { }

  postReview(payload: postBookReviewInterface){
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    
    return this.http.post<any>(`${this.bookReviewAPI}/create`, payload, {headers});
  }

  getReview(id: string): Observable<any>{
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    
    return this.http.get<any>(`${this.bookReviewAPI}/${id}`, {headers});
  }

  setToken(){
    this.store.select((state)=> state.auth.token).subscribe((res)=>{
      this.token = res;
    })
  }


}
