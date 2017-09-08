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
		this.selected = this.$route.name==undefined?"index":this.$route.name;
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
			if(val == "custom"){
				if(!localStorage.userName){
					this.$router.push({name:"login"});
				}
			}
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
			{id:"1",label:"我的收藏",url:"",icon:"./image/memberCenter/mine_list_collect@3x.png",name:"myCollection"},
			{id:"2",label:"我的订单",url:"",icon:"./image/memberCenter/mine_list_order@3x.png",name:"myOrder"},
			{id:"3",label:"我的推荐",url:"",icon:"./image/memberCenter/mine_list_recommend@3x.png",name:"myRecommend"},
			{id:"4",label:"兑换商城",url:"",icon:"./image/memberCenter/mine_list_exchange@3x.png",name:"myCollection"},
			{id:"5",label:"我的收益",url:"",icon:"./image/memberCenter/mine_list_profit@3x.png",name:"myCollection"}],
			userName:"圆滚滚的奶黄包纸"
		}
	},
	template : '<div class="member-center">'
			  +'<section class="member-center-banner">'
			  +'<div class="member-center-user"><img src="./image/memberCenter/user.png" @click="toSetting"><span>{{userName}}</span><i class="icon iconfont icon-set setting-icon" @click="toSetting"></i></div>'
			  +'<div class="member-center-fufen">'
			  +'<div class="fufen-item"><img src="./image/memberCenter/mine_medi_heart@3x.png"><span>福心</span><span>2</span/></div>'
			  +'<div class="fufen-item"><img src="./image/memberCenter/mine_medi_coin@3x.png"><span>可用福分</span><span>199.99</span></div>'
			  +'</div></section>'
			  +'<section class="member-center-list">'
			  +'<div class="member-center-list-item" v-for="(item,key) in memberList" @click="toPage(item.name)"><img :src="item.icon"><span class="list-title">{{item.label}}</span><span class="icon iconfont icon-more more"></span></div>'
			  +'</section>'
			  +'</div>',
	methods:{
		toSetting : function(){
			this.$router.push({name:'userSet',params:{userName:this.userName}});
		},
		toPage : function(val){
			this.$router.push({name:val,params:{name:this.$route.name}});
		}
	}
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
	data(){
		return {
			selected:"1",
			searchContent:[],
			searchContext:"",
			searchResult:[]
		}
	},
	template : '<div class="search-view">'
			  +'<header class="search-view-top"><div class="search-bar"><div class="search-bar-tool"><input type="text" v-model="searchContext" placeholder="搜索" @keyup.13="search" @blur="search"></div></div><div class="cancel" @click="returnPrev">取消</div></header>'
			  +'<div class="search-content">'
			  +'<mt-navbar v-model="selected">'
			  +'<mt-tab-item id="1">商品</mt-tab-item>'
			  +'<mt-tab-item id="2">商家</mt-tab-item>'
			  +'</mt-navbar>'
			  +'<div class="search-history">'
			  +'<header class="search-history-header">搜索<span class="icon iconfont icon-delete clear-history"></span></header>'
			  +'<div class="search-history-content">'
			  +'<span v-for="(item,key) in searchResult">{{item}}</span>'
			  +'</div>'
			  +'</div>'
			  +'</div>'
			  +'</div>',
	methods:{
		returnPrev:function(){
			this.$router.push({path:"/"});
		},
		search: function(){
			this.$toast("搜索成功!");
			var resultArr = [] ;
			if(!localStorage.searchResult){
				localStorage.setItem("searchResult",this.searchContext);
			}else{
				this.searchResult = localStorage.getItem("searchResult").split(",");
				resultArr = localStorage.getItem("searchResult").split(",");
				if(resultArr.indexOf(this.searchContext) < 0){
					resultArr.push(this.searchContext);
				}
				resultArr.join("");
				localStorage.setItem("searchResult",resultArr);
			}
//			this.$router.push({name:"searchResult"});
		}
	},
	created:function(){
		if(localStorage.searchResult){
				this.searchResult = localStorage.getItem("searchResult").split(",");
			}
	}
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
/* 公告内容页面*/
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
	props:['title',"routerName","fixed","rightText"],
	data(){
		return {
			name:{name:(this.routerName==undefined?"":this.routerName)},
			isfixed:this.fixed==undefined?true:this.fixed,
			rightLabel:this.rightText==undefined?"":this.rightText
		}
	},
	template :'<mt-header :fixed="isfixed" :title="pageTitle">'
				+'<router-link :to="name" slot="left">'
			    	+'<mt-button icon="back"></mt-button>'
			  	+'</router-link>'
			  	+'<mt-button slot="right" @click="rightTextClick">{{rightLabel}}</mt-button>'
			  +'</mt-header>',
	computed:{
		pageTitle:function(){
			return this.title;
		}
	},
	methods : {
		rightTextClick : function(){
			this.$emit("rightClick");
		}
	}
})
/* 用户设置页面 */
var userSet = {
	data(){
		return {
			name:"",
			psw:"123456",
			yhk:"13688455785544555",
			title:"我的设置",
			fixed:false,
			userRouter:"nameset",
			pswRouter:"pswset",
			yhkRouter:"yhkset"
			
		}
	},
	template : '<div class="setting-view"><header-view :title="title" :fixed="fixed"></header-view>'
			  +'<section class="set-contaniner">'
			  +'<div class="setting-list">'
			  +'<div class="setting-list-item" @click="setting(userRouter,name)"><span class="setting-label">昵称</span><span class="setting-more">{{name}}<i class="icon iconfont icon-more"></i></span></div>'
			  +'<div class="setting-list-item" @click="setting(pswRouter,psw)"><span class="setting-label">修改密码</span><span class="setting-more"><i class="icon iconfont icon-more"></i></span></div>'
			  +'<div class="setting-list-item" @click="setting(pswRouter,yhk)"><span class="setting-label">我的银行卡</span><span class="setting-more"><i class="icon iconfont icon-more"></i></span></div>'
			  +'</div>'
			  +'</section>'
			  +'<footer class="login-out" @click="loginout">退出登录</footer>'
			  +'</div>',
	created:function(){
		if(this.$route.params.userName){
			localStorage.setItem("userName",this.$route.params.userName);
		}
		this.name = this.$route.params.userName == undefined?localStorage.userName:this.$route.params.userName;
	},
	methods:{
		setting : function(val,param){
			this.$router.push({name:val,params:{setparams:param,prev:this.$route.name}});
		},
		loginout : function(){
			localStorage.removeItem("userName");
			this.$router.push({name:"login"});
		}
	}
}
/* 修改昵称*/
var nameset ={
	data(){
		return {
			param:"",
			fixed:false,
			title:"修改昵称",
			routerName:"",
			help:"以英文字母或汉字开头，限6-16个字符",
			rightText:"确定"
		}
	},
	template :'<div class="setting-name-view"><header-view :title="title" :fixed="fixed" :routerName="routerName" :rightText="rightText" @rightClick="parentEvent"></header-view>'
			 +'<div class="name-input"><input type="text" v-model="param"><i class="clear-input" v-show="isshow" @click="clear"></i></div>'
			 +'<div class="input-help">{{help}}</div>'
			 +'</div>',
	created:function(){
		if(this.$route.params.prev != undefined){
			localStorage.prevName = this.$route.params.prev;
		}
		this.param = this.$route.params.setparams==undefined?localStorage.userName:this.$route.params.setparams;
		this.routerName = this.$route.params.prev==undefined?localStorage.prevName:this.$route.params.prev;
	},
	computed:{
		isshow:function(){
			if(this.param == ""){
				return false;
			}else{
				return true;
			}
		}
	},
	methods:{
		parentEvent : function(){
			this.$toast("修改成功!");
			this.$router.push({name:localStorage.prevName});
		},
		clear: function(){
			this.param = "";
		}
	}
}
/* 修改密码，验证手机号*/
var pswset ={
	data(){
		return {
			param:"",
			fixed:false,
			title:"修改密码",
			routerName:"",
			text:"获取验证码",
		}
	},
	template :'<div class="setting-psw1 view-background"><header-view :title="title" :fixed="fixed" :routerName="routerName"></header-view>'
			 +'<section class="psw-content">'
			 +'<div class="psw-iput"><label>手机号</label><input type="number" placeholder="请输入手机号码"></div>'
			 +'<div class="psw-iput"><label>验证码</label><input type="text" placeholder="请输入6位短信验证码"><span @click="getCode">{{text}}</span></div>'
			 +'</section>'
			 +'<div class="setting-psw-btn" @click="next">下一步</div>'
			 +'</div>',
	created:function(){
		if(this.$route.params.prev != undefined){  // 第一次进来把当前后退的路由存起来
			localStorage.prevName = this.$route.params.prev;
		}
		this.param = this.$route.params.setparams==undefined?localStorage.userName:this.$route.params.setparams;
		this.routerName = this.$route.params.prev==undefined?localStorage.prevName:this.$route.params.prev;
	},
	methods : {
		next : function(){
			this.$router.push({name:"resetpsw",params:{prev:this.$route.name}});
		},
		getCode : function(){
			this.tempTime = 60;
			this.text = "60s";
			this.sendBtnTimer = setInterval(this.time,1000);
		},
		time:function(){
			this.tempTime--;
			if(this.tempTime < 1){
				this.text = "发送验证码";
				clearInterval(this.sendBtnTimer);
				return false;
			}
			this.text = this.tempTime + "s";
		}
	}
}
/* 银行卡设置*/
var yhkset ={
	data(){
		return {
			param:""
		}
	},
	template :'<div>{{param}}</div>',
	created:function(){
		this.param = this.$route.params.setparams;
	}
}
/* 重置密码*/
var resetpsw = {
	data(){
		return {
			title:"设置密码",
			routerName:'',
			fixed:false
		}
	},
	template :'<div class="reset-psw-view view-background"><header-view :title="title" :fixed="fixed" :routerName="routerName"></header-view>'
			 +'<section class="reset-psw-input"><div class="psw-input"><label>新密码</label><input type="password" value="11222"></div></section>'
			 +'<div class="input-help">英文字母或数字、限6-32字符</div>'
			 +'<div class="setting-psw-btn" @click="touser">确定</div>'
			 +'</div>',
	created:function(){
		if(this.$route.params.prev != undefined){  // 第一次进来把当前后退的路由存起来
			localStorage.prevName = this.$route.params.prev;
		}
		this.routerName = this.$route.params.prev==undefined?localStorage.prevName:this.$route.params.prev;
	},
	methods:{
		touser:function(){
			this.$toast("设置密码成功！");
			this.$router.push({name:"userSet"});
		}
	}
}
/* 登录 */
var loginTpl = {
	template:'<div>登录</div>'
}
/* 我的收藏页面 */
var myCollectionTpl = {
	data (){
		return {
			title:"我的收藏",
			fixed:false,
			routerName:'',
			rightText:"编辑",
			isBind:true,
			atcive:'goods',
			list:[],
			edit:false,
			selectArr :[],
			ischeckAll:false
		}
	},
	template :'<section class="my-collention"><header-view :title="title" :fixed="fixed" :routerName="routerName" :rightText="rightText" @rightClick="parentEvent"></header-view>'
			 +'<div class="my-tab">'
			 +'<div :class="{mySelected:isBind}" @click="swap(isBind)"><label>商品</label></div>'
			 +'<div :class="{mySelected:!isBind}" @click="swap(!isBind)"><label>商家</label></div>'
			 +'</div>'
			 +'<mt-tab-container v-model="atcive">'
			 +'<mt-tab-container-item id="goods">'
			 +'<div class="hi-life-list-item" v-for="(item,key) in list">'
			 +'<div v-if="edit" class="hi-life-list-checkbox"><i :class="formatActive" @click="check(item.goodId)"></i></div>'
			 +'<div class="hi-life-list-item-img"><img :src="item.img"></div>'
			 +'<div class="hi-life-list-item-content">'
			 +'<h3>{{item.name}}</h3>'
			 +'<div class="hi-life-list-item-summary">{{item.summary}}</div>'
			 +'<div class="hi-life-list-item-other">¥<span class="int-string">{{item.sales|formatInt}}</span>{{item.sales|formatDecimal}}<div class="hi-life-list-item-oper" v-if="!edit"></div></div>'
			 +'</div>'
			 +'</div>'
			 +'</mt-tab-container-item>'
			 +'<mt-tab-container-item id="store">商家'
			 +'</mt-tab-container-item>'
			 +'</mt-tab-container>'
			 +'<div class="my-collection-bottom" v-if="edit">'
			 +'<div class="hi-life-list-checkboxall"><i :class="ischeckAll" @click="checkAll()"></i></div>'
			 +'<span>全选</span>'
			 +'<div class="dele-btn" @click="dele">删除</div>'
			 +'</div>'
			 +'</section>',
	created : function(){
		var _this = this;
		this.routerName = this.$route.params.name;  // 上个路由带过来
		axios.get("./data/myCollection.json")
		.then(function(response){
			_this.list = response.data;
		})
		.catch(function(){
			_this.$toast("加载信息失败!");
		});
	},
	filters:{
		formatInt:function(val){
			return val.toString().substr(0,val.toString().indexOf("."));
		},
		formatDecimal:function(val){
			return val.toString().substr(val.toString().indexOf("."));
		}
	},
	methods:{
		parentEvent:function(){
			this.edit = true;
		},
		swap:function(val){
			if(this.isBind == val){
				this.isBind = !val;
			}else{
				this.isBind = val;
			}
		},
		check : function(val){
			console.log(val);
		},
		dele : function(){
			this.edit = false;
		}
	},
	watch:{
		isBind:function(newValue,oldValue){
			if(newValue){
				this.atcive = "goods";
			}else{
				this.atcive = "store";
			}
		}
	},
	computed:{
		formatActive :function(val){
			/*if(val.indexOf(this.selectArr)){
				return "icon iconfont icon-selected";
			}else{
				return "";
			}*/
		}
	}
}
/* 我的订单页面 */
var myOrderTpl = {
	data(){
		return {
			title:"我的订单",
			fixed:false,
			routerName:"",
			order:[],
			tabAction:[],
			style:{
				height:""
			},
			active:"5"
		}
	},
	template:'<div class="my-order-view "><header-view :title="title" :fixed="fixed" :routerName="routerName" ></header-view>'
			+'<div class="scorll-tab">'
			+'<tab-view :action="tabAction" @changeTab="changeTab"></tab-view>'
			+'</div>'
			+'<div class="my-order-content" :style="style">'
			+'<mt-tab-container v-model="active">'
			/* 全部 */
			+'<mt-tab-container-item id="5">'
			+'<section class="my-order-list" v-for="(item,key) in order">'
			+'<div class="order-dp" v-for="(item1,key1) in item.dpList">'
			+'<header class="my-order-list-storeName"><i></i>{{item1.storeName}}<span class="order-state">{{item.stateText}}</span></header>'
			+'<div class="sp-contanier" v-for="(item2,key2) in item1.spList">'
			+'<div class="hi-life-list-item">'
			+'<div class="hi-life-list-item-img"><img :src="item2.img"></div>'
			+'<div class="hi-life-list-item-content">'
			+'<div class="hi-life-list-item-summary">{{item2.summary}}</div>'
			+'<div class="hilife-list-detail"><span class="sp-sales">{{item2.sales|formarMoney}}</span><span class="sp-count">x{{item2.count}}</span></div>'
			+'</div>'
			+'</div>'
			+'</div>'
			+'<div class="sp-count-detail">共{{item1|size}}件商品，合计{{item1|count}}</div>'
			+'</div></section>'
			+'</mt-tab-container-item>'
			/* 分情况，代付款，已付款....*/
			+'<mt-tab-container-item :id="item.state" v-for="(item,key) in order">'
			+'<section class="my-order-list">'
			+'<div class="order-dp" v-for="(item1,key1) in item.dpList">'
			+'<header class="my-order-list-storeName"><i></i>{{item1.storeName}}<span class="order-state">{{item.stateText}}</span></header>'
			+'<div class="sp-contanier" v-for="(item2,key2) in item1.spList">'
			+'<div class="hi-life-list-item">'
			+'<div class="hi-life-list-item-img"><img :src="item2.img"></div>'
			+'<div class="hi-life-list-item-content">'
			+'<div class="hi-life-list-item-summary">{{item2.summary}}</div>'
			+'<div class="hilife-list-detail"><span class="sp-sales">{{item2.sales|formarMoney}}</span><span class="sp-count">x{{item2.count}}</span></div>'
			+'</div>'
			+'</div>'
			+'</div>'
			+'<div class="sp-count-detail">共{{item1|size}}件商品，合计{{item1|count}}</div>'
			+'</div></section>'
			+'</mt-tab-container-item>'
			+'</mt-tab-container>'
			+'</div>'
			+'</div>',
	created:function(){
		this.style.height = document.body.clientHeight  - 90 + "px";  //计算menu的高度
	},
	mounted:function(){
		var _this = this;
		axios.get(serverUrl+'/myOrder.json')
		.then(function(response){
			_this.order = response.data;
		})
		.catch(function(){
			_this.$toast("加载失败!");
		});
		var _this =this;
		axios.get('./data/myOrderTab.json')
		.then(function(response){
			_this.tabAction = response.data;
		})
		.catch(function(){
			_this.$toast("加载失败!");
		});
	},
	filters:{
		formarMoney:function(val){
			return '¥' + parseFloat(val).toFixed(2);
		},
		count:function(val){
			var count=0;
			for(var item in val.spList){
				count += val.spList[item].count*val.spList[item].sales;
			}
			return count;
		},
		size:function(val){
			var count=0;
			for(var item in val.spList){
				count += val.spList[item].count;
			}
			return count;
		}
	},
	methods:{
		changeTab:function(val){
			this.active = val;
		}
	}
}
/* 自定义tab组件 */
var tab = Vue.component('tab-view',{
	props:['action'],
	data(){
		return {
			activeId:'5'
		}
	},
	template:'<section class="my-tab">'
			+'<div v-for="(item,key) in list"  :class="{mySelected:item.id==activeId}" @click="swapTab(item.id)"><label>{{item.label}}</label></div>'
			+'</section>',
	mounted:function(){
	},
	methods:{
		swapTab : function(val){
			this.activeId = val;
			this.$emit("changeTab",val);
		}
	},
	computed:{
		list:function(){
			return this.action;
		}
	}
});
/* 我的推荐页面*/
var myRecommendTpl ={
	data(){
		return {
			title:"我的推荐",
			fixed:false,
			routerName:"",
			codeIcon:"./image/recommend/recommend_icon_invit@3x.png",
			recommedIcon:"./image/recommend/recommend_icon_recom@3x.png",
			shouyiIcon:"./image/recommend/recommend_icon_profit@3x.png",
			recommedList:[{name:"少司命",recommendDate:"2017.07.18"},{name:"罗荣盛",recommendDate:"2017.09.18"},{name:"测试用户",recommendDate:"2032.09.18"}]
		}
	},
	template:'<div><header-view :title="title" :fixed="fixed" :routerName="routerName" ></header-view>'
			+'<section class="recommend-summay">'
			+'<div class="recommend-summay-item"><span class="recommend-icon"><img :src="codeIcon"></span><span>我的邀请码</span><span class="recommend-num recommend-code" @click="recommednCode">1234z</span></div>'
			+'<div class="recommend-summay-item"><span class="recommend-icon"><img :src="recommedIcon"></span><span>我的推荐</span><span class="recommend-num">100</span></div>'
			+'<div class="recommend-summay-item"><span class="recommend-icon"><img :src="shouyiIcon"></span><span>昨日收益</span><span class="recommend-num">30000.00元</span></div>'
			+'</section>'
			+'<section class="recommend-list">'
			+'<header class="recommend-list-header">推荐列表</header>'
			+'<div class="recommend-list-content">'
			+'<div class="recommend-list-item" v-for="(item,key) in recommedList"><span class="recommend-name">{{item.name}}</span><span class="recommend-date">{{item.recommendDate}}</span></div>'
			+'</div>'
			+'</section>'
			+'</div>',
	methods:{
		recommednCode:function(){
			this.$router.push({name:"recommendCode"});
		}
	}
}
/* 我的推荐码页面 */
var recommendCodeTpl ={
	data(){
		return{
			title:"我的二维码",
			fixed:false,
			routerName:"",
			img:"./image/code.png"
		}
	},
	template:'<section class="code-view view-background"><header-view :title="title" :fixed="fixed" :routerName="routerName" ></header-view>'
			+'<div class="code-contanier">'
			+'<div class="code-bg">'
			+'<div class="code-content">'
			+'<div class="code-img"><div class="mycode"><div class="mycode-img"><img :src="img"></div></div><div class="code-help">长按保存到本地</div></div>'
			+'<div class="code-bottom">扫码加入我们吧</div>'
			+'</div>'
			+'</div></div>'
			+'</section>'
}
