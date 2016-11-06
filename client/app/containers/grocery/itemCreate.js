import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createGroceryItem } from './../../actions/grocery'

import ListItemCreateForm from './../../components/ListItemCreateForm'

class CreateGroceryItem extends Component {
  render() {
    return (
      <ListItemCreateForm create={this.create} />
    )
  }
  create = (name, quantity) => {
    let { grocery, actions } = this.props,
        item = {
          id: (grocery.meta.itemId + 1),
          name,
          quantity,
          isCompleted: false
        }
    actions.createGroceryItem(grocery.meta.currentListId, item)
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
  return {actions: bindActionCreators({createGroceryItem}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroceryItem)
