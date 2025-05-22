const ENV = process.env.REACT_APP_ENV || 'local';

const config = {
  local: {
    apiUrl: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
},
  dev: {
    apiUrl: 'https://gestorbienesdjango.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
  },
  prod: {
    apiUrl: 'https://gestorbienesdjango.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
  },

};

export default config[ENV];
