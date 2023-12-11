import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import CourtRegistration from './Pages/CourtRegistration';
import MyCourts from './Pages/MyCourts';
import { useSelector } from 'react-redux';
import OpenCourt from './Pages/OpenCourt';
import FourNotFour from './Pages/404';
import { Spinner } from '@material-tailwind/react';
import { Authorization, LoginOrHome } from './Constants/authorization';
import GetOtp from './Components/GetOtp';
import MyBookings from './Components/MyBookings';
import ProfilePage from './Pages/ProfilePage';
import AdminHome from './Pages/AdminHome';

function App() {
  const { spinner } = useSelector(state => state.spinner);
  return (
    <>
      {spinner && <div className='fixed top-0 right-0 left-0 w-full bg-blue-gray-300 h-[100vh] flex justify-center items-center z-50'>
        <Spinner className='h-16 w-16' color='orange' />
      </div>}
      <Routes>
        <Route element={<LoginOrHome />} >
          <Route path='/' element={<Login />} />
        </Route>
        <Route>
          <Route path='*' element={<FourNotFour />} />
          <Route path='/getOtp/:email' element={<GetOtp />} />
        </Route>
        <Route element={<Authorization />} >
          <Route path='/home' element={<Home />} />
          <Route path='/courtRegister' element={<CourtRegistration />} />
          <Route path='/myCourts/:id' element={<MyCourts />} />
          <Route path='/openCourt/:id' element={<OpenCourt />} />
          <Route path='/myBookings/:id' element={<MyBookings />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/admin' element={<AdminHome />} />

        </Route>
      </Routes>
    </>
  )
}

export default App;
