export const verifyOtp = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/verify_email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    )
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data.message || 'Failed to verify email.')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
