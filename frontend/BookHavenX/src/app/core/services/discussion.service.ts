import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  private discussionAPI = "https://bookhavenx-be.onrender.com/community"
  private discussionPostAPI = "https://bookhavenx-be.onrender.com/posts"
  private token:string = "";
  private userID: string = "";
  constructor(private http: HttpClient, private store: Store<AppState>) { }

  getAllDiscussions(filterBy: string): Observable<any>{
    this.getUserID();

    const params: { [key: string]: string | string[] } = {};

    if (filterBy === "author") {
      params['role'] = filterBy;
    }
  
    if (filterBy === "user") {
      params['userID'] = this.userID;
    }

    const httpParams = new HttpParams({ fromObject: params });

    return this.http.get<any>(this.discussionAPI ,{params: httpParams})
  } 

  getDiscussionsByBookID(id: string): Observable<any>{
    return  this.http.get<any>(`${this.discussionAPI}/book/${id}`);
  }

  getDiscussionPosts(id: string): Observable<any>{
    return this.http.get<any>(`${this.discussionPostAPI}/${id}`)
  }

  createDiscussionPost(discussionID: string, message: string): Observable<any>{
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    
    return this.http.post<any>(`${this.discussionPostAPI}/create/${discussionID}`, {message}, {headers});
  }

  createDiscussion(payload: {title:string, topic: string, description: string, bookID: string}): Observable<any>{
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    
    return this.http.post<any>(`${this.discussionAPI}/create`, payload, {headers});
  }

  deleteDiscussion(discussionID: string): Observable<any>{
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    
    return this.http.delete<any>(`${this.discussionAPI}/delete/${discussionID}`, {headers});
  }


  setToken(){
    this.store.select((state)=> state.auth.token).subscribe((res)=>{
      this.token = res;
    })
  }

  getUserID(): void{
    this.store.select((state)=> state.auth.userID).subscribe((userID)=>{
      this.userID = userID 
    })
  }
}
