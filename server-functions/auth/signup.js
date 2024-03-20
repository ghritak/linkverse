export const signup = async (formData) => {
  try {
    console.log('signing up')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data.message || 'Failed to sign up')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
