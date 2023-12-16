import { Component } from '@angular/core';
import { BookService } from '../../../../core/services/book.service';
import { ToastrService} from "ngx-toastr"

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  loading: boolean = false;
  loadingPublish: boolean = false;
  books: any = [];
  isModalOpen: boolean = false;
  book: any = {
    image: "",
    title: "",
    author: "",
    genre: "",
    description: "",
    price: ""
  }

  constructor(private bookService: BookService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.getBooks()
  }

  openModal(){
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }
  
  publishBook(){
    if(this.book.image && this.book.title && this.book.genre && this.book.price && this.book.author && this.book.description){
      this.loadingPublish = true;
      this.bookService.publishBook(this.book).subscribe((res)=>{
        this.toastr.success(`${this.book.title} published successfully`)
        this.getBooks();
        this.loadingPublish = false;
        this.isModalOpen = false;
        this.book = {
          image: "",
          title: "",
          author: "",
          genre: "",
          description: "",
          price: ""
        }
      },
      (err)=>{
        console.log(err)
        this.loadingPublish = false;
      })
      
    }
  }

  deleteBook(bookID: string){
    this.bookService.deleteABook(bookID).subscribe((res)=>{
      if(res.deleted){
        this.toastr.error("Book Deleted successfully")
      }
      this.getBooks()
    },
    (err)=> {
      console.log(err)
    })
  }

  getBooks(){
    this.loading = true;
    this.bookService.getAllBooks().subscribe((res)=>{
      this.books = res.books;
      this.loading = false;
    },
    (err)=> {
      console.log(err)
      this.loading = false;
    })
  }
}
