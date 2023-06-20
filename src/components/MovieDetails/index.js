import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import ContactsList from '../ContactsList'

import Header from '../Header'

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
    console.log(this.props)

    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    const data = await response.json()
    if (response.ok === true) {
      const dt = data.movie_details
      const fetchedData = {
        backdropPath: dt.backdrop_path,
        id: dt.id,
        budget: dt.budget,
        overview: dt.overview,
        posterPath: dt.poster_path,
        title: dt.title,
        adult: dt.adult,
        genres: dt.genres,
        releaseDate: dt.release_date,
        runtime: dt.runtime,
        similarMovies: dt.similar_movies,
        spokenLanguages: dt.spoken_languages,
        voteAverage: dt.vote_average,
        voteCount: dt.vote_count,
      }
      this.setState({status: pageStatus.success, posterList: fetchedData})
    } else {
      this.setState({
        status: pageStatus.failed,
      })
    }
  }

  successView = () => {
    const {posterList} = this.state

    const {releaseDate} = posterList
    const relesedDateInFormat = new Date(releaseDate)
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const dateOf = relesedDateInFormat.getDate()
    let dateOfRel
    switch (dateOf) {
      case 1:
        dateOfRel = '1st'
        break
      case 2:
        dateOfRel = '2nd'
        break
      case 3:
        dateOfRel = '3rd'
        break

      default:
        dateOfRel = `${dateOf}th`
    }
    const dayOfRel = monthNames[relesedDateInFormat.getMonth()]
    const yearOfRel = relesedDateInFormat.getFullYear()
    const formatedDate = `${dateOfRel} ${dayOfRel} ${yearOfRel}`

    return (
      <div>
        <div
          className="poster-container"
          alt="name"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.2896875) 78.26%, #181818 93.82%, #181818 96.68%, #181818 108.61%) , url(${posterList.backdropPath})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            height: '605px',
          }}
        >
          <div className="poster-content-movie-details">
            <h1 className="movie-details-heading">{posterList.title}</h1>
            <ul className="movie-details-runtime-container">
              <li>
                <p>
                  {`${Math.floor(posterList.runtime / 60)}h ${
                    posterList.runtime % 60
                  }m`}
                </p>
              </li>
              <li>
                <p className="sensor">{posterList.adult ? 'A' : 'U/A'}</p>
              </li>
              <li>
                <p>{posterList.releaseDate.slice(0, 4)}</p>
              </li>
            </ul>
            <p className="poster-para">{posterList.overview}</p>
            <div>
              <Link to={`/movies/${posterList.id}`}>
                <button className="poster-button" type="submit">
                  Play
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="movie-details-genres-container">
          <div>
            <h1 className="detail-head ">genres</h1>
            <ul className="genre-list genre">
              {posterList.genres.map(each => (
                <li> {each.name} </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="detail-head ">Audio Available</h1>
            <ul className="genre-list genre">
              {posterList.spokenLanguages.map(each => (
                <li> {each.english_name} </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="detail-head ">Rating Count</h1>
            <ul className="genre-list genre">
              <li> {posterList.voteCount} </li>
            </ul>
          </div>
          <div>
            <h1 className="detail-head ">Rating Average</h1>
            <ul className="genre-list genre">
              <li> {posterList.voteAverage} </li>
            </ul>
          </div>
          <div>
            <h1 className="detail-head ">Budget</h1>
            <ul className="genre-list genre">
              <li> {posterList.budget} </li>
            </ul>
          </div>
          <div>
            <h1 className="detail-head ">Release Date</h1>
            <ul className="genre-list genre">
              <li> {formatedDate} </li>
            </ul>
          </div>
        </div>
        <div className="similar-container">
          <h1 className="more-head">More like this</h1>
          <ul className="similar-images-container">
            {posterList.similarMovies.map(each => (
              <li key={each.id} className="popular-image-item">
                <Link to={`/movies/${each.id}`}>
                  <img
                    className="popular-image"
                    src={each.poster_path}
                    alt="name"
                  />
                </Link>
              </li>
            ))}
          </ul>
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
        <div>{this.displayView()}</div>
        <ContactsList />
      </div>
    )
  }
}

export default Home
