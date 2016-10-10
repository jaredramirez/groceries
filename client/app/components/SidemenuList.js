import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import List from './List'

const styles = StyleSheet.create({
  list: {
    margin: 20
  },
  separator: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ABAFB7',
  }
})

export default class SidemenuList extends Component {
  render() {
    return (
      <List
        style={styles.list}
        data={this.props.data}
        renderHeader={this.props.renderHeader}
        renderRow={this.props.renderRow}
        renderFooter={this.props.renderFooter}
        shouldRenderSeparator={this.props.shouldRenderSeparator}
      />
    )
  }

  static propTypes = {
    style: React.PropTypes.number,
    data: React.PropTypes.array.isRequired,
    renderHeader: React.PropTypes.func,
    renderRow: React.PropTypes.func.isRequired,
    renderFooter: React.PropTypes.func,
    shouldRenderSeparator: React.PropTypes.bool,
  }
}
