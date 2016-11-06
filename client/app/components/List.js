import React, { Component } from 'react'
import { StyleSheet, ListView, View } from 'react-native'

const styles = StyleSheet.create({
  separator: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ABAFB7',
  }
})

export default class List extends Component {
  constructor(props) {
    super(props)
    var dataSource = new ListView.DataSource({
      sectionHeaderHasChanged: (oldSection, newSection) => oldSection !== newSection,
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      dataSource: dataSource.cloneWithRows(props.data)
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
    })
  }
  render() {
    return (
      <ListView
        contentContainerStyle={(this.props.style) ? this.props.style : {}}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderHeader={this.props.renderHeader}
        renderRow={this.props.renderRow}
        renderFooter={this.props.renderFooter}
        renderSeparator={(this.props.shouldRenderSeparator) ? this._renderSeparator : null}
      />
    )
  }
  _renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={styles.separator}
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
