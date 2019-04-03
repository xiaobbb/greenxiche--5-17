<template>
  <div class="login">
      <open-data class="icon icon_circular_bead" type="userAvatarUrl"></open-data>
      <div class="auth-text">
          <text class="main">该小程序由网坛科技开发，请提供以下授权，即可继续操作</text>
          <text class="sub">· 获得你的公开信息（昵称、头像等）</text>
      </div>
      <button class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doBind">确认授权</button>
  </div>
</template>

<script>
import { host, myget, mypost } from "../../utils";
var qcloud = require("wafer2-client-sdk/index.js");
export default {
  onLoad(){
     
  },
  created() {},
  mounted() {},
  data() {
    return {
      phonecode: "获取验证码",
      show: true,
      sessionId: "",
      openid: "",
      ivdata: "",
      encryptedData: "",
      count: "",
      timer: null,
      telNumber: "",
      code: "",
      accessToken: "",
      // mobile:wx.getStorageSync("mobile"),
      // password: wx.getStorageSync("password"),
      mobile:"18123769378"
     
    };
  },
  components: {},
  methods: {
    doBind() {
      console.log(this.mobile,"手机号")
      let _this = this;
      var ivata = "";
      var encriptData = "";
      wx.showLoading({
        title: "登陆中..."
      });
      //用户授权登陆，code发送给服务器
      wx.login({
        success: (res)=>{
          var code = res.code; //腾讯服务器返回res,拿到code进行下一步操作
          console.log(code)
          // if(code){
          //     wx.request({
          //           method: "Get",
          //           url: "http://carapi.wtvxin.com/api/Login/GetLoginOpenId", //提交数据到服务器，如果没有绑定手机号码，则提示用户需要绑定手机号码
          //           data: {
          //             code: code,
          //           },
          //           header: {
          //             "content-type": "application/x-www-form-urlencoded"
          //           },
          //           success:(res)=>{
          //             console.log(res)
          //             const openid=res.data.data.openid
          //             const session_key=res.data.data.session_key
          //             const unionid=res.data.data.unionid
          //             console.log(this.openid)
          //             wx.setStorageSync("openid", openid)
          //             wx.setStorageSync("session_key", session_key)
          //             wx.setStorageSync("unionid", unionid)
          //           }
          //       })
          // }

          wx.getUserInfo({ 
            success: (res)=> {
              //console.log(res)
              var userInfo = res.userInfo;
              ivata = res.iv;
              encriptData = res.encryptedData;
              wx.setStorageSync("userInfo", userInfo); //保存用户信息，userInfo对象里面含有用户昵称，用户头像,性别等信息：
                                                       //userInfo.nickName 用户昵称; 
                                                       //userInfo.avatarUrl 用户头像图片的URL;
                                                       //userInfo.gender 用户性别
              console.log(this.mobile,"这是参数")                                         
              if (code) {
                //code（有效期五分钟），开发者需要将 code 发送到开发者服务器后台，使用code 换取 session_key api，将 code 换成 openid 和 session_key
                wx.request({
                  method: "POST",
                  url: "http://carapi.wtvxin.com/api/Login/SignIn_New", //提交数据到服务器，如果没有绑定手机号码，则提示用户需要绑定手机号码
                  data: {
                    iv: ivata,
                    code: code,
                    encryptedData: encriptData,
                    //mobile:this.mobile
                  },
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  success: function(res) {
                    console.log(res)
                    wx.setStorageSync("token", res.data.data.accessToken); //保存的令牌 accessToken
                    wx.setStorageSync("userId", res.data.data.uid); //保存用户Id到本地缓存
                    wx.setStorageSync("unionid", res.data.data.unionid); 
                    wx.setStorageSync("openId", res.data.data.openId); 
                    if (res.data.code== 0) {
                    console.log("登陆成功");
                      wx.showToast({
                          title: '登陆成功',
                          icon: 'success',
                          duration: 2000,
                          complete: function (){//登陆成功之后,延时2秒跳转到会员中心
                            setTimeout(function(){
                            // wx.switchTab({
                            //   url:"/pages/mine/main",
                            // })
                          }, 2000);
                        }
                      });
                    } else {
                      //没有绑定手机，则跳转到绑定手机的页面
                      wx.showToast({
                          title: '请先绑定手机',
                          icon: 'none',
                          duration: 3000,
                          complete: function (){
                            // _this.bindPhone()
                         }
                       });
                     //绑定手机
                    }
                  },
                  fail: function(error) {},
                  complete: function() {
                    wx.hideLoading();
                  }
                });
              } else {
                wx.hideLoading();
                console.log("获取用户登录态失败：" + res.errMsg);
                wx.showToast({
                  title: "获取授权信息失败",
                  icon: "none",
                  duration: 2000
                });
                return;
              }
            }
          });
        }
      });
    },
    async getAddressList() {
      var _this = this;
      const data = await myget("/app/Person/GetShippingAddresses", {
        _: new Date().getTime()
      });
      if (data.result.totalCount !== 0) {
        this.parseAddressItems(data.result.items);
      }
    },
    parseAddressItems(item) {
      this.listData = [];
      for (var i = 0; i < item.length; i++) {
        if (item[i].isDefault) {
          var address = {};
          address.is_default = item[i].isDefault; //是否默认地址
          address.name = item[i].shipTo; //收件人姓名
          address.mobile = item[i].phone; //收件人手机号码
          address.regionId = item[i].regionId; //地区编号，用来提交到服务器计算运费
          address.address = item[i].regionFullName; //省市区
          address.address_detail = item[i].address; //乡镇村街道门牌..详细地址
          address.id = item[i].id;
          wx.setStorageSync("defaultAddress", address);
        }

        if (item.length == 1) {
          var address = {};
          address.is_default = item[i].isDefault; //是否默认地址
          address.name = item[i].shipTo; //收件人姓名
          address.mobile = item[i].phone; //收件人手机号码
          address.regionId = item[i].regionId; //地区编号，用来提交到服务器计算运费
          address.address = item[i].regionFullName; //省市区
          address.address_detail = item[i].address; //乡镇村街道门牌..详细地址
          address.id = item[i].id;
          wx.setStorageSync("defaultAddress", address);
        }
      }
    },
    bindPhone() {
      setTimeout(function(){
          wx.navigateTo({
            url: "/pages/register/main"
          });
      },1000)
    },
    setOpenId(session_id) {
      var sessionid = session_id;
      let that = this;
      wx.getUserInfo({
        success: function(res) {
          var userInfo = res.userInfo;
          //用户信息(object对象userInfo)存储到小程序本地；
          wx.setStorage({
            key: "userInfo",
            data: userInfo
          });

          var obj = {};
          obj.encryptedData = res.encryptedData;
          obj.iv = res.iv;
          obj.rawData = res.rawData;
          obj.signature = res.signature;
          var userdetail = {
            encryptedData: res.encryptedData,
            iv: res.iv,
            rawData: res.rawData,
            signature: res.signature
          };
          //先拿到微信用户的openid,授权之后每次登录，也需要获取这个openid
          wx.request({
            method: "POST",
            url:
              "https://auth.wtvxin.com/WxOpen/GetUserInfoAndOpenId?sessionId=" +
              sessionid,
              data: userdetail,
            header: {
              "content-type": "application/json" //默认值
            },
            success: function(res) {
              var openid = res.data.openId;
              wx.setStorageSync("openId", res.data.openId);
            },
            fail: function(error) {
              wx.showToast({
                title: "服务器开小差了，请重试",
                icon: "none",
                duration: 2000
              });
            },
            complete: function() {}
          });
        }
      });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
