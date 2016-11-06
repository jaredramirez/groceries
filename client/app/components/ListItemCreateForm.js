import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const isValidString = (name) => {
  if(typeof name !== 'string')
    return false
  if(name.length <= 0)
    return false

  return true
}

const isValidNumber = (quantity) => {
  if(Number.isNaN(quantity))
    return false
  if(typeof quantity !== 'number')
    return false
  if(quantity <= 0)
    return false

  return true
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2F2',
    borderBottomWidth: 1,
    borderBottomColor: '#ABAFB7'
  },
  form: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: 35,
    margin: 10
  },
  itemWapper: {
    flex: 3,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  itemName: {
    flex: 3,
    height: 35,
    textAlign: 'center',
    fontSize: 15
  },
  itemQuantity: {
    flex: 2,
    textAlign: 'center',
    fontSize: 15,
  },
  itemMeasurement: {
    height: 35,
    flex: 2,
    textAlign: 'center',
    fontSize: 15,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#ABAFB7',
  },
  validBorder: {
    borderWidth: 1,
    borderColor: '#ABAFB7',
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: 'red',
  }
})

export default class ListItemCreateForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      quantity: null,

      nameError: false,
      quantityError: false
    }
  }
  render() {
    let style = (this.props.style) ? this.props.style : {},
        nameBorder = (this.state.nameError) ? styles.errorBorder : styles.validBorder,
        quantityBorder = (this.state.quantityError) ? styles.errorBorder : styles.validBorder

    return (
      <View style={styles.container}>
        <View style={[styles.form, style]}>

          <View style={[styles.itemWapper, nameBorder]}>
            <TextInput
              style={styles.itemName}
              value={this.state.name}
              placeholder='Item'
              autoCapitalize="none"
              onChangeText={(name) => this.setState({name})}
            />
          </View>

          <TextInput
            style={[styles.itemQuantity, quantityBorder]}
            value={this.state.quantity}
            placeholder='quantity'
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={(quantity) => this.setState({quantity})}
          />

          <TouchableOpacity style={styles.button}
            onPress={() => this._create(this.state.name, this.state.quantity, this.state.measurement)}>
            <Icon
              name="add"
              size={25}
              color="#6E7583"
            />
          </TouchableOpacity>

        </View>
      </View>
    )
  }
  _create = (name, quantity) => {
    // Cast to number
    quantity = parseInt(quantity)

    // Reset state errors
    this.setState({
      nameError: false,
      quantityError: false
    })

    // Validate inputs
    if(!isValidString(name)) {
      this.setState({
        nameError: true
      })
      return
    } else if(!isValidNumber(quantity)) {
      this.setState({
        quantityError: true
      })
      return
    }

    this.props.create(name, quantity)
  }
  static propTypes = {
    create: React.PropTypes.func.isRequired,
  }
}
