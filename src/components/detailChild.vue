<template>
    <div class="point"> 
        <div class="flex-container userinfo">
            <div class="flex-container">
                <div>
                    <img src="/static/images/avatar.png" class="avatar">
                </div>
                <div>
                    <p>
                        <text>筱风月忆</text>
                        <text  class="carname">奥迪A3</text>
                    </p>
                    <p>
                        <img src="/static/images/xing.png" class="xing-point">
                        <img src="/static/images/xing.png" class="xing-point">
                        <img src="/static/images/xing.png" class="xing-point">
                        <img src="/static/images/xing.png" class="xing-point">
                        <img src="/static/images/gray1.png" class="xing-point">
                    </p>
                </div>
            </div>
            <div class="usertime">01-20 10:50</div>
        </div>
        <div>工作人员很认真，服务态度很好</div>
        <div class="usertime">车御品汽车服务</div>
    </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.point{
    padding:20rpx;
    box-sizing: border-box;
    border-bottom:1rpx solid #f4f4f4;
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
    margin-left:20rpx;
    font-size:24rpx;
}
.usertime{
    color:#999;
    margin-top:10rpx;
    font-size: 22rpx;
}
</style>
