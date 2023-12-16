import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadBooksFailure, loadBooksRequest, loadBooksSuccess } from "./books.actions";
import {mergeMap, catchError, map, of} from "rxjs"
import { BookService } from "../../core/services/book.service";



@Injectable({
    providedIn: "root"
})


export class BooksEffects {
    constructor(private action$: Actions, private bookService: BookService){}

    loadBooksRequest$ = createEffect( ()=> this.action$.pipe(
        ofType(loadBooksRequest),
        mergeMap((payload)=> this.bookService.getBoooks(payload).pipe(
            map( data =>{
                return loadBooksSuccess({books: data.books, totalPages: data.totalPages})
            } ),
            catchError((err)=> of(loadBooksFailure()))
        ))
    ))


}