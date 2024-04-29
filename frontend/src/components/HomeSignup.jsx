import React from 'react'
import NavBar from './NavBar'
import Signup from './Signup'

const HomeSignup = () => {
  return (
   <>
    <div>
      <NavBar/>
    </div>
    <div className='flex justify-center flex-col items-center mt-10' style={{height:'94vh'}}>
      <div className='flex gap-6 '>
        <div className='border p-4 rounded w-28 flex justify-center cursor-pointer  font-bold text-2xl bg-blue-500'>User</div>
      </div>
      <div>
      <Signup/>
      </div>
      </div>
   </>
  )
}

export default HomeSignup