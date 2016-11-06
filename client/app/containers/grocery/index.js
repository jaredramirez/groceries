import React, { Component } from 'react'
import { connect } from 'react-redux'
import connectProps from './../../utils/connectProps'

import _ from 'lodash'

import List from './../../components/List'
import ItemContainer from './item'
import ItemCreateContainer from './itemCreate'

class GroceryContainer extends Component {
  constructor(props) {
    super(props)

    let { lists, meta } = props.grocery
    let index = _.findIndex(lists, (list) => {
      return list.id === meta.currentListId
    })
    this.state = {
      groceryListItems: this.props.grocery.lists[index].items
    }
  }
  componentWillReceiveProps(nextProps) {
    let { lists, meta } = nextProps.grocery
    let index = _.findIndex(lists, (list) => {
      return list.id === meta.currentListId
    })
    this.setState({
      groceryListItems: nextProps.grocery.lists[index].items
    })
  }
  render() {
    let { lists, meta } = this.props.grocery
    let index = _.findIndex(lists, (list) => {
      return list.id === meta.currentListId
    })

    return (
      <List
        data={this.props.grocery.lists[index].items}
        renderHeader={this.renderHeader}
        renderRow={this.renderRow}
        shouldRenderSeparator={true}/>
    )
  }
  renderHeader = () => {
    return <ItemCreateContainer />
  }
  renderRow = (rowData) => {
    return (
      <ItemContainer item={rowData}/>
    )
  }

  static propTypes = {
    grocery: React.PropTypes.object.isRequired
  }
}

const mapStateToProps = state => {
  return {grocery: connectProps(state.grocery)}
}

export default connect(mapStateToProps)(GroceryContainer)
