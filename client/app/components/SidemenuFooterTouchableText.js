import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  text: {
    color: '#858B9B'
  }
})

const ListTouchableText = ({ style, textStyle, text, onPress }) =>
  (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )

ListTouchableText.propTypes = {
  style: React.PropTypes.number,
  textStyle: React.PropTypes.number,
  text: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
}

export default ListTouchableText
