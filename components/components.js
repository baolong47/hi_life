/* 项目启动主页路由*/
var main ={
	data(){
		return {
			
		}
	},
	template : '<router-view></router-view>'
			  +'<mt-tabbar v-model="selected">'
				+'<mt-tab-item v-for="item in tab" @click.native="indexSwap(item.id)" :id="item.id">'
					+'<img slot="icon" :src="item.imgUrl">{{item.label}}'
				+'</mt-tab-item>'
			+'</mt-tabbar></div>'
}
