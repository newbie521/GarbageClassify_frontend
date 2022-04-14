<template>
	<view>
		<uni-list>
			<scroll-view  v-for="row in photoList" :key="row.time">
				<uni-list :border="true">
					<uni-list-chat :avatar-circle="true" :title="row.name" avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" :note="'类别:' + row.type">
						<view class="chat-custom-right">
							<text>{{row.time}}</text>
							<text class="chat-custom-text">正确率：{{row.score}}</text>
						</view>
					</uni-list-chat>
				</uni-list>
			</scroll-view>
		</uni-list>
		
		<uni-popup :show="true" position="middle" mode="fixed"  is-mask-click="true" >
			<view class="imagePopup">
				<view class="image-left">
					<image class="tempImage" :src="imagePath"></image>
				</view>
				<view class="image-right">
					<view class="image-close">
						<view class="">无法精准识别,请选择最接近的</view>
					</view>
					<view class="">
						<view v-for="(item, index) in imageResults" :key="index" class="list-item" @tap="tapKeyword(item.keyword)">
							<view class="item-keyword"> {{item.keyword}}</view>
							<view class="item-pi">
								<view class="">匹配度</view>
								<view class=""> {{Math.floor(item.score*100)}}% > </view>
							</view>	
						</view>
					</view>
				</view>
			</view>
			<view class="">
				<button class="image-button" type="primary" @tap="hideUnipPpup">返回</button>
			</view>
		
		</uni-popup>
	</view>
</template>
 
<script>
	export default {
		components: {},
		data() {
			return {
				avatarList: [{
					url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
				}, {
					url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
				}, {
					url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
				}],
				photoList:[
					{
						name:"12",
						imagePath:"",
						type:"2",
						time:"ssssssssss",
						score:"0.1"
					},
					{
						name:"12",
						imagePath:"",
						type:"2",
						time:"ssssssssss",
						score:"0.1"
					},
					
				]

			
			};
		}
	};
</script>

<style>
	
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
</style>