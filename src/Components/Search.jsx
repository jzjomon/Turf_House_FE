import { Button, Input } from "@material-tailwind/react"
import { useDispatch } from "react-redux"
import { setSearchInput } from "../toolkit/searchSlice";

const Search = () => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="relative flex w-full gap-2 md:w-max">
                <Input 
                onChange={(e) => dispatch(setSearchInput(e.target.value))}
                    type="search"
                    label="Type here..."
                    className="pr-30"
                    containerProps={{
                        className: "w-[50px] border xl:w-[288px]",
                    }}
                />
                {/* <Button
                onClick={handleClick}
                    size="sm"
                    color="orange"
                    className="!absolute right-1 top-1 rounded"
                >
                    Search
                </Button> */}
            </div>
        </>
    )
}

export default Search