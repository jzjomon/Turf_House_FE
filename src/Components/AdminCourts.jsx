import React from 'react'
import { BASEURL } from '../Constants/baseUrl'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom'

const AdminCourts = ({ courts }) => {
    const navigate = useNavigate();
    return (
        <>
            <section className='w-full mx-3 border'>
                <header >
                    <div className='text-center py-3'>
                        <h1 className='text-3xl text-gray-600 font-bold' >New Courts</h1>
                    </div>
                </header>
                <section>
                    <div className=' w-full grid xl:grid-cols-2 mt-5 place-items-center  grid-cols-1 gap-4 md:gap-7 xl:gap-10 p-5 '>
                        {
                            courts.map((ele, i) => (
                                <>
                                    <div key={i} onClick={() => {navigate(`/openCourt/${ele?._id}`)}} className='2xl:w-4/5 xl:w-5/6 cursor-pointer md:w-10/12 sm:w-10/12 w-11/12 h-auto pb-3  border-orange-500 border-2 rounded-lg shadow-gray-500 shadow-lg'>
                                        <div className='w-full flex mt-2 justify-center '>
                                            <img src={ele?.image ? `${BASEURL}/images/${ele?.image}` : `${BASEURL}/images/carousel1.jpg`} className='w-52 h-32 shadow-md shadow-blue-gray-300 rounded' />
                                        </div>
                                        <div>
                                            <h1 className='text-center text-xl font-bold'>{ele?.name}</h1>
                                            <h2 className='text-center font-semibold'>{ele?.userId?.firstname} {ele?.userId?.lastname}</h2>
                                        </div>
                                    </div>
                                </>
                            ))
                        } 

                    </div>
                </section>
                {/* <footer>
                    <Button label="More" />
                </footer>  */}
            </section>
        </>
    )
}

export default AdminCourts