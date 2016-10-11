import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchToken } from './../../actions/token'
import { popRoute } from './../../actions/nav'

import LoginForm from './../../components/LoginForm'

class Form extends Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.token !== null)
      nextProps.actions.popRoute()
  }
  render() {
    return (
      <LoginForm
        login={this.login}
        isFetching={this.props.auth.isFetching}
        message={this.props.auth.message}
        token={this.props.auth.token}/>
    )
  }
  login(email, password) {
    this.props.actions.fetchToken({ email, password })
  }
  static propTypes = {
    user:    React.PropTypes.object.isRequired,
    auth:    React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  }
}

const mapStateToProps = (state) => {
  return {user: state.user, auth: state.auth}
}

const mapDispatchToProps = (dispatch) => {
  return {actions: bindActionCreators({ fetchToken, popRoute }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
