import React from 'react'
import { BASEURL } from '../Constants/baseUrl'
import { useNavigate} from 'react-router-dom'

const AdminUsers = ({ users }) => {
    const navigate = useNavigate();
    return (
        <>
            <section className='w-full mx-3 border'>
                <header >
                    <div className='text-center py-3'>
                        <h1 className='text-3xl text-gray-600 font-bold' >New Users</h1>
                    </div>
                </header>
                <section>
                    <div className=' w-full grid xl:grid-cols-2 mt-5 place-items-center  grid-cols-1 gap-4 md:gap-7 xl:gap-10 p-5 '>
                        
                        {
                            users.map((ele, i) => (
                                <>
                                    <div key={i} onClick={() => navigate(`/profile/${ele?._id}`)} className='2xl:w-4/5 xl:w-5/6 md:w-10/12 sm:w-10/12 w-11/12 h-auto pb-3 cursor-pointer  border-orange-500 border-2 rounded-lg shadow-gray-500 shadow-lg'>
                                        <div className='w-full flex mt-2 justify-center'>
                                            <img src={ele?.img ? `${BASEURL}/images/${ele?.img}` : `${BASEURL}/images/profile-icon.png`} className='w-32 h-32 shadow-lg shadow-blue-gray-300 object-cover rounded-full border ' />
                                        </div>
                                        <div>
                                            <h1 className='text-center text-xl font-bold'>{ele?.firstname} {ele?.lastname}</h1>
                                            <h2 className='text-center  font-semibold'>{ele?.email}</h2>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </section>
                {/* <footer>
                    <Button label="More" />
                </footer> */}
            </section>
        </>
    )
}

export default AdminUsers