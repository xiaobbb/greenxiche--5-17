<template>
  <div>
    <!--列表页面-->
    <div v-if="isshow" class="congray">
        <!--车辆列表-->
        <div class="carlist">
            <radio-group class="radio-group"  @change="radioChange">
               <label class="radio"  v-for="item in carinfolist" :key="item.id">
                    <div class="caritem">
                    <div class="flex-container infostyle">
                      <div class="carlogo">
                          <img src="/static/images/bg6.png" class="cloth">
                          <img src="/static/images/car3.png" class="car">
                      </div>
                      <div class="flex-container coml">
                        <p class="brand">品牌: {{item.name}}</p>
                        <p class="carnum">车牌: {{item.carnum}}</p>
                      </div>
                    </div>
                    <div class="flex-container choosemenu">
                      <div class="flex-container choose">
                          <radio :value="item.id" :checked="item.checked"/>
                          <span class="chosetitle" v-if="!item.checked">设为默认</span>
                          <span class="chosetitle2" v-else>已设为默认</span>
                      </div>
                      <div class="flex-container edit">
                          <p>
                              <img src="/static/images/edit.png" class="menu">
                              <text>编辑</text>
                          </p>
                          <p>
                              <img src="/static/images/del.png" class="menu">
                              <text>删除</text>
                          </p>
                      </div>
                    </div>
                </div>
              </label>
            </radio-group>

        </div>
        <!--底部按钮-->
        <div class="btn" @click="addCar">
            <div>
                <img src="/static/images/add.png" class="add">
                <span>新增车辆</span>
            </div>
        </div>
    </div>
    <!--添加车辆信息页面-->
    <div v-else>
        <div class="sel">
            <div><span class="zhi">*&nbsp;</span>车牌号码</div>
            <div class="flex-container line-input">
                <div class="flex-container title">
                    <p class="flex-container"  @click="chooseCity(1)">粤<img src="/static/images/bot1.png" class="arrow"></p>
                    <p class="flex-container"  @click="chooseCity(2)">A<img src="/static/images/bot1.png" class="arrow"></p>
                </div>
                <input type="text" placeholder="请填写车牌号" class="inn">
            </div>
        </div>
        <div class="sel">
            <div><span class="zhi">*&nbsp;</span>品牌车系</div>
            <div  class="line-input">
                <input type="text" placeholder="请填写您的汽车品牌">
            </div>
        </div>
        <div class="sel">
            <div>&nbsp;车&nbsp;&nbsp; 型</div>
            <div  class="line-input">
                <input type="text" placeholder="请填写您的汽车车型">
            </div>
        </div>
        <div class="sel">
            <div>&nbsp;颜&nbsp;&nbsp; 色</div>
            <div  class="line-input">
                <input type="text" placeholder="请填写您的汽车颜色">
            </div>
        </div>
        <!--按钮-->
        <div class="paybtn btn-save" @click="saveCar">保存</div>
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
        isshow:false,
        data:0,
        carinfolist:[
          {id:1,name:"东风本田-思域",carnum:"粤AJ6666",checked:true},
          {id:2,name:"日产-轩逸",carnum:"粤AJ6996",checked:false}
          
        ]
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "车辆信息"
      });
    },
    
    radioChange(e){
      //console.log(e.target.value)
      var arrs = this.carinfolist;
      var that = this;
      for (const x in arrs) {
        if (arrs[x].id == e.target.value) {
          arrs[x].checked = true;
        } else {
          arrs[x].checked = false;
        }
      }
      
    },
    saveCar(){
        this.isshow=true
    },
    addCar(){
        this.isshow=false
    },
    chooseCity(e){
      console.log(e)
      //var id=e.target.dataset.id
      //console.log(id)
      wx.navigateTo({ url: "/pages/choosenum/main?id="+e });
    },
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
