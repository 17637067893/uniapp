<template>
	<view class="news">
		<view class="news_item">
		  <image src="../../static/banner/banner1.jpg"></image>
		  <view class="content">
		    <view class="tit">1季度多家房企利润跌幅超50%季度多家房企利润跌幅超5季度多家房企利润跌幅超5季度多家房企利润跌幅超5季度多家房企利润跌幅超5 去库存促销战打响</view>
		    <view class="info">
		      <text>发表时间：2019-12-23</text>
		      <text>浏览：1次</text>
		    </view>
		  </view>
		</view>
		<view class="news_item">
		  <image src="../../static/banner/banner1.jpg"></image>
		  <view class="content">
		    <view class="tit">1季度多家房企利润跌幅超50%季度多家房企利润跌幅超5季度多家房企利润跌幅超5季度多家房企利润跌幅超5季度多家房企利润跌幅超5 去库存促销战打响</view>
		    <view class="info">
		      <text>发表时间：2019-12-23</text>
		      <text>浏览：1次</text>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.news{
		padding: 20rpx;
		background-color: #e6eef4;
		min-height: 1075rpx;
		.news_item{
			display: flex;
			padding: 5px 10px;
			margin-top: 20rpx;
			border-radius: 20rpx;
			box-shadow: inset -20rpx -20rpx 30rpx #DDD,
			                inset 20rpx 20rpx 30rpx #FFFFFF;
			image{
				width: 300rpx;
				height: 150rpx;
			}
			.content {
				padding: 10rpx 10px;
				position: relative;
				
				.tit{
					font-size: 30rpx;
					padding-bottom: 40rpx;
				}
				.info{
					font-size: 10rpx;
					position: absolute;
					right: 10px;
					bottom: 5px;
					color: gray;
					text:nth-child(2){
						margin-left: 20px;
					}
				}
			}
		}
	}

</style>
