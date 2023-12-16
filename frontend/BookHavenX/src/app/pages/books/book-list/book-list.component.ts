import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { BookInterface } from '../../../store/books/books.state';
import { BookService } from '../../../core/services/book.service';
import * as BooksActions from "../../../store/books/books.actions"

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  books:BookInterface[] = [];
  loading: boolean = false;
  sortingOrder: string = '';
  searchInput: string = '';
  categoryValue: string = '';

  constructor(private store: Store<AppState>, private bookService: BookService){}

  ngOnInit(): void {
    this.categoryValue = this.bookService.getGenre();
    this.fetchBooks()
  }

  handleSearch = ()=>{
    this.categoryValue = this.searchInput;
    this.fetchBooks();
  }
  
  handleSortBy = ()=>{
    this.fetchBooks()
  }

  handleFilterCategory = (event:any) => {
    this.categoryValue = event.target.value;
    this.fetchBooks()
  }

  handleRatingCateogry = (event: any)=>{
   
  }

  


  fetchBooks(){
    this.store.dispatch(BooksActions.loadBooksRequest({query: this.categoryValue, sort: "price", order: this.sortingOrder}))
    this.store.select((state)=> state.books.books).subscribe((res)=> {
      this.books = res;
    });
    this.store.select((state)=> state.books.isLoading).subscribe((res)=> {
      this.loading = res;
    });
  }
}
