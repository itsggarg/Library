import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        userName: '',
        borrowedBooks: [], 
    },
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setBorrowedBooks: (state, action) => {
            state.borrowedBooks = action.payload;
        },
    },
});

export const { setUserName, setBorrowedBooks } = counterSlice.actions;

export default counterSlice.reducer;
