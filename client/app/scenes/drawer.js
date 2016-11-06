import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Drawer from 'react-native-drawer'

import Menu from './menu'
import GroceryContainer from './../containers/grocery'

const styles = StyleSheet.create({
  navTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',

    fontWeight: '500',
    fontSize: 16,
    margin: 10
  },
  navbarLeftButton: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F8F8'
  }
})

class SidemenuView extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.ui.drawerIsOpen === true)
      this.openDrawer()
    else if(nextProps.ui.drawerIsOpen === false)
      this.closeDrawer()
  }
  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<Menu />}
        type="static">

        <View style={styles.container}>
          <GroceryContainer />
        </View>

      </Drawer>
    )
  }
  openDrawer = () => {
    this._drawer.open()
  }
  closeDrawer = () => {
    this._drawer.close()
  }

  /*
  NOTE: renderNavbar* props not same as component props
    'navProps' {
      routeMap: {...routes},
      backButtonDisabled: bool,
      nav: {routes: ..., current: ...},
      grocery: {meta: ..., list: ..., items: ...},
      ui: { drawerIsOpen: bool},
      actions: [pushRoute, popRoute, etc]
    }
  */
  static renderNavbarLeftButton(navProps) {
    let { actions } = navProps
    return <TouchableOpacity style={styles.navbarLeftButton} onPress={actions.uiToggleDrawer} >
      <Icon name="list" size={32} color="white" />
    </TouchableOpacity>
   }
  static renderNavbarTitle(navProps) {
    let { grocery } = navProps
    return <Text style={styles.navTitle}>{grocery.lists[grocery.meta.currentListId].name}</Text>
  }

  static propTypes = {
    ui: React.PropTypes.object.isRequired
  }
}

const mapStateToProps = state => {
  return { ui: state.ui }
}

export default connect(mapStateToProps)(SidemenuView)
