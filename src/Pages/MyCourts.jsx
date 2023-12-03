import { useEffect, useState } from "react";
import { NavBar } from "../Components/NavBar";
import { instance } from "../config/axios.js";
import { CardOne } from "../Components/Card";
import { Alert } from "../Constants/sweetAlert.js";
import { useDispatch } from "react-redux";
import { setSpinner } from "../toolkit/spinnerSlice.js";



const MyCourts = () => {
    const dispatch = useDispatch();
    const [myCourts, setMyCourts] = useState([]);
    useEffect(() => {
        try {
            dispatch(setSpinner(true))
        instance.get('/users/myCourts').then(res => {
            setMyCourts(res.data);
            dispatch(setSpinner(false))
        }).catch(err => {
            dispatch(setSpinner(false))
            Alert("Something went wrong !", "error")
        })
                    
    } catch (error) {
        dispatch(setSpinner(false))
            Alert("Something went wrong !", "error")
    }
    }, [])

    return (
        <div>
            <NavBar />
            <CardOne title="My Courts" courts={myCourts} />
        </div>
    )
}

export default MyCourts;