import React, { Component } from 'react'
import { connect } from 'react-redux'
import connectProps from './../../utils/connectProps'
import { bindActionCreators } from 'redux'
import { toggleGroceryItem, removeGroceryItem } from './../../actions/grocery'

import ListItem from './../../components/ListItem'

class GroceryItem extends Component {
  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this)
    this.remove = this.remove.bind(this)
  }
  toggle(item) {
    let { grocery } = this.props
    this.props.actions.toggleGroceryItem(grocery.meta.currentListId, item)
  }
  remove(item) {
    let { grocery } = this.props
    this.props.actions.removeGroceryItem(grocery.meta.currentListId, item)
  }
  render() {
    return (
      <ListItem
        item={this.props.item}
        toggle={this.toggle}
        remove={this.remove}/>
    )
  }

  static propTypes = {
    item: React.PropTypes.object.isRequired,
    grocery: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  }
}

const mapStateToProps = state => {
  return {grocery: connectProps(state.grocery)}
}

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators({toggleGroceryItem, removeGroceryItem}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(GroceryItem)
