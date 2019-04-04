<template>
  <div class="comment">
    <detailChildpic></detailChildpic>
  </div>
</template>

<script>
import detailChildpic from "@/components/detailChildpic"; //公用组件
export default {
  components:{detailChildpic},
  onLoad(){
    this.setBarTitle();
  },
  data () {
    return {
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "全部评论"
      });
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
