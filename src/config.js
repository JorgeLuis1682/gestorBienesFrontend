const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export default config;
