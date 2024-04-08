import { themeCodes } from '../constants/themeCodes'

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const getThemeBackgroundColor = (themeCode) => {
  if (themeCode) {
    const colorObject = themeCodes.find(
      (item) => item.id === parseInt(themeCode)
    )
    return colorObject.backgroundColor
  } else {
    return 'bg-gradient-to-tr from-gray-500 via-gray-700 to-black'
  }
}

export const getThemeColor = (themeCode) => {
  if (themeCode) {
    const colorObject = themeCodes.find(
      (item) => item.id === parseInt(themeCode)
    )
    return colorObject.color
  } else {
    return 'bg-gray-500'
  }
}
