import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const ContactsList = () => (
  <footer className="contacts-container">
    <div className="contacts-list-container">
      <div className="google">
        <FaGoogle />
      </div>
      <div className="twitter">
        <FaTwitter />
      </div>
      <div className="insta">
        <FaInstagram />
      </div>
      <div className="youtube">
        <FaYoutube />
      </div>
    </div>
    <p className="contacts-head">Contact Us</p>
  </footer>
)

export default ContactsList
