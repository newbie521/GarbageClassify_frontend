<template>
	<view>
		  <swiper class="movie-swiper" :indicator-dots="true" previous-margin="50rpx" next-margin="50rpx">
		    <swiper-item class="movie" v-for="(item, index) in weeklyMovieList" :key="index">
		      
			  <view class="container movie-card" @tap="f1">
		        <image class="movie-image" :src="item.imagePath"></image>
				<text>日期：xxxx</text>
		        <text>名称{{index+1}}：{{item.name}}</text>
		        <text>类别：{{item.type}}</text>
		      </view>
			  
		    </swiper-item>
		  </swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				weeklyMovieList:[
				{
				  name:"垃圾1",
				  type:"1",
				  imagePath:"/static/icos/right-full.png",
				  isHighlyRecommended: false,
				  id: 1,
				},
				{
				  name:"垃圾2",
				  type:"2",
				  imagePath:"/static/icos/right-full.png",
				  isHighlyRecommended: false,
				  id: 2,
				},
				{
				  name:"垃圾1",
				  type:"3",
				  imagePath:"/static/icos/right-full.png",
				  isHighlyRecommended: false,
				  id: 3,
				},
				{
				  name:"垃圾4",
				  type:"4",
				  imagePath:"/static/icos/right-full.png",
				  isHighlyRecommended: false,
				  id: 4,
				},
				      
				],
				currentIndex:0, //在data中不用定义也可以，在onload函数初始化中也可以生成
				
			}
		},
		
		onLoad() {
			this.currentIndex = 0;
				
			// currentIndex:this.data.weeklyMovieList.length-1,//首先看到最后一个图
			// 完成对页面的初始化操作
		},
		methods: {
			f0() {
			  this.currentIndex = this.data.weeklyMovieList.length-1
			},
			
			f1(event) {
			   var Id = event.currentTarget.dataset.id;
			   console.log(Id);
			   if(Id==1)
				{
					wx.navigateTo({
						// url: "/pages/2048/2048"
					})
				}
			   else if(Id==2)
				{
					wx.navigateTo({
						// url: "/pages/1234/1234" 
					})
				}
				else if(Id==3)
				{
					wx.navigateTo({
						// url: "/pages/speed/play" 
					})
				}
				else if(Id==4)
				{
					wx.navigateTo({
						// url: "/pages/time/play" 
					})
				}
			 }
		}
	}
</script>

<style>
	@import url("photoList.css");
</style>
