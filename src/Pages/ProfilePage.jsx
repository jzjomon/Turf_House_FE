import React from 'react'
import { useParams } from 'react-router-dom'
import { NavBar } from '../Components/NavBar';
import Profile from '../Components/Profile';

const ProfilePage = () => {

  return (
    <>
      <div className='flex flex-col w-full h-screen'>
        <NavBar />
        <Profile />
      </div>
    </>
  )
}

export default ProfilePage