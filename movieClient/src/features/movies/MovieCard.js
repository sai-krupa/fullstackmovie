import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { _id, image, name, year, genre } = movie;

  return (
    <Card width='200px' height='450px'>
      <Link to={`${_id}`}>
        <CardImg src={image} alt={name} width='200px' height='450px' />
      </Link>
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardText>
          Genre: {genre}
          <sapan className='ms-5'>Year: {year}</sapan>
        </CardText>
        <CardText>
          <CardLink href={`${_id}`}>
            <Button color='primary' className='ms-auto'>
              More Info
            </Button>
          </CardLink>
        </CardText>
      </CardBody>
    </Card>
   
  );
};

export default MovieCard;
