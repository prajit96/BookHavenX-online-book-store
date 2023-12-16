import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { loginRequest } from '../../../store/auth/auth.actions';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  emailError: string = '';

  constructor(private store: Store<AppState>, private userService: UserService){}

  onSubmit(){
    if(this.email && this.password){
      let props = {
        email: this.email,
        password: this.password
      }
      this.store.dispatch(loginRequest(props))
    }
  }

  checkEmailValidation(){
    this.isValidEmail(this.email)
  }

  isValidEmail(email: string): void{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = emailRegex.test(email) ? "" : "enter valid email address";
  }
}
