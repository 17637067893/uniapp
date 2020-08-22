<template>
	<view class="content">
		<GoodsList @myEvent="goxiangqing" :goods="goodList"></GoodsList>
	</view>
</template>

<script>
	import goodsListCom from "../../components/goods-list.vue";
	export default {
		data() {
			return {
				goodList:[],
				pageindex:1
			}
		},
		onLoad(){
			this.getGoosList();
		},
		onReachBottom () {
			console.log('上拉加载')
			this.pageindex++
			this.getGoosList()
		},
		components:{
			"GoodsList":goodsListCom
		},
		methods: {
			getGoosList() {
				console.log(this.pageindex);
				this.$request("getGoodList",{'page':this.pageindex}).then(res => {
					uni.stopPullDownRefresh();
					this.goodList.push(...res.data);
					console.log(res);
				})
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
.content{
	padding: 10rpx;
	margin-bottom: 100rpx;
}
</style>
