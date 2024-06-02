import { useRouter } from 'next/router'
import { useState } from 'react'
import { MdAddLink } from 'react-icons/md'

const CreateCard = () => {
  const router = useRouter()
  const [username, setUserName] = useState('')

  const handleNavigate = (e) => {
    e.preventDefault()
    router.push(`/signup?username=${username}`)
  }

  return (
    <form onSubmit={handleNavigate} className="flex items-center space-x-6">
      <div className="bg-gray-100 text-gray-600 p-6 rounded-full flex justify-center items-center">
        <div className="">linkverse.com/</div>
        <input
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="yourname"
          className="bg-transparent outline-none"
        />
      </div>
      <button
        onClick={handleNavigate}
        className="py-6 px-8 bg-black text-white hover:bg-slate-800 transition-all duration-300 rounded-full flex items-center"
      >
        Claim your linkverse
        <MdAddLink size={24} className="ml-2" />
      </button>
    </form>
  )
}

export default CreateCard
