import React, { useState } from 'react';
import Login from './Login';
import NavBar from './NavBar';

const Home = ({ username }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const containerStyle = isAdmin ? { top: '30%' } : { top: '30%' };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className='flex justify-center flex-col items-center absolute left-1/2 transform -translate-x-1/2' style={containerStyle}>
        <div className='flex gap-6'>
          <div
            className={`border p-4 rounded w-28 flex justify-center cursor-pointer font-bold text-2xl ${
              !isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => setIsAdmin(false)}
          >
            User
          </div>
          <div
            className={`border p-4 rounded w-28 flex justify-center cursor-pointer font-bold text-2xl ${
              isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </div>
        </div>
        <div>
          <Login isAdmin={isAdmin} />
        </div>
      </div>
    </>
  );
};

export default Home;
