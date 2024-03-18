import styles from './CustomLoader.module.css'

const CustomLoader = ({ color = '#4da6ff', size = '40' }) => {
  const loaderStyle = {
    '--loader-color': color
  }

  return (
    <div className={styles.loader}>
      <div className={styles.loadingSpinner} style={{ width: size + 'px' }}>
        <svg className={styles.loadingSpinnerCircleSvg} viewBox="25 25 50 50">
          <circle
            className={styles.loadingSpinnerCircleStroke}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            style={loaderStyle}
          />
        </svg>
      </div>
    </div>
  )
}

export default CustomLoader
