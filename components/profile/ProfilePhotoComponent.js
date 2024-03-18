import Image from 'next/image'
import { useRef, useState } from 'react'
import { IoCameraReverseOutline } from 'react-icons/io5'
import Modal from '../modal/Modal'

const ProfilePhotoComponent = ({ userData }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const fileInputRef = useRef(null)

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result)
        setModalOpen(true)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full flex justify-center mt-10 relative">
      <div className="rounded-full">
        {userData && userData?.profile_photo ? (
          <Image
            src={userData?.profile_photo}
            //   src={
            //     'https://static.wikia.nocookie.net/gameofthrones/images/d/d0/JonSnow8x06.PNG/revision/latest?cb=20190714094440'
            //   }
            alt="Link logo"
            width={64}
            height={64}
            className="w-40 h-40 rounded-full"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="w-40 h-40 bg-gray-300 rounded-full"></div>
        )}
      </div>
      <div
        onClick={handleButtonClick}
        className="absolute w-40 h-40 cursor-pointer flex justify-center items-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
      >
        <IoCameraReverseOutline size={50} color="white" />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="bg-gray-700 p-10 rounded-3xl">
          {selectedImage && (
            <div>
              <Image
                src={selectedImage}
                alt="Selected"
                width={100}
                height={100}
                className="w-96 h-96"
              />
            </div>
          )}
          <div></div>
        </div>
      </Modal>
    </div>
  )
}

export default ProfilePhotoComponent
