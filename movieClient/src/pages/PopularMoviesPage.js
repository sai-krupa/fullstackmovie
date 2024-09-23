import { Container } from 'reactstrap';
import MoviesList from '../features/movies/MoviesList';
import SubHeader from '../components/SubHeader';

const PopularMoviesPage = () => {
  return (
    <Container>
      <SubHeader current='Popular Movies' />
      <MoviesList />
    </Container>
  );
};

export default PopularMoviesPage;
