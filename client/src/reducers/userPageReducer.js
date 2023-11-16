import userService from '../services/user';
import postService from '../services/posts';

// Reducer for user page related state
const userPageReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return action.payload;
    case 'TOGGLE_USERPAGE_VOTE':
      return {
        ...state,
        posts: {
          ...state.posts,
          results: state.posts.results.map((r) =>
            r.id !== action.payload.id ? r : { ...r, ...action.payload.data }
          ),
        },
      };
    case 'LOAD_USER_POSTS':
      return {
        ...state,
        posts: {
          ...action.payload.posts,
          results: [...state.posts.results, ...action.payload.posts.results],
        },
      };
    default:
      return state;
  }
};

// Action creator for fetching user data
export const fetchUser = (username) => {
  return async (dispatch) => {
    const user = await userService.getUser(username, 5, 1);

    dispatch({
      type: 'FETCH_USER',
      payload: user,
    });
  };
};

// Action creator for loading user posts
export const loadUserPosts = (username, page) => {
  return async (dispatch) => {
    const user = await userService.getUser(username, 5, page);

    dispatch({
      type: 'LOAD_USER_POSTS',
      payload: user,
    });
  };
};

// Action creator for toggling upvote on a user's post
export const toggleUpvote = (id, upvotedBy, downvotedBy) => {
  return async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }

    dispatch({
      type: 'TOGGLE_USERPAGE_VOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.upvotePost(id);
  };
};

// Action creator for toggling downvote on a user's post
export const toggleDownvote = (id, downvotedBy, upvotedBy) => {
  return async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }

    dispatch({
      type: 'TOGGLE_USERPAGE_VOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.downvotePost(id);
  };
};

export default userPageReducer;
