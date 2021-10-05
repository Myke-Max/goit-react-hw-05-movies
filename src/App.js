import { Route, Switch } from 'react-router-dom';
import Container from './components/Container';

import AppBar from './components/AppBar';
import HomePage from './components/HomePage';
import MovieDetailPage from './components/MovieDetailsPage';
// import Cast from './components/Cast';
import MoviesPage from './components/MoviesPage';
// import Reviews from './components/Reviews';

import './App.css';

function App() {
  return (
    <Container>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailPage />
        </Route>

        <Route>
          <HomePage />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
