<template>
  <div class="backgray">
    <div class="carlist">
      <radio-group class="radio-group" @change="radioChange">
        <div v-for="(item,index) in carinfolist" :key="item.id">
          <div class="caritem white commonpad">
            <div class="flex-container person" @click="onSelect(item.id)">
              <p>{{item.name}}</p>
              <p class="phonenum" >{{item.phone}}</p>
            </div>
            <div @click="onSelect(item.id)">{{item.site}}</div>
            <div class="flex-container choosemenu">
              <label class="radio flex-container choose" @click="changeDefault(index)">
                <radio :value="item.id" :checked="item.checked"/>
                <span class="chosetitle" v-if="!item.checked">默认地址</span>
                <span class="chosetitle2" v-else>设为默认地址</span>
              </label>
              <div class="flex-container edit"  >
                <p  @click="editAddress(item.id)">
                  <img src="/static/images/edit.png" class="menu">
                  <text>编辑</text>
                </p>
                <p @click="deleteSite(item.id,index)">
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
    <van-dialog id="van-dialog"/>
  </div>
</template>

<script>
import { post } from "@/utils/index";
import Dialog from "../../../static/vant/dialog/dialog";
import "../../css/common.css";
import "../../css/global.css";
export default {
  data() {
    return {
      userid:'',
      token:'',
      isshow: false,
      data: 0,
      carinfolist: [],
      page:1,
      pageSize:10
    };
  },

  components: {},
  onShow() {
    wx.setNavigationBarTitle({
      title: "地址管理"
    });
    this.initData();
    this.getData();
  },
  methods: {
    initData(){
      this.page=1;
      this.carinfolist=[]
      this.userid=wx.getStorageSync("userId")
      this.token=wx.getStorageSync("token")
    },
    async getData() {
      console.log(this.userid,this.token)
      const params = {
        UserId: this.userid,
        Token: this.token,
        Page: this.page,
        PageSize: this.pageSize
      };
      const res = await post("Address/AddressList", params);
      if(this.page===1){
       this.carinfolist= []
      }
      for (let i = 0; i < res.data.length; i += 1) {
        const list = res.data[i];
        this.carinfolist.push({
          id: list.id,
          name: list.name,
          phone: list.tel,
          site: list.addressinfo,
          checked: list.is_def
        });
      }
    },
    deleteSite(id, i) {
      const that = this;
      //  this.isshow=true
      Dialog.confirm({
        title: "您确定删除该收货地址吗？",
        message: ""
      })
        .then(() => {
          post("Address/DeleteAddress", {
            Id: id,
            UserId: this.userid,
            Token: this.token
          }).then(res => {
            that.carinfolist.splice(i, 1);
          });
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    changeDefault(i){
        const params={
            Id: this.carinfolist[i].id,
            UserId: this.userid,
            Token: this.token
        }
        post("Address/SetDefaultaddress",params)
    },
    cancle() {
      this.isshow = false;
    },
    radioChange(e) {
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
    addSite() {
      wx.redirectTo({ url: "/pages/addnewsite/main" });
    },
    editAddress(id){
      wx.redirectTo({ url: "/pages/addnewsite/main?id="+id});
    },
    onSelect(id){
      const selectAddress = this.$store.state.selectAddress;
      if(!selectAddress.status){
        return false
      }
      // 设置提交订单参数
      this.$store.commit('update',{'addressId':id})
      // 跳转到上一页
      // wx.redirectTo({ url: selectAddress.url});
      wx.navigateBack()

    }
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.page=1;
    this.getData()
    // 关闭下拉刷新
    wx.stopPullDownRefresh()
  },
  // 上拉加载
  onReachBottom(){

  },
  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
@import "./style";
@import "../../css/common.css";
</style>
