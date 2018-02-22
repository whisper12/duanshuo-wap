<template>
  <div class="regist-wrap">
    <div>
      <div class="cancel">
        <span class="back" @click.stop="goBack()"><img src="../../assets/back.png"></span>
        <span class="tip">注册</span>
      </div>

      <ul class="register-wrap">
        <li>
          <input type="number" id="phone" placeholder="请输入手机号" v-model="phone" maxlength="11">
          <span class="sendMsg" :class="{'opacity':codeFlag}" @click="sendMsg()">{{codeText}}</span>
        </li>
        <li>
          <input type="number" id="msgCode" placeholder="请输入验证码" v-model="msgCode" maxlength="4">
        </li>
        <li>
          <input type="password" id="psw" placeholder="请设置密码(6-20位英文、字母)" v-model="psw" maxlength="20" minlength="6">
        </li>
      </ul>

      <div class="register-button" :class="{'opacity':!(phoneRight&&msgRight&&pswRight)}">
        <span>注册</span>
      </div>
      <div class="user-read">点击注册代表已阅读并同意<span>用户注册协议</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'regist',
  data () {
    return {
      phone:'',
      msgCode:'',
      psw:'',
      codeFlag:false,
      time:60,
      codeText:'发送验证码'
    }
  },
  computed:{
    phoneRight(){
       let phone = /^1(3|4|5|7|8)\d{9}$/
       return phone.test(this.phone)
    },
    msgRight(){
       let msg = /^\d{4}$/
       return msg.test(this.msgCode)      
    },
    pswRight(){
       let psw = /^\w{6,20}$/
       return psw.test(this.psw)         
    }
  },
  methods: {
    sendMsg:function(){
      if(!this.codeFlag){
        if(!this.phoneRight){
          alert('请填写正确的手机号码')
        }else{
          this.codeFlag=true
          let _this = this
          _this.time=5
          let timeRun = setInterval(function(){
            _this.time--
            _this.codeText= '重新发送验证码 '+ _this.time + 's'
            if (_this.time==0) {
              clearInterval(timeRun)
              _this.codeFlag=false
              _this.codeText='发送验证码'
            }
          },1000)
        }        
      }
    },
    goBack:function(){
      window.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.regist-wrap{
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
.register-wrap{
  margin-top: 20px;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  padding: 0 0 .2rem .4rem;
  list-style: none;
}
.register-wrap li{
  width: 100%;
  border-bottom: 1px solid #d8d8d8;
  margin-top: .2rem;
  height: 1rem;
  line-height: 1rem;
  position: relative;
}
.register-wrap li:last-child{
  border-bottom: none;
}
.register-wrap li input{
  border:none;
  height: 100%;
  width: 100%;
  font-size: .4rem;
  color: #666;
}
/*::-webkit-input-placeholder{
  color: #ccc;
}*/
.register-wrap li .sendMsg{
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

.register-button{
  text-align: center;
  box-sizing: border-box;
  padding: 0.53333333333333rem 0.53333333333333rem;
}
.register-button span{
  display: inline-block;
  width: 100%;
  background:#5b7efb;
  color: #fff;
  font-size: .4rem;
  padding: 15px 0;
  border-radius: 20px;
}
.user-read{
  padding: 0 .53333333333333rem;
  color: #ccc;
  letter-spacing: 1px;
}
.user-read span{
  color: #5b7efb;
}
</style>
