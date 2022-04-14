<template>
	<!-- <view> -->
<!-- 		<view class="userinfo" @tap="GetUserInfo()">
			<image :src="avatarUrl" class="userinfo-avatar"></image>
			<view class="userinfo-nickname" >{{nickName}}</view>
		</view> -->
		<view >
			<uni-card @tap="GetUserInfo()" :isFull="true" :title=nickName sub-title="中国" extra="18" :thumbnail="avatarUrl" is-shadow="true">
				<view class="example-body">
					<view class="tag-view">
						<uni-tag :inverted="true" text="个性签名" type="primary" />
						<text style="margin-left: 20rpx;">我爱环保</text>
					</view>
				</view>
			</uni-card>
			
			<view style="margin-top: 10rpx; ">
				<uni-list style="">
					<uni-list-item @tap="NavigateTo(1)" :show-extra-icon="true" style="margin: 5upx; " showArrow :extra-icon="calendarfilled" title="关键词识别记录" />
					<uni-list-item @tap="NavigateTo(2)" :show-extra-icon="true" style="margin: 5upx;" showArrow :extra-icon="scan" title="图片识别记录" />
					<uni-list-item @tap="NavigateTo(3)" :show-extra-icon="true" style="margin: 5upx;" showArrow :extra-icon="medal" title="挑战赛记录" />
					<uni-list-item @tap="NavigateTo(4)" :show-extra-icon="true" style="margin: 5upx;" showArrow :extra-icon="stafffilled" title="关于我们" />
				</uni-list>
			</view>
		
			
			
<!-- 			
			<uni-card  @tap="NavigateTo(1)" title="挑战赛记录" extra=">" thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
			</uni-card>
			
			<uni-card  @tap="NavigateTo(2)" title="图片查询记录" extra=">" thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
			</uni-card>
			
			<uni-card  @tap="NavigateTo(3)" title="关于我们" extra=">" thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
			</uni-card> -->
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				calendarfilled: {
					color: '#a2d9bd',
					size: '30',
					type:'calendar-filled'//icon名称
				},
				scan: {
					color: '#a2d9bd',
					size: '30',
					type:'scan'//icon名称
				},
				medal: {
					color: '#a2d9bd',
					size: '30',
					type:'medal'//icon名称
				},
				stafffilled: {
					color: '#a2d9bd',
					size: '30',
					type:'staff-filled'//icon名称
				},
				flag:false,
				nickName:"临时用户",
				avatarUrl:"/static/icos/right-full.png",
				openid:""
			}
		},
		onLoad() {
			this.openid = getApp().globalData.openid;
			this.userid = getApp().globalData.userid;
			this.flag = getApp().globalData.flag;
			let _this = this;
			if(this.flag){
				uni.request({
					url: this.serverUrl + `authorize/getUserProfile`,
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						"openid": this.openid, //wx.login 登录成功后的code 
					},
					success: function(res) {
						//openid 用户唯一标识
						console.log("55555555: "+ res.data);
						_this.nickName = res.data.data.nickName; 
						_this.avatarUrl = res.data.data.avatarUrl; 
											
						// console.log("获取用户信息成功: "+this.nickName+" "+this.avatarUrl);
						
						// uni.switchTab({
				           // 登录成功后的跳转
							// 	url: '../index/index'
							// });
						}
				});
			}else{
				_this.GetUserInfo();
			}
			
			
		},
		methods: {
			getImage(img){
				return this.imageUrl + img;
			},
			GetUserInfo() {
				console.log('获取用户信息');
				var _this = this;
				uni.getUserProfile({
					desc: '登录',
					lang: 'zh_CN',
					success: (res) => {
						_this.login();
						console.log('获取的信息', res.userInfo);
						_this.nickName = res.userInfo.nickName;
						_this.avatarUrl = res.userInfo.avatarUrl;
						// _this.setNn(res.userInfo.nickName);
						// uni.getLocation({
						// 	type: 'gci02',
						// 	success: res => {
						// 		uni.reLaunch({
						// 			url: 'Login2'
						// 		});
						// 	}
						// });						
					
					},
					fail: (res) => {
						console.log('用户拒绝了授权');
						uni.showToast({
							title: '授权失败',
							icon: 'error',
							duration: 2000
						});
					}
				});

				
			},
			login() {
				let _this = this;
				uni.showLoading({
					title: '登录中...'
				});
				// 获取登录用户 code
				uni.login({
					provider: 'weixin',
					success: function(res) {
						if (res.code) {
							let code = res.code;
							console.log('用户code: ', res.code);
							uni.request({
								url: _this.serverUrl + `authorize/getOpenid`,
								method: 'POST',
								header: {
									'Content-Type': 'application/json'
								},
								data: {
									code: res.code, //wx.login 登录成功后的code 
								},
								success: function(res1) {
									//openid 用户唯一标识
									_this.openid = res1.data.data.openid; 
									_this.userid = res1.data.data.userid; 
									
									var userInfo = {
										"openid": _this.openid,
										"userid": _this.userid 
									};
									console.log("openid: " + _this.openid);
									
									// 上传用户信息
									uni.request({
										url: _this.serverUrl + `authorize/setUserProfile`,
										method: 'POST',
										header: {
											'Content-Type': 'application/json'
										},
										
										data: {
											"nickName": _this.nickName, 
											"avatarUrl": _this.avatarUrl,
											"openid": _this.openid 
										},
										success: function(res1) {
											console.log('上传用户信息成功');
										}
									});
									// 缓存用户信息
									_this.saveUserInfo(userInfo);
															
									uni.hideLoading();
									// uni.switchTab({
			      //                       // 登录成功后的跳转
									// 	url: '../index/index'
									// });
								}
							});
						} else {
							uni.showToast({
								title: '登录失败！',
								duration: 2000
							});
							console.log('登录失败！' + res.errMsg)
						}
					},
				});
			},
			
			NavigateTo(tag){
				console.log("tag：" + tag);
				if(tag === 1){
					uni.navigateTo({
						url: `./challengeList/challengeList`,
						// ?score=${score}&list=${list}
					});
				}else if(tag == 2){
					uni.navigateTo({
						url: `./photoList/photoList`
					});			
				}else if(tag ==3){
					uni.navigateTo({
						url: `./challengeList/challengeList`,
						
					});			
				}else if(tag ==4){
					uni.navigateTo({
						url: `./about/about1.vue`
					});			
				}
				
			},
			
			saveUserInfo(userInfo){
				console.log('userInfo: ' + userInfo.openid)
				wx.setStorageSync('userInfo', userInfo);
			}
			
		}
		
	}
</script>

<style>
page{
	background-color: #f2f2f2;
}

.userinfo {
  margin-top: 40rpx;
  height: 140rpx;
  width: 100%;
  background: #aaffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-left: none;
  border-right: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 300ms ease;
}

.userinfo-avatar {
  width: 100rpx;
  height: 100rpx;
  margin: 20rpx;
  border-radius: 50%;
  background-size: cover;
  background-color: white;
}

.userinfo-nickname {
  font-size: 32rpx;
  color: #007aff;
  /* background-size: cover; */
  text-align: center;
}

</style>
