<template>
  <div class="nav-wrap">
  <vLayer v-if="isError" :errorInfo="errorInfo"></vLayer>
    <div v-if="editPhone">
      <div class="cancel" @click.stop="goBack()"><span>取消</span></div>
      <div class="tip"><span>请输入手机号</span></div>
      <div class="phone-wrap">
        <span>+86</span>
        <span><input type="number" name="phone" id="phone" placeholder="输入手机号" v-model="phone" maxlength="11"></span>
      </div>
      <div class="msg-button" @click="sendMsg()">
        <span v-if="!NextDisabled">发送验证码</span>
        <span v-if="NextDisabled" class="opacity">{{time}} 秒之后再试</span>
      </div>
    </div>
    <transition name="fade">
      <div v-if="!editPhone">
        <div class="cancel">
          <span class="back" @click.stop="goBack()"><img src="../../assets/back.png"></span>
          <span class="editPhone" @click.stop="editPhoneChange()">编辑号码</span>
          <span class="number">+86{{phone}}</span>          
        </div>
        <div class="tip"><span>我们给您发送了4位短信验证码。</span></div>
        <div class="code-wrap">
          <span>
            <input type="number" name="msgCode" id="msgCode" placeholder="" v-model="msgCode" maxlength="4">
          </span>
        </div>      
        <div class="msg-button" @click="ToContinue()">
          <span :class="{'opacity':!codeFlag}">继续</span>
        </div> 
        <div class="msg-button again">
          <span :class="{'opacity':NextDisabled}" @click="sendMsg()">重新发送验证码 <i v-if="NextDisabled">{{time}}s</i></span>
        </div>     
      </div>
    </transition>
  </div>
</template>

<script>
import {CheckLogin2} from '../../mixins/CheckLogin.js'
import Layer from '../Common/Layer'
import {get_sms_code,validate_sms_code,get_profile} from '../../store/api.js'
export default {
  name: 'MsgLogin',
  mixins:[CheckLogin2],
  data () {
    return {
      phone:'',
      msgCode:'',
      NextDisabled:false,
      codeFlag:false,
      editPhone:true,
      time:60,
      errorInfo:{'tip':'请填写正确的11位手机号码','error':''}
    }
  },
  components:{
    'vLayer':Layer
  },
  computed:{
    isError(){
      return this.$store.getters.getisError
    }
  },
  watch:{
    msgCode(){
      let code = /\d{4}$/
      if(code.test(this.msgCode)){
        this.codeFlag=true
      }else{
        this.codeFlag=false
      }
    }
  },
  methods: {
    sendMsg:function(){
      if(!this.NextDisabled){
        let phone = /^1(3|4|5|7|8)\d{9}$/
        if(!phone.test(this.phone)){
          this.$store.dispatch('setisError',true)
        }else{
          get_sms_code(this.phone).then(res=>{
            this.NextDisabled=true
            this.editPhone=false
            let _this = this
            _this.time=5
            let timeRun = setInterval(function(){
              _this.time--
              if (_this.time==0) {
                clearInterval(timeRun)
                _this.NextDisabled=false
              }
            },1000)            
          })
        }        
      }
    },
    goBack:function(){
      window.history.go(-1)
    },
    editPhoneChange:function(){
      this.editPhone=true
    },
    ToContinue:function(){
      if(this.codeFlag){
        validate_sms_code(this.phone,this.msgCode,2).then(res=>{
          if (res.retCode==0) {
            this.$store.dispatch('setisLogin',true)
            get_profile().then(res=>{
              if(res.retCode==0){
                this.$store.dispatch('setuserFile',res.result)
                if (res.result.nickname) {
                  this.$router.push({path:'/'})
                } else{
                  this.$router.push({path:'/SetInfo'})
                }
              }
            })
          }
        })
      }
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
  background: #fff;
}
.cancel{
  height: 1.1733333333333rem;
  border-bottom: 1px solid #d8d8d8;
  line-height:1.1733333333333rem;
}
.cancel span{
  display: inline-block;
  font-size: .4rem;
  color: #999;
  padding: 0 .4rem;
}
.tip{
  margin-top: .66666666666667rem;
  text-align: center;
}
.tip span{
  font-size: .56rem;
  color: #2b2b2b;
  font-family: 'Microsoft YaHei';
}
.msg-button{
  text-align: center;
  box-sizing: border-box;
  padding: 0.53333333333333rem 0.53333333333333rem;
}
.msg-button span{
  display: inline-block;
  width: 100%;
  background:#5b7efb;
  color: #fff;
  font-size: .4rem;
  padding: 15px 0;
  border-radius: 20px;
}
.opacity{
  opacity:.6; 
}
.phone-wrap,.code-wrap{
  text-align: center;
  margin-top: 1.28rem;
  color: #5b7efb;
}
.phone-wrap span{
  height: .4rem;
  line-height: .4rem;
  overflow: hidden;
}
.code-wrap{
  margin-top:.5rem;
}
.phone-wrap span:first-child{
  font-size: 0.34666666666667rem;
  font-family: 'Arial';
  display: inline-block;
  width: 1.3333333333333rem;
  border-bottom: 2px solid #a6a6a6;
  padding-bottom: .32rem;
}
.phone-wrap span:last-child,
.code-wrap span:last-child{
  display: inline-block;
  border:none;
  border-bottom: 2px solid #a6a6a6;
  padding-bottom: .32rem;
  margin-left: 10px;
  width: 7.3333333333333rem;
}
.phone-wrap span input{
  border:none;
  font-size: 0.34666666666667rem;
  width: 100%;
  color: #a6a6a6;
}
.code-wrap span:last-child{
  border-bottom: 2px solid #000;
  width: 4rem;
}
.code-wrap span input{
  margin:0;
  width: 4rem;
  color: #000;
  font-size: .6rem;
  letter-spacing: .2rem;
  text-align: center;
  border:none;
}
.cancel .back{
  float: left;
}
.cancel .back img{
  width: .6rem;
  height: .6rem;
  float: left;
  margin:0.28666666666665rem 0;
  /*display: inline-block;*/
}
.cancel .editPhone{
  padding: 0;
}
.cancel .number{
  font-family: 'Arial';
  font-size: .4rem;
  color: #5b7efb;
  display: inline-block;
  margin: 0 auto;
}
.again{
  text-align: left;
  padding-top: 0;
}
.again span{
  color: #5b7efb;
  background: #fff;
  border:1px solid #5b7efb;
  width: 4.6666666666667rem;
  text-align: center;
  /*padding: 15px;*/
}
.again span i{
  font-style: normal;
}

.fade-enter-active{
  transition: all .5s ease;
  transform: translateX(0);
}
.fade-enter{
  /*opacity: 0.5;*/
  transform: translateX(100%);
}

</style>
