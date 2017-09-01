var router = new VueRouter({ // 路由要挂载在vue实例上
routes:[
	{path:'/',component:main,children:[]}
	]
});
new Vue({
	el: "#main",
	data: {
	},
	router
})