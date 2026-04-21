const initialState = {
  activities: [],
  loading: false,
  error: null
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVITIES':
      return {
        ...state,
        activities: action.payload,
        loading: false,
        error: null
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case 'UPDATE_ACTIVITY_GOAL':
      return {
        ...state,
        activities: state.activities.map(activity =>
          activity.activityId === action.payload.id
            ? { ...activity, goalAchieved: action.payload.goalAchieved }
            : activity
        )
      };

    default:
      return state;
  }
};

export default appReducer;
export { initialState };
