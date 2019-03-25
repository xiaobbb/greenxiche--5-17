import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

// export default {

//     // 这个字段走 app.json
//     config: {
//       // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
//       "pages": ["^pages/index/main"],
//       "window": {
//         // "backgroundTextStyle": "light",
//         "navigationBarBackgroundColor": "#fff",
//         "navigationBarTitleText": "绿妞洗车",
//         "navigationBarTextStyle": "blcak",
//         "enablePullDownRefresh": true // 开启下拉刷新
//       },
//       "tabBar": {
//         "backgroundColor": "#ffff",
//         "borderStyle": "white",
//         "selectedColor": "#ff6325",
//         "color": "#fff",
//         "list": [{
//             "pagePath": "pages/index/main",
//             "iconPath": "static/images/footer/home1.png",
//             "selectedIconPath": "static/images/footer/home2.png",
//             "text": "首页"
//           },
//           {
//             "pagePath": "pages/shopcenter/main",
//             "iconPath": "static/images/footer/shop1.png",
//             "selectedIconPath": "static/images/footer/shop2.png",
//             "text": "商城"
//           },
//           {
//             "pagePath": "pages/mycenter/main",
//             "iconPath": "static/images/footer/my1.png",
//             "selectedIconPath": "static/images/footer/my2.png",
//             "text": "我的"
//           }
//         ]
//       },
//       "permission": {
//         "scope.userLocation": {
//           "desc": "你的位置信息将用于小程序位置接口的效果展示"
//         }
//       }
//     }
//   }
  
