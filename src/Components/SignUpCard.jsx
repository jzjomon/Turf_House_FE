import { useState } from "react"
import Button from "./Button"
import { validateEmail, validateFirstName, validateLastName, validatePass } from "../Constants/Rejex";
import AlertModal from "./AlertModal";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setSpinner } from "../toolkit/spinnerSlice";

const SignUpCard = ({ setLogin }) => {
    const dispatch = useDispatch();
    const [fnameAlert, setFnameAlert] = useState(false);
    const [lnameAlert, setLnameAlert] = useState(false);
    const [emailAlert, setEmailAlert] = useState(false);
    const [passAlert, setPassAlert] = useState(false);
    const [rePassAlert, setRePassAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('Inputs cannot be empty !')
    const [open, setOpen] = useState(false)
    const [pShow, setPShow] = useState(false);
    const [rePass, setRePass] = useState("");
    const [details, setDetails] = useState({ firstname: "", lastname: "", email: "", password: "" });
    const handleLogin = () => {
        const main = document.getElementById('main');
        main.classList.add('animate-death');
        setTimeout(() => {
            setLogin(true)
        }, 900);
    }
    const handleClick = () => {
        try {
            if (!details.firstname && !details.lastname && !details.email && !details.password) {
                setAlertMessage('Inputs cannot be empty !')
                setOpen(true);
            }else  if(!details.firstname || !details.lastname || !details.email || !details.password){
                setOpen(true);
            } else {
                if (!validateFirstName.test(details.firstname)) {
                    setFnameAlert(true);
                    setTimeout(() => {
                        setFnameAlert(false)
                    }, 3000);
                } else if (!validateLastName.test(details.lastname)) {
                    setLnameAlert(true);
                    setTimeout(() => {
                        setLnameAlert(false)
                    }, 3000);
                } else if (!validateEmail.test(details.email)) {
                    setEmailAlert(true);
                    setTimeout(() => {
                        setEmailAlert(false)
                    }, 3000);
                } else if (!validatePass.test(details.password)) {
                    setPassAlert(true);
                    setTimeout(() => {
                        setPassAlert(false)
                    }, 3000);
                } else if (details.password !== rePass) {
                    setRePassAlert(true)
                    setTimeout(() => {
                        setRePassAlert(false)
                    }, 3000);
                } else {
                    dispatch(setSpinner(true));
                     axios.post('http://localhost:8080/signup',details).then(res => {
                        dispatch(setSpinner(false));
                            setLogin(true)
                     }).catch(err => {
                        dispatch(setSpinner(false));
                      if(err?.response?.data?.exist){
                         setAlertMessage('Email already exists !');
                         setOpen(true)
                      }else{
                        setAlertMessage('Something went wrong !');
                        setOpen(true)
                      }
                     })
                }
            }
        } catch (error) {
            dispatch(setSpinner(false));
            setAlertMessage('Something went wrong !');
            setOpen(true)
        }
       
    }

    return (
        <>
            <div id="main" className='xl:w-2/4 md:w-3/4 w-3/4 sm:w-2/4 px-10 h-fit mt-auto mb-auto  shadow-2xl rounded-xl bg-gray-100 py-5 animate-born'>
                <div className="mt-6">
                    <h1 className="text-3xl font-semibold text-slate-700">Welcome to <span className="font-bold italic"><span className="text-orange-500 text-4xl font-serif">T</span>urf<span className="text-orange-500 text-4xl font-serif">H</span>ouse</span></h1>
                    <p className="mt-3 text-xl text-slate-600 font-medium">Get in the game! Sign up and secure your spot on the turf.</p>
                </div>
                <div className="mt-9">
                    <div className="flex flex-col transition-all gap-5">
                        <div id="firstname" className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-600 font-medium" >First name
                                {fnameAlert && <span className="text-red-600 ps-5 animate-blink">Invalid firstname !</span>}
                            </label>
                            <input type="text" value={details.firstname} placeholder="Enter your firstname" onChange={(e) => setDetails({ ...details, firstname: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) })} className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <div id="lastname" className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-600 font-medium" >Last name
                                {lnameAlert && <span className="text-red-600 ps-5  animate-blink">Invalid lastname !</span>}
                            </label>
                            <input type="text" value={details.lastname} placeholder="Enter your lastname" onChange={(e) => setDetails({ ...details, lastname: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)})} className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <div id="email" className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-600 font-medium" >Email
                                {emailAlert && <span className="text-red-600 ps-5 animate-blink">Invalid email !</span>}
                            </label>
                            <input type="text" value={details.email} placeholder="Enter your email" onChange={(e) => setDetails({ ...details, email: e.target.value })} className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <div id="password1" className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-600 font-medium" ><div className="flex gap-4">Password <span className="flex items-center"> {
                                pShow ? (<svg xmlns="http://www.w3.org/2000/svg" onClick={() => setPShow(false)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setPShow(true)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )
                            }
                               {rePassAlert && <span className="text-red-600 ps-5 animate-blink">Passwords are not same !</span>}
                            </span></div></label>
                            <input value={details.password} type={pShow ? 'text' : 'password'} placeholder="Enter password" onChange={(e) => setDetails({ ...details, password: e.target.value })} className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        {passAlert && <span className="text-red-600 text-[13px] animate-blink">Passwords must be a minimum length of 6 characters and contain at least one special character with no spaces !</span>}
                        <div id="password2" className="flex flex-col gap-2">
                            <input type={pShow ? 'text' : 'password'} placeholder="Re enter password" onChange={(e) => setRePass(e.target.value)} className="shadow-2xl px-1 py-3 rounded-md" />

                        </div>
                        <Button label='Sign Up' handleClick={handleClick} />
                        <div className="text-center">
                            <span className="text-gray-600 text-sm font-medium">Already have an account? </span><span className="text-orange-500 italic font-medium text-sm cursor-pointer" onClick={handleLogin}>Log In</span>
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
                    <h2 className="font-mono font-medium my-3" >{alertMessage}</h2>
                    <div className="text-center mt-1 " onClick={() => setOpen(false)}>
                        <button className="border px-2 py-1 bg-orange-500 text-white rounded-md hover:bg-white hover:text-orange-500 hover:border-orange-500 transition-all  ">Ok</button>
                    </div>
                </div>
            </AlertModal>
            
        </>
    )
}

export default SignUpCard