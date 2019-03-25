<template>
  <div class="cerbg">
      <!--导航栏-->
      <div class="title">
          <div class="ranktitle" v-for="item in titlelist" :key="item.name" :class="{active:active==item.id}" @click="change(item.id)">{{item.name}}</div>
      </div>
      <div class="slide"></div>
      <!--排行list-->
      <div class="certlist">
          <!--未使用-->
          <div v-if="isalive">
              <div class="ceritem">
                <img src="/static/images/green.png" class="bgcolor">
                <div class="itemain flex-container">
                    <div>
                        <p class="certitle">洗车</p>
                        <p class="small">粤AD6688</p>
                        <p class="small">凭此券免费兑换洗车一次</p>
                        <p class="inite">2020-01-31 前有效</p>
                    </div>
                    <div>立即使用</div>
                </div>
              </div>
              <div class="ceritem">
                <img src="/static/images/orange.png" class="bgcolor">
                <div class="itemain flex-container">
                    <div>
                        <p class="certitle">洗车</p>
                        <p class="small">粤AD6688</p>
                        <p class="small">凭此券免费兑换洗车一次</p>
                        <p class="inite">2020-01-31 前有效</p>
                    </div>
                    <div>立即使用</div>
                </div>
              </div>
              <div class="ceritem">
                <img src="/static/images/yellow1.png" class="bgcolor">
                <div class="itemain flex-container">
                    <div>
                        <p class="certitle">洗车</p>
                        <p class="small">粤AD6688</p>
                        <p class="small">凭此券免费兑换洗车一次</p>
                        <p class="inite">2020-01-31 前有效</p>
                    </div>
                    <div>立即使用</div>
                </div>
              </div> 
          </div>
          <!--已使用或者过期-->
          <div v-else>
              <div class="ceritem">
                  <img src="/static/images/graybg.png" class="bgcolor">
                  <div class="itemain flex-container">
                      <div>
                          <p class="certitle">洗车</p>
                          <p class="small">粤AD6688</p>
                          <p class="small">凭此券免费兑换洗车一次</p>
                          <p class="inite">2020-01-31 前有效</p>
                      </div>
                      <div>
                        <img src="/static/images/used.png" class="frazz" v-if="isused">
                        <img src="/static/images/pass.png" class="frazz" v-else>
                      </div>
                  </div>
              </div>
              <div class="ceritem">
                  <img src="/static/images/graybg.png" class="bgcolor">
                  <div class="itemain flex-container">
                      <div>
                          <p class="certitle">洗车</p>
                          <p class="small">粤AD6688</p>
                          <p class="small">凭此券免费兑换洗车一次</p>
                          <p class="inite">2020-01-31 前有效</p>
                      </div>
                      <div>
                        <img src="/static/images/used.png" class="frazz" v-if="isused">
                        <img src="/static/images/pass.png" class="frazz" v-else>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
  },
  data () {
    return {
      active:"1",
      isalive:true,
      isused:true,
      titlelist:[
        {id:1,name:"未使用"},{id:2,name:"已使用"},{id:3,name:"已过期"}
      ]
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "服务卡券"
      });
    },
    change(e){
      //console.log(e)
      this.active=e
      if(e=="1"){
          this.isalive=true
      }else if(e=="2"){
          this.isalive=false
          this.isused=true
      }else if(e=="3"){
          this.isalive=false
          this.isused=false
      }
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
