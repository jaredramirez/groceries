import React, { Component } from 'react'
import {
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import SceneHOC from './sceneHOC'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    backgroundColor: '#45C8DC',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',

    fontWeight: '500',
    fontSize: 16,
    margin: 10
  },
  backButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
})

export default class Navigation extends Component {
  render() {
    let { routeMap, nav } = this.props
    const RouteComponent = SceneHOC(routeMap[nav.current].component)

    return (
      <Navigator
        style={styles.container}
        renderScene={() => <RouteComponent ref={(c) => this._component = c} />}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navbar}
            routeMapper={ this._navigationBarRouteMapper() }
          />
        }
      />
    )
  }
  _navigationBarRouteMapper = () => {
    let { nav, actions, routeMap } = this.props,
        props = this.props

    return {
      LeftButton: () => {
        if(routeMap[nav.current].component.renderNavbarLeftButton) {
          return routeMap[nav.current].component.renderNavbarLeftButton(props)
        } else if(nav.routes.length > 1 && (routeMap[nav.current].backButtonDisabled === false || typeof routeMap[nav.current].backButtonDisabled === 'undefined')) {
          return (
            <TouchableHighlight style={styles.backButton}
              onPress={ () => actions.popRoute() }>
              <Icon
                name="keyboard-arrow-left"
                size={35}
                color="white"
              />
            </TouchableHighlight>
          )
        }
        else {
          return null
        }
      },
      RightButton: () => {
        let RightButton = (routeMap[nav.current].component.renderNavbarRightButton) ?
          routeMap[nav.current].component.renderNavbarRightButton(props) :
          null
        return RightButton
      },
      Title: () => {
        let title = null

        if(routeMap[nav.current].component.renderNavbarTitle) {
          return routeMap[nav.current].component.renderNavbarTitle(props)
        } else if(routeMap[nav.current].title) {
          title = routeMap[nav.current].title
        } else {
          title = nav.current
        }

        return <Text style={styles.title}>{title}</Text>
      }
    }
  }

  static propTypes = {
    routeMap: React.PropTypes.object.isRequired,
    backButtonDisabled: React.PropTypes.bool,
    nav: React.PropTypes.object.isRequired,
    grocery: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  }
}
