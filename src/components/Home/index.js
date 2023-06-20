import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import TrendingNow from '../TrendingNow'

import ContactsList from '../ContactsList'

import Orginals from '../Orginals'
import Header from '../Header'

import './index.css'

const pageStatus = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Home extends Component {
  state = {status: pageStatus.inProgress, posterList: []}

  componentDidMount() {
    this.fetchData()
  }

  tryAgain = () => {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({status: pageStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'

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
        this.setState({status: pageStatus.success, posterList: fetchedData})
      } else {
        this.setState({
          status: pageStatus.failed,
        })
      }
    } catch (error) {
      this.setState({
        status: pageStatus.failed,
      })
    }
  }

  successView = () => {
    const {posterList} = this.state
    const randomList = posterList[Math.floor(Math.random() * 10)]

    return (
      <div
        className="poster-container"
        alt="name"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.2896875) 78.26%, #181818 93.82%, #181818 96.68%, #181818 108.61%) , url(${randomList.backdropPath})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          height: '605px',
        }}
      >
        <div className="poster-content">
          <h1 className="poster-heading">{randomList.title}</h1>
          <p className="poster-para">{randomList.overview}</p>
          <div>
            <Link to={`/movies/${randomList.id}`}>
              <button className="poster-button" type="button">
                Play
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  displayView = () => {
    const {status} = this.state
    switch (status) {
      case pageStatus.inProgress:
        return (
          <div className="home-poster-container" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        )
      case pageStatus.success:
        return this.successView()

      case pageStatus.failed:
        return (
          <div className="home-poster-container">
            <img
              src="https://res.cloudinary.com/reddyimgs/image/upload/v1687103762/alert-triangle_fqs6cl.png"
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
        {this.displayView()}
        <h1 className="trending-heading">Trending Now</h1>
        <TrendingNow />
        <h1 className="trending-heading">Originals</h1>
        <Orginals />
        <ContactsList />
      </div>
    )
  }
}

export default Home
