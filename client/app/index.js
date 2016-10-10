import React, { Component } from 'react'
import { AsyncStorage, ActivityIndicator } from 'react-native'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import store from './store'
import * as ActionTypes from './actions/types'

import Router from './containers/router'
import Drawer from './scenes/drawer'
import Login from './scenes/login'

/*
params for each route:
  KEY                   string         REQUIRED
  'component'           object         REQUIRED
  'title'               string         OPTINAL
  'type'                enum['modal']  OPTIONAL
  'initial'             bool           OPTIONAL
  'backButtonDisabled'  bool           OPTIONAL
*/
const routeMap = {
  drawer: { component: Drawer, initial: true},
  login: { component: Login, type: 'modal'},
}

export default class App extends Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount(){
    persistStore(store, {
      storage: AsyncStorage,
      blacklist: [ActionTypes.INIT_ROUTES,ActionTypes.REPLACE_ROUTE,ActionTypes.PUSH_ROUTE,ActionTypes.POP_ROUTE,ActionTypes.UI_TOGGLE_DRAWER]
    }, () => {
      this.setState({ rehydrated: true })
    })
    persistStore(store, {storage: AsyncStorage}).purge()
  }
  render() {
    if(!this.state.rehydrated){
      return <ActivityIndicator animating={this.state.rehydrated} size='small' />
    }
    return (
      <Provider store={store} >
        <Router routeMap={routeMap} />
      </Provider>
    )
  }
}
