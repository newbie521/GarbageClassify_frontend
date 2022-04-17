<template>
	<!-- 
	*
	* 广告：
	* 	index.vue :
	* 		1、视频 广告
	* 	search.vue :
	* 		2、搜索下拉 —— banner 广告
	* 		3、搜索主页 —— banner 广告
	* 	muPopue.vue :
	* 		4、banner 广告
	* 	challenge.vue :
	* 		5、视频广告
	* 	challengeResult.vue :
	* 		6、插屏 广告
	* 		7、banner 广告
	* 	type.vue :
	* 		8、banner 广告
	* 	
	* 
	*  -->
	<view>
		<!-- <view v-if="true">
			<swiper :indicator-dots="true" :autoplay="true" :circular="true">
				<swiper-item class="swiper-flex" v-for="(item,index) in swiper" :key="index">
					<view @click="navigateTo(item.skipUrl)" class="swiper-item" style="background-color: antiquewhite;">
						<image class="swiper-img" :src="item.imageUrl"></image>
					</view>
				</swiper-item>
			</swiper>
		</view> -->

		<view v-if="true">
			<swiper class="imageContainer" :indicator-dots="true" :autoplay="true" :circular="true" interval="3000"
				duration="1000" previous-margin="20rpx" next-margin="20rpx">
				<swiper-item class="turnItem" v-for="(item,index) in swiper" :key="index">
					<view @click="navigateTo(item.skipUrl)" class="swiper-item" style="background-color: antiquewhite;">
						<image class="itemImg" :src="item.imageUrl"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- <view>
			<swiper :indicator-dots="true" :autoplay="true" :circular="true"> -->
		<!-- <swiper-item class="swiper-flex">
					<view class="swiper-item swiper-img" style="background-color: antiquewhite;">
						<ad unit-id="adunit-060249bea9401e5c"></ad>
					</view>
				</swiper-item> -->
		<!-- <swiper-item class="swiper-flex">
					<view class="swiper-item" style="background-color: antiquewhite;">
						<image class="swiper-img" src="https://pic.yupoo.com/felixluo/0681f6d5/67bb9dbc.png"></image>
					</view>
				</swiper-item> -->
		<!-- <swiper-item class="swiper-flex">
					<view class="swiper-item" >
						<ad unit-id="adunit-060249bea9401e5c"></ad>
					</view>
				</swiper-item> -->
		<!-- 				<swiper-item class="swiper-flex">
					<view  >
						<ad unit-id="adunit-060249bea9401e5c"></ad>
					</view>
				</swiper-item>
			</swiper>
		</view> -->

		<!-- <view class="search-box"> -->
		<view class="form-view">
			<view class="tip-text">你知道 [{{randOneObj.garbageName}}] 属于哪种类型的垃圾吗? </view>
			<form @submit="formSubmit" @reset="formReset" class="form-form">
				<view class="input-view">
					<view @click="takePhoto2" class="input-view-item input-view-camera">
						<image class="search-img" :src="require('../../static/icos/mycamera.png')"></image>
					</view>
					<!-- 					<view @click="readyRecord2" class="input-view-item input-view-speech">
						<image class="search-img" :src="getImage('icos/record.png')"></image>
					</view> -->
					<view class="input-view-item input-view-search">
						<input confirm-type="search" @confirm="searchKeyword" @search="searchKeyword" v-model="keyword"
							id="inputid" class="input-search" name="input" placeholder="输入搜索关键词" />
					</view>
					<view @tap="searchKeyword" class=" font-search">查询</view>
				</view>
			</form>
		</view>
		<view class="">
			<view class="simpleTips">
				{{randomTip}}
			</view>
		</view>

		<view class="card">
			<view class="tabs_list">
				<view v-for="item in tabs_list" :key="item.name" class="tabs_card" @click="switchTabTo(item.path)">
					<image mode="aspectFit" style="float: left;margin-top: 25rpx;height: 150rpx;width: 80%;"
						:src="item.picture"></image>
					<span class="text">{{item.name}}</span>
				</view>
			</view>
		</view>
		
		<view class="card">
			<view class="title">你的分类助手</view>
		</view>
		<view v-show="false">
			<view class="">
				<uni-notice-bar scrollable="true" show-icon="true" color="#999" backgroundColor="rgb(242,242,242)"
					text="提示:本查询系统就供参考,具体分类要求以属地专业管理部门为准">
				</uni-notice-bar>
			</view>
		</view>



		<view class="main-show-classify">
			<view class="main-classify">
				<view class="border" @click="switchTabToClassify(1)">
					<image style="weight: 270upx; " class="main-img" :src="getImage('icos/ico-1.png')"></image>
				</view>
				<view class="border" @click="switchTabToClassify(2)">
					<image style="height: 270upx;margin-top: 50upx; " class="main-img" :src="getImage('icos/ico-2.png')"></image>
				</view>
			</view>
			<view class="main-classify">
				<view class="border" @click="switchTabToClassify(3)">
					<image class="main-img" :src="getImage('icos/ico-3.png')"></image>
				</view>
				<view class="border" @click="switchTabToClassify(4)">
					<image style="width: 270upx;height: 270upx;margin: 25upx; " class="main-img" :src="getImage('icos/ico-4.png')"></image>
				</view>
			</view>
		</view>
		<!-- popup start -->
		<view class="">
			<uni-popup :show="popupShow" position="bottom" @hidePopup="hidePopup">
				<view class="view-popup">
					<view class="recording-title">按住 说话</view>
					<!-- 此处可放置倒计时，可根据需要自行添加 -->
					<!-- <div class="recording-time"> 
			{{seconds}} : {{ms}}
		</div> -->
					<view class="recording-box">
						<canvas id="canvas" canvas-id="canvas">
							<view class="recording-button" @touchstart="start" @touchend="end"></view>
						</canvas>
					</view>
					<!-- <button type="primary" @click="playVoice">播放</button> -->
				</view>
			</uni-popup>
		</view>
		<!-- popup end -->
		<!-- <view >
			<ad unit-id="adunit-060249bea9401e5c"></ad>
		</view> -->
		<!-- <share /> -->
	</view>
</template>

<script>
	// import uniNoticeBar from "../../components/uni-notice-bar/uni-notice-bar.vue"
	// import uniIcon from "../../components/uni-icon/uni-icon.vue"
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();

	innerAudioContext.autoplay = true;

	export default {
		components: {
			// uniNoticeBar,
			// uniIcon,
			// uniPopup,
		},
		data() {
			return {
				tabs_list: [{
						name: '智能识别',
						picture: require('../../static/img/icon1.png'),
						path: '/pages/search/search'
					}, {
						name: '分类查询',
						picture: require('../../static/img/icon2.png'),
						path: '/pages/type/type'
					},
					{
						name: '分类挑战',
						picture: require('../../static/img/icon3.png'),
						path: '/pages/challenge/challenge'
					},
					{
						name: '识别记录',
						picture: require('../../static/img/icon4.png'),
						path: '/pages/mine/photoList/photoList'
					}
				],
				title: '这是我的小程序，开始了',
				defaultKeyword: "111",
				keyword: "干电池",
				popupShow: false,
				voicePath: '',
				startTiming: false,
				drawTiming: false,
				timeoutTiming: false,
				maxTime: 5000,
				frame: 50,
				imgUrl: "",

				swiper: [], // 幻灯片 swiper 数据
				isShowKeywordList: false,
				keywordList: [],
				randOneObj: {
					garbageName: "干电池"
				},
				randomTip: "",
				simpleTips: [
					"让垃圾找到自己的归属",
					"请给垃圾找个合适的家",
					"希望有一天，垃圾桶也会下岗",
					"垃圾分类放，环境有保障",
					"垃圾要分类，资源要利用",
					"今天分一分，明天美十分",
					"积极参与垃圾分类，共创优美社区环境",
					"分类收集人人有责，男女老幼齐来参与",
					"提高社区的品味，从垃圾分类开始",
					"垃圾分类，举手之劳",
					"配合垃圾分类，争做文明市民",
					"垃圾分类益处多，环境保护靠你我",
					"要是垃圾变为宝，分类回收不可少",
					"请给垃圾找个合适的家",
					"垃圾儿女要分家，安居乐业靠大家",
					"垃圾分类人人做，做好分类为人人",
					"让垃圾找到自己的归属",
					"垃圾要分类，生活变美好",
					"你我虽渺小，但意义重大",
					"让垃圾找到自己的归属",
					"请给垃圾找个合适的家",
				],
			}
		},
		// onShareAppMessage() {
		// 	return {
		// 		title: "这是首页的分享",
		// 		path: '/pages/index/index',
		// 		imageUrl: this.image ? this.image : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
		// 	}
		// },
		onShow() {
			this.randOne();
			this.randomTip = this.simpleTips[Math.round(Math.random() * 20)];
		},
		onLoad() {
			let me = this;

			console.log("typeid:" + getApp().globalData.typeid) // 'test'
			me.imgUrl = this.imageUrl;
			console.log(this.imgUrl);

			//  获取幻灯片 swiper start
			uni.request({
				url: me.serverUrl + '/slideShow', 
				success: (res) => {
					console.log(res)
					console.log(res.data.data);
					me.swiper = res.data.data;
				}
			});
			//  获取幻灯片 swiper end

			// 录音过程圆圈动画

			console.log(1);

			// 录音结束的事件监听

			recorderManager.onStop(function(res) {
				uni.showLoading({
					title: '努力识别中...'
				});
				// console.log('recorder stop' + JSON.stringify(res));
				me.voicePath = res.tempFilePath;
				// console.log(me.voicePath)
				me.popupShow = false;

				// if (me.voicePath) {
				// 	innerAudioContext.src = me.voicePath;
				// 	innerAudioContext.play();
				// 	console.log("播放了声音")
				// }
				let angle = -0.5;
				let context = uni.createCanvasContext('canvas');
				me.draw = setTimeout(function() {
					context.beginPath();
					context.setStrokeStyle("#1296db");
					context.setLineWidth(3);
					context.arc(0, 0, 0, -0.5 * Math.PI, (angle += 2 / (me.maxTime / me.frame)) * Math.PI,
						false);
					context.stroke();
					context.draw();
				}, 1);
				uni.uploadFile({
					url: me.serverUrl + '/upload/record', //仅为示例，非真实的接口地址
					filePath: me.voicePath,
					name: 'file',
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data)
						let res = JSON.parse(uploadFileRes.data);
						console.log(res)
						console.log(res.data)
						// console.log(JSON.parse(uploadFileRes.data.data))
						let data = res.data;
						let uniOne = JSON.stringify(data.uni);
						me.keyword = data.keyword;
						me.isShowKeywordList = true;
						// me.keywordList = me.drawCorrelativeKeyword(data.results, me.keyword);
						me.keywordList = JSON.stringify(data.results);
						console.log(" keywordList")
						console.log(me.keywordList)
						uni.navigateTo({
							url: `/pages/search/search?keyword=${me.keyword}&keywordList=${me.keywordList}&uni=${uniOne}`
						});
						uni.hideLoading();

					}
				});
			})
		},
		methods: {
			getImage(img) {
				return this.imageUrl + img;
			},
			randOne() {
				uni.request({
					url: this.serverUrl + '/qb/randOne', //仅为示例，并非真实接口地址。
					success: (res) => {
						console.log(res)
						console.log(res.data.data);
						this.randOneObj = res.data.data[0];
						this.keyword = res.data.data[0].garbageName;
					}
				});
			},
			// 幻灯片 的点击跳转事件 start
			navigateTo(skipUrl) {
				// uni.navigateTo({
				// 	url: '/pages/webview/webview?url=' + skipUrl
				// });
			},
			// 幻灯片 的点击跳转事件 end
			// 是搜索框中的搜索按钮
			searchKeyword() {
				if (getApp().globalData.islogin == false) {
					this.noTitlemodalTap();
					return;
				}

				let me = this;
				if (!me.keyword) return;
				uni.request({
					url: this.serverUrl + "/qb/uniname/" + getApp().globalData.userid + "/" + this.keyword,
					success: (res) => {
						console.log(res);
						// me.keywordList = me.drawCorrelativeKeyword(res.data.data, me.keyword);
						// let uniOne = JSON.stringify(res.data.data);
						let data = res.data.data;
						let uniOne = JSON.stringify(data.uni);
						let results = JSON.stringify(data.results);
						// console.log("  goto before")
						// console.log(me.keywordList)
						// console.log(JSON.stringify(me.keywordList))
						// let str=JSON.stringify(me.keywordList)
						console.log(res.data.data)
						uni.navigateTo({
							url: `/pages/search/search?type=3&keyword=${me.keyword}&keywordList=${results}&uni=${uniOne}`
						});
					}
				});
			},
			// 搜索框中的相机
			readyRecord2() {
				uni.navigateTo({
					url: `/pages/search/search?type=2`
				});
			},
			readyRecord() {
				this.popupShow = true;
			},
			start() {
				console.log("startTiming");
				this.startTiming = setTimeout(this.recording, 150);
			},
			end() {
				console.log("录音 end")
				recorderManager.stop();
				clearInterval(this.draw);
				clearTimeout(this.startTiming);
				clearTimeout(this.timeoutTiming);
				this.draw = false;
				this.startTiming = false;
				this.timeoutTiming = false;
			},
			recording() {
				let me = this;
				console.log('录音开始');
				recorderManager.start();
				let angle = -0.5;
				let context = uni.createCanvasContext('canvas');
				me.draw = setInterval(function() {
					context.beginPath();
					context.setStrokeStyle("#1296db");
					context.setLineWidth(3);
					context.arc(75, 75, 50, -0.5 * Math.PI, (angle += 2 / (me.maxTime / me.frame)) * Math.PI,
						false);
					context.stroke();
					context.draw();
				}, me.frame);
				me.timeoutTiming = setTimeout(() => {
					clearInterval(me.draw);
					me.draw = false;
					console.log("时间到，录音结束");
					recorderManager.stop();
				}, me.maxTime);
			},
			playVoice() {
				let me = this;
				console.log(" 点击 播放")
				console.log(me.voicePath)
				if (me.voicePath) {
					innerAudioContext.src = me.voicePath;
					innerAudioContext.play();
					console.log("播放了声音")
				}
			},
			hidePopup() {
				this.popupShow = false;
			},
			handleSearchEvent() {
				console.log("click icon")
			},
			// 跳转到知识库
			switchTabToClassify(index) {
				console.log(index)
				getApp().globalData.typeid = index
				uni.switchTab({
					url: '/pages/type/type',
				});
			},

			switchTabTo(myUrl) {
				if (getApp().globalData.islogin == false) {
					this.noTitlemodalTap();
					return;
				}
				if (myUrl == "/pages/type/type" || myUrl == "/pages/challenge/challenge") {
					uni.switchTab({
						url: myUrl,
					});
				}
				uni.navigateTo({
					url: myUrl,
				});
			},

			noTitlemodalTap() {
				uni.showModal({
					title: "请先登录",
					content: "登陆之后即可查询(=￣ω￣=)",
					confirmText: "好的",
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							getApp().globalData.isforlogin = true;
							uni.switchTab({
								url: `/pages/mine/mine`
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},

				})
			},

			gotoSearch() {
				uni.navigateTo({
					url: '/pages/search/search',
				});
			},
			// 搜索框的语音调用
			takePhoto2() {
				if (getApp().globalData.islogin == false) {
					this.noTitlemodalTap();
					return;
				}
				uni.navigateTo({
					url: `/pages/search/search?type=1`
				});
			},
			takePhoto() {
				let me = this;
				uni.chooseImage({
					count: 1,
					success: res => {
						me.imagePath = res.tempFilePaths[0];
						console.log(me.imagePath)
						uni.showLoading({
							title: '努力识别中...'
						});
						uni.uploadFile({
							url: me.serverUrl + '/upload/image', //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data)
								let res = JSON.parse(uploadFileRes.data);
								console.log(res)
								console.log(res.data)
								// console.log(JSON.parse(uploadFileRes.data.data))
								let data = res.data;
								let uniOne = JSON.stringify(data.uni);
								me.keyword = data.keyword;
								me.isShowKeywordList = true;
								// me.keywordList = me.drawCorrelativeKeyword(data.results, me.keyword);
								me.keywordList = JSON.stringify(data.results);
								console.log(" keywordList")
								console.log(me.keywordList)
								uni.navigateTo({
									url: `/pages/search/search?keyword=${me.keyword}&keywordList=${me.keywordList}&uni=${uniOne}`
								});
							},
							complete() {
								uni.hideLoading();
							}
						});

					}
				});
			}

		}
	}
</script>

<style>
	@import url("index.css");
</style>
