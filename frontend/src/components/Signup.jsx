import React, { useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import  axios  from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass]=useState('');
  const navigate = useNavigate();

  const handleSubmit =  (e) => {
    e.preventDefault(); 
    if (user && password !== '' && confirmPass === password) {
        try {
          axios.post("https://library-management-system-api-woad.vercel.app/signup", { username: user, password: password })
          .then(res => {
            console.log(res.data)
             navigate("/");
          })
          .catch(error => {
            console.error('Error signing up:', error);
            alert('User with this username is already exister');
          });
        
        } catch (error) {
            console.error('Error signing up:', error);
            console.log("Couldn't send data");
        }
    } else {
        alert(`Please fill in all fields correctly`);
    }
}



  return (
    <>
     <div className='flex justify-center m-auto flex-col gap-5 mt-8 w-64'>
     <input className='flex bg-slate-200 w-full p-4 rounded outline-none' type="text"  placeholder='User name' value={user} onChange={(e)=>setUser(e.target.value)}/>
     <input className='flex bg-slate-200 w-full p-4 rounded outline-none'  type="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
     <input className='flex bg-slate-200 w-full p-4 rounded outline-none'  type="password" placeholder='Enter confirm Password' value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}/>
     <button className='font-bold text-1.5xl bg-gray-900 text-white rounded p-4' onClick={handleSubmit}>Submit</button>
     <NavLink className='flex justify-center font-bold text-1.5xl bg-gray-900 text-white rounded p-4' to="/">Login</NavLink>
       </div>
    </>
  )
}

export default Signup
