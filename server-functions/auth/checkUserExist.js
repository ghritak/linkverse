export const checkUserExist = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/signup/check_user_exist`,
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
      throw new Error(data.message || 'Failed to check user data.')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
