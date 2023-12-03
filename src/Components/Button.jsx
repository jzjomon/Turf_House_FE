
const Button = ({label, handleClick}) => {
  return (
    <div className="flex justify-center">
        <button onClick={handleClick && handleClick} className="bg-orange-500 w-1/2 border-2 py-2 rounded-md text-white hover:bg-white hover:border-orange-500 transition hover:text-orange-500">{label}</button>
    </div>
  )
}

export default Button