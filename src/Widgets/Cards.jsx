import { useEffect, useState } from "react"
import { instance } from "../config/axios"
import { CardOne } from "../Components/Card";
import { Paginate } from "../Components/Paginate";
import { useDispatch, useSelector } from "react-redux";
// import { setUserLogin } from "../toolkit/userSlice";
import { Alert } from "../Constants/sweetAlert";
import { setSpinner } from "../toolkit/spinnerSlice";
import { setSearchInput } from "../toolkit/searchSlice";

const Cards = () => {
    const {searchInput} = useSelector(state => state.search);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [courts, setCourts] = useState([]);
    useEffect(() => {
        try {
            dispatch(setSpinner(true)) 
            instance.get('/users/getCourts', { params: { page, searchInput} }).then(res => {
                setCourts(res.data);
                dispatch(setSpinner(false))
            }).catch((err) => {
                Alert("Something went wrong !", "error")
                dispatch(setSpinner(false))
            })
        } catch (error) {
            dispatch(setSpinner(false))
            Alert("Something went wrong !", "error")
        }
        return (() => {
            dispatch(setSearchInput(""));
        })
    }, [page, searchInput])
    return (
        <>
            <CardOne title="Courts" courts={courts} />
            {/* pagination  */}
            {
                courts.length < 8 ? <Paginate page={page} setPage={setPage} /> : <Paginate page={page} setPage={setPage} length />
            }
        </>
    )
}

export default Cards;