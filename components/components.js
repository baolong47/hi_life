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
			swiper2:'./data/swiper2.json',
			nearlyStore:null
		}
	},
	template : '<section class="hi-life-index">'
			  +'<header><div class="seat">深圳</div>'
			  +'<div class="search-bar"><div class="search-bar-tool"><input type="text" placeholder="搜索" @click.prevent="toSearch"></div></div>'
			  +'<div class="notice"><i class="notice-img" @click="toNotice"></i></div></header>'
			  +'<section class="hi-life-index-content">'
			  +'<swiper-view :swiperUrl="swiper1"></swiper-view>'
			  +'<fenlei-view></fenlei-view>'
			  +'<swiper-view :swiperUrl="swiper2"></swiper-view>'
			  +'<section class="advertisement">'
			  +'<div class="advertisement-item"><img src="./image/advertisement/guanggao1.png"></div>'
			  +'<div class="advertisement-item"><img src="./image/advertisement/guanggao2.png"></div>'
			  +'<div class="advertisement-item"><img src="./image/advertisement/guanggao3.png"></div></section>'
			  +'<hr/>'
			  +'<section class="nearly-store">'
			  +'<header class="nearly-store-title">附近的商家</header>'
			  +'<div class="nearly-store-item" v-for="(item,key) in nearlyStore"><div class="nearly-store-item-img"><img :src="item.img"></div>'
			  +'<div class="nearly-store-item-detail"><h3 class="nearly-store-name">{{item.title}}<span class="store-distance">{{item.distance}}</span></h3>'
			  +'<div class="nearly-store-summary">{{item.summary}}</div><div class="nearly-store-sales">销量:<span>{{item.sales}}</span></div></div></div>'
			  +'</section>'
			  +'</section></section>',
	methods : {
		toSearch : function(){
			this.$router.push({name:"search"});  // 跳转到搜索页面
		},
		toNotice : function(){
			this.$router.push({name:'notice'});  // 跳转到通知页
		}
	},
	created : function(){
		var _this =this;
		axios.get('./data/nearlyStore.json')
		.then(function(response){
			_this.nearlyStore = response.data;
		})
		.catch(function(){
			_this.$toast("加载附近商家数据失败!");
		})
	}
}
/* 购物车 页面*/
var shopCar = {
	template : '<div>购物车</div>'
}
/* 会员中心页面 */
var custom = {
	data(){
		return {
			memberList:[
			{id:"1",label:"我的收藏",url:"",icon:"./image/memberCenter/mine_list_collect@3x.png"},
			{id:"2",label:"我的订单",url:"",icon:"./image/memberCenter/mine_list_order@3x.png"},
			{id:"3",label:"我的推荐",url:"",icon:"./image/memberCenter/mine_list_recommend@3x.png"},
			{id:"4",label:"兑换商城",url:"",icon:"./image/memberCenter/mine_list_exchange@3x.png"},
			{id:"5",label:"我的收益",url:"",icon:"./image/memberCenter/mine_list_profit@3x.png"}]
		}
	},
	template : '<div class="member-center">'
			  +'<section class="member-center-banner">'
			  +'<div class="member-center-user"><img src="./image/memberCenter/user.png"><span>圆滚滚的奶黄包纸</span><i class="icon iconfont icon-set setting-icon"></i></div>'
			  +'<div class="member-center-fufen">'
			  +'<div class="fufen-item"><img src="./image/memberCenter/mine_medi_heart@3x.png"><span>福心</span><span>2</span/></div>'
			  +'<div class="fufen-item"><img src="./image/memberCenter/mine_medi_coin@3x.png"><span>可用福分</span><span>199.99</span></div>'
			  +'</div></section>'
			  +'<section class="member-center-list">'
			  +'<div class="member-center-list-item" v-for="(item,key) in memberList"><img :src="item.icon"><span class="list-title">{{item.label}}</span><span class="icon iconfont icon-more more"></span></div>'
			  +'</section>'
			  +'</div>'
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
/* 公告页面 */
var notice ={
	data(){
		return {
			noticeJson :null,
			title:"公告"
		}
	},
	template :'<div class="notice-view"><header-view :title="title"></header-view>'
			 +'<section class="notice-list">'
			 +'<div class="notice-item" v-for="(item,key) in noticeJson" @click="toNoticeContent(item.id)">'
			 +'<h3 class="notice-title"><span class="notice-name">{{item.title}}</span><time class="pub-date">{{item.dateTime}}</time></h3>'
			 +'<article class="item-summary">{{item.content}}</article>'
			 +'</div>'
			 +'</section></div>',
 	created:function(){
 		var _this =this;
 		axios.get('./data/notice.json')
 		.then(function(response){
 			_this.noticeJson = response.data;
 		})
 		.catch(function(){
 			_this.$toast("加载公告失败!");
 		});
 	},
 	methods:{
 		toNoticeContent : function(val){
 			var url = this.$route.fullPath+"/"+val;
 			this.$router.push({path:url});
 		}
 	}
}
var noticeContent ={
	data(){
		return {
			title:"",
			notice:{}
		}
	},
	template :'<div class="notice-context-view"><header-view :title="title"></header-view>'
			 +'<article class="notice-context" v-html="notice.content"></article>'
			 +'</div>',
	created:function(){
		var _this = this;
		axios.get('./data/noticeContext.json')
		.then(function(response){
			_this.title = response.data.title;
			_this.notice = response.data;
		})
		.catch(function(){
			_this.$toast("公告信息请求失败！");
		});
	}
}
/* 声明一个头部组件 */
var headerComponent = Vue.component('header-view',{
	props:['title',"routerName"],
	data(){
		return {
			name:"/"+(this.routerName==undefined?"":this.routerName)
		}
	},
	template :'<mt-header fixed :title="pageTitle">'
				+'<router-link :to="name" slot="left">'
			    	+'<mt-button icon="back"></mt-button>'
			  	+'</router-link>'
			  +'</mt-header>',
	computed:{
		pageTitle:function(){
			return this.title;
		}
	},
})