import React, { useEffect, useState } from 'react'
import { Alert, Toast } from '../Constants/sweetAlert'
import { instance } from '../config/axios'
import { useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import AlertModal from './AlertModal'
import { Card, Typography } from "@material-tailwind/react"; import { useDispatch } from 'react-redux'
import { setSpinner } from '../toolkit/spinnerSlice'
import { setUserLogin } from '../toolkit/userSlice'
import { Paginate } from "../Components/Paginate";


const AdminDash = () => {
    const dispatch = useDispatch();
    const [requestes, setRequestes] = useState([]);
    const [openRequests, setOpenRequestes] = useState(false);
    const [openUsers, setOpenUsers] = useState(false);
    const [users, setUsers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [page, setPage] = useState(1)
    const [openVendors, setOpenVendors] = useState(false);
    const [vendorPage, setVendorPage] = useState(1)
    const navigate = useNavigate();
    useEffect(() => {
        handleDash();
    }, [])
    const [dash, setDash] = useState()
    useEffect(() => {
        handleUsers();
        handleVendors();
    }, [page, vendorPage])

    const handleDash = () => {
        try {
            dispatch(setSpinner(true));
            instance.get('/admin/getDash').then((result) => {
                setDash({ ...dash, users: result?.data?.data?.users, courts: result?.data?.data?.courts, vendors: result?.data?.data?.vendors, requestes: result?.data?.data?.requestes });
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
    const handleRequestes = () => {
        try {
            dispatch(setSpinner(true));
            instance.get('/admin/getRequests').then(({ data }) => {
                setRequestes(data?.data);
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


    const handleAction = (action, id) => {
        try {
            dispatch(setSpinner(true))
            instance.post('/admin/actionReq', { id, action }).then((result) => {
                handleDash()
                handleRequestes()
                setRequestes([]);
                setOpenRequestes(false);
                dispatch(setSpinner(false))
                Toast(`Successfully ${action}ed`, "success")
            }).catch((err) => {
                setOpenRequestes(false);
                dispatch(setSpinner(false))
                Toast("Something went wrong !", "error");
            });
        } catch (error) {
            dispatch(setSpinner(false));
            Alert("Something went wrong !", "error");
        }
    }

    const handleUsers = () => {
        try {
            dispatch(setSpinner(true))
            instance.post("/admin/users", { page }).then(({ data }) => {
                setUsers(data?.data);
                dispatch(setSpinner(false))
            }).catch((err) => {
                dispatch(setSpinner(false))
                Toast("cannot find the users !", "error")
            });
        } catch (error) {
            dispatch(setSpinner(false));
            Alert("Something went wrong !", "error")
        }
    }

    const handleUserAction = (action, id) => {
        try {
            dispatch(setSpinner(true))
            instance.post("/admin/blockUnblock", { action, id }).then((result) => {
                handleUsers();
                handleVendors();
                dispatch(setSpinner(false))
            }).catch((err) => {
                dispatch(setSpinner(false))
                Toast(`Cannot ${action}`);
            });
        } catch (error) {
            dispatch(setSpinner(false))
            Alert("Something went wrong !", "error")
        }
    }

    const handleVendors = () => {
        try {
            dispatch(setSpinner(true))
            instance.post('/admin/vendors', { page: vendorPage }).then(({ data }) => {
                setVendors(data?.data);
                dispatch(setSpinner(false))
            }).catch((err) => {
                dispatch(setSpinner(false))
                Toast("cannot find the courts !", "error")
            });
        } catch (error) {
            dispatch(setSpinner(false))
            Alert("Something went wrong !", "error")
        }
    }

    return (
        <>
            <div >
                <div className='text-center py-3'>
                    <h1 className='text-3xl text-gray-600 font-bold' >Dashboard <span className='font-medium text-gray-500 text-lg'>Control panel</span></h1>
                </div>
                <div className=' grid 2xl:grid-cols-4 xl:grid-cols-2 mt-5 place-items-center md:grid-cols-2 grid-cols-1 gap-4 md:gap-7 xl:gap-10 p-5 '>
                    <div className='2xl:w-4/5 xl:w-5/6 md:w-10/12 sm:w-10/12 w-11/12 h-auto pb-3   border-orange-500 border-2 rounded-lg shadow-gray-500 shadow-lg'>
                        <div className='text-4xl font-bold text-center  text-orange-500 mb-3'>
                            <h1 className='py-3'>Total Requestes</h1>
                            <h1 className=' '>{dash?.requestes}</h1>
                        </div>
                        <div>
                            <Button label="See" handleClick={() => { handleRequestes(); setOpenRequestes(true) }} />
                        </div>
                    </div>
                    <div className='2xl:w-4/5 xl:w-5/6 md:w-10/12 sm:w-10/12 w-11/12 h-auto pb-3  border-orange-500 border-2 rounded-lg shadow-gray-500 shadow-lg'>
                        <div className='text-4xl font-bold text-center  text-orange-500 mb-3'>
                            <h1 className='py-3'>Total Users</h1>
                            <h1 className=' '>{dash?.users}</h1>
                        </div>
                        <Button label="More" handleClick={() => { handleUsers(); setOpenUsers(true) }} />
                    </div>
                    <div className='2xl:w-4/5 xl:w-5/6 md:w-10/12 sm:w-10/12 w-11/12 h-auto pb-3   border-orange-500 border-2 rounded-lg shadow-gray-500 shadow-lg'>
                        <div className='text-4xl font-bold text-center  text-orange-500 mb-3'>
                            <h1 className='py-3'>Total Vendors</h1>
                            <h1 className=' '>{dash?.vendors}</h1>
                        </div>
                        <Button label="More" handleClick={() => { handleVendors(); setOpenVendors(true) }} />
                    </div>
                    <div className='2xl:w-4/5 xl:w-5/6 md:w-10/12 sm:w-10/12 w-11/12 h-auto pb-3   border-orange-500 border-2 rounded-lg shadow-gray-500 shadow-lg'>
                        <div className='text-4xl font-bold text-center  text-orange-500 mb-3'>
                            <h1 className='py-3'>Total Courts</h1>
                            <h1 className=' '>{dash?.courts}</h1>
                        </div>
                        <Button label="More" handleClick={() => navigate("/home")} />
                    </div>
                </div>
            </div>
            <AlertModal open={openRequests} onClose={() => setOpenRequestes(false)} >
                <div className='flex justify-center mb-3 text-lg font-semibold'>
                    <h1>Requestes for become vendors</h1>
                </div>
                <Card className="h-full w-full overflow-auto">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        Name
                                    </Typography>
                                </th>
                                <th
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        Action
                                    </Typography>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {requestes.map((ele, index) => {
                                const isLast = index === requestes.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {ele?.firstname} {ele?.lastname}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                onClick={() => handleAction("accept", ele?._id)}
                                                as="a"
                                                href="#"
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium mb-3 border px-2 bg-green-700 text-white rounded  hover:text-green-700 hover:bg-white hover:border-green-700"
                                            >
                                                Accept
                                            </Typography>
                                            <Typography
                                                onClick={() => handleAction("decline", ele?._id)}
                                                as="a"
                                                href="#"
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium border px-2 bg-red-700 text-white rounded hover:text-red-700 hover:bg-white hover:border-red-700"
                                            >
                                                Decline
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
            </AlertModal>
            <AlertModal open={openUsers} onClose={() => setOpenUsers(false)} >
                <div className='flex justify-center mb-3 text-lg font-semibold'>
                    <h1>User List</h1>
                </div>
                <Card className="h-full w-full overflow-auto">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        Name
                                    </Typography>
                                </th>
                                <th
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        Action
                                    </Typography>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.map((ele, index) => {
                                const isLast = index === requestes.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <Typography
                                                onClick={() => navigate(`/profile/${ele._id}`)}
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal cursor-pointer"
                                            >
                                                {ele?.firstname} {ele?.lastname}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            {
                                                ele?.blocked ? (
                                                    <Typography
                                                        onClick={() => handleUserAction("unblock", ele?._id)}
                                                        as="a"
                                                        href="#"
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-medium mb-3 border px-2 bg-green-700 text-white rounded  hover:text-green-700 hover:bg-white hover:border-green-700"
                                                    >
                                                        Unblock User
                                                    </Typography>
                                                ) : (
                                                    <Typography
                                                        onClick={() => handleUserAction("block", ele?._id)}
                                                        as="a"
                                                        href="#"
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-medium border px-2 bg-red-700 text-white rounded hover:text-red-700 hover:bg-white hover:border-red-700"
                                                    >
                                                        Block User
                                                    </Typography>
                                                )
                                            }

                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
                {
                    users.length < 8 ? <Paginate page={page} setPage={setPage} /> : <Paginate page={page} setPage={setPage} length />
                }
            </AlertModal>
            <AlertModal open={openVendors} onClose={() => setOpenVendors(false)} >
                <div className='flex justify-center mb-3 text-lg font-semibold'>
                    <h1>Vendor List</h1>
                </div>
                <Card className="h-full w-full overflow-auto">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        Name
                                    </Typography>
                                </th>
                                <th
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        Action
                                    </Typography>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {vendors.map((ele, index) => {
                                const isLast = index === requestes.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <Typography
                                                onClick={() => navigate(`/profile/${ele._id}`)}
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal cursor-pointer"
                                            >
                                                {ele?.firstname} {ele?.lastname}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            {
                                                ele?.blocked ? (
                                                    <Typography
                                                        onClick={() => handleUserAction("unblock", ele?._id)}
                                                        as="a"
                                                        href="#"
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-medium mb-3 border px-2 bg-green-700 text-white rounded  hover:text-green-700 hover:bg-white hover:border-green-700"
                                                    >
                                                        Unblock User
                                                    </Typography>
                                                ) : (
                                                    <Typography
                                                        onClick={() => handleUserAction("block", ele?._id)}
                                                        as="a"
                                                        href="#"
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-medium border px-2 bg-red-700 text-white rounded hover:text-red-700 hover:bg-white hover:border-red-700"
                                                    >
                                                        Block User
                                                    </Typography>
                                                )
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
                {
                    vendors.length < 8 ? <Paginate page={vendorPage} setPage={setVendorPage} /> : <Paginate page={vendorPage} setPage={setVendorPage} length />
                }
            </AlertModal>
        </>
    )
}

export default AdminDash