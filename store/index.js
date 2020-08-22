import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		goodsInfo:{},
		goodsCount:10,
		isLogin:false,
		userInfo:{}
	},
	mutations:{
		//保存商品详情
		saveInfo(state,obj){
			this.state.goodsInfo = obj;
			console.log(this.state.goodsInfo);
		},
		//添加购物车
		addCart(state,num){
			this.state.goodsCount + 1;
		},
		//改变登录
		login(state){
			this.state.isLogin = true;
		},
		//推出
		loginOut(state){
			this.state.isLogin = false;
		},
		//保存用户信息
		saveUser(state,obj){
			this.state.userInfo = obj;
		}
	},
	getters:{
		
	},
	actions:{
		
	}
})

export default store