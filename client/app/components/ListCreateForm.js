import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const isValidnewListName = (newListName) => {
  if(typeof newListName !== 'string')
    return false
  if(newListName.length <= 0)
    return false
  return true
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginVertical: 15
  },
  newListName: {
    flex: 3,
    height: 25,
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: 'white',

    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#45C8DC',
    height: 25,
    borderRadius: 4,
  }
})

export default class ListCreateForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newListName: null,
      newListNameError: false
    }
  }
  render() {
    let style = (this.props.style) ? this.props.style : {}

    return (
      <View style={[styles.container, style]}>
        <TextInput
          style={styles.newListName}
          value={this.state.newListName}
          placeholder='New list name'
          autoCapitalize="none"
          onChangeText={(newListName) => this.setState({newListName})}
        />
        <TouchableOpacity style={styles.buttons}
          onPress={() => this._create(this.state.newListName)}>
          <Icon
            name="add"
            size={15}
            color="white"
          />
        </TouchableOpacity>
      </View>
    )
  }
  _create = (newListName) => {
    this.setState({
      newListNameError: false
    })

    if(!isValidnewListName(newListName)) {
      this.setState({
        newListNameError: true
      })
      return
    }

    this.props.create(newListName)
  }

  static propTypes = {
    create: React.PropTypes.func.isRequired
  }
}
