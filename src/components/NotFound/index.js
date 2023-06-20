import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-heading">Lost Your Way ?</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <div>
      <Link to="/">
        <button className="not-found-button" type="button">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
