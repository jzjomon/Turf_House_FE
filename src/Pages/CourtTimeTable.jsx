import React, { useEffect, useState } from 'react'
import {DefaultTable} from '../Components/TimeTable'
import { NavBar } from '../Components/NavBar'
import { useDispatch } from 'react-redux'
import { setSpinner } from '../toolkit/spinnerSlice'
import { Alert } from '../Constants/sweetAlert'
import { instance } from '../config/axios'
import { useParams } from 'react-router-dom'

const CourtTimeTable = () => {
  const [slots, setSlots] = useState([]);
  const {id} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getCourtTimeTable()
  },[])
  const getCourtTimeTable = () => {
    try {
      dispatch(setSpinner(true));
      instance.post("/vendor/getCourtTimeSlotData",{id}).then(res => {
        dispatch(setSpinner(false));
        setSlots(res.data);
      }).catch(err => {
        dispatch(setSpinner(false));
        Alert("Something went wrong !", "error")
      })
    } catch (error) {
      dispatch(setSpinner(false));
      Alert("Something went wrong !", "error");
    }
  }
  return (
    <>
    <DefaultTable slots={slots}/>
    </>
  )
}

export default CourtTimeTable