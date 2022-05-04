let BASE_URL = '';

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:5000'
} else {
  BASE_URL = 'https://twitter-backend-project.herokuapp.com'
}

module.exports.BASE_URL = BASE_URL;