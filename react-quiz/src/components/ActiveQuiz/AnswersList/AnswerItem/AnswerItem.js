import React from 'react';
import styles from './AnswerItem.module.sass';

const AnswerItem = props => {

  const cls = [styles.AnswerItem]

  if (props.state) {
    cls.push(styles[props.state])
  }

  return (
    <li
      className={cls.join(' ')}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  )
}

export default AnswerItem;