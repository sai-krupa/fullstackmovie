import { Container, Row } from 'reactstrap';
import UserWatchMoviesList from '../features/user/UserWatchMoviesList';
import SubHeader from '../components/SubHeader';

const WatchMoviesPage = () => {
  return (
    <Container>
      <SubHeader current='WatchMovies' />
      <Row>
        <UserWatchMoviesList />
      </Row>
    </Container>
  );
};

export default WatchMoviesPage;
