import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadingListService {
  private api = "https://bookhavenx-be.onrender.com/reading-lists"
  private token:string = "";
  constructor(private http: HttpClient, private store: Store<AppState>) { }

  getAllReadingLists(): Observable<any>{
    return this.http.get<any>(this.api)
  }

  getPrivateList(): Observable<any>{
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.api}/user`,  {headers})
  }

  createReadingList(title:string): Observable<any>{
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.api}/create`,{title}, {headers})
  }

  getBooks(readingListID: string):Observable<any>{
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.api}/${readingListID}`,  {headers})
  }

  addABookToRL(readingListID: string, bookID: string):Observable<any>{
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.api}/addbook/${readingListID}`, {bookID}, {headers})
  }

  deleteArL(readingListID: string):Observable<any>{
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this.http.delete<any>(`${this.api}/delete/${readingListID}`, {headers})
  }


  setToken(){
    this.store.select((state)=> state.auth.token).subscribe((res)=>{
      this.token = res;
    })
  }
}
