var serverUrl = './data';

var router = new VueRouter({ // 路由要挂载在vue实例上
	routes:[
		{path:'/',component:mainTpl,
		children:[
			{path:'/',component:indexTpl},
			{path:'/index',component:indexTpl,name:'index'},
			{path:'/shopCar',component:shopCarTpl,name:'shopCar'},
			{path:'/custom',component:customTpl,name:'custom'},
		]},
		{path:'/search',component:searchTpl,name:'search'},
		{path:'/notice',component:noticeTpl,name:'notice'},
		{path:"/notice/*",component:noticeContentTpl,name:'noticeContent'},
		{path:'/userSet',component:userSetTpl,name:'userSet'},
		{path:"/userSet/nameset",component:namesetTpl,name:"nameset"},
		{path:"/userSet/pswset",component:pswsetTpl,name:"pswset"},
		{path:"/userSet/yhkset",component:yhksetTpl,name:"yhkset"},
		{path:"/userSet/pswset/resetpsw",component:resetpswTpl,name:"resetpsw"},
		{path:"/login",component:loginTpl,name:"login"},
		{path:"/myCollection",component:myCollectionTpl,name:"myCollection"},
		{path:"/myOrder",component:myOrderTpl,name:"myOrder"},
		{path:"/myRecommend",component:myRecommendTpl,name:"myRecommend"},
		{path:"/recommendCode",component:recommendCodeTpl,name:"recommendCode"},
		{path:"/myOrder/*",component:orderDetailTpl,name:"orderDetail"},
		{path:"/classify",component:classifyTpl,name:"classify"},
		{path:"/store",component:storeTpl,name:"store"},
		{path:"/goodsDetail",component:goodsDetailTpl,name:"goodsDetail"}
	]
});
new Vue({
	el: "#main",
	data: {
	},
	router
})


