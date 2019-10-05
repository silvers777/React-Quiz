import React from 'react';
import styles from './MenuToggle.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'

const MenuToggle = (props) => {

  let icon

  const cls = [
    styles.MenuToggle
  ]

  if (props.isOpen) {
    icon = faTimes
    cls.push(styles.open)
  } else {
    icon = faBars
  }

  return (
    <FontAwesomeIcon
      icon={icon}
      onClick={props.onToggle}
      className={cls.join(' ')}
    />
  )
}

export default MenuToggle;