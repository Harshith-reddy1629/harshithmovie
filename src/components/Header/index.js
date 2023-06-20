import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

class Header extends Component {
  state = {searchVal: '', displayMenu: false}

  onSearch = event => {
    const {onSearching} = this.props
    if (event.key === 'Enter') {
      onSearching(event.target.value)
    }
  }

  onTyping = event => {
    this.setState({searchVal: event.target.value})
  }

  onClickingSearch = () => {
    const {searchVal} = this.state
    const {onSearching} = this.props

    onSearching(searchVal)
  }

  showMenu = () => {
    this.setState(prevState => ({
      displayMenu: !prevState.displayMenu,
    }))
  }

  render() {
    const {match} = this.props
    const {path} = match

    const {searchVal, displayMenu} = this.state

    const searchPath = path === '/search'
    console.log(searchPath)

    return (
      <div>
        <header className="mb-view">
          <nav className=" header-container">
            <ul className="mb-header-container">
              <li>
                <Link to="/">
                  <img
                    className="website-logo"
                    src="https://res.cloudinary.com/reddyimgs/image/upload/v1686991944/Group_7399_smufhc.png"
                    alt="website logo"
                  />
                </Link>
              </li>
              <li>
                {searchPath ? (
                  <div className="search-input-container">
                    <input
                      className="search-input"
                      type="search"
                      placeholder="Search"
                      onChange={this.onTyping}
                      //   onKeyDown={this.onSearch}
                      value={searchVal}
                    />
                    <button
                      onClick={this.onClickingSearch}
                      type="button"
                      className="link-button input-search-button "
                      data-testid="searchButton"
                    >
                      <HiOutlineSearch />
                    </button>
                  </div>
                ) : (
                  <Link to="/search">
                    <button type="button" className="link-button search-button">
                      <HiOutlineSearch />
                    </button>
                  </Link>
                )}
              </li>
              <li>
                <button
                  onClick={this.showMenu}
                  type="button"
                  className="link-button menu-button "
                >
                  <img
                    src="https://res.cloudinary.com/reddyimgs/image/upload/v1687150471/add-to-queue_1_r2jqub.png"
                    alt="menu"
                  />
                </button>
              </li>
            </ul>
            {displayMenu && (
              <ul className="mb-menu-bar">
                <li>
                  <Link to="/">
                    <button className="link-button home-button" type="button">
                      Home
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/popular">
                    <button
                      className="link-button popular-button"
                      type="button"
                    >
                      Popular
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/account">
                    <button
                      className="link-button popular-button"
                      type="button"
                    >
                      Account
                    </button>
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </header>
        <header className="lg-view">
          <nav className="lg-header-container">
            <ul className="first-part">
              <li className="">
                <Link to="/">
                  <img
                    className="website-logo"
                    src="https://res.cloudinary.com/reddyimgs/image/upload/v1686991944/Group_7399_smufhc.png"
                    alt="website logo"
                  />
                </Link>
              </li>
              <li className="part-two  part-2">
                <Link to="/">
                  <button className="link-button home-button" type="button">
                    Home
                  </button>
                </Link>
              </li>

              <li className="part-two">
                <Link to="/popular">
                  <button className="link-button popular-button" type="button">
                    Popular
                  </button>
                </Link>
              </li>
            </ul>
            <ul className="second-part">
              <li>
                {searchPath ? (
                  <div className="search-input-container">
                    <input
                      className="search-input"
                      type="search"
                      placeholder="Search"
                      onChange={this.onTyping}
                      onKeyDown={this.onSearch}
                      value={searchVal}
                    />
                    <button
                      onClick={this.onClickingSearch}
                      type="button"
                      className="link-button input-search-button "
                    >
                      <HiOutlineSearch />
                    </button>
                  </div>
                ) : (
                  <Link to="/search">
                    <button type="button" className="link-button search-button">
                      <HiOutlineSearch />
                    </button>
                  </Link>
                )}
              </li>
              <div>
                <Link to="account">
                  <img
                    className="lg-view"
                    src="https://res.cloudinary.com/reddyimgs/image/upload/v1687011162/Avatar_zhzj4v.png"
                    alt="avatar"
                  />
                </Link>
              </div>
            </ul>
          </nav>
        </header>
      </div>
    )
  }
}

export default withRouter(Header)

//
