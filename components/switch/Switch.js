import styles from './Switch.module.css'

const Switch = ({ isOn, handleToggle, checkedColor, unCheckedColor }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={styles.switchCheckbox}
        id="switch"
        type="checkbox"
        style={{ visibility: 'hidden' }}
      />
      <label
        style={{ background: isOn ? checkedColor : unCheckedColor }}
        className={styles.switchLabel}
        htmlFor="switch"
      >
        <span className={styles.switchButton} />{' '}
      </label>
    </>
  )
}

export default Switch
