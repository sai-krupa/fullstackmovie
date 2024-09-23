import {
  selectCurrentUserWatchMovies,
  deleteWatchMovie,
  isAuthenticated,
} from './userSlice';
import { selectMovieById } from '../movies/moviesSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Row,
  Button,
} from 'reactstrap';

const RenderWatchMovieMovie = ({ movieId }) => {
  const movie = useSelector(selectMovieById(movieId));
  const { image, name, year, genre, _id } = movie;
  const dispatch = useDispatch();

  return (
    <Card width='200px' height='450px'>
      <CardImg src={image} alt={name} width='200px' height='450px' />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardText>Genre: {genre}</CardText>
        <CardText>Year: {year}</CardText>
        <Button
          color='danger'
          className='ms-5'
          onClick={() => dispatch(deleteWatchMovie(_id))}
        >
          Delete
        </Button>
      </CardBody>
    </Card>
  );
};

const UserWatchMoviesList = () => {
  const auth = useSelector(isAuthenticated);
  const watchMovies = useSelector(selectCurrentUserWatchMovies);

  if (!auth) {
    return (
      <Col>
        <p>You must be logged in to view watchMovies.</p>
      </Col>
    );
  }

  if (watchMovies.length === 0) {
    return (
      <Col>
        <p>You have no watchMovies selected.</p>
      </Col>
    );
  }
  return (
    <Row className='ms-auto'>
      {watchMovies.map((watchMovie) => {
        return (
          <Col md='5' lg='3' className='m-4'>
            <div className='d-flex' key={watchMovie.movieId}>
              <RenderWatchMovieMovie movieId={watchMovie.movieId} />
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default UserWatchMoviesList;
