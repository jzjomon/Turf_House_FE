
const AlertModal = ({ open, onClose, children }) => {
    return (
        <div onClick={onClose} className={`fixed  inset-0 z-40 flex justify-center    items-center transition-color ${open ? 'visible bg-black/20' : 'invisible'}`}>
            <div className={`bg-white rounded-xl overflow-auto shadow p-6 transition-all ${open ? 'scale-100 opacity-100 ' : 'scale-125 opacity-0'}`} onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-1 right-1  rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    )
}

export default AlertModal