import styles from './LinearLoading.module.css'

const LinearLoading = () => {
  return (
    <div className="h-1 overflow-hidden">
      <div
        className={`h-full bg-blue-500 rounded-3xl ${styles['animate-linearLoading']}`}
        style={{ width: '40%' }}
      ></div>
    </div>
  )
}

export default LinearLoading
