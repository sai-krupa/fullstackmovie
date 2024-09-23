import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';
import { mapImageURL } from '../../utils/mapImageURL';

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async () => {
        const response = await fetch(baseUrl + 'movies');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        return data;
    }
);

// post a new review for a movie
export const postReview = createAsyncThunk(
    'movies/postReview',
    async (review) => {
        const bearer = 'Bearer ' + localStorage.getItem('token');

        const response = await fetch(
            baseUrl + 'movies/' + review.movieId + '/reviews',
            {
                method: 'POST',
                headers: {
                    Authorization: bearer,
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify(review)
            }
        );
        if (!response.ok) {
            return Promise.reject(response.status);
        }
        let data = await response.json();

        // Add movieId to returned review data for storing in application state
        data = { ...data, movieId: review.movieId };
        return data;
    }
);

const initialState = {
    moviesArray: [],
    isLoading: true,
    errMsg: ''
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMovies.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchMovies.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.moviesArray = mapImageURL(action.payload);
        },
        [fetchMovies.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [postReview.fulfilled]: (state, action) => {
            const newReview = action.payload.review;
            const movieId = action.payload.movieId;
            newReview.author = action.payload.author;
            const movieIdx = state.moviesArray.findIndex(
                (movie) => movie._id === movieId
            );
            if (movieIdx === -1) {
                console.log(
                    `Movie id of ${movieIdx} not found, cannot add review.`
                );
                return;
            }
            state.moviesArray[movieIdx].reviews.push(newReview);
        },
        [postReview.rejected]: (state, action) => {
            alert(
                'Your review could not be posted\nError: ' +
                    (action.error ? action.error.message : 'Fetch failed')
            );
        }
    }
});

export const moviesReducer = moviesSlice.reducer;

export const selectAllMovies = (state) => {
    return state.movies.moviesArray;
};

export const selectMovieById = (id) => (state) => {
    return state.movies.moviesArray.find((movie) => movie._id === id);
};

export const selectFeaturedMovie = (state) => {
    return {
        featuredItem: state.movies.moviesArray.find(
            (movie) => movie.featured
        ),
        isLoading: state.movies.isLoading,
        errMsg: state.movies.errMsg
    };
};

// Reviews by movie
export const selectReviewsByMovieId = (movieId) => (state) => {
    const movie = state.movies.moviesArray.find(
        (movie) => movie._id === movieId
    );
    return movie.reviews;
};
