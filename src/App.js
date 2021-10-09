import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import AppBar from './components/AppBar';
// import HomePage from './components/HomePage';
// import MovieDetailPage from './components/MovieDetailsPage';
// import MoviesPage from './components/MoviesPage';

import './App.css';

function App() {
  const HomePage = lazy(() => import('./components/HomePage' /*webpackChunkName "HomePage" */));

  const MoviesPage = lazy(() =>
    import('./components/MoviesPage' /*webpackChunkName "MoviesPage" */),
  );
  const MovieDetailPage = lazy(() =>
    import('./components/MovieDetailsPage' /*webpackChunkName "MovieDetailPage" */),
  );

  return (
    <Container>
      <AppBar />
      <Suspense fallback="LOADING">
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
      </Suspense>
    </Container>
  );
}

export default App;
