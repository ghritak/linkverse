const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute bg-black opacity-50 inset-0"></div>
      {/* <div className="bg-white p-6 rounded shadow-lg z-50">{children}</div> */}
      <div className="shadow-lg z-50">{children}</div>
    </div>
  )
}

export default Modal