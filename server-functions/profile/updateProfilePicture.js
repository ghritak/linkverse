export const updateProfilePicture = async (username, token, formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/updateProfilePicture?username=${username}`,
      {
        method: 'POST',
        headers: {
          Authorization: token
        },
        body: formData
      }
    )
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data.message || 'Failed to update profile picture.')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
