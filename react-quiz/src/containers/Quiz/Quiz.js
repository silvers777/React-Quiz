import React from 'react';
import styles from './Quiz.module.sass';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends React.Component {

  state = {
    activeQuestion: 0,
    quiz: [
      {
        question: 'What is a sky?',
        rightAnswerId: 2,
        id: 1,
        answers: [
          {text: 'black', id: 1},
          {text: 'blue', id: 2},
          {text: 'red', id: 3},
          {text: 'green', id: 4}
        ]
      },
      {
        question: 'In what year was St. Petersburg founded?',
        rightAnswerId: 3,
        id: 2,
        answers: [
          {text: '1700', id: 1},
          {text: '1702', id: 2},
          {text: '1703', id: 3},
          {text: '1803', id: 4}
        ]
      }
    ]
  }

  onAnswerClickHandler = (answerId) => {
    console.log('answerId: ', answerId)

    this.setState({
      activeQuestion: this.state.activeQuestion + 1
    })
  }

  render () {
    return (
      <div className={styles.Quiz}>        
        <div className={styles.QuizWrapper}>
          <h1>Answer these questions</h1>
          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
          />
        </div>
      </div>
    )
  }
}

export default Quiz;