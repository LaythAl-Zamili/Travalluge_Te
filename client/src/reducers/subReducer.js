import subService from '../services/subs';

// Reducer function for handling subreddit state
const subReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ALL_SUBS_LIST':
      // Updates the state with all subreddits list
      return { ...state, allSubs: action.payload };
    case 'SET_TOP_SUBS_LIST':
      // Updates the state with top subreddits list
      return { ...state, topSubs: action.payload };
    case 'SUBSCRIBE_SUB_FROM_LIST':
      // Updates the state when subscribing to a subreddit from the list
      return {
        ...state,
        topSubs: state.topSubs.map((t) =>
          t.id !== action.payload.id ? t : { ...t, ...action.payload.data }
        ),
      };
    case 'ADD_NEW_SUB':
      // Adds a new subreddit to the state
      return {
        ...state,
        allSubs: [...state.allSubs, action.payload],
      };
    default:
      return state;
  }
};

// Action creator for setting the list of all subreddits
export const setSubList = () => {
  return async (dispatch) => {
    const subs = await subService.getAllSubreddits();

    dispatch({
      type: 'SET_ALL_SUBS_LIST',
      payload: subs,
    });
  };
};

// Action creator for setting the list of top subreddits
export const setTopSubsList = () => {
  return async (dispatch) => {
    const top10Subs = await subService.getTopSubreddits();

    dispatch({
      type: 'SET_TOP_SUBS_LIST',
      payload: top10Subs,
    });
  };
};

// Action creator for toggling subscription to a subreddit
export const toggleSubscribe = (id, subscribedBy) => {
  return async (dispatch) => {
    const subscriberCount = subscribedBy.length;

    dispatch({
      type: 'SUBSCRIBE_SUB_FROM_LIST',
      payload: { id, data: { subscribedBy, subscriberCount } },
    });

    await subService.subscribeSub(id);
  };
};

// Action creator for adding a new subreddit
export const addNewSub = (subredditObj) => {
  return async (dispatch) => {
    const createdSub = await subService.createSubreddit(subredditObj);

    dispatch({
      type: 'ADD_NEW_SUB',
      payload: {
        subredditName: createdSub.subredditName,
        id: createdSub.id,
      },
    });
  };
};

export default subReducer;
