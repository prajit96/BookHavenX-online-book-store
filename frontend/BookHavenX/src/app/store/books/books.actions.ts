import { createAction, props } from "@ngrx/store";
import { BookInterface } from "./books.state";


export const loadBooksRequest = createAction("[Books] Load Books Request", props<any>());

export const loadBooksSuccess = createAction("[Books] Load Books Success", props<{books: BookInterface[],totalPages: number }>());

export const loadBooksFailure = createAction("[Books] Load Books Failure");