//存放的是一些常用的枚举变量 --ykg
export const studentLeftBtnStoragePath = "../../../resources/navBar/unselectedMe.png"//用于存放未来的云端的存储路径 --ykg
export const studentRightBtnStoragePath = "../../../resources/navBar/unselectedOrder.png"
export const chefLeftBtnStoragePath = "../../../resources/navBar/selectedOrder.png"
export const chefRightBtnStoragePath = "../../../resources/navBar/selectedOrder.png"
export const lastImgStoragePath = "/resources/image/unknown.jpg"

export const UserType = {
  '学生': 0,
  '厨师': 1,
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
  '仙林': 0,
  '鼓楼': 1,
} 

export const CampusName = {
  0: '仙林',
  1: '鼓楼',
}

export const Canteen = {
  '一食堂': 0,
  '二食堂': 1,
  '三食堂': 2,
  '鼓楼民族食堂': 3,
  '四食堂': 4,
  '五食堂': 5,
  '六食堂': 6,
  '仙林民族食堂': 7,
  '九食堂': 8,
  '十食堂': 9,
  '十二食堂': 10,
}

export const CanteenName = {
  0: '一食堂',
  1: '二食堂',
  2: '三食堂',
  3: '鼓楼民族食堂',
  4: '四食堂',
  5: '五食堂',
  6: '六食堂',
  7: '仙林民族食堂',
  8: '九食堂',
  9: '十食堂',
  10: '十二食堂',
}

export const Window = {
  '一窗口': 0, 
  '二窗口': 1,
  '三窗口': 2, 
  '四窗口': 3, 
  '五窗口': 4, 
  '六窗口': 5,
}

export const WindowName = {
  0: '一窗口', 
  1: '二窗口',
  2: '三窗口', 
  3: '四窗口', 
  4: '五窗口', 
  5: '六窗口',
}

export const ItemType = {
  name: 0,
  bill: 1,
  campus: 2,//校区
  canteen: 3,//食堂
  window: 4,//窗口
  brief: 5,
  status: 6,//菜品的烹饪状态
  type: 7,
}

export var curCampus = 0
export var curCanteen = 0
export var curWindow = 0
