import React, { Component } from 'react';
import styles from './QuizList.module.sass';
import { NavLink } from 'react-router-dom';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';

class QuizList extends Component {

  state = {
    quizes: [],
    loading: true
  }

  renderQuizes () {
    return this.state.quizes.map(quiz => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink
            to={'/quiz/' + quiz.id}
          >
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      
      const response = await axios.get('quizes.json')

      const quizes = []

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test number ${index + 1}`
        })
      })

      this.setState({
        quizes,
        loading: false
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className={styles.QuizList}>
        <div>
          <h1>List tests</h1>
          {
            this.state.loading
            ? <Loader/>
            : <ul>
                { this.renderQuizes() }
              </ul>
          }
        </div>
      </div>
    );
  }
}

export default QuizList;