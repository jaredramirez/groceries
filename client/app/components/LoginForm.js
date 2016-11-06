import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, View, TextInput, ActivityIndicator, Text } from 'react-native'
import Button from 'react-native-button'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  input: {
    height: 40,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black'
  },
  loginMessage: {
    color: 'red',
    textAlign: 'center'
  }
})

export default class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      isFetching: false,
      loginMessage: null
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.isFetching !== null) {
      this.setState({
        isFetching: nextProps.isFetching
      })
    }
    if(nextProps.message !== null) {
      this.setState({
        loginMessage: nextProps.message
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.email}
          placeholder='email'
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
        style={styles.input}
        value={this.state.password}
        placeholder='Password'
        autoCapitalize="none"
        secureTextEntry={true}
        selectTextOnFocus={true}
        returnKeyType="go"
        onChangeText={(password) => this.setState({ password })}
        />
        <Button onPress={() => this.props.login(this.state.email, this.state.password)}>
          Login
        </Button>
        <ActivityIndicator animating={this.state.isFetching} size='small' />
        <Text style={styles.loginMessage}>{this.state.loginMessage}</Text>
      </View>
    )
  }
  
  static propTypes = {
    login: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    message: React.PropTypes.string,
    token: React.PropTypes.string,
  }
}
