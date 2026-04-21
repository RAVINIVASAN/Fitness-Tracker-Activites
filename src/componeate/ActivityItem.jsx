import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';

const ActivityItem = ({ activity }) => {
  const { dispatch } = useContext(AppContext);

  const handleToggleGoal = () => {
    const newGoalStatus = activity.steps >= 8000 ? true : !activity.goalAchieved;

    dispatch({
      type: 'UPDATE_ACTIVITY_GOAL',
      payload: {
        id: activity.activityId,
        goalAchieved: newGoalStatus
      }
    });
  };

  return (
    <div data-testid="activity-item" className="activity-item">
      <h3>{activity.name || 'Unknown'}</h3>
      <p>Date: {activity.date || 'No Date'}</p>
      <p>Steps: {activity.steps}</p>
      <p>Calories: {activity.caloriesBurned}</p>
      <p>Duration: {activity.workoutMinutes} min</p>
      <p>Goal: {activity.goalAchieved ? 'Achieved' : 'Not Achieved'}</p>
      <button onClick={handleToggleGoal}>Toggle Goal Status</button>
      <Link to={`/activities/${activity.activityId}`}>View Details</Link>
    </div>
  );
};

export default ActivityItem;
