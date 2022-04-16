<script>
	export default {
		globalData: {
			typeid:1,
			openid:"",
			userid:"",
			flag: false,
			islogin: false,
			isforlogin: false,
		},
		onLaunch: function() {
			console.log('App Launch')
			this.CheckSession()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
		methods:{
			setData(data){
				this.globalData.openid = data.openid;
				this.globalData.userid = data.userid;
				this.globalData.flag = true;
				this.globalData.islogin = true;

			},
			CheckSession(){
				var _this = this;
				
				wx.checkSession({
				  success() {
					console.log('session_key 未过期');
					//从缓存中获取session_key
					// console.log(wx.getStorage('userInfo'));
					if (wx.getStorage('userInfo')) {
						wx.getStorage({
						  key: 'userInfo',
						  success (res) {
							console.log("获取缓存成功！");
							console.log("缓存数据："+ res.data);
							_this.setData(res.data);
						  }
						});
					}
				  },
				  fail() {
					console.log('session_key 已经失效');
				    // session_key 已经失效，需要重新执行登录流程
				    _this.globalData.flag = false;
				  }
				})
			},

		}
	}
</script>

<style>
	/*每个页面公共css */
	
</style>
