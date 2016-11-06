import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setCurrentGroceryList } from './../../actions/grocery'
import { pushRoute } from './../../actions/nav'
import { uiToggleDrawer } from './../../actions/ui'

import ListCreateContainer from './../grocery/listCreate'

import SidemenuList from './../../components/SidemenuList'
import ListHeader from './../../components/ListHeader'
import ListTouchableText from './../../components/ListTouchableText'

class Sidemenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groceryLists: props.grocery.lists
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      groceryLists: nextProps.grocery.lists
    })
  }
  render() {
    return (
      <SidemenuList
        data={this.state.groceryLists}
        renderHeader={this._renderHeader}
        renderRow={this._renderRow}
        renderFooter={this._renderFooter}
        shouldRenderSeparator={false}
      />
    )
  }
  _renderHeader = () => {
    let { grocery } = this.props
    return (
      <ListHeader currentListName={grocery.lists[grocery.meta.currentListId].name} />
    )
  }
  _renderRow = (rowData) => {
    let { id, name } = rowData
    return (
      <ListTouchableText
        text={name}
        onPress={() => this._selectList(id)}/>
    )
  }
  _renderFooter = () => {
    return <ListCreateContainer />
  }
  _selectList = (id) =>  {
    this.props.actions.setCurrentGroceryList(id)
    this.props.actions.uiToggleDrawer()
  }

  static propTypes = {
    grocery: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }
}

const mapStateToProps = state => {
  return {grocery: state.grocery}
}

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators({ setCurrentGroceryList, pushRoute, uiToggleDrawer }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidemenu)
