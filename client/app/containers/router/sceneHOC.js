import React, {Component} from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64
  }
})

export default (NextComponent) => {

  class SceneComponent extends Component {
    render() {
      return (
        <View style={styles.container}>
          <NextComponent />
        </View>
      )
    }
  }

  return SceneComponent
}
