import { Component } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { ToastrService} from "ngx-toastr"

@Component({
  selector: 'app-userlists',
  templateUrl: './userlists.component.html',
  styleUrl: './userlists.component.css'
})
export class UserlistsComponent {
  loading: boolean = false;
  users: any = [];
  constructor(private userService: UserService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.getAllUsers()
  }

  deleteUser(userID: string){
    this.userService.deleteUser(userID).subscribe((res)=>{
      this.toastr.error("User deleted successfully")
      this.getAllUsers()
    },
    (err)=> {
      console.log(err)
    })
  }

  getAllUsers(){
    this.loading = true;
    this.userService.getAllUsers().subscribe((res)=>{
      this.users = res.users;
      this.loading = false;
    },
    (err)=> {
      console.log(err)
      this.loading = false;
    })
  }
}
