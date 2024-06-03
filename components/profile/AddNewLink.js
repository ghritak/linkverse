import { useEffect, useRef, useState } from 'react'
import Modal from '../modal/Modal'
import Input from '../input/Input'
import { IoClose } from 'react-icons/io5'
import { Button } from '../button/Button'
import AddLinkCard from '../cards/AddLinkCard'
import { PiLinkSimpleHorizontalFill } from 'react-icons/pi'
import CustomDropdown from '../custom-dropdown/CustomDropdown'
import { getLinkData } from '../../server-functions/others/getLinkData'
import { uploadLogo } from '../../server-functions/others/uploadLogo'
import Switch from '../switch/Switch'
import Color from '../../styles/Colors'
import { getThemeColor } from '../../utils'

const initData = {
  name: '',
  link: '',
  logo: '',
  sensitive: false
}

const AddNewLink = ({
  links,
  loadingSaving,
  handleSaveLinks,
  isModalOpen,
  setModalOpen,
  userData
}) => {
  const [formData, setFormData] = useState(initData)
  const [newLinks, setNewLinks] = useState([])
  const [linkOptions, setLinkOptions] = useState([])
  const [logoType, setLogoType] = useState(null)
  const fileInputRef = useRef(null)
  const [imageUploading, setImageUploading] = useState(false)

  useEffect(() => {
    getLinksIconOptions()
  }, [])

  const getLinksIconOptions = async () => {
    const data = await getLinkData()
    setLinkOptions(data)
  }

  const handleButtonClick = (e) => {
    e.preventDefault()
    fileInputRef.current.click()
  }
  const handleImageChange = (e) => {
    handleUploadLogo(e.target.files[0])
  }

  const handleUploadLogo = async (file) => {
    if (file) {
      setImageUploading(true)
      try {
        const formData = new FormData()
        formData.append('logo', file)
        const res = await uploadLogo(formData)
        setFormData((prev) => ({
          ...prev,
          logo: `${process.env.NEXT_PUBLIC_API_URL}${res.filename}`
        }))
      } catch (error) {
        console.log(error)
      } finally {
        setImageUploading(false)
      }
    }
  }

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
    handleSaveLinks(newLinksArray)
    setNewLinks([])
    setFormData(initData)
  }

  const handleAddMore = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.link) return
    setNewLinks([...newLinks, formData])
    setFormData(initData)
    setLogoType(null)
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
    setFormData(initData)
    setLogoType(null)
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
        className="my-6 w-full text-center  border-[1px] py-3 rounded-lg text-white hover:scale-[102%] cursor-pointer transition-all duration-300"
        style={{ backgroundColor: getThemeColor(userData?.theme) }}
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
            <div className="flex items-center">
              <PiLinkSimpleHorizontalFill className="w-6 h-6 mr-2" />
              <h1 className="text-lg md:text-xl font-semibold">Add New Link</h1>
            </div>
            <span
              onClick={handleCancel}
              className="cursor-pointer text-lg md:text-xl hover:scale-90 transition-all duration-300"
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
            {formData.name.length ||
            formData.logo.length ||
            formData.link.length ? (
              <AddLinkCard item={formData} />
            ) : null}
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
              <div className="mb-4 text-white">
                <CustomDropdown
                  key={formData.logo}
                  search={true}
                  placeholder={'Select Icon'}
                  value={logoType}
                  displayIcon={'logo'}
                  displayKey="name"
                  options={linkOptions}
                  backgroundColor={'rgb(75, 85, 99)'}
                  onSelect={(item) => {
                    setLogoType(item.name)
                    setFormData({
                      ...formData,
                      ...{ logo: item.logo }
                    })
                  }}
                />
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 justify-between mt-4">
                  <div className="text-sm flex items-center">
                    <Button
                      loading={imageUploading}
                      onClick={handleButtonClick}
                      className="rounded-full w-32 h-10 text-sm mr-3"
                    >
                      Select Icon
                    </Button>
                    <input
                      type="file"
                      name="profile_photo"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                    <p>Or Upload your own</p>
                  </div>
                  <div className="space-y-2">
                    <p className="">Is this a sensitive link</p>
                    <Switch
                      isOn={formData.sensitive}
                      handleToggle={() =>
                        setFormData((prev) => ({
                          ...prev,
                          sensitive: !formData.sensitive
                        }))
                      }
                      unCheckedColor={Color.primary}
                      checkedColor="#06D6A0"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  disabled={imageUploading}
                  onClick={handleAddMore}
                  className="rounded-full w-32 h-10 text-sm"
                >
                  Add More
                </Button>
              </div>
              <div className="flex justify-end mt-10">
                <div
                  disabled={loadingSaving || imageUploading}
                  onClick={handleCancel}
                  className={`rounded-full w-28 h-11 mr-6 bg-gray-600 flex items-center justify-center text-white border-[1px] ${
                    loadingSaving || imageUploading
                      ? 'opacity-50'
                      : 'hover:bg-gray-500 cursor-pointer'
                  }`}
                >
                  Cancel
                </div>
                <Button
                  disabled={imageUploading}
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
