import React from 'react';
import styles from './Layout.module.sass';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

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

export default Layout;