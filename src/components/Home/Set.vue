<template>
<div>
  <header>
    <span class="back" @click="back()"><img src="../../assets/back2.png"></span>
    <p>设置</p>
  </header>

  <section class="set-wrap">
    <ul>
      <li>
        <router-link to="UpdateInfo">修改资料</router-link>
      </li>
      <li>
        <router-link to="UpdateInfo">修改设置</router-link>
      </li>      
    </ul>
  </section>
  <section class="other-wrap">
    <ul>
      <li>
        <router-link to="UpdateInfo">邀请朋友</router-link>
      </li>
      <li>
        <router-link to="UpdateInfo">帮助中心</router-link>
      </li>
      <li>
        <router-link to="UpdateInfo">条款和协议</router-link>
      </li>
      <li @click="logout()">退出</li>                  
    </ul>
  </section>
</div>
</template>

<script>
import {logout} from '../../store/api.js'
export default {
  name: 'Set',
  data () {
    return {
      bgFlag:false
    }
  },
  methods: {
    back: function(){
      window.history.go(-1)
    },
    logout(){
      logout().then( res=>{
        if (res.retCode==0) {
          this.$store.dispatch('setisLogin',false)
          this.$router.push({path:'/'})
        }
      })
    }
  },
  mounted:function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
  width: 100%;
  height: 1.2rem;
  background: #5b7efb;
  text-align: center;
  color: #fff;
  line-height: 1.2rem;
  font-size: .4rem;
}
header span{
  display: inline-block;
  height: 1.2rem;
  width: 1.2rem;
  padding: .2rem;
  box-sizing: border-box;
  /*background-size: cover;*/
}
header span img{
  width: .8rem;
  height: .8rem;
}
.back{
  position: absolute;
  left: 0;
  top: 0;
}
.set-wrap{
  margin-top:.8rem;
  padding: 0 .4rem;
}
.other-wrap{
  margin-top:0.66666666666667rem;
  text-align: center;
  padding: 0 .4rem;
}
ul{
  list-style: none;
  border:2px solid #f2f2f2;
}
ul li{
  width: 100%;
  height: 1.0666666666667rem;
  line-height: 1.0666666666667rem;
  border-bottom: 2px solid #f2f2f2;
  padding:0 .4rem;
  box-sizing:border-box;
}
ul li:last-child{
  border:none;
}
ul li,
ul li a{
  font-size: .4rem;
  color: #999;
  text-decoration: none;
  display: block;
}
</style>
