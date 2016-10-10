import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import SidemenuContainer from './../containers/sidemenu'
import SidemenuFooterContainer from './../containers/sidemenu/footer'

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#262A33'
  }
})

export default class Menu extends Component {
  render() {
    return (
      <View style={styles.menu} >
        <SidemenuContainer />
        <SidemenuFooterContainer />
      </View>
    )
  }
}
