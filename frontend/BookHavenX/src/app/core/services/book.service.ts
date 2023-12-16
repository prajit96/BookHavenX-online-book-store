import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {Observable, Subject, takeUntil, catchError, throwError} from "rxjs";
import { BookInterface } from '../../store/books/books.state';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class BookService implements OnDestroy {
  private api = "https://bookhavenx-be.onrender.com/books"
  private destroy$: Subject<void> = new Subject<void>()
  genre: string = "";
  private token: string = "";
  private role: string = "";

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  getBoooks(payload: any): Observable<{books: BookInterface[], totalPages: number}>{
    this.genre = payload.query;
    let newAPI = this.api;
    const params: { [key: string]: string | string[] } = {};

    if (payload.query) {
      params['query'] = payload.query;
    }
  
    if (payload.sort && payload.order) {
      params['sort'] = payload.sort;
      params['order'] = payload.order;
    }

    const httpParams = new HttpParams({ fromObject: params });

    return this.http.get<{books: BookInterface[], totalPages: number}>(newAPI, {params: httpParams})
    .pipe(
      takeUntil(this.destroy$),
      catchError((err)=> {
        console.log(err)
        return throwError("An error occurred during data retrieval")
      })
    )
  } 

  getSingleBook(id: string): Observable<BookInterface>{
    return this.http.get<BookInterface>(`${this.api}/${id}`);
  }

  getAllBooks():Observable<any>{
    this.getToken();
    this.getUserRole();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    if(this.role === "author"){
      return this.http.get<any>(`${this.api}/author-books`, {headers})
    }

    return this.http.get<{books: BookInterface[], totalPages: number}>(this.api)

  }

  publishBook(payload: any): Observable<any>{
    this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.api}/add`, payload, {headers} )
  }

  deleteABook(bookID: string): Observable<any>{
    this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete<any>(`${this.api}/delete/${bookID}`, {headers})
  }

  
  getToken(): void{
    this.store.select((state)=> state.auth.token).subscribe((token)=>{
      this.token = token 
    })
  }

  getUserRole(): void{
    this.store.select((state)=> state.auth.role).subscribe((role)=>{
      this.role = role 
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getGenre(): string{
    return this.genre;
  }

  setGenre(value: string){
    this.genre = value;
  }
}
