import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'

const styles = StyleSheet.create({
  text: {
    color: '#858B9B',
    fontSize: 14,
    fontWeight: '300',
    margin: 5
  },
})

const ListTouchableText = ({ style, textStyle, text, onPress }) =>
  (
    <TouchableOpacity style={style} onPress={onPress}>
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
