import { useContext, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import ActivityItem from '../componeate/ActivityItem';

const Filter = () => {
  const { state } = useContext(AppContext);
  const [filterInput, setFilterInput] = useState('');
  const [error, setError] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterInput(value);

    if (value === '') {
      setError('');
    } else if (isNaN(value) || value < 0) {
      setError('Invalid input');
    } else {
      setError('');
    }
  };

  // Filter activities where steps >= input value
  const filteredActivities = filterInput === ''
    ? []
    : state.activities.filter(activity => {
        const threshold = parseInt(filterInput);
        return activity.steps >= threshold;
      });

  return (
    <div className="filter-page">
      <h1>Filter Activities</h1>
      <div className="filter-section">
        <label htmlFor="step-filter">Filter by steps (minimum steps):</label>
        <input
          id="step-filter"
          data-testid="filter-input"
          type="number"
          value={filterInput}
          onChange={handleFilterChange}
          placeholder="Enter minimum steps"
        />
        {error && <p className="error">{error}</p>}
      </div>

      {filterInput !== '' && (
        <div className="filtered-results">
          <h2>Activities with {filterInput}+ steps</h2>
          <div className="activities-list">
            {filteredActivities.map(activity => (
              <ActivityItem key={activity.activityId} activity={activity} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
