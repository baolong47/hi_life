var router = new VueRouter({ // 路由要挂载在vue实例上
	routes:[
		{path:'/',component:main,
		children:[
			{path:'/',component:index},
			{path:'/index',component:index,name:'index'},
			{path:'/shopCar',component:shopCar,name:'shopCar'},
			{path:'/custom',component:custom,name:'custom'},
		]},
		{path:'/search',component:search,name:'search'},
		{path:'/notice',component:notice,name:'notice'},
		{path:"/notice/*",component:noticeContent,name:'noticeContent'},
		{path:'/userSet',component:userSet,name:'userSet'},
		{path:"/userSet/nameset",component:nameset,name:"nameset"},
		{path:"/userSet/pswset",component:pswset,name:"pswset"},
		{path:"/userSet/yhkset",component:yhkset,name:"yhkset"},
		{path:"/userSet/pswset/resetpsw",component:resetpsw,name:"resetpsw"},
		{path:"/login",component:loginTpl,name:"login"},
		{path:"/myCollection",component:myCollectionTpl,name:"myCollection"},
		{path:"/myOrder",component:myOrderTpl,name:"myOrder"}
	]
});
new Vue({
	el: "#main",
	data: {
	},
	router
})