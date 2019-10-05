import React from 'react';
import styles from './ActiveQuiz.module.sass';
import AnswersList from './AnswersList/AnswrsList';


const ActiveQuiz = (props) => {
  return (
    <div className={styles.ActiveQuiz}>
      <p className={styles.Question}>
        <span>
          <strong>{props.answerNumber}. &nbsp;</strong>
          {props.question}
        </span>
        <small>{props.answerNumber} of {props.quizLength}</small>
      </p>
      <AnswersList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
        state={props.state}
      />
    </div>
  )
}

export default ActiveQuiz;