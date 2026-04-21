import { createContext, useReducer, useEffect } from 'react';
import appReducer, { initialState } from '../reducer/AppReducer';
import { fetchActivities } from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const data = await fetchActivities();
        dispatch({ type: 'SET_ACTIVITIES', payload: data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };

    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
