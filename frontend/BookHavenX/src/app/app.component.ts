import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initFlowbite } from 'flowbite';
import { AppState } from './store/app.state';
import { Router } from '@angular/router';
import { LocalStorageService } from './core/services/local-storage.service';
import { UserService } from './core/services/user.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('dropdownAnimation', [
      state('closed', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden',
      })),
      state('open', style({
        height: '*',
        opacity: '1',
      })),
      transition('closed <=> open', [
        animate('0.1s ease-in-out'),
      ]),
    ]),
  ],
  
})
export class AppComponent implements OnInit {
  title = 'BookHavenX';
  isAuth: boolean = false;
  user:any = {username: ""};

  isOpen = false;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    if(!this.isOpen){
      this.getUserDetails();
    }
  }

  constructor(private store: Store<AppState>, private router: Router, private localStorageService: LocalStorageService, private userService: UserService){}

  ngOnInit(): void {
    initFlowbite();
    this.store.select((state)=> state.auth.token).subscribe((token)=>{
      if(token){
        this.isAuth = true;
      }
    })
 
  }

  profileBtn(){
    this.isOpen = false;
    this.router.navigate(["profile"])
  }

  handleLogout = ()=>{
    this.isAuth = false;
    this.localStorageService.remoteItem("token");
    this.localStorageService.remoteItem("user");
    this.router.navigate(["/"])
    this.isOpen = false;
  }

  getUserDetails(){
    this.userService.getUserProfile().subscribe((res)=>{
      this.user = res;
    })
  }
}
