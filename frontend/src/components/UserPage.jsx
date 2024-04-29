import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { setBorrowedBooks } from '../store/Slice'

import axios from 'axios';
const UserPage = () => {
    const [books, setBooks] = useState([])
    const [filterBook, setFilterBook] = useState([]);
    const [searchBook, setSearchBook] = useState('');
    const [reqBookName, setReqBookName] = useState('');
    const [reqAuthorName, setReqAuthorName] = useState('');
    const [login,setLogin]=useState(false);
    const dispatch = useDispatch();
    const borrowBooks = useSelector(state => state.counter.borrowedBooks) || [];
    const userName = useSelector(state => state.counter.userName);
    const firstChar = userName ? userName.charAt(0).toUpperCase() : '';

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchBook(value);
        if (value !== '') {
            const filteredBooks = books.filter(book => book.bookname.toLowerCase().includes(value.toLowerCase()));
            setFilterBook(filteredBooks);
        } else {
            setFilterBook([]);
        }
    };


    const issueBook = (book) => {
        const confirmIssue = window.confirm(`Are you sure you want to issue ${book.bookname}?`);
        if (confirmIssue) {
            axios.post("https://library-management-system-api-woad.vercel.app/issueBook", { username: userName, book: book })
                .then(response => {
                    dispatch(setBorrowedBooks(response.data.books))
                    alert(response.data.message);
                })
                .catch(err => {
                    if (err.response && err.response.status === 400) {
                        alert("You can't borrow more than 2 books");
                    } else {
                        console.log(err);
                    }
                });
        }
    };

    const handleReturnBook = (book) => {
        const { bookname } = book;
        axios.post("https://library-management-system-api-woad.vercel.app/returnBook", { username: userName, book: { bookname } })
            .then(response => {
                window.confirm(`Your fine is Rs: ${book.fine}`)
                alert(response.data.message)
                dispatch(setBorrowedBooks(response.data.books))
            })
            .catch(err => {
                console.error("Error returning book:", err);
            });
    };

    const handleReqBookSubmit = () => {
        axios.post("https://library-management-system-api-woad.vercel.app/reqBook", { bookname: reqBookName, author: reqAuthorName })
            .then(response => {
                alert(response.data.message);
                setReqAuthorName('');
                setReqBookName('');
            }).catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get('https://library-management-system-api-woad.vercel.app/books')
            .then(response => {
                setBooks(response.data.books);
            })
            .catch(err => console.log(err));
    }, [handleReturnBook, handleReqBookSubmit]);

    return (
        <>
            <div>
                <div className='rounded-full bg-gray-300 text-center text-white w-8 h-8 absolute top-3 left-9 flex items-center justify-center text-xl cursor-pointer' onClick={()=>setLogin(!login)}>
                {firstChar}
                </div>
                {login && <NavLink className='rounded bg-white text-center text-black w-24 h-8 absolute top-14 left-9 flex items-center justify-center text-xl cursor-pointer' to="/">Log out</NavLink>
                }<NavBar />
            </div>
            <div className='w-screen h-screen flex '>
                <div className='w-1/2 h-full'>
                    <div className='flex flex-col justify-start  p-9 h-1/2'>
                        <div className='flex flex-col items-center mt-4 h-full'>
                            <div className='text-2xl font-bold text-gray-800'>
                                User Name: {userName}
                            </div>
                            <div className='overflow-y-hidden flex gap-8 '>

                                {borrowBooks.map(book => (
                                    <div key={book._id} className='mt-4 bg-blue-200 p-5 flex flex-col rounded h-64 '>
                                        <span className='font-semibold text-gray-800'>Book Name:</span> {book.bookname}<br />
                                        <span className='font-semibold text-gray-800'>Due Date:</span> {book.Due_Date}<br />
                                        <span className='font-semibold text-gray-800'>Fine:</span> ${book.fine}<br />
                                        <button className='p-2 bg-gray-900 rounded-full mt-2 text-white' style={{ color: 'rgb(255, 255, 255)' }} onClick={() => handleReturnBook(book)}>Return</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center m-auto gap-4 w-3/5 mt-1'>
                        <h1 className='text-2xl font-bold  p-2'>Request Book</h1>
                        <input type="text" placeholder='Book Name' className='flex bg-slate-200 w-full p-4 rounded outline-none'
                            value={reqBookName}
                            onChange={(e) => setReqBookName(e.target.value)}
                        />
                        <input type="text" placeholder='Author Name' className='flex bg-slate-200 w-full p-4 rounded outline-none'
                            value={reqAuthorName}
                            onChange={(e) => setReqAuthorName(e.target.value)}
                        />
                        <button className='flex justify-center font-bold text-1.5xl bg-gray-900 text-white rounded p-4' onClick={() => handleReqBookSubmit()}>Submit</button>
                    </div>
                </div>
                <div className='flex flex-col max-w-[650px] h-[70%] items-center m-auto mt-20'>
                    <div className='mb-4'>
                        <input
                            type="text"
                            placeholder='Search book'
                            className='flex bg-gray-200 border border-gray-400 w-full p-4 rounded outline-none focus:border-blue-500'
                            value={searchBook}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-wrap justify-center mt-1 overflow-y-auto'>
                        {filterBook.map(book => (
                            <div key={book._id} className='bg-white rounded-lg shadow-md overflow-hidden w-96 cursor-pointer mx-3 mb-5' onClick={()=>issueBook(book)}>
                                <div className='p-4'>
                                    <p className='text-lg font-semibold mb-2'>Book Name: {book.bookname}</p>
                                    <p className='text-gray-700 mb-2'>Author: {book.author}</p>
                                    <p className='text-gray-700'>Number of Copies: {book.number_of_copies}</p>
                                </div>
                                <button className='block w-full p-3 text-white bg-gray-900 hover:bg-gray-600 focus:outline-none'>Issue Book</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}

export default UserPage
