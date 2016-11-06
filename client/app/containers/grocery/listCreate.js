import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createGroceryList, setCurrentGroceryList } from './../../actions/grocery'
import { uiToggleDrawer } from './../../actions/ui'

import ListCreateForm from './../../components/ListCreateForm'

class CreateGroceryList extends Component {
  render() {
    return (
      <ListCreateForm create={this.create}/>
    )
  }
  create = (newListName) => {
    let { grocery, actions } = this.props,
        list =  {
          id: (grocery.meta.listId + 1),
          name: newListName,
          itemIds: []
        }

    actions.createGroceryList(list)
    actions.setCurrentGroceryList(list.id)
    actions.uiToggleDrawer()
  }
  static propTypes = {
    grocery: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  }
}

const mapStateToProps = (state) => {
  return {grocery: state.grocery}
}

const mapDispatchToProps = (dispatch) => {
  return {actions: bindActionCreators({ createGroceryList, setCurrentGroceryList, uiToggleDrawer }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroceryList)
