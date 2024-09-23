const express = require('express');
const Movie = require('../models/movie');
const authenticate = require('../authenticate');
const cors = require('./cors');

const movieRouter = express.Router();

movieRouter
    .route('/')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, (req, res, next) => {
        Movie.find()
            .populate('reviews.author')
            .then((movies) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(movies);
            })
            .catch((err) => next(err));
    })
    .post(
        cors.corsWithOptions,
        authenticate.verifyUser,
        authenticate.verifyAdmin,
        (req, res, next) => {
            Movie.create(req.body)
                .then((movie) => {
                    console.log('Movie Created ', movie);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(movie);
                })
                .catch((err) => next(err));
        }
    )
    .put(
        cors.corsWithOptions,
        authenticate.verifyUser,
        authenticate.verifyAdmin,
        (req, res) => {
            res.statusCode = 403;
            res.end('PUT operation not supported on /movies');
        }
    )
    .delete(
        cors.corsWithOptions,
        authenticate.verifyUser,
        authenticate.verifyAdmin,
        (req, res, next) => {
            Movie.deleteMany()
                .then((response) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(response);
                })
                .catch((err) => next(err));
        }
    );

movieRouter
    .route('/:movieId')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, (req, res, next) => {
        Movie.findById(req.params.movieId)
            .populate('reviews.author')
            .then((movie) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(movie);
            })
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, (req, res) => {
        res.statusCode = 403;
        res.end(
            `POST operation not supported on /movies/${req.params.movieId}`
        );
    })
    .put(
        cors.corsWithOptions,
        authenticate.verifyUser,
        authenticate.verifyAdmin,
        (req, res, next) => {
            Movie.findByIdAndUpdate(
                req.params.movieId,
                {
                    $set: req.body
                },
                { new: true }
            )
                .then((movie) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(movie);
                })
                .catch((err) => next(err));
        }
    )
    .delete(
        cors.corsWithOptions,
        authenticate.verifyUser,
        authenticate.verifyAdmin,
        (req, res, next) => {
            Movie.findByIdAndDelete(req.params.movieId)
                .then((response) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(response);
                })
                .catch((err) => next(err));
        }
    );

movieRouter
    .route('/:movieId/reviews')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, (req, res, next) => {
        Movie.findById(req.params.movieId)
            .populate('reviews.author')
            .then((movie) => {
                if (movie) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(movie.reviews);
                } else {
                    err = new Error(`Movie ${req.params.movieId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Movie.findById(req.params.movieId)
            .then((movie) => {
                if (movie) {
                    req.body.author = req.user._id;
                    movie.reviews.push(req.body);
                    movie
                        .save()
                        .then((movie) => {
                            const postedReview =
                                movie.reviews[movie.reviews.length - 1];
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({
                                review: postedReview,
                                author: {
                                    _id: req.user_id,
                                    username: req.user.username
                                }
                            });
                        })
                        .catch((err) => next(err));
                } else {
                    err = new Error(`Movie ${req.params.movieId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, (req, res) => {
        res.statusCode = 403;
        res.end(
            `PUT operation not supported on /movies/${req.params.movieId}/reviews`
        );
    })
    .delete(
        cors.corsWithOptions,
        authenticate.verifyUser,
        authenticate.verifyAdmin,
        (req, res, next) => {
            Movie.findById(req.params.movieId)
                .then((movie) => {
                    if (movie) {
                        movie.reviews = [];
                        movie
                            .save()
                            .then((movie) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(movie);
                            })
                            .catch((err) => next(err));
                    } else {
                        err = new Error(
                            `Movie ${req.params.movieId} not found`
                        );
                        err.status = 404;
                        return next(err);
                    }
                })
                .catch((err) => next(err));
        }
    );

movieRouter
    .route('/:movieId/reviews/:reviewId')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, (req, res, next) => {
        Movie.findById(req.params.movieId)
            .populate('reviews.author')
            .then((movie) => {
                if (movie && movie.reviews.id(req.params.reviewId)) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(movie.reviews.id(req.params.reviewId));
                } else if (!movie) {
                    err = new Error(`Movie ${req.params.movieId} not found`);
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error(`Review ${req.params.reviewId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, (req, res) => {
        res.statusCode = 403;
        res.end(
            `POST operation not supported on /movies/${req.params.movieId}/reviews/${req.params.reviewId}`
        );
    })
    .put(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end(
            `PUT operation not supported on /movies/${req.params.movieId}/reviews/${req.params.reviewId}`
        );
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Movie.findById(req.params.movieId)
            .then((movie) => {
                if (movie && movie.reviews.id(req.params.reviewId)) {
                    if (
                        movie.reviews
                            .id(req.params.reviewId)
                            .author._id.equals(req.user._id)
                    ) {
                        movie.reviews.id(req.params.reviewId).remove();
                        movie
                            .save()
                            .then((movie) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(movie);
                            })
                            .catch((err) => next(err));
                    } else {
                        err = new Error(
                            'You are not authorized to delete this review!'
                        );
                        err.status = 403;
                        return next(err);
                    }
                } else if (!movie) {
                    err = new Error(`Movie ${req.params.movieId} not found`);
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error(`Review ${req.params.reviewId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    });

module.exports = movieRouter;
