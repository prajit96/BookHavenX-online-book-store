import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { ToastrService} from "ngx-toastr"



const avatars = [
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.1257944628.1683352118",
  "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436189.jpg?size=626&ext=jpg&ga=GA1.1.1257944628.1683352118",
  "https://img.freepik.com/free-psd/3d-illustration-person-with-pink-hair_23-2149436186.jpg?size=626&ext=jpg&ga=GA1.1.1257944628.1683352118",
  "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?size=626&ext=jpg&ga=GA1.1.1257944628.1683352118"
]


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})


export class MyprofileComponent implements OnInit {
  user = {
    image: "",
    role: 'reader',
    username: '',
    email: '',
    password: '',
  };
  avatars: string[] = avatars;
  loading: boolean = false;
  usernameloading: boolean = false;
  usernameError: string = '';
  passwordError: string = '';
  usernameAvailable: boolean = false;
  updated: boolean = false;
  edit: boolean = false;
  setTimeoutID: any = null;
  selectedAvatar: string = "";


  constructor(private userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getUserDetails()
  }

  handleEditIcon(){
    this.edit = !this.edit
  }

  selectAvatar(avatar: string, select: string){
    this.selectedAvatar = select;
    this.user.image = avatar;
  }

  checkUsernameAvailability() {
    this.debounce(this.checkUsername, 1000)
  }

  checkPasswordStrength(){
    this.isStrongPassword(this.user.password)
  }

  submitForm() {
    if(this.user.role && this.user.image && this.user.username && this.user.email && this.user.password){
      console.log("user: ", this.user)
      this.loading = true;
      this.userService.updateUserDetails(this.user).subscribe((res)=>{
        this.updated = res.updated;
        if(res.updated){
          this.toastr.success(res.message)
          this.edit = false;
          this.getUserDetails();
        }
        this.loading = false;
      },
      (err)=>{
        console.log(err)
        this.loading = false;
      })
    }
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

  isStrongPassword(password: string): void {
    // Minimum length of 6, at least 1 special character, 1 number, and 1 uppercase letter
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[A-Z]).{6,}$/;
    
    this.passwordError =  passwordRegex.test(password) ? "" : "must contain one uppercase, one number, one special character";
  }

  getUserDetails(){
    this.loading = true;
    this.userService.getUserProfile().subscribe((res)=>{
      this.user = {
        image: res.image,
        username: res.username,
        role: res.role,
        email: res.email,
        password: ""
      };
      this.loading = false;
    },
    (err)=> {
      console.log(err);
      this.loading = false;
    });
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
