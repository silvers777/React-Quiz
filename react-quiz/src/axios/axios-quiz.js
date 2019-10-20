import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-quiz-1a310.firebaseio.com/'
})