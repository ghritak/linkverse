export const uploadLogo = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/uploadLogo`,
      {
        method: 'POST',
        body: formData
      }
    )
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data.message || 'Failed to upload logo.')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
