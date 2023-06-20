import {Component} from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Sliders from '../Sliders'

const orginalStatus = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Orginals extends Component {
  state = {status: orginalStatus.inProgress, trendingList: []}

  componentDidMount() {
    this.fetchData()
  }

  tryAgain = () => {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({status: orginalStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const apiURL = 'https://apis.ccbp.in/movies-app/originals'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const resposne = await fetch(apiURL, options)

      const data = await resposne.json()

      if (resposne.ok === true) {
        const fetchedData = data.results.map(each => ({
          backdropPath: each.backdrop_path,
          id: each.id,
          overview: each.overview,
          posterPath: each.poster_path,
          title: each.title,
        }))

        this.setState({
          status: orginalStatus.success,
          trendingList: fetchedData,
        })
      } else {
        this.setState({status: orginalStatus.failed})
      }
    } catch (error) {
      this.setState({status: orginalStatus.failed})
    }
  }

  successView = () => {
    const {trendingList} = this.state
    const settings = {
      slidesToShow: 4,
      slidesToScroll: 3,
    }
    const mbSettings = {
      slidesToScroll: 3,
      slidesToShow: 3,
    }
    return (
      <div>
        <ul className="slider-container lg-view ">
          <Slider {...settings}>
            {trendingList.map(eachItem => (
              <Sliders key={eachItem.id} items={eachItem} />
            ))}
          </Slider>
        </ul>
        <ul className="slider-container mb-view ">
          <Slider {...mbSettings}>
            {trendingList.map(eachItem => (
              <Sliders key={eachItem.id} items={eachItem} />
            ))}
          </Slider>
        </ul>
      </div>
    )
  }

  failedView = () => (
    <div>
      <div className="home-poster-container">
        <img
          src="https://res.cloudinary.com/reddyimgs/image/upload/v1687103762/alert-triangle_fqs6cl.png"
          alt="failure view"
        />
        <p className="try-again-text">Something went wrong. Please try again</p>
        <button type="button" onClick={this.tryAgain}>
          Try Again
        </button>
      </div>
    </div>
  )

  render() {
    const {status} = this.state
    switch (status) {
      case orginalStatus.inProgress:
        return (
          <div className="trending-now-container" data-testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        )
      case orginalStatus.success:
        return this.successView()
      case orginalStatus.failed:
        return this.failedView()

      default:
        return null
    }
  }
}

export default Orginals
