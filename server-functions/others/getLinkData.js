export const getLinkData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getLinkData`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data.message || 'Failed to fetch links data.')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
