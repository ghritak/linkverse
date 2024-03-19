import { useState } from 'react'
import Modal from '../modal/Modal'
import Input from '../input/Input'
import { IoClose } from 'react-icons/io5'
import { Button } from '../button/Button'
import AddLinkCard from '../cards/AddLinkCard'

const initData = {
  name: '',
  link: '',
  logo: ''
}

const AddNewLink = ({
  links,
  loadingSaving,
  handleSaveLinks,
  isModalOpen,
  setModalOpen
}) => {
  const [formData, setFormData] = useState(initData)
  const [newLinks, setNewLinks] = useState([])

  const handleAddNewLink = (e) => {
    e.preventDefault()
    let newLinksArray
    if (newLinks.length) {
      newLinksArray = [...links, ...newLinks]
      if (formData.name && formData.link) {
        newLinksArray = [...newLinksArray, formData]
      }
    } else {
      newLinksArray = [...links, formData]
    }
    console.log(newLinksArray)
    handleSaveLinks(newLinksArray)
  }

  const handleAddMore = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.link) return
    setNewLinks([...newLinks, formData])
    setFormData(initData)
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value
    }))
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setModalOpen(false)
    setNewLinks([])
  }

  const handleDeleteLink = (index) => {
    const newUpdatedLink = [...newLinks]
    newUpdatedLink.splice(index, 1)
    setNewLinks(newUpdatedLink)
  }

  return (
    <div className="mb-10">
      <div
        onClick={() => setModalOpen(true)}
        className="my-6 w-full text-center  border-[1px] py-3 rounded-lg text-white bg-gray-600 hover:scale-[102%] cursor-pointer transition-all duration-300"
      >
        {isModalOpen ? 'Cancel' : 'Add new link +'}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        dismissable={true}
      >
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
          <div>
            {newLinks.map((item, index) => {
              return (
                <AddLinkCard
                  key={index}
                  item={item}
                  handleDeleteLink={handleDeleteLink}
                  index={index}
                />
              )
            })}
          </div>
          <form onSubmit={handleAddNewLink}>
            <div className="mt-6">
              <Input
                label="Link Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={newLinks.length === 0}
                backgroundColor={'rgb(75, 85, 99)'}
                color={'#fff'}
              />
              <Input
                label="Link URL"
                type="text"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                required={newLinks.length === 0}
                backgroundColor={'rgb(75, 85, 99)'}
                color={'#fff'}
              />
              <div
                onClick={handleAddMore}
                className="rounded-full w-32 h-10 text-sm  flex items-center justify-center text-white cursor-pointer bg-blue-500 hover:bg-blue-600 transition-all duration-300"
              >
                Add More
              </div>
              <div className="flex justify-end mt-10">
                <div
                  disabled={loadingSaving}
                  onClick={handleCancel}
                  className={`rounded-full w-28 h-11 mr-6 bg-gray-600 flex items-center justify-center text-white cursor-pointer border-[1px] ${
                    loadingSaving ? '' : 'hover:bg-gray-500'
                  }`}
                >
                  Cancel
                </div>
                <Button
                  loading={loadingSaving}
                  type={'submit'}
                  className="rounded-full w-28 h-11 border-[1px] border-blue-500 hover:border-blue-600"
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
