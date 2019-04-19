<template>
  <div class="mypopup">
      <div class="content">
          <div class="close_btn" @click="closePop">X</div>
          <div class="main">
              <div>请输入支付密码验证</div>
              <p class="tip">密码错误，还可输入4次</p>
              <div class="pwipt">
                  <input type="password" @input="judgePassword" v-model="password" autofocus maxlength='6'>
                  <div class="border-right">
                      <span v-if="show1"></span>
                  </div>
                  <div class="border-right">
                      <span v-if="show2"></span>
                  </div>
                  <div class="border-right">
                      <span v-if="show3"></span>
                  </div>
                  <div class="border-right">
                      <span v-if="show4"></span>
                  </div>
                  <div class="border-right">
                      <span v-if="show5"></span>
                  </div>
                  <div>
                      <span v-if="show6"></span>
                  </div>
              </div>
              <div class="forgetpw">忘记密码？</div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  components: {
    
  },
  data(){
    return {
        password: '',
        autofocus: true,
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6:false
    }
  },
  methods:{
      //关闭密码输入清空输入
        closePop: function() {
            this.password = '';
            this.judgePassword();
        },
        //校验密码
        surePassword: function() {
            // 调用密码校验接口
 
        },
        // 密码输入样式
        judgePassword: function() {
          console.log(this.password,this.password.length)
            if(this.password.length == 0) {
                this.show1 = false;this.show2 = false;this.show3 = false;this.show4 = false;this.show5 = false;this.show6 = false;
            }
            if(this.password.length == 1) {
                this.show1 = true;this.show2 = false;this.show3 = false;this.show4 = false;this.show5 = false;this.show6 = false;
            }
            if(this.password.length == 2) {
                this.show1 = true;this.show2 = true;this.show3 = false;this.show4 = false;this.show5 = false;this.show6 = false;
            }
            if(this.password.length == 3) {
                this.show1 = true;this.show2 = true;this.show3 = true;this.show4 = false;this.show5 = false;this.show6 = false;
            }
            if(this.password.length == 4) {
                this.show1 = true;this.show2 = true;this.show3 = true;this.show4 = true;this.show5 = false;this.show6 = false;
            }
            if(this.password.length == 5) {
                this.show1 = true;this.show2 = true;this.show3 = true;this.show4 = true;this.show5 = true;this.show6 = false;
            }
            if(this.password.length == 6) {
                this.show1 = true;this.show2 = true;this.show3 = true;this.show4 = true;this.show5 = true;this.show6 = true;
                console.log(this.show6)
                // 接口校验密码
               // this.surePassword();
            }
        },
  }
};
</script>
<style>
.mypopup {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
}
.mypopup .content {
    position: relative;
    background: #fff;
    width: 75%;
    height:300rpx;
    border-radius: 10rpx;
}
.mypopup .content .main {
    padding: 40rpx 30rpx;
    font-size: 32rpx;
    text-align: center;
}
.mypopup .content .main h3 {
    font-size: 18rpx;
    line-height: 32rpx;
    font-weight: 700;
}
.mypopup .content .main .tip {
    color: #EE4A4A;
    margin-bottom: 10rpx;
    font-size:20rpx;
}
.mypopup .content .main .pwipt {
    font-size: 0;
    height: 80rpx;
    line-height: 80rpx;
    width: 95%;
    margin:0 auto;
    border: 1rpx solid #ccc;
}
.mypopup .content .main .pwipt div {
    display: inline-block;
    width: 16.2%;
    height: 80rpx;
    position: relative;
    background:#f00;
}
.mypopup .content .main .pwipt .border-right {
    border-right: 1rpx solid #ccc;
}
.mypopup .content .main .pwipt div>span {
    position: absolute;
    width: 20rpx;
    height: 20rpx;
    background: #000;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    margin-top: -10rpx;
    margin-left: -10rpx;
}
.mypopup .content .main .pwipt input {
    outline: none;
    border: 0;
    background: none;
    width: 750rpx;
    height: 0;
    padding: 22rpx 0;
    text-align: center;
    position: absolute;
    left: -500rpx;
    right: 0;
    z-index: 1000;
    color:transparent;
    text-indent: -999em;
}
.mypopup .content .close_btn {
    position: absolute;
    top: 14rpx;
    right: 14rpx;
    width: 14rpx;
    height: 14rpx;
    z-index: 1000;
}
.forgetpw {
    font-size: 14px;
    color: #008AFF;
    margin-top: 10rpx;
    text-align: right;
}
</style>