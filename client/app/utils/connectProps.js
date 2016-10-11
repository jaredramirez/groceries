import _ from 'lodash'

export default (grocery) => {
  let index = _.findIndex(grocery.lists, (list) => {
    return list.id === grocery.meta.currentListId
  })

  let connectedItems = [],
      itemIds = grocery.lists[index].itemIds,
      items = grocery.items

  _.forEach(itemIds, (itemId, key) => {
    _.forEach(items, (item, key) => {
      if(item.id === itemId)
        connectedItems.push(item)
    })
  })

  return {
    ...grocery,
    lists: grocery.lists.map((list, listIndex, array) => {
      if(listIndex === index)
        return _.assign({}, list, { items: connectedItems })
      return list
    })
  }
}
