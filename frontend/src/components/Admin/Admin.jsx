import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
const Admin = () => {
  const [user, setUser] = useState('');
  const [userDetail, setUserDetail] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [bookname, setBookname] = useState('');
  const [reqBooks, setReqBooks] = useState([]);
  const findUser = (e) => {
    axios.post("https://library-management-system-api-woad.vercel.app/userBooks", { username: user })
      .then(response => {
        setUserDetail(response.data.books)
      })
  }

  const findBookDetails = () => {
    axios.post("https://library-management-system-api-woad.vercel.app/books", { bookName: bookname })
      .then(res => {
        console.log([res.data.books]);
        setBookDetails([res.data.books]);
      })
  }
  useEffect(() => {
    axios.get("https://library-management-system-api-woad.vercel.app/getReqBooks")
      .then(res => {
        setReqBooks(res.data.books);
      })
  }, [])

  const handleCheckboxChange = (books) => {
    axios.post("https://library-management-system-api-woad.vercel.app/delReqBooks", { book: books })
      .then(res => {
        const confirm = window.confirm("Book is added to Library");
        if (confirm) {
          setReqBooks(res.data.books);
        }
      })
  }

  return (
    <div>
      <div>
        <NavLink className='rounded-full bg-gray-300 text-center text-white w-8 h-8 absolute top-3 left-9 flex items-center justify-center text-xl cursor-pointer' to="/">A</NavLink>
        <NavBar />
      </div>
      <div className='w-screen h-screen flex'>
        <div className='w-1/2 h-full flex flex-col gap-5 justify-start mt-5'>
          <div className='flex flex-col items-center bg-slate-400 p-4 rounded ml-2 h-[42%]'>
            <h1 className="text-white font-bold text-xl">User Profile</h1>
            <div className='flex gap-4 w-full'>
              <input type="text" placeholder='User Name' className='flex bg-slate-200 w-4/5 p-4 rounded outline-none'
                value={user}
                onChange={(e) => setUser(e.target.value)} />
              <button className='font-bold text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded' onClick={() => findUser()}>Find</button>
            </div>
            <div className='flex flex-col gap-5 w-full mt-4 overflow-auto'>
              {
                userDetail.map(books => (
                  <div key={books._id} className='flex flex-col bg-blue-200 p-4 rounded'>
                    <span className='font-bold'>Book Name:</span> {books.bookname}<br />
                    <span className='font-bold'>Due Date:</span> {books.Due_Date}<br />
                    <span className='font-bold'>Fine:</span> ${books.fine}
                  </div>
                ))
              }
            </div>
          </div>
          <div className='flex flex-col items-center  bg-slate-400 p-4 rounded ml-2 h-[42%]'>
            <h1 className="text-white font-bold text-xl">Book Profile</h1>
            <div className='flex gap-4 w-full'>
              <input type="text" placeholder='Book Name' className='flex bg-slate-200 w-4/5 p-4 rounded outline-none'
                value={bookname}
                onChange={(e) => setBookname(e.target.value)} />
              <button className='font-bold text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded' onClick={findBookDetails}>Find</button>
            </div>
            <div className='flex flex-col w-full mt-4'>
              {
                bookDetails.map(books => (
                  <div key={books._id} className='flex flex-col bg-blue-200 p-4 rounded'>
                    <span className='font-bold'>Author:</span> {books.author}<br />
                    <span className='font-bold'>User Names:</span> {books.borrower.length > 1 ? books.borrower.join(', ') : books.borrower}<br />
                    <span className='font-bold'>Number of Copies:</span> {books.number_of_copies}
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className='w-1/2 flex flex-col items-center'>
          <h1 className="text-xl font-bold mb-4 ">Requested Books</h1>
          <div className='w-full'>
            <div className='flex pl-5 w-full justify-center'>
              <div className='w-1/3'>
                <h1 className="text-lg font-bold ">Book Name</h1>
              </div>
              <div className='w-1/4'>
                <h1 className="text-lg font-bold ">Author Name</h1>
              </div>
              <div className='w-1/4'>
                <h1 className="text-lg font-bold ">Number of Requests</h1>
              </div>
            </div>
            <div className='w-[95%] rounded-lg shadow-md overflow-y-auto h-[85%] overflow-x-hidden'>
              {
                reqBooks.map(books => (
                  <div className='w-full flex items-center ml-5 mb-2 bg-white rounded-lg shadow-md p-2 gap-5' key={books._id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <h2 className='w-1/3 text-lg flex justify-center'>{books.bookname}</h2>
                    <h2 className='w-1/4 text-lg flex justify-center'>{books.author}</h2>
                    <h2 className='w-1/4 text-lg flex justify-center'>{books.number_of_request}</h2>
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 focus:outline-none ml-2" onChange={() => handleCheckboxChange(books)} />
                  </div>
                ))
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
