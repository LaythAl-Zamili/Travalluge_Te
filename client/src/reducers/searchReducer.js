import postService from '../services/posts';

// Reducer function for managing the state of search results
const searchReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      // Sets the search results to the payload received
      return action.payload;
    case 'TOGGLE_SEARCH_VOTE':
      // Toggles the vote (upvote/downvote) on a search result
      return {
        ...state,
        results: state.results.map((r) =>
          r.id !== action.payload.id ? r : { ...r, ...action.payload.data }
        ),
      };
    case 'LOAD_SEARCH_POSTS':
      // Loads additional search results to the existing results
      return {
        ...action.payload,
        results: [...state.results, ...action.payload.results],
      };
    default:
      return state;
  }
};

// Action creator for setting the search results
export const setSearchResults = (query) => {
  return async (dispatch) => {
    const results = await postService.getSearchResults(query, 10, 1);

    dispatch({
      type: 'SET_SEARCH_RESULTS',
      payload: results,
    });
  };
};

// Action creator for loading additional search results
export const loadSearchPosts = (query, page) => {
  return async (dispatch) => {
    const results = await postService.getSearchResults(query, 10, page);

    dispatch({
      type: 'LOAD_SEARCH_POSTS',
      payload: results,
    });
  };
};

// Action creator for toggling an upvote on a search result
export const toggleUpvote = (id, upvotedBy, downvotedBy) => {
  return async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }

    dispatch({
      type: 'TOGGLE_SEARCH_VOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.upvotePost(id);
  };
};

// Action creator for toggling a downvote on a search result
export const toggleDownvote = (id, downvotedBy, upvotedBy) => {
  return async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }

    dispatch({
      type: 'TOGGLE_SEARCH_VOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.downvotePost(id);
  };
};

export default searchReducer;
