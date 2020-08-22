<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty===true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view v-else>
			<!-- <view> -->
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="index">
					<view class="cart-item b-b" :class="{'b-b': index!==cartList.length-1}">
						<view class="image-wrapper">
							<!-- <image :src="item.goods_img"
							  mode="aspectFill"
							 :class="[item.loaded]" lazy-load
							  @load="onImageLoad('cartList', index)"
							  @error="onImageError('cartList', index)">
							</image> -->
							<img class="img" :src="item.goods_img" alt="">
							<view class="yticon icon-xuanzhong2 checkbox" :class="{checked: item.checked}" @click="check('item', index)"></view>
						</view>

						<view class="item-right">
							<text class="clamp title">{{item.goods_name}}</text>
							<text class="attr">{{item.attr_val}}分类</text>
							<text class="price">¥{{item.goods_newPrice}}</text>
							<!-- <uni-number-box 
								class="step"
								:min="1" 
								:max="15"
								 :value="item.number>item.stock?item.stock:item.number"
								:value="1"
								:isMax="item.number>=item.stock?true:false"
								:isMin="item.number===1"
								:index="index"
								@eventChange="numberChange"
							></uni-number-box> -->
							<uni-number-box class="step" :min="1"  :value="item.count" :isMin="item.count===1" :index="index" @eventChange="numberChange"></uni-number-box>
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image :src="allChecked?'/static/selected.png':'/static/select.png'" mode="aspectFit" @click="check('all')"></image>
					<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						清空
					</view>
				</view>
				<view class="total-box">
					<text class="price">¥{{total}}</text>
					<text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				onOff: true,
				cartList: [],
				cartListsssss: [{
						id: 1,
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg',
						attr_val: '春装款 L',
						stock: 15,
						title: 'OVBE 长袖风衣',
						price: 278.00,
						number: 1
					},
					{
						id: 3,
						image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
						attr_val: '激光导航 扫拖一体',
						stock: 3,
						title: '科沃斯 Ecovacs 扫地机器人',
						price: 1348.00,
						number: 5
					},
					{
						id: 4,
						image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
						attr_val: 'XL',
						stock: 55,
						title: '朵绒菲小西装',
						price: 175.88,
						number: 1
					},
				]
			};
		},
		onLoad() {
			// this.loadData();
			this.getCartList();
			this.hasLogin = this.$store.state.isLogin;
			this.onOff = false;
		},
		onShow() {
			if (!this.onOff) {
				this.getCartList();
				this.hasLogin = this.$store.state.isLogin;
			}
		},
		watch: {
			//显示空白页
			cartList(e) {
				let empty = e.length === 0 ? true : false;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			}
		},
		computed: {},
		methods: {
			//获取cartList表
			getCartList() {
				uni.showLoading({
					title: 'loading'
				});
				var id = this.$store.state.userInfo.id;
				console.log(id);
				this.$request('getCartList', {
					'user_id': id
				}).then(res => {
					console.log(res);
					let cartList = res.map(item => {
						item.checked = true;
						return item;
					});
					uni.hideLoading();
					this.cartList = res;
					//页面刷新
					this.$forceUpdate()
					if (this.cartList.length === 0) {
						this.empty = true;
						return;
					} else {
						this.calcTotal();
					}
				});
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					console.log(this.cartList[index]);
					this.cartList[index].checked = !this.cartList[index].checked;
				} else {
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(data) {
				var count = data.number;
				var user_id = this.$store.state.userInfo.id;
				var goods_id = this.cartList[data.index].id;
				
				this.$request('changCartCount', {
					'count': count,
					'user_id': user_id,
					'goods_id': goods_id
				}).then(res => {
					uni.showToast({
						title:'更改成功'
					})
					this.getCartList();
				})

				// this.cartList[data.index].count = data.count;
				
			},
			//删除
			deleteCartItem(index) {
				let list = this.cartList;
				let row = list[index];
				let id = row.id;

				this.cartList.splice(index, 1);
				this.calcTotal();
				uni.hideLoading();
			},
			//清空
			clearCart() {
				uni.showModal({
					content: '清空购物车？',
					success: (e) => {
						if (e.confirm) {
							this.cartList = [];
						}
					}
				})
			},
			//计算总价
			calcTotal() {
				let list = this.cartList;
				let total = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += item.goods_newPrice * item.count;
					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				
				this.total = Number(total.toFixed(2));
				console.log(total);
				console.log(Number(total.toFixed(2)));
				
				if (list.length === 0) {
					this.empty = true;
					return;
				}
			},
			//创建订单
			createOrder() {
				let list = this.cartList;
				let goodsData = [];
				list.forEach(item => {
					if (item.checked) {
						goodsData.push({
							attr_val: item.attr_val,
							number: item.number
						})
					}
				})

				uni.navigateTo({
					url: `/pages/order/createOrder?data=${JSON.stringify({
						goodsData: goodsData
					})}`
				})
				this.$api.msg('跳转下一页 sendData');
			}
		}
	}
</script>

<style lang='scss'>
	.container {
		padding-bottom: 134upx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			image {
				width: 240upx;
				height: 160upx;
				margin-bottom: 30upx;
			}

			.empty-tips {
				display: flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;

				.navigator {
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		padding: 30upx 40upx;
		border-radius: 30rpx;
		margin: 10rpx 20rpx;
		/* background-color: green; */
		box-shadow: inset -30rpx -30rpx 30rpx #cfd6dc,
			inset 30rpx 30rpx 30rpx #ffffff;

		.image-wrapper {
			/* width: 230upx;
			height: 230upx; */
			flex-shrink: 0;

			position: relative;

			.img {
				width: 200rpx;
				height: 230rpx;
				border-radius: 8upx;
			}

			image {
				width: 200rpx;
				height: 230rpx;
				border-radius: 8upx;
			}
		}

		.checkbox {
			position: absolute;
			left: -16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title,
			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}

			.attr {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}

			.price {
				height: 50upx;
				line-height: 50upx;
			}
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: $font-color-light;
			box-shadow: inset -5rpx -5rpx 10rpx #cfd6dc,
				inset 5rpx 5rpx 10rpx #fdffff;
		}
	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.checkbox {
			height: 52upx;
			position: relative;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #000;
			/* background: $font-color-disabled; */
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;
			box-shadow: inset -5rpx -5rpx 15rpx #cfd6dc,
				inset 5rpx 5rpx 15rpx #fdffff;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;

			.price {
				font-size: $font-lg;
				color: $font-color-dark;
			}

			.coupon {
				font-size: $font-sm;
				color: $font-color-light;

				text {
					color: $font-color-dark;
				}
			}
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			/* box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72) */
			box-shadow: inset -10rpx -10rpx 20rpx #cfd6dc,
				inset 10rpx 10rpx 20rpx #fdffff;
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;
	}
</style>
