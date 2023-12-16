

export interface BookInterface{
    _id: string,
    authorID: string,
    image: string,
    title: string,
    author: string,
    genre: string,
    description: string,
    price: number
}

export interface initialBookStateInterface{
    isLoading: boolean,
    books: BookInterface[],
    totalPages: number,
    isError: boolean
}

export const initialBookState: initialBookStateInterface = {
    isLoading: false,
    books: [],
    totalPages: 1,
    isError: false
}