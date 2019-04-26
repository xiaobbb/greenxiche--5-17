<template>
    <div>
        <div class="point" v-for="(item,pindex) in commonlist" :key="pindex"> 
            <div class="flex-container userinfo">
                <div class="flex-container">
                    <div>
                        <img :src="item.Avatar" class="avatar">
                    </div>
                    <div>
                        <p>{{item.MemberName}}</p>
                        <p>
                            <img src="/static/images/xing.png" v-for="rank in item.Rank" :key="rank" class="xing-point">
                            <!-- <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point"> -->
                            <img src="/static/images/gray1.png" v-for="rank in (5-item.Rank)" :key="rank" class="xing-point">
                        </p>
                    </div>
                </div>
                <div class="carname">{{item.ProductName}}</div>
            </div>
            <div>{{item.ContentText}}</div>
            <!--评论图片列表-->
            <div class="flex-container picslist" v-if="showPic">
                <img :src="PicData.PicUrl" class="pointpics" v-for="(PicData,PicDataIndex) in item.PicData" :key="PicDataIndex">
            </div>
            <div class="usertime">{{item.AddTime}}</div>
            <div class="callback" v-if="item.Reply">
                {{item.Reply}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props:["commonlist","showPic"],
  onLoad(){
    console.log(this.commonlist,"这是子页面的")
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
    justify-content:flex-start;
}
</style>
