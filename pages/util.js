//用于存放一些常用的函数 --ykg

import { ItemType } from "../pages/enumerations";

export async function handleInput(event, page) {
    const itemIndex = parseInt(event.currentTarget.dataset.itemindex)
    const value = event.detail.value
    var entries = page.data.entries
    entries[itemIndex].value = value
    entries[itemIndex].isEmpty = value.trim() === ""
    entries[itemIndex].isStandard = checkUserInfoLegality(value, itemIndex)
    await iterateLegality(page, itemIndex).then((res) => {
      page.setData({
        entries: entries,
        isReady: res,
      })
    })
}

export async function iterateLegality(page, itemIndex) {
  const entries = page.data.entries
  var list = []
  switch(itemIndex) {
    case ItemType.name:
      list.push(entries[ItemType.name].isStandard);
      break;
    case ItemType.window:
      list.push(entries[ItemType.window].isStandard);
      break
    default:
      console.error('No corresponding item index in iterateLegality().')
      break
  }
  var ans = list.reduce((a, b) => a && b, true)
  return ans
}

export function checkUserInfoLegality(value, itemType) {
  var reg
  switch (itemType) {
    case ItemType.name:
    case ItemType.window:
      reg = /^[\u4e00-\u9fa5]+$/
      break
  }
  return reg.exec(value) !== null
}

