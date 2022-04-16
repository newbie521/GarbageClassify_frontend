<template>
	
	<view>
		  <uni-list>
		  	<scroll-view  v-for="item in keywordList" :key="item.time">
		  		<uni-list :border="true">
		  			<uni-list-chat clickable="true" :avatar-circle="true" :title="item.name" :avatar="item.imagePath" :note="item.time">
		  				<view class="chat-custom-right" >
		  					<text>{{item.type}}</text>
		  					<text class="chat-custom-text">查询次数：{{item.num}}</text>
		  				</view>
		  			</uni-list-chat>
		  		</uni-list>
		  	</scroll-view>
		  </uni-list>
	</view>
	
</template>

<script>
	var that;// 当前页面对象
	export default{
		data(){
			return{
				keywordList:[],
			}
		},
		onLoad() {
			that = this;
			// this.currentIndex = 0;
			
			uni.request({
				url: that.serverUrl + '/history/keyword', //仅为示例，并非真实接口地址。
				data: {
					"userid": getApp().globalData.userid,
				},
				header: {
					'content-type': "application/json"
				},
				method: "POST",
				success: (res) => {
					console.log(res.data.data);
					for(var i=0; i<res.data.data.length; i++){
						var meList= {
							name: "",
							time: "",
							type: "",
							imagePath: "",
							num: "1"
						};
						meList.name = res.data.data[i].keyword;
						// console.log(JSON.parse(res.data.data[i].result)[0].garbageType);
						if(JSON.parse(res.data.data[i].result).length == 0){
							meList.type = "查询失败";
							meList.imagePath = that.getImage('icos/unknown.png');
						}
						else if(JSON.parse(res.data.data[i].result)[0].garbageType == "1"){
							meList.type = "干垃圾";
							meList.imagePath = that.getImage('icos/ico-1-small.jpg');
						}
						else if(JSON.parse(res.data.data[i].result)[0].garbageType == "2"){
							meList.type = "湿垃圾";
							meList.imagePath = that.getImage('icos/ico-2-small.jpg');
						}
						else if(JSON.parse(res.data.data[i].result)[0].garbageType == "3"){
							meList.type = "可回收物";
							meList.imagePath = that.getImage('icos/ico-3-small.jpg');
						}
						else if(JSON.parse(res.data.data[i].result)[0].garbageType == "4"){
							meList.type = "有害垃圾";
							meList.imagePath = that.getImage('icos/ico-4-small.jpg');
						}
						meList.time= res.data.data[i].times.replace("T", " ");
						meList.num = res.data.data[i].num;
						that.keywordList.push(meList);
					};
				
					// console.log("详细数据的一行",list[0]);
				}
			});
				
		},
		methods:{
			getImage(img){
				return this.imageUrl + img;
			},
		}
	}
</script>

<style>
page{
	background-color: #f2f2f2;
}
	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}
	
	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}
	.app {
	  padding: 30rpx;
	  font-size: 28rpx;
	}
</style>
