<template>
<!-- 	<view>
		  <swiper class="movie-swiper" :indicator-dots="true" previous-margin="50rpx" next-margin="50rpx">
		    <swiper-item class="movie" v-for="(item, index) in photoList" :key="index">
		      
			  <view class="container movie-card" @tap="f1">
		        <image class="movie-image" :src="item.imagePath"></image>
				<text>日期：xxxx</text>
		        <text>名称{{index+1}}：{{item.name}}</text>
		        <text>类别：{{item.type}}</text>
		      </view>
			  
		    </swiper-item>
		  </swiper>
	</view> -->
	
	<view>
		
		<view>
		  <!-- <button @click="openSkuPopup()">打开SKU组件</button> -->
		  <uni-list>
		  	<scroll-view  v-for="item,index in photoList" :key="item.time">
		  		<uni-list :border="true">
		  			<uni-list-chat clickable="true" @click="openSkuPopup(item, index)" :avatar-circle="true" :title="item.name" :avatar="item.imagePath" :note="item.time">
		  				<view class="chat-custom-right" >
		  					<text>{{item.type}}</text>
		  					<text class="chat-custom-text">正确率：{{item.score}}</text>
		  				</view>
		  			</uni-list-chat>
		  		</uni-list>
		  	</scroll-view>
		  </uni-list>
		  
		  <vk-data-goods-sku-popup
		    ref="skuPopup"
		    v-model="skuKey" 
		    border-radius="20" 
		    :localdata="goodsInfo"
		    :mode="skuMode"
		    @open="onOpenSkuPopup"
		    @close="onCloseSkuPopup"
		    @add-cart="addCart"
		    @buy-now="buyNow"
		  ></vk-data-goods-sku-popup>
		  
		</view>
	</view>
	

	
</template>

<script>
	var that;// 当前页面对象
	export default {
		data() {
			return {
				// 是否打开SKU弹窗
				skuKey:false,
				// SKU弹窗模式
				skuMode:1,
				// 后端返回的商品信息
				goodsInfo:{},
				
				photoList:[
				// {
				//   name:"垃圾1",
				//   type:"1",
				//   imagePath:"/static/icos/right-full.png",
				//   id: 1,
				// },
				      
				],
				currentIndex:0, //在data中不用定义也可以，在onload函数初始化中也可以生成
				
			}
		},
		
		onLoad(options) {
			that = this;
			// this.currentIndex = 0;
			that.init(options);
			
			uni.request({
				url: that.serverUrl + '/history/image', //仅为示例，并非真实接口地址。
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
							score: 0,
							time: "",
							type: "",
							imagePath: ""
						};
						meList.name = res.data.data[i].oneKeyword;
						meList.score = parseFloat(res.data.data[i].score).toFixed(2);
						meList.time= res.data.data[i].times.replace("T", " ");
						if(res.data.data[i].type=="其他垃圾"){
							meList.type= "干垃圾";
						}
						else if(res.data.data[i].type=="厨余垃圾"){
							meList.type= "湿垃圾";
						}
						else{
							meList.type= res.data.data[i].type;
						}
						meList.imagePath= that.historyUrl + res.data.data[i].filepath.slice(23);
						that.photoList.push(meList);
					};
	
					// console.log("详细数据的一行",list[0]);
				}
			});
				
			// currentIndex:this.data.photoList.length-1,//首先看到最后一个图
			// 完成对页面的初始化操作
		},
		methods: {
			// 初始化
			init(options = {}){
			  
			},
			// 获取商品信息，并打开sku弹出
			openSkuPopup(item, index){
			  /**
			   * 获取商品信息
			   * 这里可以看到每次打开SKU都会去重新请求商品信息,为的是每次打开SKU组件可以实时看到剩余库存
			   */
			  // 此处写接口请求，并将返回的数据进行处理成goodsInfo的数据格式，
			  // goodsInfo是后端返回的数据
			  that.goodsInfo = {
			    "_id":"002",
			    "name": "垃圾",
			    "goods_thumb":"https://res.lancome.com.cn/resources/2020/9/11/15998112890781924_920X920.jpg?version=20200917220352530",
			    "sku_list": [
			      {
			        "_id": "004",
			        "goods_id": "002",
			        "goods_name": "香水",
			        "image": "https://res.lancome.com.cn/resources/2020/9/11/15998112890781924_920X920.jpg?version=20200917220352530",
			        "price": 19800,
			        "sku_name_arr": ["湿垃圾"],
			        "stock": 0.001
			      }
			    ],
			    "spec_list": [
			      {
			        "list": [
			          {
			            "name": "干垃圾"
			          },
			          {
			            "name": "湿垃圾"
			          },
			          {
			            "name": "可回收物"
			          },
			          {
			            "name": "有害垃圾"
			          }
			        ],
			        "name": "类型"
			      }
			    ]
			  }
			  that.goodsInfo._id = that.goodsInfo._id + index;
			  that.goodsInfo.name = item.name;
			  that.goodsInfo.goods_thumb = item.imagePath;
			  that.goodsInfo.sku_list[0].sku_name_arr[0] = item.type;
			  that.goodsInfo.sku_list[0].goods_name = item.time;
			  that.goodsInfo.sku_list[0].stock = item.score
			  that.goodsInfo.sku_list[0].image = item.imagePath;
			  // console.log(that.goodsInfo.sku_list[0].image);
			  that.skuKey = true;
			
			},
			// sku组件 开始-----------------------------------------------------------
			onOpenSkuPopup(){
			  console.log("监听 - 打开sku组件");
			},
			onCloseSkuPopup(res){
			  console.log("监听 - 关闭sku组件");
					console.log(res);
			},
			// 加入购物车前的判断
			addCartFn(obj){
			  let { selectShop } = obj;
			  // 模拟添加到购物车,请替换成你自己的添加到购物车逻辑
			  let res = {};
			  let name = selectShop.goods_name;
			  if(selectShop.sku_name != "默认"){
			    name += "-"+selectShop.sku_name_arr;
			  }
			  res.msg = `${name} 已添加到购物车`;
			  if(typeof obj.success == "function") obj.success(res);
			},
			// 加入购物车按钮
			addCart(selectShop){
			  console.log("监听 - 加入购物车");
			  that.addCartFn({
			    selectShop : selectShop,
			    success : function(res){
			      // 实际业务时,请替换自己的加入购物车逻辑
			      that.toast(res.msg);
			      setTimeout(function() {
			        that.skuKey = false;
			      }, 300);
			    }
			  });
			},
			// 立即购买
			buyNow(selectShop){
			  console.log("监听 - 立即购买");
			  that.addCartFn({
			    selectShop : selectShop,
			    success : function(res){
			      // 实际业务时,请替换自己的立即购买逻辑
			      that.toast("立即购买");
			    }
			  });
			},
			toast(msg){
			  uni.showToast({
			    title: msg,
			    icon:"none"
			  });
			}
		}
	}
</script>

<style>
	@import url("photoList.css");
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

