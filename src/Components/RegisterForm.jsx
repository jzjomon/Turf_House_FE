import {
    Card,
    Input,
    // Checkbox, 
    // Button,
    Typography,
    Textarea,
} from "@material-tailwind/react";
import Button from './Button.jsx'
import { useState } from "react";
import AlertModal from "./AlertModal.jsx";
import { useNavigate } from "react-router-dom";
import { instance } from "../config/axios.js";
import Swal from "sweetalert2";
import { Alert } from "../Constants/sweetAlert.js";
import { useDispatch } from "react-redux";
import { setSpinner } from "../toolkit/spinnerSlice.js";


export function RegisterForm() {
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState('Inputs cannot be empty !');
    const [open, setOpen] = useState(false);
    const [img, setImg] = useState();
    const [registerData, setRegisterData] = useState({
        courtName: "",
        location: "",
        about: "",
    })
    const dispatch = useDispatch();
    const handleClick = (e) => {
        try {
        e.preventDefault();
        const image = new FormData();
        image.append('img', img);

        if (registerData.about === "" || registerData.courtName === "" || registerData.location === "" || registerData.image === null) {
            setAlertMessage("Please fill the registration form")
            setOpen(true)
        } else {
            dispatch(setSpinner(true))
            instance.post('/vendor/register-court', image, { params: registerData }).then(res => {
                Swal.fire({
                    title: "successfully registered",
                    timer: 2000,
                    icon: "success",
                    iconColor: "orange",
                    showConfirmButton : false
                }).then(() => {
                    dispatch(setSpinner(false))
                    setRegisterData({
                        courtName : "",
                        location : "",
                        about : ""
                    });
                    setImg(null);
                    navigate('/courtRegister');
                })
            }).catch(err => {
                dispatch(setSpinner(false))
                setAlertMessage("something went wrong");
                setOpen(true)
            })
        }
                    
    } catch (error) {
        dispatch(setSpinner(false))
           Alert("Something went wrong !", "error") 
    }
    }
    return (
        <div className="flex items-center justify-center  mt-10 ">
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
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" className="text-center" color="blue-gray">
                    <span className="text-orange-500">R</span>egister <span className="text-orange-500">C</span>ourt
                </Typography>
                <Typography color="gray" className="mt-1 text-center font-normal">
                    Enter your court details to register.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg" value={registerData.courtName} label="Court Name" onChange={e => setRegisterData({ ...registerData, courtName: e.target.value })} />
                        <Input size="lg" value={registerData.location} label="Location" onChange={e => setRegisterData({ ...registerData, location: e.target.value })} />
                        {/* <Input size="lg" label="Rate" type="number" onChange={e => setRegisterData({ ...registerData, rate: e.target.value })} /> */}
                        <Textarea size="lg" value={registerData.about} label="Something description about you court" onChange={e => setRegisterData({ ...registerData, about: e.target.value })} />
                        <Input size="lg" label="Images of Court" onChange={(e) => setImg(e.target.files[0])} type="file" accept="image/*" />
                        <div className="flex justify-center">
                            {img && <img src={URL.createObjectURL(img)} className="w-fit rounded-lg " alt="court" />}
                        </div>

                    </div>
                    {/* <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-gray-900"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    /> */}
                    {/* <Button className="mt-6" fullWidth>
                        Register
                    </Button> */}
                    <Button label='Register' handleClick={handleClick} />
                    {/* <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <a href="#" className="font-medium text-gray-900">
                            Sign In
                        </a>
                    </Typography> */}
                </form>
            </Card>
        </div>

    );
}