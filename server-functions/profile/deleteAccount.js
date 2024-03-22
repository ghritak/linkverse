export const deleteAccount = async (email, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/deleteAccount`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({ email })
      }
    )
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data.message || 'Failed to delete account.')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
