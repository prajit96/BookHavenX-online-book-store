import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ToastrService} from "ngx-toastr"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = {
    role: 'reader',
    username: '',
    email: '',
    password: '',
  };
  loading: boolean = false;
  usernameloading: boolean = false;
  usernameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  usernameAvailable: boolean = false;
  registered: boolean = false;
  setTimeoutID: any = null;


  constructor(private userService: UserService, private toastr: ToastrService) {}

  checkUsernameAvailability() {
    this.debounce(this.checkUsername, 1000)
  }

  checkEmailValidation(){
   this.isValidEmail(this.user.email)
  }

  checkPasswordStrength(){
    this.isStrongPassword(this.user.password)
  }

  submitForm() {
    if(this.user.role && this.user.username && this.user.email && this.user.password){
      this.loading = true;
      this.userService.signup(this.user).subscribe((res)=>{
        if(!res.registered){
          this.toastr.error(res.msg);
        }
        if(res.registered){
          this.toastr.success(res.message)
        }
        this.registered = res.registered;
        this.emailError = res.registered ? "" :  "account already exists"
        this.loading = false;
      },
      (err)=>{
        console.log(err)
        this.loading = false;
      })
    } 
    this.user = {username: "", role:"reader", email: "", password: ""}
  }

  checkUsername = ()=>{
    this.usernameloading = true;
    this.userService.checkUsername(this.user.username).subscribe(
      (res) => {
        this.usernameAvailable = res.available;
        this.usernameError = res.available ? '' : 'username not available';
        this.usernameloading = false;
      },
      (error) => {
        console.error('Error checking username availability', error);
        this.usernameError = 'Error checking username availability';
        this.usernameloading = false;
      }
    );
  }

  isValidEmail(email: string): void{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = emailRegex.test(email) ? "" : "enter valid email address";
  }

  isStrongPassword(password: string): void {
    // Minimum length of 6, at least 1 special character, 1 number, and 1 uppercase letter
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[A-Z]).{6,}$/;
    
    this.passwordError =  passwordRegex.test(password) ? "" : "must contain one uppercase, one number, one special character";
  }


  debounce(func: any, delay: number){
    if(this.setTimeoutID){
      clearTimeout(this.setTimeoutID);
    }

    this.setTimeoutID = setTimeout(()=>{
      func();
    }, delay)
  }
}
