<template>
	<view class="content">
		<view>
			<image style="height: 300rpx;" src="../../static/we.png" mode=""></image>
		</view>
		<view class="details">
			<view style="margin-right:20rpx;padding-top: 18rpx;">电话:</view>
			<view class="shaw" @click="phone">17637067893 (点击拨打)</view>
		</view>
		<view class="details">
			<text space="ensp" >地址: 四川省成都市武侯区郭家桥北街</text>
		</view>
		<map scale="15" class="map"  show-location=true :markers="covers" latitude="30.65089" longitude="104.07572"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				covers:[
					{
						latitude: 30.65089,
						longitude: 104.07572,
						iconPath: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597992367809&di=892097c76efb723134462fb7235d9469&imgtype=0&src=http%3A%2F%2Fimg.51miz.com%2FElement%2F00%2F37%2F93%2F31%2Fa1ac0557_E379331_e2eb927c.png%2521%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue%2Fformat%2Fpng%2Ffh%2F630',
					    width:30,
						height:30
					}
				]
			}
		},
		methods: {
			phone(){
				console.log('call')
				uni.makePhoneCall({
				    phoneNumber: '17637067893' //仅为示例
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
 .content{
	 background-color: #e6eef4;
	 height: 100%;
	 .details{
		 padding: 20rpx;
		 display: flex;
		 flex-direction: row;
		 .shaw{
				 box-sizing: border-box;
				 padding: 20rpx 30rpx;
				 border-radius: 15rpx;
			 	background: #e6eef4;
			 	box-shadow: inset -10rpx -10rpx 20rpx #cfd6dc,
			 	                inset 10rpx 10rpx 20rpx #fdffff;
		 }
	 }
	 .map{
		 width: 750rpx;
		 height: 710rpx;
	 }
 }
</style>
