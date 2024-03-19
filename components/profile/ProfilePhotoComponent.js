import Image from 'next/image'
import { useRef, useState } from 'react'
import { IoCameraReverseOutline } from 'react-icons/io5'
import Modal from '../modal/Modal'
import Button from '../button/Button'
import { updateProfilePicture } from '../../server-functions/profile/updateProfilePicture'

const ProfilePhotoComponent = ({ userData, token, setRender }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const fileInputRef = useRef(null)
  const [imageUploading, setImageUploading] = useState(false)

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage([file, reader.result])
        setModalOpen(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (userData?.username && token) {
      setImageUploading(true)
      try {
        const formData = new FormData()
        formData.append('profile_photo', selectedImage[0])
        const res = await updateProfilePicture(
          userData.username,
          token,
          formData
        )
        console.log(res)
        setModalOpen(false)
        setRender((prev) => prev + 1)
      } catch (error) {
        console.log(error)
      } finally {
        setImageUploading(false)
      }
    }
  }

  const handleCancel = () => {
    setModalOpen(false)
    setSelectedImage(null)
  }

  return (
    <div className="w-full flex justify-center mt-10 relative">
      <div className="rounded-full">
        {userData && userData?.profile_photo ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${userData?.profile_photo}`}
            alt="Link logo"
            priority
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
        name="profile_photo"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="bg-gray-700 p-10 rounded-3xl">
          {selectedImage && (
            <Image
              src={selectedImage[1]}
              alt="Selected"
              width={100}
              height={100}
              className="w-96 h-96"
            />
          )}
          <div className="flex items-center mt-8">
            <Button
              disabled={imageUploading}
              onClick={handleCancel}
              className="bg-transparent w-full border-[1px] h-14 mr-2 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              loading={imageUploading}
              className="w-full border-[1px] h-14 ml-2 border-blue-500 hover:border-blue-600"
            >
              Upload
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProfilePhotoComponent
