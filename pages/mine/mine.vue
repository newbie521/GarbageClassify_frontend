<template>
	<view class="userinfo" @tap="GetUserInfo()">
		<image :src="avatarUrl" class="userinfo-avatar"></image>
		<!-- <button v-show="!flag" style="margin-bottom: 40rpx; " type="primary" lang="zh_CN">登录</button> -->
		<view class="userinfo-nickname" >{{nickName}}</view>
	</view>
	
	<uni-card title="基础卡片" sub-title="副标题" extra="额外信息" thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
		<text>这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
	</uni-card>
</template>

<script>
	export default {
		data() {
			return {
				flag:false,
				nickName:"登录",
				avatarUrl:"../../static/icos/camera.png",
				openId:""
			}
		},
		onLoad() {
			
		},
		methods: {
			CheckSession(){
				var _this = this;
				wx.checkSession({
				  success() {
					console.log('session_key 未过期');
					_this.flag = true;
					_this.login();
				    // session_key 未过期，并且在本生命周期一直有效
				  },
				  fail() {
					console.log('session_key 已经失效');
				    // session_key 已经失效，需要重新执行登录流程
				    _this.flag = false;
					_this.GetUserInfo();
					
				  }
				})
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
				// 增加约束,不选协议无法进行授权
				// if (this.value === false) {
				// 	uni.showToast({
				// 		title: '请阅读勾选协议',
				// 		icon: 'error',
				// 		duration: 2000
				// 	});
				// } else {
				// 	uni.getUserProfile({
				// 		desc: '登录',
				// 		lang: 'zh_CN',
				// 		success: (res) => {
				// 			console.log('获取的信息', res.userInfo);
				// 			_this.nickName = res.userInfo.nickName;
				// 			_this.setNn(res.userInfo.nickName);
				// 			uni.getLocation({
				// 				type: 'gci02',
				// 				success: res => {
				// 					uni.reLaunch({
				// 						url: 'Login2'
				// 					});
				// 				}
				// 			});
				// 		},
				// 		fail: (res) => {
				// 			console.log('用户拒绝了授权');
				// 			uni.showToast({
				// 				title: '授权失败',
				// 				icon: 'error',
				// 				duration: 2000
				// 			});
				// 		}
				// 	});
				
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
									_this.openId = res1.data.data.openid; 
									console.log("openId: " + _this.openId);
									
									// 保存用户信息
									uni.request({
										url: _this.serverUrl + `authorize/setUserProfile`,
										method: 'POST',
										header: {
											'Content-Type': 'application/json'
										},
										
										data: {
											"nickName": _this.nickName, 
											"avatarUrl": _this.avatarUrl,
											"openId": _this.openId 
										},
										success: function(res1) {
											console.log('获取用户信息成功');
										}
									});
															
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
			}
			
		}
		
	}
			// //新版登录方法
			// getUserProfile() {
			// 	uni.getUserProfile({
			// 		lang: 'zh_CN',
			// 		desc: '用于获取您的个人信息',
			// 		success: res => {
			// 			console.log(res.userInfo);
			// 			if (res.userInfo) {
			// 				//在此发起网络请求
			// 				//请求后端给的登录接口，把res.code等相关参数带上
			// 				//登录请求后待端接口方法
			// 				this.wxLoginCode(res.userInfo, '888')
			
			// 			} else {
			// 				//失败做提示
			// 			}
			// 		},
			// 		fail: err => {
			// 			uni.showToast({
			// 				title: '你已拒绝登录',
			// 				icon: 'error',
			// 				duration: 2000
			// 			});
			// 		}
			// 	})
			// },
</script>

<style>
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
