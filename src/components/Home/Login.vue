<template>
  <div class="login-wrap">
    <div>
      <div class="cancel">
        <span class="back" @click.stop="goBack()"><img src="../../assets/back.png"></span>
        <span class="tip">登录</span>
      </div>

      <ul class="Login-wrap">
        <li>
          <input type="number" id="phone" placeholder="请输入手机号" v-model="phone" maxlength="11">
        </li>
        <li>
          <input type="password" id="psw" placeholder="请输入密码(6-20位英文、字母)" v-model="psw" maxlength="20" minlength="6">
        </li>
      </ul>

      <div class="Login-button" :class="{'opacity':!(phoneRight&&pswRight)}">
        <span>登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      phone:'',
      psw:'',
    }
  },
  computed:{
    phoneRight(){
       let phone = /^1(3|4|5|7|8)\d{9}$/
       return phone.test(this.phone)
    },
    pswRight(){
       let psw = /^\w{6,20}$/
       return psw.test(this.psw)         
    }
  },
  methods: {
    goBack:function(){
      window.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-wrap{
  width: 100%;
  overflow: hidden;
  position: absolute;
  /*z-index: 1003;*/
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  opacity: .95;
  background: #fff;
}
.cancel{
  height: 1.1733333333333rem;
  border-bottom: 1px solid #d8d8d8;
  line-height:1.1733333333333rem;
  text-align:center;
}
.cancel span{
  display: inline-block;
  font-size: .4rem;
  color: #999;
  padding: 0 .4rem;
}
.cancel .tip{
  color: #000;
  font-size: .5rem;
}
.cancel .back{
  left: 0;
  position: absolute;
}
.cancel .back img{
  width: .6rem;
  height: .6rem;
  float: left;
  margin:0.28666666666665rem 0;
  /*display: inline-block;*/
}
.Login-wrap{
  margin-top: 20px;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  padding: 0 0 .2rem .4rem;
  list-style: none;
}
.Login-wrap li{
  width: 100%;
  border-bottom: 1px solid #d8d8d8;
  margin-top: .2rem;
  height: 1rem;
  line-height: 1rem;
  position: relative;
}
.Login-wrap li:last-child{
  border-bottom: none;
}
.Login-wrap li input{
  border:none;
  height: 100%;
  width: 100%;
  font-size: .4rem;
  color: #666;
}
/*::-webkit-input-placeholder{
  color: #ccc;
}*/
.Login-wrap li .sendMsg{
  display: inline-block;
  position: absolute;
  right: 20px;
  bottom: .2rem;
  font-size: .4rem;
  background-color: #5b7efb;
  color: #fff;
  border-radius: 5px;
  padding: 0 5px;
  height: .8rem;
  line-height:.8rem;
}
.opacity{
  opacity: .65;
}

.Login-button{
  text-align: center;
  box-sizing: border-box;
  padding: 0.53333333333333rem 0.53333333333333rem;
}
.Login-button span{
  display: inline-block;
  width: 100%;
  background:#5b7efb;
  color: #fff;
  font-size: .4rem;
  padding: 15px 0;
  border-radius: 20px;
}
</style>
