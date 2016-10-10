import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { pushRoute } from './../../actions/nav'
import { deleteToken } from './../../actions/token'
import SidemenuFooterTouchableText from './../../components/SidemenuFooterTouchableText'

class FooterContainer extends Component {
  render() {
    let footer = (this.props.auth.token) ?
      <SidemenuFooterTouchableText
        text="Logout"
        onPress={() => this.props.actions.deleteToken()} /> :
      <SidemenuFooterTouchableText
        text="Login"
        onPress={() => this.props.actions.pushRoute('login')} />

    return footer
  }

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators({ pushRoute, deleteToken }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer)
