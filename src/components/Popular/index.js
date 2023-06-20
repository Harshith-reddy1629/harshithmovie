import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import ContactsList from '../ContactsList'

import Header from '../Header'

const popularStatus = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Popular extends Component {
  state = {popularList: [], status: popularStatus.inProgress}

  componentDidMount() {
    this.fetchData()
  }

  tryAgain = () => {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({status: popularStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        const fetchedData = data.results.map(each => ({
          backdropPath: each.backdrop_path,
          id: each.id,
          overview: each.overview,
          posterPath: each.poster_path,
          title: each.title,
        }))

        this.setState({popularList: fetchedData, status: popularStatus.success})
      } else {
        this.setState({status: popularStatus.failed})
      }
    } catch (error) {
      this.setState({status: popularStatus.failed})
    }
  }

  succcessView = () => {
    const {popularList} = this.state

    return (
      <ul className="popular-images-container">
        {popularList.map(each => (
          <li key={each.id} className="popular-image-item">
            <Link to={`/movies/${each.id}`}>
              <img
                className="popular-image"
                src={each.posterPath}
                alt={each.title}
              />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  displayView = () => {
    const {status} = this.state
    switch (status) {
      case popularStatus.inProgress:
        return (
          <div className="popular-loader-container" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        )
      case popularStatus.success:
        return this.succcessView()
      case popularStatus.failed:
        return (
          <div className="home-container popular-failed-container">
            <img
              src="https://res.cloudinary.com/reddyimgs/image/upload/v1687104578/Background-Complete_cab1jt.png"
              alt="failure view"
            />
            <p className="try-again-text">
              Something went wrong. Please try again
            </p>
            <button type="button" onClick={this.tryAgain}>
              Try Again
            </button>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        <div>{this.displayView()}</div>
        <ContactsList />
      </div>
    )
  }
}

export default Popular
