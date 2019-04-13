<template>
    <div class="point" :iteminfo="iteminfo"> 
        <div class="flex-container userinfo">
            <div class="flex-container">
                <div>
                    <img src="/static/images/avatar.png" class="avatar">
                </div>
                <div>
                    <p>{{iteminfo.MemberName}}</p>
                    <p>
                        <img src="/static/images/xing.png" class="xing-point">
                        <img src="/static/images/xing.png" class="xing-point">
                        <img src="/static/images/xing.png" class="xing-point">
                        <img src="/static/images/xing.png" class="xing-point">
                        <img src="/static/images/gray1.png" class="xing-point">
                    </p>
                </div>
            </div>
            <div class="carname">{{iteminfo.ProductSpecText}}</div>
        </div>
        <div>{{iteminfo.ContentText}}</div>
        <!--评论图片列表-->
        <!-- <div class="flex-container picslist">
            <img src="/static/images/download9.png" class="pointpics">
            <img src="/static/images/download9.png" class="pointpics">
            <img src="/static/images/download9.png" class="pointpics">
            <img src="/static/images/download9.png" class="pointpics">
        </div> -->
        <div class="usertime">{{iteminfo.AddTime}}</div>
        <div class="callback" v-if="iteminfo.Reply.length>0">
            {{iteminfo.Reply}}
        </div>
    </div>
</template>

<script>
export default {
  props:["iteminfo"],
  onLoad(){
    //console.log(this.iteminfo,"这是子页面的")
  }
  
}
</script>

<style scoped>
.callback{
    background: #fef4f0;
    color:#7c726e;
    padding:20rpx;
    margin:0 20rpx 20rpx 20rpx;
    border-radius:10rpx;
}
.point{
padding:20rpx;
box-sizing: border-box;
}
.arrowback{
    width:12rpx;
    height:22rpx;
    margin-left:10rpx;
}
.avatar{
    width:80rpx;
    height:80rpx;
    margin-right:15rpx;
}
.left text+text{
    font-size: 35rpx;
    color:#ff6325;
    margin-left:30rpx;
}
.userinfo{
    margin:20rpx 0;
}
.carname{
    color:#ff6325;
}
.usertime{
    color:#999;
    margin-top:10rpx;
}
.pointpics{
    width:168rpx;
    height:168rpx;
   
}
.picslist{
    padding:20rpx 0;
    flex-wrap: wrap;
}
</style>
