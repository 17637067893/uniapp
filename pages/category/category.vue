<template>
	<view class="pics">
		<scroll-view show-scrollbar=true class="left" scroll-y >
			<view @click="select($event,item)" :class="{active:selectIndex==item.id}" v-for="(item,index) in tabs" :key='index'>
				{{item.tab_name}}
		    </view>
		</scroll-view> 
		
		<scroll-view  :scroll-top="scrollTop" v-if="goodsList.length>0" scroll-y="true" class="right">
			  <text id="scrollTp" ></text>
			  <view @click="goDetail(item)" class="item" :key="index" v-for="(item,index) in goodsList">
					<image @click="previewImg(item)" :src="item.goods_img" mode="scaleToFill"></image>
				<view style="margin: 20rpx  0 20rpx 20rpx;">
					<text style="font-size: 50rpx;color:#FF7A5E ;">{{item.goods_newPrice}}</text>
				</view>
				<view>
					<text style="font-size: 35rpx;" >{{item.goods_name}}</text>
				</view>
			</view>
		</scroll-view>
		<view v-else>
			<view style="display: flex; justify-content: center;">
				<text style="font-size: 50rpx;">数据加载中....</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs:[],
				selectIndex:1,
				goodsList:[],
				scrollTop:0,
				old: {
					scrollTop: 0
				}
			}
		},
		onLoad(){
			this.getTabs();
			this.getTabGoods();
		},
		methods: {
			select(e,item){
				this.selectIndex = item.id;
				this.getTabGoods();
				console.log(this.$refs.goodsScroll)
			},
			getTabs(){
				this.$request('getTabs').then(res=>{
					this.tabs = res;
					
				})
			},
			getTabGoods(){
				this.$request('getTabGoods',{id:this.selectIndex}).then(res=>{
					this.goodsList = res;
					// document.getElementById("scrollTp").scrollIntoView();
					console.log(this.goodsList)
				});
			},
			//图片预览
			previewImg(val){
				var temArr = [];
				temArr.push(val.goods_img)
			   uni.previewImage({
			   	urls:temArr,
				current:val.goods_img
			   })
			},
			//跳转详情
			goDetail(item){
				uni.navigateTo({
					url:'/pages/detail/detail'
				})
				this.$store.commit('saveInfo',item)
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
		background-color: #e6eef4;
	}
	.pics{
		background-color: #e6eef4;
		height: 100%;
		padding: 10rpx;
		display: flex;
		flex-direction: row;
		.left{
			width: 200rpx;
			height:1200rpx;
			view{
				margin: 10rpx 0;
				margin-right: 20rpx;
				height: 40px;
				line-height: 40px;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border: 1rpx solid #EEEEEE;
				border-radius: 20rpx;
				box-shadow: inset -10rpx -10rpx 10rpx #cfd6dc,
				                inset 10rpx 10rpx 10rpx #fff;
			}
			.active{
			    background-color:#FF7A5E;
				color: #FFF;
			}
		}
		.right{
			width: 550rpx;
			height: 1200rpx;
			.item{
				margin-top: 30rpx;
				padding: 20rpx;
				border-radius: 50rpx;
				border-radius: 20rpx;
				box-shadow: inset -20rpx -20rpx 30rpx #cfd6dc,
				                inset 20rpx 20rpx 30rpx #fff;
				image{
					border-radius: 30rpx;
					width: 500rpx;
				}
			}
		}
		
	}
</style>
