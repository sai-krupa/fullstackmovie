export const validateReviewForm = (values) => {
    const errors = {};

    if (!values.rating) {
        errors.rating = 'Required';
    }

    return errors;
};
