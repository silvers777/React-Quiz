import React from 'react';
import styles from './FinishedQuiz.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom'

const FinishedQuiz = props => {
  
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }

    return total

  }, 0)

  return (
    <div className={styles.FinishedQuiz}>
      <ul>
        { props.quiz.map((quizItem, index) => {

          const cls = styles[props.results[quizItem.id]]

          let icon

          props.results[quizItem.id] === 'error' 
          ? icon = faTimes
          : icon = faCheck

          return (
            <li
              key={index}
            >
              <strong>{index + 1}&nbsp;.</strong>
              {quizItem.question}
              <FontAwesomeIcon icon={icon} className={cls}/>
            </li>
          )

          })
        }
      </ul>

      <p>Right {successCount} of {props.quiz.length}</p>

      <div>
        <Button
          onClick={props.onRetry}
          type="primary"
        >Repeat</Button>
        <Link
          to="/"
        >
          <Button
            onClick={props.onRetry}
            type="success"
          >Go to the list of tests</Button>
         </Link> 
      </div>
    </div>
  )
}

export default FinishedQuiz;