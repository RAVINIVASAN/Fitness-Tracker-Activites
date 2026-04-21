import { useContext } from 'react';
import { AppContext } from '../context/Appcontext';
import ActivityItem from '../componeate/ActivityItem';

const Activities = () => {
  const { state } = useContext(AppContext);

  // Filter valid activities
  const validActivities = state.activities.filter(activity => {
    return (
      activity.steps > 0 &&
      activity.caloriesBurned > 0 &&
      activity.workoutMinutes > 0 &&
      typeof activity.goalAchieved === 'boolean'
    );
  });

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;

  return (
    <div className="activities-page">
      <h1>Activities</h1>
      <div className="activities-list">
        {validActivities.map(activity => (
          <ActivityItem key={activity.activityId} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default Activities;
