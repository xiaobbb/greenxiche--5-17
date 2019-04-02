<template>
  <div class="backgray">
      <div class="carlist">
          <radio-group class="radio-group"  @change="radioChange">
            <div  v-for="item in carinfolist" :key="item.id">
                <div class="caritem white commonpad">
                  <div class="flex-container person">
                      <p>{{item.name}}</p>
                      <p class="phonenum">{{item.phone}}</p>
                  </div>
                  <div>{{item.site}}</div>
                  <div class="flex-container choosemenu">
                    <label class="radio flex-container choose">
                        <radio :value="item.id" :checked="item.checked"/>
                        <span class="chosetitle" v-if="!item.checked">默认地址</span>
                        <span class="chosetitle2" v-else>设为默认地址</span>
                    </label>
                    <div class="flex-container edit">
                        <p>
                            <img src="/static/images/edit.png" class="menu">
                            <text>编辑</text>
                        </p>
                        <p  @click="deleteSite">
                            <img src="/static/images/del.png" class="menu">
                            <text>删除</text>
                        </p>
                    </div>
                  </div>
              </div>
            </div>
          </radio-group>
      </div>
      <!--底部按钮-->
      <div class="btn" @click="addSite">
          <div>
              <img src="/static/images/add.png" class="add">
              <span>添加新地址</span>
          </div>
      </div>
    <!--弹框遮罩-->
    <div class="mask-modal" v-if="isshow"></div>
    <div class="mask white flex-container clomn" v-if="isshow">
        <p class="btntitle">您确定删除该收货地址吗？</p>
        <p class="flex-container buttontbn">
            <text @click="cancle">取消</text>
            <text>确定</text>
        </p>
    </div>
  </div>
</template>

<script>
import {post} from '@/utils/index'
import "../../css/common.css";
import "../../css/global.css";
export default {
  data () {
    return {
      
        userid: wx.getStorageSync('userid'),
        token: wx.getStorageSync('token'),
        isshow:false,
        data:0,
        carinfolist:[
          {id:1,name:"张三",phone:"13500232365",site:"广东省 深圳市 龙岗区 坂田街道 中心路十里花园5期12 栋404室",checked:true},
          {id:2,name:"张三",phone:"13652145698",site:"广东省 深圳市 龙岗区 坂田街道 中心路十里花园5期12 栋404室",checked:false}
          
        ]
    }
  },
 
  components: {
    
  },
  mounted(){
      wx.setNavigationBarTitle({
        title: '地址管理'
      });
      this.getData();
  },
  methods: {
    async getData(){
      const params ={
        UserId: this.userid,
        Token: this.token,
        Page:1,
        PageSize:20
      }
      const res =await post('Address/AddressList',params)
      for(let i=0;i<res.data.length;i+=1){
        const list = res.data[i]
        this.carinfolist.push({
          id:list.id,
          name:list.name,
          phone:list.tel,
          site:list.address,
          checked:list.is_def
        })
      }
    },
    deleteSite(){
       this.isshow=true
     },
    cancle(){
      this.isshow=false
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
    addSite(){
      console.log(666)
      wx.navigateTo({ url: "/pages/addnewsite/main" });
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
