import React, { useEffect, useState } from 'react'
import { NavBar } from '../Components/NavBar'
import AdminDash from '../Components/AdminDash'
import AdminUsers from '../Components/AdminUsers'
import AdminCourts from '../Components/AdminCourts'
import { useDispatch } from 'react-redux'
import { Alert, Toast } from '../Constants/sweetAlert'
import { setSpinner } from '../toolkit/spinnerSlice'
import { instance } from '../config/axios'

const AdminHome = () => {
  const [newUsers, setNewUsers] = useState([]);
  const [newCourts, setNewCourts] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    handleNew();
  }, [])
  
  const handleNew = () => {
    try {
        dispatch(setSpinner(true))
        instance.get('/admin/getNew').then(({data}) => {
            setNewUsers(data?.data?.users);
            setNewCourts(data?.data?.courts);
            dispatch(setSpinner(false))
        }).catch((err) => {
            Toast("Something went wrong", "error")
            dispatch(setSpinner(false))
        });
    } catch (error) {
        dispatch(setSpinner(false));
        Alert("Something went wrong !", "error");
    }
}

  return (
    <>
      <NavBar />
      <AdminDash />
      <div className='md:flex gap-5 justify-around'>
        <AdminUsers users={newUsers} />
        <AdminCourts courts={newCourts} />
      </div>
    </>
  )
}

export default AdminHome