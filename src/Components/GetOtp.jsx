import React, { useEffect, useState } from 'react'
import Button from './Button'
import { Alert, Toast } from '../Constants/sweetAlert';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../Constants/baseUrl';
import { useDispatch } from 'react-redux';
import { setSpinner } from '../toolkit/spinnerSlice';
import { validatePass } from '../Constants/Rejex';

const GetOtp = () => {
    const [verifyOrReset, setVerifyOrReset] = useState('verify');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pass, setPass] = useState();
    const { email } = useParams();
    const [input, setInput] = useState('1');
    const [first, setFirst] = useState('');
    const [seocond, setSecond] = useState('');
    const [third, setThird] = useState('');
    const [fourth, setFourth] = useState('');
    useEffect(() => {
       verifyOrReset === "verify" && document.getElementById(input).focus()
    }, [input, verifyOrReset]);
    const handleVerify = () => {
        try {
            if (first && seocond && third && fourth) {
                dispatch(setSpinner(true));
                axios.post(BASEURL + '/tryOtp', { email, otp: first + seocond + third + fourth }).then(res => {
                    dispatch(setSpinner(false));
                    setVerifyOrReset('reset')
                }).catch(err => {
                    dispatch(setSpinner(false));
                    Alert("invalid OTP", "error");
                })
            } else {
                Toast("Enter OTP", "error");
            }
        } catch (error) {
            dispatch(setSpinner(false));
            Alert("Something went wrong !", "error");
        }

    };
    const handleReset = () => {
        try {
            if (validatePass.test(pass)) {
                dispatch(setSpinner(true));
                axios.post(`${BASEURL}/resetPass`,{pass : pass, email : email}).then(res => {
                    dispatch(setSpinner(false));
                    navigate("/");
                }).catch(err => {
                    dispatch(setSpinner(false));
                    Alert("Something went wrong", "error");
                })
            } else {
                Toast('password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters', "error");
            }
        } catch (error) {
            dispatch(setSpinner(false));
            Alert("Something went wrong !", "error");
        }
    }
    return (
        <>

            {verifyOrReset === "verify" ? (
                <div className='w-full h-screen bg-orange-500 flex justify-center items-center'>
                    <div className='xl:w-1/5 lg:w-1/4 md:w-1/3 w-full m-3 sm:w-1/2 h-1/3 rounded-lg bg-white '>
                        <div className='p-6 mt-2 text-2xl text-center font-semibold'>Enter OTP</div>
                        <div className='flex justify-evenly px-6 mt-6'>
                            <input type="text" maxLength={1} id='1' onChange={(e) => setFirst(e.target.value)} onKeyUpCapture={(e) => e.key !== 'Backspace' && setInput('2')} className='border caret-transparent border-black w-10 h-10 rounded-lg text-4xl text-orange-700 text-center' />
                            <input type="text" maxLength={1} id='2' onChange={(e) => setSecond(e.target.value)} onKeyUpCapture={(e) => e.key === 'Backspace' ? setInput('1') : setInput("3")} className='border caret-transparent border-black w-10 h-10 rounded-lg text-4xl text-orange-700 text-center' />
                            <input type="text" maxLength={1} id='3' onChange={(e) => setThird(e.target.value)} onKeyUpCapture={(e) => e.key === 'Backspace' ? setInput('2') : setInput("4")} className='border caret-transparent border-black w-10 h-10 rounded-lg text-4xl text-orange-700 text-center' />
                            <input type="text" maxLength={1} id='4' onChange={(e) => setFourth(e.target.value)} onKeyUpCapture={(e) => e.key === 'Backspace' && setInput('3')} className='border caret-transparent border-black w-10 h-10 rounded-lg text-4xl text-orange-700 text-center' />
                        </div>
                        <div className='mt-10'>
                            <Button label="Verify OTP" handleClick={handleVerify} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='w-full h-screen bg-orange-500 flex justify-center items-center'>
                    <div className='xl:w-1/5 lg:w-1/4 md:w-1/3 w-full m-3 sm:w-1/2 h-1/3 rounded-lg bg-white '>
                        <div className='p-6 mt-2 text-2xl text-center font-semibold'>Enter your new password</div>
                        <div className='text-center xl:mt-10 mx-4'>
                            <input type='text' onChange={(e) => setPass(e.target.value)} className=' border border-black text-lg font-bold rounded' />
                        </div>
                        <div className='md:mt-10 mt-4'>
                            <Button label="Reset Pass" handleClick={handleReset} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default GetOtp