import subService from '../services/subs';
import postService from '../services/posts';

// Reducer function for managing the state of a subreddit page
const subPageReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_SUB':
      // Updates the state with the fetched subreddit data
      return action.payload;
    case 'LOAD_SUB_POSTS':
      // Loads additional posts to the existing subreddit posts
      return {
        ...state,
        posts: {
          ...action.payload.posts,
          results: [...state.posts.results, ...action.payload.posts.results],
        },
      };
    case 'TOGGLE_SUBPAGE_VOTE':
      // Toggles the vote (upvote/downvote) on a post in the subreddit page
      return {
        ...state,
        posts: {
          ...state.posts,
          results: state.posts.results.map((p) =>
            p.id !== action.payload.id ? p : { ...p, ...action.payload.data }
          ),
        },
      };
    case 'SUBSCRIBE_SUB':
      // Updates the subscription details of the subreddit
      return {
        ...state,
        subDetails: { ...state.subDetails, ...action.payload },
      };
    case 'EDIT_DESCRIPTION':
      // Updates the description of the subreddit
      return {
        ...state,
        subDetails: { ...state.subDetails, description: action.payload },
      };
    default:
      return state;
  }
};

// Action creator for fetching a subreddit by name and sorting method
export const fetchSub = (subredditName, sortBy) => {
  return async (dispatch) => {
    const sub = await subService.getSubreddit(subredditName, sortBy, 10, 1);

    dispatch({
      type: 'FETCH_SUB',
      payload: sub,
    });
  };
};

// Action creator for loading additional posts for a subreddit page
export const loadSubPosts = (subredditName, sortBy, page) => {
  return async (dispatch) => {
    const sub = await subService.getSubreddit(subredditName, sortBy, 10, page);

    dispatch({
      type: 'LOAD_SUB_POSTS',
      payload: sub,
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
      type: 'TOGGLE_SUBPAGE_VOTE',
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
      type: 'TOGGLE_SUBPAGE_VOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.downvotePost(id);
  };
};

// Action creator for toggling subscription to a subreddit
export const toggleSubscribe = (id, subscribedBy) => {
  return async (dispatch) => {
    const subscriberCount = subscribedBy.length;

    dispatch({
      type: 'SUBSCRIBE_SUB',
      payload: { subscribedBy, subscriberCount },
    });

    await subService.subscribeSub(id);
  };
};

// Action creator for editing the description of a subreddit
export const editDescription = (id, description) => {
  return async (dispatch) => {
    await subService.updateDescription(id, { description });

    dispatch({
      type: 'EDIT_DESCRIPTION',
      payload: description,
    });
  };
};

export default subPageReducer;
