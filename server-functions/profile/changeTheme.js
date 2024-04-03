export const changeTheme = async (token, email, themeCode) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/changeTheme?email=${email}&themeCode=${themeCode}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      }
    )
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data.message || 'Failed to change theme.')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
