<template>
	<view class="goods_list">
		<view @click="goDetail(item)"  class="goods_item" v-for="(item,index) in goods" :key="index">
	
			<image class="shop_img" style="width: 300rpx;height: 300rpx;"  :src="item.goods_img" mode="aspectfit"></image>
			<view class="price">
				<view class="new-price">￥{{item.goods_newPrice}}</view>
				<view class="old-price"><text>￥{{item.goods_oldPrice}}</text></view>
			</view>
			<view class="name">{{item.goods_name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['goods'],
		data(){
			return{
				
			}
		},
		onLoad(){
		},
		methods:{
			goDetail(item){
				console.log(item);
				this.$emit('myEvent',item);
			}
		}
	}
</script>

<style lang="scss">
	// @mixin shaw($val1,$val2,$radius) {
	// 	border: 1rpx solid #EEEEEE;
	// 	border-radius: $radius;
	// 	box-shadow: inset $val1 $val1 $val2 #FFFFFF,
	// 	                inset -$val1 -$val1 $val2 #DDD;
	// }
	.goods_list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	
		// margin-bottom: 10rpx;
		.goods_item {
			box-sizing: border-box;
			width: 358rpx;
			padding-top: 30rpx;
			padding-left: 30rpx;
			padding-right: 30rpx;
			margin-bottom: 30rpx;
			background: #e6eef4;
			// @include shaw(20rpx,30rpx,20rpx);
			border: 1rpx solid #EEEEEE;
			border-radius: 20rpx;
			box-shadow: inset -20rpx -20rpx 30rpx #cfd6dc,
			                inset 20rpx 20rpx 30rpx #FFF;
			.shop_img {
				border-radius: 20rpx;
			}
	
			.price {
				padding: 20rpx 10rpx;
				display: flex;
				flex-direction: column;
	
				.new-price {
					color: $shop-color;
					font-size: 35rpx;
					vertical-align: bottom;
					font-weight: 700;
					max-width: 200rpx;
				}
	
				.old-price {
					padding-top: 10rpx;
					text-indent: 20rpx;
					font-size: 30rpx;
					color: gray;
					text-decoration: line-through;
					max-width: 300rpx;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
	
			.name {
				font-size: 30rpx;
				margin-left: 20rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2; //行数
				-webkit-box-orient: vertical;
			}
		}
	}
</style>