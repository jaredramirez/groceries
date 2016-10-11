import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

const styles = StyleSheet.create({
  currentList: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white'
  },
  item: {
    color: '#858B9B',
    fontSize: 14,
    fontWeight: '300',
    margin: 5
  },
  separator: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#7A8491',
    marginBottom: 10
  }
})

const ListHeader = ({currentListName}) =>
  (
    <View>
      <Text style={styles.currentList}>
        <Text style={styles.item}>Current List: </Text>
        <Text>{currentListName}</Text>
      </Text>
      <View style={styles.separator}/>
    </View>
  )

ListHeader.propTypes = {
  currentListName: React.PropTypes.string.isRequired
}

export default ListHeader
