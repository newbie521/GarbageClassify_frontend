<template>
	<view>
		<button id="button" style="margin-bottom: 40rpx; " type="primary" lang="zh_CN"
			@tap="GetUserInfo()">登陆</button>
		<image :src="avatarUrl"></image>
		<view>{{nickName}}</view>
		<button>注销</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName:"",
				avatarUrl:""
			}
		},
		onLoad() {
			
		},
		methods: {
			GetUserInfo() {
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
						_this.button.style.display = "none";
						uni.switchTab({
						    // 登录成功后的跳转
							url: '../index/index'
						});
						
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
							console.log('用户code:', res.code);
							uni.request({
								url: _this.serverUrl + `getOpenid`,
								method: 'POST',
								header: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								data: {
									code: res.code, //wx.login 登录成功后的code 
									// role: _this.role,
								},
								success: function(res1) {
									var openid = res1.data.data.openid; //openid 用户唯一标识
									var userInfo = {
										openid: openid,
										 // role: _this.role
									};
									console.log(res1.data.data.openid);
									// _this.saveUserInfo(userInfo);
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
			setNn(nickName){
				this.nickName = nickName;
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

</style>
