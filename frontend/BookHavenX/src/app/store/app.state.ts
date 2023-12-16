import { AuthInterface, initialAuthState } from "./auth/auth.reducer";
import { initialBookState, initialBookStateInterface } from "./books/books.state";


export interface AppState{
    books: initialBookStateInterface,
    auth: AuthInterface
}

export const initialAppState: AppState = {
    books: initialBookState,
    auth: initialAuthState
}