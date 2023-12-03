import React, { useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import { Alert, Toast } from '../Constants/sweetAlert'
import { instance } from '../config/axios'
import { useDispatch } from 'react-redux'
import { setSpinner } from '../toolkit/spinnerSlice'

const MyBookings = () => {
    // const [date, setDate] = useState(new Date());
    const [previous, setPrevious] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const dispatch = useDispatch();
    const getBookings = () => {
        try {
            dispatch(setSpinner(true));
            instance.post('/users/getBookedData').then(res => {
                setPrevious(res.data.previous);
                setUpcoming(res.data.upcoming);
                dispatch(setSpinner(false));
            }).catch(err => {
                dispatch(setSpinner(false))
                Alert("Something went wrong !", "error");
            })
        } catch (error) {
            dispatch(setSpinner(false))
            Toast("Something went wrong !", "error");
        }
    }
    useEffect(() => {
        getBookings();
    }, [])
    return (
        <>
            <NavBar />
            {/* <div className='text-center'>
                <span>Select date : </span>
                <input type="date" min={new Date().toLocaleDateString("en-CA")} onChange={(e) => setDate(new Date(e.target.value))} value={date.toLocaleDateString("en-CA")} className='border border-black rounded px-4' />
            </div> */}
            <div className='md:flex justify-around'>
                <div className="md:w-full h-[500px] border border-black rounded m-3 overflow-auto">
                    <div className='sticky top-0 bg-white p-3'>
                        <h1 className='text-center font-bold text-xl'>Previous Bookings</h1>
                    </div>
                    <hr />
                    <div className='text-center mt-3 '>
                        {
                            previous.map((ele, i) => (
                                <button key={i} className={`border rounded m-1 p-2 border-blue-600 text-blue-600 `}>{new Date(ele?.date).toLocaleDateString()}
                                    <div>
                                        {ele?.slot?.time}
                                    </div>
                                </button>
                            ))

                        }

                    </div>
                </div>
                <div className="md:w-full h-[500px] border border-black rounded m-3 overflow-auto">
                    <div className='sticky top-0 bg-white p-3'>
                        <h1 className=' text-center font-bold text-xl'>Upcoming Bookings</h1>
                    </div>
                    <hr />
                    <div className='text-center mt-3'>
                        {
                            upcoming.map((ele, i) => (
                                <button key={i} className={`border rounded m-1 p-2 border-orange-600 text-orange-600 `}>{new Date(ele?.date).toLocaleDateString()}
                                    <div>
                                        {ele?.slot?.time}
                                    </div>
                                </button>
                            ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default MyBookings