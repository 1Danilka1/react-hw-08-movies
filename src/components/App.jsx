import { Routes, Route, NavLink } from "react-router-dom";
import styled from "styled-components";
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';
import NotFound from './NotFound/NotFound';

const StyledLink = styled(NavLink)`
  margin-right: 20px;
  text-decoration: none;
  color: black;

  &.active {
    color: orange;
  }
`;

export default function App() {
  return (
    <div>
      <nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </nav>

      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/movies" element={<Movies />}/>
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />}/>
            <Route path="reviews" element={<Reviews />}/>
          </Route>
          <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  )
}
