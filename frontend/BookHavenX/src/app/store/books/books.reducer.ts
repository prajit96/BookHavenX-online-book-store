import { createReducer, on } from "@ngrx/store";
import { initialBookState } from "./books.state";
import { loadBooksFailure, loadBooksRequest, loadBooksSuccess } from "./books.actions";




export const bookReducer = createReducer(
    initialBookState,
    on(loadBooksRequest, (state)=>{
        return {...state, isLoading: true, isError: false, books: []};
    }),
    on(loadBooksSuccess, (state, props)=>{
        return {...state, isLoading: false, isError: false, books: props.books, totalPages: props.totalPages};
    }),
    on(loadBooksFailure, (state)=>{
        return {...state, isLoading: false, isError: true};
    }) 
)