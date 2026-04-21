import axios from 'axios';

const BASE_URL = 'https://t4e-testserver.onrender.com/api';
const PASSWORD = '840558';

let token = null;

const mockData = [
  {
    activityId: 1,
    name: "Morning Run",
    steps: 8500,
    caloriesBurned: 450,
    workoutMinutes: 45,
    goalAchieved: true,
    date: "2026-04-20"
  },
  {
    activityId: 2,
    name: "Gym Session",
    steps: 6000,
    caloriesBurned: 320,
    workoutMinutes: 60,
    goalAchieved: false,
    date: "2026-04-21"
  },
  {
    activityId: 3,
    name: "Evening Walk",
    steps: 10000,
    caloriesBurned: 280,
    workoutMinutes: 50,
    goalAchieved: true,
    date: "2026-04-19"
  },
  {
    activityId: 4,
    name: "Yoga Class",
    steps: 2500,
    caloriesBurned: 150,
    workoutMinutes: 60,
    goalAchieved: false,
    date: "2026-04-18"
  },
  {
    activityId: 5,
    name: "Cycling",
    steps: 12000,
    caloriesBurned: 600,
    workoutMinutes: 75,
    goalAchieved: true,
    date: "2026-04-17"
  }
];

const getToken = async () => {
  if (token) return token;

  try {
    const response = await axios.post(`${BASE_URL}/public/token`, {
      password: PASSWORD
    });
    token = response.data.token;
    return token;
  } catch (error) {
    console.warn('Token fetch failed, using mock data:', error.message);
    return null;
  }
};

const fetchActivities = async () => {
  try {
    const authToken = await getToken();

    if (!authToken) {
      console.warn('No authentication token, using mock data for testing');
      return mockData;
    }

    const response = await axios.get(`${BASE_URL}/private/data`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.warn('API fetch failed, using mock data:', error.message);
    return mockData;
  }
};

export { fetchActivities };

