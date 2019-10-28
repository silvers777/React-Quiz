import React from 'react'
import styles from './Layout.module.sass'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { connect } from 'react-redux'

class Layout extends React.Component {

  state = {
    menu: false
  }

  handlerMenuToggle = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  handlerMenuClose = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    return (
      <div className={styles.Layout}>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.handlerMenuClose}
          isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle
          onToggle={this.handlerMenuToggle}
          isOpen={this.state.menu}
        />
        <main> 
          { this.props.children }         
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout)