import React from 'react';
import styles from './Quiz.module.sass';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends React.Component {

  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
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

    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {

      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

      const timeout = window.setTimeout(() => {

        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeout)
      }, 1000)
      
      
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    }

  }

  isQuizFinished(){
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  handlerRetry = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  componentDidMount() {
    console.log('Quiz ID = ', this.props.match.params.id)
  }

  render () {
    return (
      <div className={styles.Quiz}>        
        <div className={styles.QuizWrapper}>
          <h1>Answer these questions</h1>
          {
            this.state.isFinished
            ? <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.handlerRetry}
              />
            : <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
          }
        </div>
      </div>
    )
  }
}

export default Quiz;