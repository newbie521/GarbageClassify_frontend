<template>
	<view class="example-body">
		<view class="uni-box-head">
			<uni-title type="h1" align="center" title="团队介绍"></uni-title>
		</view>
		<view class="uni-box">
			<uni-title class="h3" type="h3" title="1 成员介绍"></uni-title>
		</view>
		<view>
			<text
				class="uni-text">&nbsp;&nbsp;我们是来自中国矿业大学南湖校区的学生，抱着满腔热血编写了这个垃圾识别小程序，希望可以通过它帮助和倡导人们要保护环境，为美好的明天努力奋斗！</text>
		</view>
		<view class="uni-box">
			<uni-title class="h3" type="h3" title="2 框架简介"></uni-title>
		</view>
		<view class="">
			<uni-title class="h5" type="h5" color="#666" title="前端: 采用uni-app框架进行微信小程序开发"></uni-title>
			<uni-title class="h5" type="h5" color="#666" title="后端: 采用SpringBoot框架进行接口编写"></uni-title>
			<uni-title class="h5" type="h5" color="#666" title="图片识别接口: 采用百度飞桨框架搭建的垃圾识别训练系统"></uni-title>
		</view>
	</view>
</template>
 
<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	};
</script>

<style>
	
	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 10px;
	}

	.uni-text {
		font-size: 14px;
		line-height: 22px;
		color: #333;
	}
</style>