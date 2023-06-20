import Cookies from 'js-cookie'

import Header from '../Header'
import ContactsList from '../ContactsList'

const Account = props => {
  const loggingOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <div className="account-container">
      <Header />
      <div className="account-card">
        <h1 className="account-heading">Account</h1>
        <hr />
        <div className="membership-container">
          <p className="membership-text">Member ship</p>
          <div>
            <p className="mail-text">reddybharshith3@gmail.com</p>
            <p className="password-text">Password : ********</p>
          </div>
        </div>
        <hr />
        <div className="plan-container">
          <p className="membership-text">Plan details</p>
          <p>Premium</p>
          <p className="ultra-text">Ultra HD</p>
        </div>
        <hr />
        <div className="logout-button-container">
          <button className="logout-button" onClick={loggingOut} type="button">
            Logout
          </button>
        </div>
      </div>
      <ContactsList />
    </div>
  )
}
export default Account
