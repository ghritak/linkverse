const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 transition-opacity duration-300  ${
        isOpen ? 'transform opacity-100' : 'transform  opacity-0'
      }`}
    >
      <div className="absolute bg-black opacity-50 inset-0"></div>
      <div className="shadow-lg z-50">{children}</div>
    </div>
  )
}

export default Modal
