import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { BookService } from '../../core/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router, private store: Store, private bookService: BookService){}

  selectGenre(genre: string = ""){
    this.bookService.setGenre(genre)
    this.router.navigate(["books"])
  }

}
