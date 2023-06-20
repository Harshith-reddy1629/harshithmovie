import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'

import Home from './components/Home'

import Search from './components/Search'

import Account from './components/Account'

import Popular from './components/Popular'

import './App.css'

import './mobile.css'

import NotFound from './components/NotFound'
import MovieDetails from './components/MovieDetails'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute exact path="/search" component={Search} />
      <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </div>
)

export default App
