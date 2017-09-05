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
		{path:"/notice/*",component:noticeContent,name:'noticeContent'}
	]
});
new Vue({
	el: "#main",
	data: {
	},
	router
})