import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';

const ActivityDetail = () => {
  const { id } = useParams();
  const { state } = useContext(AppContext);

  const activity = state.activities.find(a => a.activityId === parseInt(id));

  if (!activity) {
    return (
      <div>
        <h1>Activity not found</h1>
        <Link to="/activities">Back to Activities</Link>
      </div>
    );
  }

  // Calculate efficiency score dynamically
  const efficiency = activity.workoutMinutes > 0
    ? (activity.caloriesBurned / activity.workoutMinutes).toFixed(2)
    : 0;

  return (
    <div className="activity-detail">
      <h1>{activity.name}</h1>
      <p><strong>Activity ID:</strong> {activity.activityId}</p>
      <p><strong>Date:</strong> {activity.date}</p>
      <p><strong>Steps:</strong> {activity.steps}</p>
      <p><strong>Calories Burned:</strong> {activity.caloriesBurned}</p>
      <p><strong>Workout Duration:</strong> {activity.workoutMinutes} minutes</p>
      <p><strong>Goal Achieved:</strong> {activity.goalAchieved ? 'Yes' : 'No'}</p>
      <p><strong>Efficiency Score:</strong> {efficiency} cal/min</p>
      <Link to="/activities">Back to Activities</Link>
    </div>
  );
};

export default ActivityDetail;
