import { Component, Input, Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ReadingListService } from '../../../core/services/reading-list.service';
import { ToastrService} from "ngx-toastr"

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() item: any = {};
  @Input() openModalInput: any;
  isModalOpen: boolean = false;
  readinglist:any= [];
  loading: boolean = false;


  constructor(private router: Router, private cartService: CartService, private readingListService: ReadingListService, private toastr: ToastrService){}

  addToCart(){
    this.cartService.addToCart(this.item).subscribe((res)=>{
      if(!res.added){
        this.toastr.error(res.message);
      }
      if(res.added){
        this.toastr.success(res.message);
      }
    },
    (err)=>{
      console.log(err)
    })
  }

  openModal(bookID: string){
    this.getReadingLists();
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

  handleAddBookToRL(rlID: string, rLtitle: string){
    this.readingListService.addABookToRL(rlID, this.item._id).subscribe((res)=>{
      if(!res.added){
        this.toastr.error(`${res.msg} ${rLtitle}`)
      }
      if(res.added){
        this.toastr.success(`${res.msg} ${rLtitle}`)
      }
    },
    (err)=>{
      console.log(err)
    })
  }


  handleViewDetails(){
    this.router.navigate(['/books', this.item._id]);
  }


  getReadingLists(){
    this.loading = true;
    this.readingListService.getPrivateList().subscribe((res)=>{
      // console.log(res);
      this.readinglist = res;
      this.loading = false;
    },
    (err)=>{
      console.log(err)
      this.loading = false;
    })
  }
}
