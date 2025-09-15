import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Book {
    title: string;
    author: string;
    url: string;
    rating: number;
    slug: string;
}

export interface Favorite {
    favoriteBook: Book[];
    favoriteAuthor: string[];
}

const initialState : Favorite = {
    favoriteBook: [],
    favoriteAuthor: []
}

export const favoriteSlice = createSlice ({
    name: "favorite",
    initialState,
    reducers: {
        addFavoriteBookStore : (state, action: PayloadAction<Book>) => {
            state.favoriteBook.push(action.payload)
        },
        removeFavoriteBookStore : (state, action: PayloadAction<string>) => {
            state.favoriteBook = state.favoriteBook.filter(element => element.slug != action.payload)
        },
        addFavoriteAuthorStore : (state, action: PayloadAction<string>) => {
            state.favoriteAuthor.push(action.payload)
        },
        removeFavoriteAuthorStore : (state, action: PayloadAction<string>) => {
            state.favoriteAuthor = state.favoriteAuthor.filter(element => element != action.payload)
        },
        clearFavorite : (state) => {
            state.favoriteBook = [];
            state.favoriteAuthor = [];
        }
    }
})

export const {addFavoriteBookStore, removeFavoriteBookStore, addFavoriteAuthorStore, removeFavoriteAuthorStore, clearFavorite} = favoriteSlice.actions
export default favoriteSlice.reducer