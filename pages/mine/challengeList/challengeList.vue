<template>
	<view>
		  <swiper class="movie-swiper" :indicator-dots="true" previous-margin="30rpx" next-margin="30rpx">
		    <swiper-item class="movie" v-for="(item, index) in list" :key="index">
			  <view class="container movie-card" @tap="f1">
				<text>日期：{{item.times}}</text>
				
				<view class="">
					<image v-if="item.score<2" class="popup-image" :src="getImage('level/pohuaizhe.png')" mode=""></image>
					<image v-else-if="item.score<5" class="popup-image" :src="getImage('level/qingtong.png')" mode=""></image>
					<image v-else-if="item.score<8" class="popup-image" :src="getImage('level/huangjin.png')" mode=""></image>
					<image v-else-if="item.score<10" class="popup-image" :src="getImage('level/zuanshi.png')" mode=""></image>
					<image v-else-if="item.score==10" class="popup-image" :src="getImage('level/wangzhe.png')" mode=""></image>
				</view>
				
		        <!-- <image class="movie-image" :src="item.imagePath"></image> -->
				
				<view v-if="item.score<2" class="">黑铁守卫</view>
				<view v-else-if="item.score<5" class="">青铜守卫</view>
				<view v-else-if="item.score<8" class="">黄金守卫</view>
				<view v-else-if="item.score<10" class="">钻石守卫</view>
				<view v-else-if="item.score==10" class="">最强王者</view>
		        <text>分数：{{item.score}}</text>
				<view class="">
					<view class="table">
						<view class="table-item" v-for="(item1, index1) in item.result" :key="index1" :class="index1%2==1?'gray':''">
							<view class="garbage-name">{{item1.garbageName}}</view>
							<view class="selected" :class="item1.garbageType!=item1.selectedType?'through':''">
								<view v-if="item1.selectedType==1" class="">干垃圾</view>
								<view v-else-if="item1.selectedType==2" class="">湿垃圾</view>
								<view v-else-if="item1.selectedType==3" class="">可回收物</view>
								<view v-else-if="item1.selectedType==4" class="">有害垃圾</view>
							</view>
							<view class="result">
								<view v-if="item1.garbageType==item1.selectedType" class="">
									<image class="icon-img" :src="getImage('icos/right-full.png')" mode=""></image>
								</view>
								<view v-else class="">
									<view v-if="item1.garbageType==1" class="garbage-gan-item">干垃圾</view>
									<view v-else-if="item1.garbageType==2" class="garbage-shi-item">湿垃圾</view>
									<view v-else-if="item1.garbageType==3" class="garbage-huishou-item">可回收物</view>
									<view v-else-if="item1.garbageType==4" class="garbage-youhai-item">有害垃圾</view>
								</view>
							</view>
						</view>
					</view>
				</view>
		      </view>
		  
		    </swiper-item>
		  </swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// challengeList:[
				// {
				//   name:"守卫",
				//   type:"1",
				//   imagePath:"/static/icos/right-full.png",
				//   isHighlyRecommended: false,
				//   id: 1,
				// },
				// {
				//   name:"守卫2",
				//   type:"2",
				//   imagePath:"/static/icos/right-full.png",
				//   isHighlyRecommended: false,
				//   id: 2,
				// },
				// {
				//   name:"守卫3",
				//   type:"3",
				//   imagePath:"/static/icos/right-full.png",
				//   isHighlyRecommended: false,
				//   id: 3,
				// },
				// {
				//   name:"守卫4",
				//   type:"4",
				//   imagePath:"/static/icos/right-full.png",
				//   isHighlyRecommended: false,
				//   id: 4,
				// },
				      
				// ],
				currentIndex:0, //在data中不用定义也可以，在onload函数初始化中也可以生成
				list:[],
				
			}
		},
		
		onLoad() {
			let _this = this;
			_this.currentIndex = 0;
			
			uni.request({
				url: _this.serverUrl + '/challenge/history', //仅为示例，并非真实接口地址。
				data: {
					"userid": getApp().globalData.userid,
				},
				header: {
					'content-type': "application/json"
				},
				method: "POST",
				success: (res) => {
					console.log(res);
					
					
					for(var i=0; i<res.data.data.length; i++){
						var meList= {
							result: [],
							score: 0,
							times: "",
						};
						meList.result = JSON.parse(res.data.data[i].result);
						meList.score = res.data.data[i].score;
						meList.times= res.data.data[i].times;
						_this.list.push(meList);
					}
					console.log("list: " + _this.list[0].result);
					console.log("返回数据",res.data.data);
					console.log("返回数据0",res.data.data[0]);
					console.log("返回数据0的分数",res.data.data[0].score);
					console.log("返回数据0的详细",res.data.data[0].result);
					console.log("序列化",JSON.parse(res.data.data[0].result));
					// console.log("详细数据的一行",list[0]);
				}
			});
			// currentIndex:this.data.challengeList.length-1,//首先看到最后一个图
			// 完成对页面的初始化操作
		},
		methods: {
			getImage(img){
				return this.imageUrl + img;
			},
			f0() {
			  this.currentIndex = this.data.challengeList.length-1
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
	@import url("../photoList/photoList.css");
	@import url("challengeList.css");
</style>





