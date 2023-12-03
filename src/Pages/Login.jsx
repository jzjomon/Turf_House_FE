import { useState } from 'react'
import LoginCard from '../Components/LoginCard.jsx'
import loginImg from '../images/login.jpg'
import SignUpCard from '../Components/SignUpCard.jsx';

const Login = () => {
    const [login, setLogin] = useState(true);
    return ( 
        <>
            <section>
                <div className='w-full h-screen overflow-hidden md:flex bg-slate-200'>
                    <div className="md:w-1/2 h-full overflow-auto flex justify-center items-center">
                       {login ? <LoginCard setLogin={setLogin}/> : <SignUpCard setLogin={setLogin}/>}
                    </div>
                    <div className="w-1/2 h-full shadow-2xl md:block hidden">
                        <img src={loginImg} alt="login img" className='h-full object-cover' />
                    </div>
                </div>
            </section>
        </>
    )
}
 
export default Login 