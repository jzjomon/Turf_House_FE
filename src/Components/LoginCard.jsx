import { useRef, useState } from "react"
import Button from "./Button"
import AlertModal from "./AlertModal";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUserLogin } from "../toolkit/userSlice";
import { BASEURL } from "../Constants/baseUrl";
import { setSpinner } from "../toolkit/spinnerSlice";

const LoginCard = ({ setLogin }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState('Inputs cannot be empty !');
    const [details, setDetails] = useState({ email: "", password: "" });
    const [pShow, setPShow] = useState(false);
    const [open, setOpen] = useState(false)
    const emailRef = useRef();
    const passRef = useRef();
    const handleSignup = () => {
        const main = document.getElementById('main');
        main.classList.add('animate-death');
        setTimeout(() => {
            setLogin(false)
        }, 900);

    }
    const handleClick = () => {
        try {
            if (details.email && details.password) {
                dispatch(setSpinner(true));
                axios.post('http://localhost:8080/login', details).then(({ data }) => {
                    dispatch(setSpinner(false));
                    dispatch(setUserLogin({ user: data?.data }));
                    localStorage.setItem('token', data?.token);
                    navigate('/home')
                }).catch((({ response: { data } }) => {
                    dispatch(setSpinner(false));
                    if (data?.exist) {
                        setAlertMessage('Invalid email !')
                        setOpen(true);
                    } else if (data?.password) {
                        setAlertMessage('invalid password !');
                        setOpen(true);
                    } else {
                        setAlertMessage('Something went wrong !');
                        setOpen(true);
                    }
                }))
            } else {
                dispatch(setSpinner(false));
                setAlertMessage('Inputs cannot be empty !');
                setOpen(true)
            }
        }
        catch (error) {
            dispatch(setSpinner(false));
            setAlertMessage('Something went wrong !');
            setOpen(true);
        }
    }
    const handleOtp = () => {
        try {
            dispatch(setSpinner(true))
            axios.post(BASEURL + '/getOtp', { email: details.email }).then(res => {
                dispatch(setSpinner(false));
                navigate(`/getOtp/${details.email}`);
            }).catch(res => {
                dispatch(setSpinner(false));
                setAlertMessage("Something went wrong !");
                setOpen(true);
            })
        } catch (error) {
            dispatch(setSpinner(false));
            setAlertMessage("Something went wrong !");
            setOpen(true);
        }
    }
    return (
        <>
            <div id="main" className='xl:w-2/4 md:w-3/4 w-3/4 sm:w-2/4 px-10 h-fit  shadow-2xl rounded-xl bg-gray-100 overflow-auto py-5 animate-born'>
                <div className="mt-6">
                    <h1 className="text-3xl font-semibold text-slate-700">Login to <span className="font-bold italic"><span className="text-orange-500 text-4xl font-serif">T</span>urf<span className="text-orange-500 text-4xl font-serif">H</span>ouse</span></h1>
                    <p className="mt-3 text-xl text-slate-600 font-medium">Where every game begins with a click. Welcome back!</p>
                </div>
                <div className="mt-9">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-600 font-medium" >Email</label>
                            <input type="text" ref={emailRef} value={details.email} placeholder="Your email" onChange={(e) => setDetails({ ...details, email: e.target.value })} className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-600 font-medium"><div className="flex gap-4">Password <span className="flex items-center"> {
                                pShow ? (<svg xmlns="http://www.w3.org/2000/svg" onClick={() => setPShow(false)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setPShow(true)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )
                            }</span></div></label>
                            <input ref={passRef} value={details.password} type={pShow ? 'text' : 'password'} placeholder="Your password" onChange={(e) => setDetails({ ...details, password: e.target.value })} className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <Button label='Log In' handleClick={handleClick} />
                        <div className="text-center">
                            <span className="text-gray-600 text-sm font-medium">Don't have an account? </span><span className="text-orange-500 italic font-medium text-sm cursor-pointer" onClick={handleSignup}>Create One</span>
                        </div>
                    </div>
                </div>
            </div>
            <AlertModal open={open} onClose={() => setOpen(false)}>
                <div className="text-center w-53">
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12  text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                    </div>
                    <h2 className="font-mono font-medium my-3 text-xl" >{alertMessage}</h2>
                    {alertMessage === "invalid password !" && <span onClick={handleOtp} className="text-sm font-semibold text-blue-800 cursor-pointer">forgot password ?</span>}
                    <div className="text-center mt-1 " onClick={() => setOpen(false)}>
                        <button className="border px-2 py-1 bg-orange-500 text-white rounded-md hover:bg-white hover:text-orange-500 hover:border-orange-500 transition-all  ">Ok</button>
                    </div>
                </div>
            </AlertModal>
        </>
    )
}

export default LoginCard