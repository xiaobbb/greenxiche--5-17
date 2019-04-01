<template>
  <div class="backgray setlist">
      <div class="setitem flex-container white">
          <div class="flex-container">
              <img src="/static/images/phonecon.png" class="phonecon">
              <input type="text" placeholder="请输入手机号" v-model="phoneNumber">
          </div>
          <img src="/static/images/back.png" class="right">
      </div>
      <div class="setitem flex-container white">
          <div class="flex-container">
              <img src="/static/images/passcon.png" class="passcon">
              <input type="text" placeholder="请输入验证码" v-model="verifyCode">
          </div>
          <text class="getpass" @click="getVerifyCode(this)">{{btnText}}</text>
      </div>
      <div class="paybtn setbtn" @click="setPhone">确定</div>
      
      
  </div>
</template>

<script>
import { host,post,get } from "../../utils";
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
  },
  data () {
    return {
      btnText:"获取验证码",
      phoneNumber:"",
      verifyCode:""
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "设置手机号码"
      });
    },
      
    async	setPhone(){
      
      if(this.phoneNumber=="")
			{
			 wx.showToast({
        title: '字段不能为空',
        icon: 'none',
        duration: 2000
        });
			}else{
          var token=	wx.getStorageSync('token');
          var userId=	wx.getStorageSync('userId');
          console.log(token) ///////获取不到
          var result = await post("User/UpdateMobile",{
            Mobile:this.phoneNumber, 
            UserId:userId,
            VerifyCode:this.verifyCode,
            Token:token,
        });
      }
    },
    getVerifyCode(that){
      var _this=this
      console.log(_this.token)
     const TIME_COUNT = 60; // 60s后重新获取验证码
     var codeNum=this.verificationCode;
     var phoneNum=this.phoneNumber;
     if(phoneNum===''){
       wx.showToast({
       title: '手机号不能为空',
       icon: 'none',
       duration: 2000
      })
     }else{
    //发送绑定手机验证码：http://scapi.wtvxin.com/api/services/app/Account/SendBindingSecurityCode
      this.sendbindcode(this.phoneNumber);
       wx.showToast({
       title: '短信已发送',
       icon: 'success',
       duration: 2000
      })
       if (!this.timer) {
       this.count = TIME_COUNT; 
       that.disabled = 'disabled';
       this.timer = setInterval(() => {
       if (this.count > 0 && this.count <= TIME_COUNT) {
         this.count--;
         this.btnText = this.count+"s后重新获取";
        } else {
         that.disabled = '';
         clearInterval(this.timer);
         this.timer = null;
         this.btnText = "获取验证码";
        }
       }, 1000)
      }
     }
    
	 },
	 //发送绑定手机验证码
   sendbindcode(phoneNum){
		 var result = post("/User/GetBindTelCode",{
        Token:token,
        Mobile:this.phoneNumber,
        UserId:userId
     });
		 console.log(result);
		 console.log("999999999999999999999");
                
   }
    
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";
  @import "../../css/common.css";
</style>
