import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text
} from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view'
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
  visible: {
    backgroundColor: '#F7F8F8',
    height: 35,
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    marginLeft: 20,
    marginTop: 8
  },
  itemTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    color: '#6E7583'
  },
  quantity: {
    position: 'relative',
    marginRight: 40,
  },
  hidden: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingLeft: 15,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',

    top: 0,
    bottom: 0,
    width: 50,
    right: 0,
    position: 'absolute',
    backgroundColor: 'red',
  }
})

export default class List extends Component {
  render() {
    let item = this.props.item,
        checkmark = (item.isCompleted) ?
        <Icon
          style={styles.icon}
          name="done"
          size={20}
          color="#3EB4C6"
        /> :
        null

    return (
      <SwipeRow rightOpenValue={-150} ref={(c) => this._row = c} >

        <View style={styles.hidden}>
          <TouchableOpacity style={styles.deleteButton}
            onPress={() => this._remove(item)}>
            <Icon
              name="delete"
              size={25}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <TouchableHighlight
          style={styles.visible}
          onPress={() => this._toggle(item)}
          underlayColor="#e6e6e6" >
          <View style={styles.itemWrapper}>

            {checkmark}

            <View style={styles.itemTextWrapper}>
              <Text style={styles.itemText}>
                {item.name}
              </Text>
            </View>

            <Text style={[styles.quantity, styles.itemText]}>
              {item.quantity}
            </Text>

          </View>
        </TouchableHighlight>

      </SwipeRow>
    )
  }
  _toggle = (item) => {
    this.props.toggle(item)
    this._row.closeRow()
  }
  _remove = (item) => {
    this.props.remove(item)
    this._row.closeRow()
  }

  static propTypes = {
    item: React.PropTypes.object.isRequired,
    toggle: React.PropTypes.func.isRequired,
    remove: React.PropTypes.func.isRequired
  }
}
