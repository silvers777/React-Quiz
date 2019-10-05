import React from 'react';
import styles from './Button.module.sass';

const Button = props => {

  const cls = [
    styles.Button,
    styles[props.type]
  ]

  return (
    <button
      onClick={props.onClick}
      className={cls.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button;