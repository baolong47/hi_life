var router = new VueRouter({ // 路由要挂载在vue实例上
routes:[
	{path:'/',component:main,
	children:[
		{path:'/',component:index,name:'index'},
		{path:'/index',component:index,name:'index'},
		{path:'/shopCar',component:shopCar,name:'shopCar'},
		{path:'/custom',component:custom,name:'custom'}
	]}
	]
});
new Vue({
	el: "#main",
	data: {
	},
	router
})