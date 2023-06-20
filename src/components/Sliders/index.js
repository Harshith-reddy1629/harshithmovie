import {Link} from 'react-router-dom'

const Sliders = props => {
  const {items} = props

  const {id, posterPath} = items

  return (
    <li className="slide-img-container">
      <Link to={`/movies/${id}`}>
        <img className="slider-image" src={posterPath} alt="name" />
      </Link>
    </li>
  )
}

export default Sliders
