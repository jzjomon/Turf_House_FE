import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AlertModal from './AlertModal';
import Button from './Button';
import { Alert, Toast } from '../Constants/sweetAlert';
import { instance } from '../config/axios';
import { setSpinner } from '../toolkit/spinnerSlice';
import { setUserLogin } from '../toolkit/userSlice';
import { Input } from '@material-tailwind/react'

const BASEURL = process.env.REACT_APP_BASEURL;

const Profile = () => {
    const { user } = useSelector(state => state.user);
    const fullName = `${user?.firstname} ${user?.lastname}`;
    const [editImg, setEditImg] = useState(false);
    const [img, setImg] = useState();
    const imgRef = useRef();
    const [editDetails, setEditDetails] = useState(false);
    const [details, setDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: null,
        designation: "",
        address: "",
    });
    const disptach = useDispatch();
    const handleUpdatePic = () => {
        try {
            disptach(setSpinner(true));
            const formData = new FormData();
            formData.append("img", img);
            instance.put('/users/setProfilePic', formData).then((result) => {
                Toast("Successfully updated", "success")
                disptach(setUserLogin({ user: result?.data?.data }));
                setEditImg(false)
                setImg(null)
                imgRef.current.value = null
                disptach(setSpinner(false))
            }).catch((err) => {
                disptach(setSpinner(false))
                setImg(null)
                imgRef.current.value = null
                setEditImg(false)
                Alert("Something went wrong !", "error")
            });
        } catch (error) {
            disptach(setSpinner(false))
            setImg(null)
            imgRef.current.value = null
            setEditImg(false)
            Alert('Something went wrong !', 'error');
        }
    }

    const handleDeletePic = () => {
        try {
            Alert("Are you sure ?", "warning", "true").then((result) => {
                if (result.isConfirmed) {
                    disptach(setSpinner(true))
                    instance.delete(`/users/deletePic`).then((result) => {
                        disptach(setUserLogin({ user: result?.data?.data }));
                        disptach(setSpinner(false))
                        setImg(null)
                        imgRef.current.value = null
                        setEditImg(false)
                        Toast("Successfully deleted", "success")
                    }).catch((err) => {
                        disptach(setSpinner(false))
                        setImg(null)
                        imgRef.current.value = null
                        setEditImg(false)
                        Alert("Something went wrong", "error")
                    });
                }
            })
        } catch (error) {
            disptach(setSpinner(false))
            Alert("Something went wrong !", "erorr");
        }
    }

    const handleUpdateDetails = () => {
        try {
            if (details.firstname || details.lastname || details.email || details.phone || details.address || details.designation) {
                disptach(setSpinner(true));
                instance.patch('/users/updateDetails', details).then((result) => {
                    disptach(setUserLogin({user : result?.data?.data}));
                    disptach(setSpinner(false));
                    setEditDetails(false);
                    setDetails({
                        firstname: "",
                        lastname: "",
                        email: "",
                        phone: null,
                        designation: "",
                        address: "",
                    });
                    Toast("Successfully updated", "success");
                }).catch((err) => {
                    disptach(setSpinner(false));
                    setEditDetails(false)
                    setDetails({
                        firstname: "",
                        lastname: "",
                        email: "",
                        phone: null,
                        designation: "",
                        address: "",
                    })
                    Toast("Cannot update the details", "error");
                });
            } else {
                Toast("Inputs cannot be empty", "warning");
            }

        } catch (error) {
            disptach(setSpinner(false));
            Toast("Something went wrong", "error");
        }
    }

    return (
        <>
            <div className='h-full  bg-gray-50 p-3 w-full flex flex-col gap-6 sm:items-center md:flex-row md:items-start md:justify-center  '>
                <div className=' sm:w-3/4 md:w-2/6 xl:w-1/6 relative w-full border-gray-400 rounded-lg   border '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onClick={() => setEditImg(true)} strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-0 right-1 hover:cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <div className='flex justify-center my-3 '>
                        <img src={user?.img ? `${BASEURL}/images/${user?.img}` : `${BASEURL}/images/profile-icon.png`} alt="profile" className='w-32 h-32 object-cover shadow-lg shadow-gray-400 rounded-full' />
                    </div>

                    <div className='text-center flex flex-col gap-3 my-5'>
                        <h1 className='text-lg font-bold'>{fullName}</h1>
                    </div>
                </div>
                <div className=' sm:w-3/4 md:w-4/6 xl:w-3/6 relative w-full border-gray-400 rounded-lg  border '>
                    <div className='flex justify-center my-6 '>
                        <div className='flex flex-col ps-3  gap-3'>
                            <div className='text-lg flex gap-8'><span className="font-semibold ">Full Name</span>  :  <span>{fullName}</span></div>
                            <div className='text-lg flex gap-8'><span className="font-semibold ">Email</span>   :  <span>{user?.email}</span></div>
                            <div className='text-lg flex gap-8'><span className="font-semibold ">Phone</span>  :  <span>{user?.phone}</span></div>
                            <div className='text-lg flex gap-8'><span className="font-semibold ">Designation</span>  :  <span>{user?.designation}</span></div>
                            <div className='text-lg flex gap-8'><span className="font-semibold ">Address </span>  :  <span>{user?.address}</span></div>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setEditDetails(true)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-0 right-1 hover:cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </div>
            </div>
            <AlertModal open={editImg} onClose={() => { setEditImg(false); setImg(null); imgRef.current.value = null; }}>
                <div >
                    <input type="file" ref={imgRef} accept='image/*' className='mb-4 text-sm sm:text-lg' onChange={(e) => setImg(e.target.files[0])} />
                    {
                        img ? <>
                            <div className='flex justify-center p-3 '>
                                <img src={URL.createObjectURL(img)} alt="profile pic" className='w-56 ' />
                            </div>
                            <div>
                                <Button label="Save" handleClick={handleUpdatePic} />
                            </div>
                        </> : <>
                            {
                                user?.img ? <div className='border-t-4 border-gray-400 pt-4 flex justify-center '>
                                    <button className='border text-xs bg-red-900 text-white rounded p-1' onClick={handleDeletePic}>Delete Pic</button>
                                </div> : <></>
                            }
                        </>
                    }
                </div>
            </AlertModal>
            <AlertModal open={editDetails} onClose={() => {
                setEditDetails(false); setDetails({
                    firstname: "",
                    lastname: "",
                    email: "",
                    phone: null,
                    designation: "",
                    address: "",
                })
            }}>
                <div className='flex flex-col  gap-2'>
                    <Input type='text' label='First Name' value={details?.firstname} onChange={(e) => setDetails({ ...details, firstname: e.target.value })} />
                    <Input type='text' label='Last Name' value={details?.lastname} onChange={(e) => setDetails({ ...details, lastname: e.target.value })} />
                    <Input type='text' label='Email' value={details?.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                    <Input type='number'  label='Phone' value={details?.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
                    <Input type='text' label='Designation' value={details?.designation} onChange={(e) => setDetails({ ...details, designation: e.target.value })} />
                    <Input type='text' label='Address' value={details?.address} onChange={(e) => setDetails({ ...details, address: e.target.value })} />
                </div>
                <div className='pt-6'>
                    <Button label="Save" handleClick={handleUpdateDetails} />
                </div>
            </AlertModal>
        </>
    )
}

export default Profile