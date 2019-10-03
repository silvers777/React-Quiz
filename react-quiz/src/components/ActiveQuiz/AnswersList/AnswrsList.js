import React from 'react';
import styles from './AnswrsList.module.sass';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = props => {
  return (
    <ul className={styles.AnswersList}>
      { props.answers.map((answer, index) => {
        return (
          <AnswerItem 
            key={index}
            answer={answer}
            onAnswerClick={props.onAnswerClick}
          />
        )
      })}
    </ul>
  )
}

export default AnswersList;