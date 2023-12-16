import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {Observable, ObservableLike} from "rxjs"

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiLogin = "https://bookhavenx-be.onrender.com/users";
  private token: string = "";
  private userID: string = "";
  constructor(private http: HttpClient, private store: Store<AppState>) { }

  login(email:string, password: string){
    return this.http.post<any>(`${this.apiLogin}/login`, {email, password})
  }

  getUserProfile(){
    this.getUserID()
    this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.apiLogin}/${this.userID}`, {headers});
  }

  checkUsername(username: string): Observable<any>{
    return this.http.get<any>(`${this.apiLogin}/check-username/${username}`)
  }

  signup(payload:{username: string, role: string, email: string, password: string}): Observable<any>{
    return this.http.post<any>(`${this.apiLogin}/signup`, payload)
  }

  updateUserDetails(payload: any): Observable<any>{
    this.getUserID()
    this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this.http.patch(`${this.apiLogin}/update/${this.userID}`, payload, {headers})
  }

  getAllUsers(): Observable<any>{
    this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(this.apiLogin, {headers})
  }

  deleteUser(userID: string): Observable<any>{
    this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete(`${this.apiLogin}/delete/${userID}`, {headers})
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
