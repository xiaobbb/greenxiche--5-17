<template>
  <div>
    
  </div>
</template>

<script>
import { post } from "../../utils";
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
  },
  data() {
    return {

    }
  },
  methods:{
    setBarTitle(){
      wx.setNavigationBarTitle({
        title: "邀请好友"
      });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "./style";
@import "../../css/common.css";
</style>
