import { useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import Review from './Review';
import ReviewForm from './ReviewForm';
import { selectReviewsByMovieId } from '../movies/moviesSlice';
import { isAuthenticated } from '../user/userSlice';

const ReviewsList = ({ movieId }) => {
    const reviews = useSelector(selectReviewsByMovieId(movieId));
    const auth = useSelector(isAuthenticated);

    let pageContent = <></>;
    if (reviews && reviews.length > 0) {
        pageContent = (
            <>
                <h4>Reviews</h4>
                {reviews.map((review) => {
                    return <Review key={review._id} review={review} />;
                })}
            </>
        );
    } else {
        pageContent = <div>There are no reviews for this movie yet.</div>;
    }

    return (
        <Col md='5' className='m-1'>
            {pageContent}
            {auth && <ReviewForm movieId={movieId} />}
        </Col>
    );
};

export default ReviewsList;
