import postService from '../services/posts';

// Reducer function for managing the state of posts
const postReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      // Sets the posts to the payload received
      return action.payload;
    case 'LOAD_MORE_POSTS':
      // Loads additional posts to the existing results
      return {
        ...action.payload,
        results: [...state.results, ...action.payload.results],
      };
    case 'TOGGLE_VOTE':
      // Toggles the vote (upvote/downvote) on a post
      return {
        ...state,
        results: state.results.map((r) =>
          r.id !== action.payload.id ? r : { ...r, ...action.payload.data }
        ),
      };
    case 'DELETE_POST':
      // Removes a post from the results
      return {
        ...state,
        results: state.results.filter((r) => r.id !== action.payload),
      };
    default:
      return state;
  }
};

// Action creator for fetching posts
export const fetchPosts = (sortBy) => {
  return async (dispatch) => {
    let posts;

    if (sortBy !== 'subscribed') {
      posts = await postService.getPosts(sortBy, 10, 1);
    } else {
      posts = await postService.getSubPosts(10, 1);
    }

    dispatch({
      type: 'SET_POSTS',
      payload: posts,
    });
  };
};

// Action creator for loading additional posts
export const loadMorePosts = (sortBy, page) => {
  return async (dispatch) => {
    let posts;
    if (sortBy !== 'subscribed') {
      posts = await postService.getPosts(sortBy, 10, page);
    } else {
      posts = await postService.getSubPosts(10, page);
    }

    dispatch({
      type: 'LOAD_MORE_POSTS',
      payload: posts,
    });
  };
};

// Action creator for toggling an upvote on a post
export const toggleUpvote = (id, upvotedBy, downvotedBy) => {
  return async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }

    dispatch({
      type: 'TOGGLE_VOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.upvotePost(id);
  };
};

// Action creator for toggling a downvote on a post
export const toggleDownvote = (id, downvotedBy, upvotedBy) => {
  return async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }

    dispatch({
      type: 'TOGGLE_VOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.downvotePost(id);
  };
};

// Action creator for removing a post
export const removePost = (id) => {
  return async (dispatch) => {
    await postService.deletePost(id);

    dispatch({
      type: 'DELETE_POST',
      payload: id,
    });
  };
};

export default postReducer;
