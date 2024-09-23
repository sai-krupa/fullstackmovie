import { formatDate } from '../../utils/formatDate';

const Review = ({ review }) => {
    const { text: reviewText, rating, author, updatedAt } = review;

    if (reviewText === '') {
        return (
            <p>
                {rating}/5 stars -- {author.username}, {formatDate(updatedAt)}
            </p>
        );
    }

    return (
        <p>
            {reviewText}
            <br />
            {rating}/5 stars -- {author.username}, {formatDate(updatedAt)}
        </p>
    );
}; 

export default Review;
