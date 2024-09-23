import { Card, CardImg, CardText, CardBody, Col, Button } from 'reactstrap';
import {
  postWatchMovie,
  isAuthenticated,
} from '../user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const MovieDetail = ({ movie }) => {
  const { image, name, description, _id } = movie;
  const dispatch = useDispatch();
  const auth = useSelector(isAuthenticated);
  
  return (
    <Col md='5' className='m-1'>
      <Card>
        <CardImg top src={image} alt={name} />
        <CardBody>
          <CardText>{description}</CardText>
          {auth && (
            <Button
              color='primary'
              onClick={() => dispatch(postWatchMovie(_id))}
            >
              Watch
            </Button>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default MovieDetail;
