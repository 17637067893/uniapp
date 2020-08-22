
<template>
	<view class="home">
		<view class="top">
			<view class="qrcode1 iconfont icon-tubiaolunkuo-" @click="QRcode"></view>
			<view class="inp">
				<input placeholder-class="plclass" style="background-color: #FFFF;color: ;" type="text" placeholder="请输入商品名称" value="" />
			</view>
			<view class="adresssss">
				<view class="addressData">{{addressData}}</view>
				<view class="qrcode2 iconfont icon-position" @click="chooseLocation"></view>
			</view>
		</view>
		<swiper class="swiper" indicator-dots :autoplay="true" :interval="2000" circular>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.img"></image>
				<image mode="scaleTofit"  src="../../static/banner/banner1.jpg" ></image>
			</swiper-item>
		</swiper>
		<view class="nav">
			<view hover-class="hov" @click="goNavigator(item.path)" class="item" v-for="(item,index) in navs" :key="index">
				<view :class="item.icons"></view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="hot_goods">
			<view class="title">
				推荐商品
			</view>
			<GoodsList @myEvent="goxiangqing" :goods="goodList"></GoodsList>
		</view>
	</view>
</template>

<script>
	import goodsListCom from "../../components/goods-list.vue";
	import amap from "../../common/amap-wx.js";
	export default {
		data() {
			return {
				addressData:'成都',
				swipers: [{
						id: '1',
						img: '../../static/banner/banner1.jpg'
					},
					{
						id: '2',
						img: '../../static/banner/banner2.jpg'
					},
					{
						id: '3',
						img: '../../static/banner/banner3.jpg'
					},
					{
						id: '4',
						img: '../../static/banner/banner4.jpg'
					},
				],
				navs: [{
						icons: "iconfont icon-lianxifangshi",
						title: "家电",
						path: "/pages/goods/goods"
					},
					{
						icons: "iconfont icon-shipin",
						title: "电脑",
						path: "/pages/pics/pics"
					},
					{
						icons: "iconfont icon-shipin",
						title: "衣服",
						path: "/pages/contact/contact"
					},
					{
						icons: "iconfont icon-shenghuo",
						title: "生活",
						path: "/pages/videos/videos"
					}
				],
				goodList: [],
				pageindex:1
			}
		},
		onNavigationBarButtonTap(val) {
			console.log("你点击了按钮",val)
		},
		onNavigationBarSearchInputChanged (val) {
			console.log("你输入了信息",val)
		},
		components:{
			"GoodsList":goodsListCom
		},
		onLoad() {
			this.getGoosList();
			this.amapPlugin = new amap.AMapWX({
			key: this.mapKey  //该key 是在高德中申请的微信小程序key
			});
		},
		onReachBottom () {
			console.log('上拉加载')
			this.pageindex++
			this.getGoosList()
			
		},
		onPullDownRefresh() {
			console.log('下拉刷新');
		  this.goods = []
		  this.pageindex = 1
		  this.flag = false 
		  this.getGoosList();
		},
		methods: {
			//获取商品列表
			getGoosList() {
				console.log(this.pageindex);
				this.$request("getGoodList",{'page':this.pageindex}).then(res => {
					uni.stopPullDownRefresh();
					this.goodList.push(...res.data);
					console.log(res);
				})
			},
			//导航跳转
			goNavigator(val) {
				console.log(val);
				uni.navigateTo({
					url: val
				})
			},
			//选择位置
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						console.log(data);
						this.addressData = data.name;
					}
				})
			},
			//获取位置信息
			getAddress(){
				uni.getLocation({
				    type: 'wgs84',
					geocode:'true',
				    success: function (res) {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						console.log('success',res);
				    }
				});
			},
			//扫一扫
			QRcode(){
				uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			//进入详情
			goxiangqing(item){
				this.$store.commit('saveInfo',item)
				uni.navigateTo({
					url:'/pages/detail/detail'
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top{
		display: flex;
		flex-direction: row;
		background-color: #FF9880;
		height: 100rpx;
		line-height: 100rpx;
		// justify-content: center;
		align-items: center;
		.addressData{
			width: 70rpx;
			height: 70rpx;
			margin-left: 10rpx;
			text-overflow: ellipsis;
			white-space: normal;
			overflow: hidden;
		}
		.qrcode1{
			color: gray;
			font-size: 50rpx;
			margin-left: 30rpx;
			padding-right: 20rpx;
			height: 100rpx;
			line-height: 100rpx;
		}
		.qrcode2{
			color: gray;
			font-size: 45rpx;
			height: 100rpx;
			line-height: 100rpx;
			margin-right: 10rpx;
		}
		.inp{
			input{
				width: 520rpx;
				padding-left: 10px;
				height: 30px;
				border-radius: 10px;
			}
		}
		.adresssss{
			color: gray;
			font-size: 35rpx;
			display: flex;
			flex-direction: row;
		}
		.plclass{
			color: gray;
		}
	}
	.hov{
		
		background-color: #FF9880;
	},
	.home {
		 background-color: #e6eef4;
		swiper {
			height: 380rpx;
			image {
				width: 750rpx;
				height: 380rpx;
			}
		}
		.nav {
			display: flex;
			align-items: center;
			justify-content: space-around;
			// padding-bottom: 20rpx;
			padding: 20rpx 10rpx;
			.item {
				width: 20%;
				text-align: center;
				border-radius: 20rpx;
				padding-bottom: 15rpx;
				box-shadow: inset 10rpx 10rpx 10rpx #FFFFFF,
				                inset -10rpx -10rpx 10rpx #DDD;
				view {
					background-color: $shop-color;
					line-height: 120rpx;
					width: 120rpx;
					height: 120rpx;
					border-radius: 90rpx;
					margin: 10px auto;
					
				}

				text {
					font-size: 15px;
				}
			}

			.iconfont {
				font-size: 25px;
				color: #fff;
				height: 50px;
			}

			.icon-tupian {
				font-size: 20px;
			}
		}

		.hot_goods {
			// display: flex;
			 background-color: #e6eef4;
			padding: 10rpx;

			.title {
				width: 100%;
				height: 100rpx;
				color: $shop-color;
				line-height: 100rpx;
				text-align: center;
				// background-color: #FFFfff;
				background: #e6eef4;
				margin-bottom: 10rpx;
				letter-spacing: 30rpx;
				border-radius: 20rpx;
				// box-shadow: inset 10rpx 10rpx 20rpx #ffffff,
				//                 inset -10rpx -10rpx 20rpx #DDD;
				box-shadow: inset -10rpx -10rpx 20rpx #cfd6dc,
				                inset 10rpx 10rpx 20rpx #ffffff;
			}
		}
	}
</style>
