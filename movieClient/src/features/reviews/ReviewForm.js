import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    FormGroup
} from 'reactstrap';
import { validateReviewForm } from '../../utils/validateReviewForm';
import { postReview } from '../movies/moviesSlice';

const ReviewForm = ({ movieId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        const review = {
            movieId: movieId,
            rating: values.rating,
            text: values.reviewText
        };
        dispatch(postReview(review));
        setModalOpen(false);
    };

    return (
        <div className='mt-3'>
            <Button outline onClick={() => setModalOpen(true)}>
                <i className='fa fa-pencil fa-lg' /> Add Review
            </Button>
            <Modal isOpen={modalOpen}>
                <ModalHeader toggle={() => setModalOpen(false)}>
                    Add Review
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            rating: undefined,
                            reviewText: ''
                        }}
                        onSubmit={handleSubmit}
                        validate={validateReviewForm}
                    >
                        <Form>
                            <FormGroup>
                                <Label htmlFor='rating'>Rating</Label>
                                <Field
                                    name='rating'
                                    as='select'
                                    className='form-control'
                                >
                                    <option>Select...</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Field>
                                <ErrorMessage name='rating'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='reviewText'>Review</Label>
                                <Field
                                    name='reviewText'
                                    as='textarea'
                                    rows='12'
                                    className='form-control'
                                />
                            </FormGroup>
                            <Button type='submit' color='primary'>
                                Submit
                            </Button>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default ReviewForm;
