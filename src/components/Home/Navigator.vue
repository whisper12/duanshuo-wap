<template>
  <div class="nav-wrap">
    <div class="back"><span @click.stop="back()"></span></div>
    <div class="avatar-wrap"><img src="../../assets/logo-1.png" class="avatar"></div>
    <div class="login" @click.stop="goLogin()"><span>手机号登录</span></div>
    <div class="register" @click.stop="goRegister()"><span>注册</span></div>
  </div>
</template>

<script>
import {CheckLogin2} from '../../mixins/CheckLogin.js'
export default {
  name: 'nav',
  mixins:[CheckLogin2],
  data () {
    return {
    }
  },
  methods: {
    goRegister:function(){
      this.$router.push({path:'/Register'})
    },
    goLogin:function(){
      this.$router.push({path:'/MsgLogin'})
    },
    back:function(){
      this.$router.push({path:'/'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-wrap{
  width: 100%;
  overflow: hidden;
  position: absolute;
  /*z-index: 1003;*/
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  opacity: .95;
  background: linear-gradient(#ddd, #fff 30%);
}
.avatar-wrap{
  width: 100%;
  height: 2.5rem;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.avatar{
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 20px;
}
.register,.login{
  color: #5b7efb;
  margin-top:.5rem;
  text-align: center;
}
.register span,
.login span{
  font-size: .6rem;
  width: 90%;
  border:1px solid #5b7efb;
  border-radius: 20px;
  display: inline-block;
  padding:10px 0;
}
.back{
  height: 2rem;
  width: 100%;
  position:relative;
}
.back span{
  display: inline-block;
  width: .8rem;
  height: .8rem;
  /*background-color: red;*/
  position: relative;
  top: 1rem;
  left: 1rem;
  background:url(../../assets/x.png);
  background-size: contain;
}
</style>
