export let CheckLogin = {
	created:function(){
		if(!this.$store.getters.getisLogin){
			this.$router.push({path:'/Navigator'})
		}
	}
}

export let CheckLogin2 = {
	created:function(){
		if(this.$store.getters.getisLogin){
			this.$router.push({path:'/'})
		}
	}
}