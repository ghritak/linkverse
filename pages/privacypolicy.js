import Image from 'next/image'
import { useRouter } from 'next/router'

const PrivacyPolicyPage = () => {
  const router = useRouter()

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <Image
            onClick={() => router.push('/')}
            src={'/link128.png'}
            width={30}
            height={30}
            className="w-20 h-20 cursor-pointer"
            alt="logo"
          />
          <div>
            <h1 className="text-2xl font-medium mb-2 text-right">
              Linking Your World.
            </h1>
            <p className="text-right">One Click, Infinite Connections!</p>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-800 mb-6">
          At Linkverse, we take your privacy seriously. This Privacy Policy
          outlines how we collect, use, and protect your personal information
          when you use our website and services.
        </p>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Information We Collect
        </h2>
        <p className="text-lg text-gray-800 mb-6">
          When you sign up for a Linkverse account, we may collect personal
          information such as your name, email address, profile picture, and any
          other information you choose to provide.
        </p>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          How We Use Your Information
        </h2>
        <p className="text-lg text-gray-800 mb-6">
          We use the information we collect to provide, maintain, and improve
          our services, as well as to communicate with you about your account
          and any updates or new features.
        </p>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Data Security</h2>
        <p className="text-lg text-gray-800 mb-6">
          We take appropriate measures to protect your personal information from
          unauthorized access, alteration, disclosure, or destruction.
        </p>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Third-Party Links
        </h2>
        <p className="text-lg text-gray-800 mb-6">
          Our website may contain links to third-party websites or services that
          are not owned or controlled by Linkverse. We are not responsible for
          the privacy practices or content of these third-party sites.
        </p>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Changes to This Policy
        </h2>
        <p className="text-lg text-gray-800 mb-6">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page.
        </p>
        <p className="text-lg text-gray-800 mb-6">
          By using our website and services, you agree to the collection and use
          of information in accordance with this Privacy Policy.
        </p>
        <div className="border-t-[1px] border-gray-300 pt-8">
          <p className="text-right">©linkverse {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
