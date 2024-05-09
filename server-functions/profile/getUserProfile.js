export const getUserProfile = async (username, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/link/auth?username=${username}`,
      {
        method: 'GET',
        cache: 'no-store',
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
      throw new Error(data.message || 'Failed to fetch user data.')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
