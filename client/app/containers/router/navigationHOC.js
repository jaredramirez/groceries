import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import fp from 'lodash/fp'

import Navigation from './navigation'
import { initRoutes, pushRoute, popRoute } from './../../actions/nav'
import { uiToggleDrawer } from './../../actions/ui'

const findInitialRoute = fp.findKey(route => route.initial)

class RouterInstance extends Component {
  componentWillMount () {
    let { actions, nav, routeMap } = this.props
    if(nav.current === null) {
      let initalRoute = findInitialRoute(routeMap)
      actions.initRoutes(initalRoute)
    }
  }
  render() {
    return (this.props.nav.current !== null) ?
      <Navigation {...this.props} /> :
      null
  }

  static propTypes = {
    routeMap: React.PropTypes.object.isRequired,
    backButtonDisabled: React.PropTypes.bool,
    nav: React.PropTypes.object.isRequired,
    grocery: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  }
}

const mapStateToProps = state => {
  return { nav: state.nav, grocery: state.grocery}
}

const mapDispatchtoProps = dispatch => {
  return {actions: bindActionCreators({initRoutes, pushRoute, popRoute, uiToggleDrawer}, dispatch)}
}

export default  connect(mapStateToProps, mapDispatchtoProps)(RouterInstance)
