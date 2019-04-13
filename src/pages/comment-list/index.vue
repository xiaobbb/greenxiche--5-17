<template>
  <div class="comment">
    <detailChildpic v-for="(item,index) in list" :key="index" :data="item"></detailChildpic>
  </div>
</template>

<script>
import detailChildpic from "@/components/detailChildpic"; //公用组件
import { post } from "@/utils/index";
export default {
  components:{detailChildpic},
  onShow(){
    this.setBarTitle();
    this.getData();
  },
  data () {
    return {
      list:[]
    }
  },
 
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "全部评论"
      });
    },
    
    async getData(shopId) {
      
        const params = {
          Page: 1,
          PageSize:10,
          ShopId:'7A3E932977BF3C5A',
          ProductId:311,
          CommentType:0
        };
        const res = await post("Server/ServiceCommentList", params);
          
        console.log(res.data, "list");
          for (let i = 0; i < res.data.length; i += 1) {
          const comments = res.data[i];
          this.list.push({
            // id: comments.Id,
            // userId: comments.MemberId,
            userName: comments.MemberName,
            userImg: comments.Avatar,
            content: comments.ContentText,
            time: comments.AddTime,
            // 评分
            rank: comments.Rank,
            img: comments.PicData,
            // 回复
            reply:comments.Reply,
            sku:comments.ProductSpecText.replace(/_/g, " ")
          });
        }
        console.log(this.list, "list");
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
