import DeleteAccount from './DeleteAccount'
import ChangePassword from './ChangePassword'
import ChangeTheme from './ChangeTheme'

const SettingsComponent = ({ setActivity, token, userData }) => {
  return (
    <div className="text-white">
      <ChangeTheme
        token={token}
        userData={userData}
        setActivity={setActivity}
      />
      <DeleteAccount token={token} userData={userData} />
      <ChangePassword token={token} userData={userData} />
    </div>
  )
}

export default SettingsComponent
