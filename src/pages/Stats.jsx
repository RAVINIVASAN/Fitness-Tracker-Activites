import { useContext, useEffect } from 'react';
import { AppContext } from '../context/Appcontext';

const Stats = () => {
  const { state } = useContext(AppContext);

  // Calculate stats dynamically using reduce
  const stats = state.activities.reduce(
    (acc, activity) => {
      // Validate activity
      if (
        activity.steps > 0 &&
        activity.caloriesBurned > 0 &&
        activity.workoutMinutes > 0 &&
        typeof activity.goalAchieved === 'boolean'
      ) {
        acc.totalActivities += 1;
        if (activity.goalAchieved) {
          acc.goalAchievedCount += 1;
        } else {
          acc.goalNotAchievedCount += 1;
        }
      }
      return acc;
    },
    {
      totalActivities: 0,
      goalAchievedCount: 0,
      goalNotAchievedCount: 0
    }
  );

  // Expose to window object for evaluation
  useEffect(() => {
    window.appState = {
      totalActivities: stats.totalActivities,
      goalAchievedCount: stats.goalAchievedCount,
      goalNotAchievedCount: stats.goalNotAchievedCount
    };
  }, [stats]);

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;

  return (
    <div className="stats-page">
      <h1>Activities Analytics Dashboard</h1>

      <div className="stats-container">
        <div className="stat-card">
          <h2>Total Valid Activities</h2>
          <p data-testid="total-activities">{stats.totalActivities}</p>
        </div>

        <div className="stat-card">
          <h2>Goal Achieved</h2>
          <p data-testid="goal-achieved">{stats.goalAchievedCount}</p>
        </div>

        <div className="stat-card">
          <h2>Goal Not Achieved</h2>
          <p data-testid="goal-not-achieved">{stats.goalNotAchievedCount}</p>
        </div>
      </div>

      <div className="debug-info">
        <p>Window appState available: {typeof window.appState !== 'undefined' ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default Stats;
