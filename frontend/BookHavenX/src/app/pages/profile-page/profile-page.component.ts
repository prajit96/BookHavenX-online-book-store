import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  user: any = {image: "", username: "user", role: "role", password: ""};
  loading: boolean = false;
  tabOpen: string = "myprofile"
  role: string = "reader"
  constructor(private userService: UserService, private localStorageService: LocalStorageService, private router: Router, private store: Store<AppState>){}

  ngOnInit(): void {
    this.getUserRole();
    this.getUserDetails();
  }

  myProfile(){
    this.tabOpen = "myprofile"
  }

  orders(){
    this.tabOpen = "orders"
  }

  savedAddresses(){
    this.tabOpen = "addresses"
  }

  books(){
    this.tabOpen = "books"
  }

  userlists(){
    this.tabOpen = "userlists"
  }

  getUserRole(){
    this.store.select((state)=> state.auth.role).subscribe((res)=>{
      this.role = res;
    })
  }

  getUserDetails(){
    this.loading = true;
    this.userService.getUserProfile().subscribe((res)=>{
      this.user = res;
      this.loading = false;
    },
    (err)=> {
      console.log(err);
      this.loading = false;
    });
  }
}
