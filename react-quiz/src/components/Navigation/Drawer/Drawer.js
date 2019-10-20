import React from 'react';
import styles from './Drawer.module.sass';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom'

const links = [
  {to: '/', label: 'List', exact: true},
  {to: '/auth', label: 'Autorization', exact: false},
  {to: '/quiz-creator', label: 'Create test', exact: false},
]

class Drawer extends React.Component {

  handlerClick = () => {
    this.props.onClose()
  }

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li
          key={index}
        >
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={styles.active}
            onClick={this.handlerClick}
          >{link.label}</NavLink>
        </li>
      )
    })
  }

  render () {

    const cls = [
      styles.Drawer
    ]

    if(!this.props.isOpen) {
      cls.push(styles.close)
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}        
      </React.Fragment>
    )
  }
}

export default Drawer;