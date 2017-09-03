/* 项目启动主页路由*/
var main ={
	data(){
		return {
			selected:'index',
			tabJson:null
		}
	},
	template : '<div class="content"><router-view></router-view>'
			  +'<mt-tabbar v-model="selected" class="tabBottom">'
				+'<mt-tab-item v-for="(item,key) in tabJson" @click.native="indexSwap(item.id)" :id="item.id">'
					+'<img slot="icon" :src="selected==item.id?item.selIcon:item.icon">{{item.label}}'
				+'</mt-tab-item>'
			+'</mt-tabbar></div>',
	created : function(){
		var _this =this;
		axios.get('./data/tabBottom.json')
		.then(function(response){
			_this.tabJson = response.data;
		})
		.catch(function(){
			this.$toast("加载失败!");
		});
	},
	methods : {
		indexSwap:function(val){
			this.$router.push(val);
		}
	}
}
/* 首页模块 */
var index = {
	data(){
		return {
			swiper1:'./data/swiper1.json',
			swiper2:'./data/swiper2.json'
		}
	},
	template : '<section class="hi-life-index">'
			  +'<header><div class="seat">深圳</div>'
			  +'<div class="search-bar"><div class="search-bar-tool"><input type="text" placeholder="搜索" @click.prevent="toSearch"></div></div>'
			  +'<div class="notice"><i class="notice-img"></i></div></header>'
			  +'<section class="hi-life-index-content">'
			  +'<swiper-view :swiperUrl="swiper1"></swiper-view>'
			  +'<fenlei-view></fenlei-view>'
			  +'<swiper-view :swiperUrl="swiper2"></swiper-view>'
			  +'<section class="advertisement">'
			  +'<div class="advertisement-item"><img src="./image/advertisement/guanggao1.png"></div>'
			  +'<div class="advertisement-item"><img src="./image/advertisement/guanggao2.png"></div>'
			  +'<div class="advertisement-item"><img src="./image/advertisement/guanggao3.png"></div></section>'
			  +'<hr/>'
			  +'</section></section>',
	methods : {
		toSearch : function(){
			this.$router.push({name:"search"});  // 跳转到搜索页面
		}
	}
}
/* 购物车 页面*/
var shopCar = {
	template : '<div>购物车</div>'
}
/* 会员中心页面 */
var custom = {
	template : '<div>会员中心</div>'
}
/* 轮播图 */
var swiper = Vue.component('swiper-view',{
	props :['swiperUrl'],
	data(){
		return {
			swiperJson:null,
			axjxUrl :this.swiperUrl
		}
	},
	template : '<div class="swiper-view">'
			  +'<mt-swipe :auto="4000">'
			  +'<mt-swipe-item v-for="(item,key) in swiperJson"><router-link to="/swiper"><img :src="item.imgUrl"></router-link ></mt-swipe-item>'
			  +'</mt-swipe></div>',
	created :function(){
		var _this =this;
		axios.get(this.swiperUrl)
		.then(function(response){
			_this.swiperJson = response.data;
		})
		.catch(function(){
			_this.$toast("请求失败!");
		});
	}
})
/* 搜索页面 */
var search ={
	template : '<div>搜索</div>'
}
/* 分类模块 */
var fenlei = Vue.component('fenlei-view',{
	data(){
		return {
			fenleiJson :null	
		}
	},
	template : '<div class="fenlei"><div class="fenlei-item" v-for="(item,key) in fenleiJson" @click="fenleiDetail"><img :src="item.icon"><p>{{item.label}}</p></div></div>',
	created : function(){
		var _this = this;
		axios.get('./data/fenleiJson.json')
		.then(function(response){
			_this.fenleiJson = response.data;
		})
		.catch(function(){
			_this.$toast("加载数据失败!");
		});
	},
	methods : {
		fenleiDetail : function(){
			this.$toast("加载分类详情页");
		}
	}
})
