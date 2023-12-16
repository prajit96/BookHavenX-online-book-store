import { Component, OnInit } from '@angular/core';
import { ReadingListService } from '../../core/services/reading-list.service';
import { Router } from '@angular/router';
import { ToastrService} from "ngx-toastr"

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
  loading: boolean = false;
  loadingrlDelete: boolean = false;
  booksLoading: boolean = false;
  isModalOpen: boolean = false;
  isViewBooksModalOpen: boolean = false;
  openTab: string = "all";
  publicLists: any = [];
  privateLists: any = [];
  books: any = [];
  listTitleInp : string = "";
  readingListID : string = "";
  bookTitle : string = "Books";
  constructor(private readingListService: ReadingListService, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    this.getPublicLists()
  }

  handleAllTab(){
    this.openTab = "all"
  }

  handleYourTab(){
    this.getPrivateList()
    this.openTab = "your"
  }

  handleDeleteRL(rlID: string){
    this.readingListService.deleteArL(rlID).subscribe((res)=>{
      this.toastr.error("Deleted Successfully")
      this.getPrivateList();
      this.getPublicLists();
    },
    (err)=>{
      console.log(err)
    })
  }

  closeModal(){
    this.isModalOpen = false;
  }

  openModal(){
    this.isModalOpen = true;
  }

  createReadingList(){
    if(this.listTitleInp){
      this.createAReadingList(this.listTitleInp);
      this.isModalOpen = false;
    }
  }

  viewListBtn(id:string){
    this.isViewBooksModalOpen = true;
    this.readingListID = id;
    this.getBooksWithReadingListID();
  }

  seeBookDetails(bookID:string){
    this.router.navigate(["books", bookID])
  }

  closeViewListModal(){
    this.isViewBooksModalOpen = false;
  }

  openViewListModal(){
    this.isViewBooksModalOpen = true;
  }

  getPublicLists(){
    this.loading = true;
    this.readingListService.getAllReadingLists().subscribe((res)=>{
      this.publicLists = res;
      this.loading = false;
    },
    (err) => {
      console.log(err)
      this.loading = false;
    })
  }

  getPrivateList(){
    this.loading = true;
    this.readingListService.getPrivateList().subscribe((res)=>{
      this.privateLists = res;
      this.loading = false;
    },
    (err) => {
      console.log(err)
      this.loading = false;
    })
  }

  createAReadingList(title: string){
    this.readingListService.createReadingList(title).subscribe((res)=>{
      this.toastr.success(`${title} Created Successfully`)
      this.getPrivateList()
      this.getPublicLists();
    },
    (err)=> {
      console.log(err)
    })
  }

  getBooksWithReadingListID(){
    this.booksLoading = true;
    this.readingListService.getBooks(this.readingListID).subscribe((res)=>{
      this.bookTitle = res.title;
      this.books = res.books;
      this.booksLoading = false;
    },
    (err)=>{
      console.log(err)
      this.booksLoading = false;
    })
  }

}
