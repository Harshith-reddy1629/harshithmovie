import {v4} from 'uuid'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'

const searchPageStatus = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Search extends Component {
  state = {status: '', searchValue: '', searchList: []}

  getSearchResults = async () => {
    const {searchValue} = this.state

    if (searchValue !== '') {
      this.setState({
        status: searchPageStatus.inProgress,
      })
      const jwtToken = Cookies.get('jwt_token')

      const apiUrl = `https://apis.ccpb.in/movies-app/movies-search?search=${searchValue}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
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
          this.setState({
            status: searchPageStatus.success,
            searchList: fetchedData,
          })
        } else {
          this.setState({
            status: searchPageStatus.failed,
          })
        }
      } catch (error) {
        this.setState({
          status: searchPageStatus.failed,
        })
      }
    }
  }

  tryAgain = () => {
    this.getSearchResults()
  }

  onSearching = text => {
    this.setState(
      {status: searchPageStatus.inProgress, searchValue: text},
      this.getSearchResults,
    )
  }

  succcessView = () => {
    const {searchList, searchValue} = this.state

    if (searchList.length === 0) {
      return (
        <div className="search-container">
          <img
            src="https://res.cloudinary.com/reddyimgs/image/upload/v1687101303/Group_7394_gadzmp.png"
            alt="no movies"
          />
          <p className="search-not-found-para">{`Your search for ${searchValue} did not find any matches.`}</p>
        </div>
      )
    }

    return (
      <ul className="popular-images-container">
        {searchList.map(each => (
          <li key={v4()} className="popular-image-item">
            <Link to={`/movies/${each.id}`}>
              <img className="popular-image" src={each.posterPath} alt="name" />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  displayView = () => {
    const {status} = this.state
    switch (status) {
      case searchPageStatus.inProgress:
        return (
          <div className="search-container" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        )
      case searchPageStatus.success:
        return this.succcessView()

      case searchPageStatus.failed:
        return (
          <div className="search-container popular-failed-container">
            <img
              src="https://res.cloudinary.com/reddyimgs/image/upload/v1687103762/alert-triangle_fqs6cl.png"
              alt="failure view"
            />
            <h1 className="try-again-text">
              Something went wrong. Please try again
            </h1>
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
    const {searchValue} = this.state
    console.log(searchValue)
    return (
      <div className="home-container">
        <Header onSearching={this.onSearching} />
        {this.displayView()}
      </div>
    )
  }
}

export default Search
