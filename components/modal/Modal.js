import { useEffect } from 'react'

const Modal = ({ isOpen, children, onClose, dismissable }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const handleOverlayClick = (e) => {
    console.log('clicked')
    if (e.target === e.currentTarget && dismissable) {
      onClose()
    }
  }
  if (!isOpen) return null

  return (
    <div
      onClick={handleOverlayClick}
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 transition-opacity duration-300  ${
        isOpen ? 'transform opacity-100' : 'transform  opacity-0'
      }`}
    >
      <div className="absolute bg-black opacity-50 inset-0"></div>
      {/* <div className="bg-white p-6 rounded shadow-lg z-50">{children}</div> */}
      <div className="shadow-lg z-50">{children}</div>
    </div>
  )
}

export default Modal
