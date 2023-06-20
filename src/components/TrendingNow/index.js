import {Component} from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Sliders from '../Sliders'

const trendnowStatus = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class TrendingNow extends Component {
  state = {status: trendnowStatus.inProgress, trendingList: []}

  componentDidMount() {
    this.fetchData()
  }

  tryAgain = () => {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({status: trendnowStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const apiURL = 'https://apis.ccbp.in/movies-app/trending-movies'

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
          status: trendnowStatus.success,
          trendingList: fetchedData,
        })
      } else {
        this.setState({status: trendnowStatus.failed})
      }
    } catch (error) {
      this.setState({status: trendnowStatus.failed})
    }
  }

  failedView = () => (
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
  )

  successView = () => {
    const {trendingList} = this.state
    const settings = {
      slidesToShow: 4,
      slidesToScroll: 3,
    }
    const mbSettings = {
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
        <ul className="slider-container mb-view">
          <Slider {...mbSettings}>
            {trendingList.map(eachItem => (
              <Sliders key={eachItem.id} items={eachItem} />
            ))}
          </Slider>
        </ul>
      </div>
    )
  }

  render() {
    const {status} = this.state
    switch (status) {
      case trendnowStatus.inProgress:
        return (
          <div className="trending-now-container" data-testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        )
      case trendnowStatus.success:
        return this.successView()
      case trendnowStatus.failed:
        return this.failedView()

      default:
        return null
    }
  }
}

export default TrendingNow
