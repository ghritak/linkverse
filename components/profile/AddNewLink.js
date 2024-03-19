import { useState } from 'react'
import Modal from '../modal/Modal'
import Input from '../input/Input'
import { IoClose } from 'react-icons/io5'
import Button from '../button/Button'

const AddNewLink = ({ links }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    link: ''
  })

  const handleAddNewLink = () => {
    setModalOpen(!isModalOpen)
    console.log(links)
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value
    }))
  }

  return (
    <div className="mb-10">
      <div
        onClick={handleAddNewLink}
        className="my-6 w-full text-center  border-[1px] py-3 rounded-lg text-white bg-gray-600 hover:scale-[102%] cursor-pointer transition-all duration-300"
      >
        {isModalOpen ? 'Cancel' : 'Add new link +'}
      </div>
      <Modal isOpen={isModalOpen}>
        <div className="bg-gray-600 p-4 sm:p-10 rounded-3xl sm:w-[480px] md:w-[640px] m-8 min-w-[300px]">
          <div className="text-white flex items-center justify-between border-b-[1px] border-gray-400 pb-4">
            <h1 className="text-lg md:text-xl font-semibold">Add New Link</h1>
            <span
              onClick={() => {
                setModalOpen(false)
              }}
              className="cursor-pointer text-lg md:text-xl"
            >
              <IoClose className="w-6 h-6 md:w-8 md:h-8" />
            </span>
          </div>
          <form onSubmit={handleAddNewLink}>
            <div className="mt-6">
              <Input
                label="Link Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                backgroundColor={'rgb(75, 85, 99)'}
                color={'#fff'}
                borderColor="#659efc"
              />
              <Input
                label="Link URL"
                type="text"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                required
                backgroundColor={'rgb(75, 85, 99)'}
                color={'#fff'}
              />
              <div className="flex justify-end mt-10">
                <Button
                  onClick={() => setModalOpen(false)}
                  className="rounded-full px-10 mr-6 bg-gray-600 hover:bg-gray-500 border-[1px]"
                >
                  Cancel
                </Button>
                <Button
                  loading={isLoading}
                  type={'submit'}
                  className="rounded-full px-10 border-[1px] border-blue-500"
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default AddNewLink
