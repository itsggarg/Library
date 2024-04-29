import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserName, setBorrowedBooks } from '../store/Slice';
import { useNavigate } from 'react-router-dom'

const Login = ({ isAdmin }) => {
    const [user, setUser] = useState(isAdmin ? 'admin' : 'user');
    const [password, setPassword] = useState(isAdmin ? 'admin' : 'user');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
  useEffect(() => {
   setUser(isAdmin?'admin':'user');
   setPassword(isAdmin?'admin':'user')
  }, [isAdmin])
  

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAdmin && user === 'admin' && password === 'admin') {
            navigate("/admin")
        } else {

            try {
                axios.post("https://library-management-system-api-woad.vercel.app/login", { username: user, password: password })
                    .then(response => {
                      if(!response.status===401){
                        alert('username or password is not valid')
                      }else{
                        dispatch(setUserName(user));
                        dispatch(setBorrowedBooks(response.data.borrowedBooks))
                        navigate("/home")
                      }
                    })
                    .catch(error => {
                      alert('username or password is not valid')
                    });
            } catch {
                console.log("Couldn't send Data")
            }
        }
    }

    return (
        <>
      <div className='flex justify-center m-auto flex-col gap-5 mt-8 w-64'>
        <input
          className='flex bg-gray-200 w-full p-4 rounded outline-none text-black font-sans'
          value={user}
          onChange={(e) => setUser(e.target.value)}
          type="text"
          placeholder='User name'
        />
        <input
          className='flex bg-gray-200 w-full p-4 rounded outline-none text-black font-sans'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder='Enter Password'
        />
        <button className='font-bold text-1.5xl bg-gray-900 text-white rounded p-4' onClick={handleSubmit}>Login</button>
        {!isAdmin && <NavLink className='flex justify-center font-bold text-1.5xl bg-gray-900 text-white rounded p-4' to="/signup">Sign up</NavLink>}
      </div>
    </>
  );
}

export default Login;
