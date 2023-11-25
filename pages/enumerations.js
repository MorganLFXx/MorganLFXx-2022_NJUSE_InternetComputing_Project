//存放的是一些常用的枚举变量 --ykg
export const StoragePath = ""//用于存放未来的云端的存储路径 --ykg

export const UserType = {
  学生: 0,
  厨师: 1,
}

export const UserTypeName = {
  0: "学生",
  1: "厨师",
}

export const Gender = {
  '保密': 0,
  '男': 1,
  '女': 2,
}

export const GenderName = {
  0: '保密',
  1: '男',
  2: '女',
}

export const Campus = {
  '无': 0,
  '仙林': 1,
  '鼓楼': 2,
  '苏州': 3,
  '浦口': 4,
} 

export const CampusName = {
  0: '无',
  1: '仙林',
  2: '鼓楼',
  3: '苏州',
  4: '浦口',
}

export const Canteen = {
  '无': 0,
  '一食堂': 1,
  '二食堂': 2,
  '三食堂': 3,
  '四食堂': 4,
  '五食堂': 5,
  '六食堂': 6,
  '鼓楼民族食堂': 7,
  '仙林民族食堂': 8,
  '九食堂': 9,
  '十食堂': 10,
  '十二食堂': 12,
}

export const CanteenName = {
  0: '无',
  1: '一食堂',
  2: '二食堂',
  3: '三食堂',
  4: '四食堂',
  5: '五食堂',
  6: '六食堂',
  7: '鼓楼民族食堂',
  8: '仙林民族食堂',
  9: '九食堂',
  10: '十食堂',
  12: '十二食堂',
}

export const Window = {
  //todo: 等着调研一下食堂的窗口名 --ykg
}

export const WindowName = {
  //todo: 等着调研一下食堂的窗口名 --ykg
}

export const ItemOfPerson = {
  name: 0,
  campus: 1,//校区
  canteen: 2,//食堂
  window: 3,//窗口
  brief: 4,
} 

export const ItemOfDish = {
  name: 5,
  campus: 6,//校区
  canteen: 7,//食堂
  window: 8,//窗口
  timeInfo: 9,
  brief: 10,
  status: 11,//菜品的烹饪状态
}

