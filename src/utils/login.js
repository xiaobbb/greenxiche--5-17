export default function logins() {
    let _this = this;
    var ivata = "";
    var encriptData = "";
    wx.showLoading({
      title: "登陆中..."
    });
    //用户授权登陆，code发送给服务器
    wx.login({
      success: function(res) {
        var code = res.code; //腾讯服务器返回res,拿到code进行下一步操作
        wx.getUserInfo({
          success: function(res) {
            var userInfo = res.userInfo;
            ivata = res.iv;
            encriptData = res.encryptedData;
            wx.setStorageSync("userInfo", userInfo); //保存用户信息，userInfo对象里面含有用户昵称，用户头像,性别等信息：
            //userInfo.nickName 用户昵称;
            //userInfo.avatarUrl 用户头像图片的URL;
            //userInfo.gender 用户性别
            if (code) {
              wx.request({
                method: "POST",
                url: "https://carapi.wtvxin.com/api/Login/SignIn_New", //提交数据到服务器，如果没有绑定手机号码，则提示用户需要绑定手机号码
                data: {
                  iv: ivata,
                  code: code,
                  encryptedData: encriptData
                },
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                success: function(res) {
                  if(!res.data.meta||res.data.meta.code===undefined){
                    wx.showToast({
                      title: "登录失败！请重新尝试",
                      icon: "none",
                      duration: 2000
                    });
                    return false;
                  }
                  console.log("登陆成功",res.data.meta,res.data.meta.code);
                  if (res.data.meta.code=== 0) {
                  wx.setStorageSync("token", res.data.data.accessToken); //保存的令牌 accessToken
                  wx.setStorageSync("userId", res.data.data.uid); //保存用户Id到本地缓存
                  wx.setStorageSync("unionid", res.data.data.unionid);
                  wx.setStorageSync("openId", res.data.data.openId);
                  console.log(res.data.data,'res?');
                    wx.showToast({
                      title: "登陆成功",
                      icon: "success",
                      duration: 2000,
                      complete: function() {
                        //登陆成功之后,延时2秒跳转到会员中心
                        setTimeout(function(){
                          wx.switchTab({
                          url:"/pages/mine/main",
                          })
                        }, 1500);
                      }
                    });
                  } else if(res.data.meta.code===2) {
                    //没有绑定手机，则跳转到绑定手机的页面
                    wx.navigateTo({
                        url: "/pages/register/main"
                    });
                  }else{
                      wx.showToast({
                    title: "登录失败！请重新尝试",
                    icon: "none",
                    duration: 2000
                  });
                  }
                },
                fail: function(error) {
                  wx.showToast({
                    title: "登录失败！请重新尝试",
                    icon: "none",
                    duration: 2000
                  });
                },
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
          },
          fail(){
            //   未授权，跳转授权   
            wx.navigateTo({url:'/pages/login/main'})
          }
        });
      }
    });
  }