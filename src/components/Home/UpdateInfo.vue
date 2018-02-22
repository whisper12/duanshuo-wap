<template>
  <div class="setInfo-wrap">
  <vLayer v-if="isError" :errorInfo="errorInfo"></vLayer>
    <div class="cancel">
      <span class="back" @click="back()"><img src="../../assets/back2.png"></span>
      <span class="save" @click.stop="save()">保存</span>
      <span class="tip">更新个人资料</span>          
    </div>
    <section class="info-wrap">
      <form method="POST" enctype="multipart/form-data;charset=utf-8" action="/ppstory/user/upload_profile"  @submit.prevent="submit" id="info_form" name="info_form">
        <div class="avatar-wrap">
          <input type="file" name="photo" id="photo" accept="image/gif,image/jpeg,image/jpg,image/png" @change="handleFileChange()" ref="inputer">
          <img :src="imgDefault" @click="choseImg()">
        </div>
        <ul>
          <li>
            <input type="text" name="name" placeholder="姓名(少于20个字符)" id="name" v-model="name">
          </li>
          <li>
            <input type="text" name="nickname" placeholder="昵称" id="nickname" v-model="nickname">
          </li>
          <li>
            <input type="text" name="email" placeholder="邮箱" id="email" v-model="email">
          </li>
          <li>
            <textarea type="text" name="sign" placeholder="简介" id="sign" v-model="sign"></textarea>
          </li>                    
        </ul>
      </form>
    </section>
  </div>
</template>

<script>
import Layer from '../Common/Layer'
import imgDefault from '../../assets/default.png'
import {CheckLogin} from '../../mixins/CheckLogin.js'
import {get_profile} from '../../store/api.js'
export default {
  name: 'setInfo',
  mixins:[CheckLogin],
  data () {
    return {
      url:'/ppstory/user/update_userInfo',
      file:'',
      errorInfo:{'tip':'目前无法保存','error':'姓名、昵称以及邮箱必须填写'},
      name:'',
      nickname:'',
      email:'',
      sign:'',
      imgDefault:'',
    }
  },
  components:{
    'vLayer' : Layer
  },
  computed:{
    // profile(){
    //   return this.$store.getters.getuserFile
    // },
    isError(){
      return this.$store.getters.getisError
    },
    emailRight(){
      let email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      return email.test(this.email)
    },
    // imgDefault(){
    //   return 'http://img.duanshuoapp.com/photo/s/'+this.profile.photo
    // },
    // name(){
    //   return this.profile.name
    // },
    // nickname(){
    //   return this.profile.nickname
    // },
    // email(){
    //   return this.profile.email
    // },
    // sign(){
    //   return this.profile.sign
    // }
  },
  watch:{
    // profile(){
    //   return this.$store.getters.getuserFile
    // }    
  },
  mounted:function(){
    let profile = this.$store.getters.getuserFile
    this.name = profile.name
    this.nickname = profile.nickname
    this.email = profile.email
    this.sign = profile.sign
    this.imgDefault = 'http://img.duanshuoapp.com/photo/s/'+ profile.photo
  },
  methods: {
    save:function(){
      // let data = new FormData(document.getElementById('info_form'))
      // alert(this.sign)
      this.$store.dispatch('setisRouteLoading',true)
      let data = 'name='+this.name+'&nickname='+this.nickname+'&email='+this.email+'&sign='+this.sign
      if(this.name&&this.nickname&&this.emailRight){
        let header = {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
        this.$http.post(this.url,data,{'headers':header})
          .then(res => {
            this.$store.dispatch('setisRouteLoading',false)
            if(res.data.retCode==0){
              this.errorInfo={'tip':'保存成功','error':''}
              this.$store.dispatch('setisError',true)
              this.updateFile()
              // this.$router.push({path:'/UserCenter'})
            }else{
              this.errorInfo={'tip':'保存失败','error':'请检查姓名(少于20位)、昵称以及邮箱'}
              this.$store.dispatch('setisError',true)
            }
        })        
      } else{
        this.$store.dispatch('setisError',true)
      }
    },
    choseImg:function(){
      document.getElementById('photo').click()
    },
    handleFileChange:function(){
      this.$store.dispatch('setisRouteLoading',true)
      let inputDOM = this.$refs.inputer
      let _this = this
      _this.file = inputDOM.files[0]
      let file = _this.file
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
          // 创建一个reader
          var reader = new FileReader();
          // 将图片将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            _this.imgDefault = this.result;
            let data = new FormData()
            data.append('photo',file)
            console.log(data)
            return
            _this.axios.post(_this.url,data)
              .then( res=>{
                this.$store.dispatch('setisRouteLoading',false)
                // console.log(res)
              })
          }
      }      
    },
    back: function(){
      // this.$store.dispatch('setuserFile',this.originProfile)
      window.history.go(-1)
    },
    updateFile:function(){
      get_profile()
        .then(res=>{
          if(res.retCode==0){
            this.$store.dispatch('setisLogin',true)
            this.$store.dispatch('setuserFile',res.result)
            // this.profile = res.result
          }
        })      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setInfo-wrap{
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
  background: #5b7efb;
}
.cancel span{
  display: inline-block;
  font-size: .4rem;
  color: #fff;
  padding: 0 .4rem;
}
.cancel .save{
  position: absolute;
  right: 0;
}
.cancel .back{
  height: 1.2rem;
  width: 1.2rem;
  padding: .2rem;
  box-sizing: border-box;  
  position: absolute;
  left: 0;
  top: 0;
}
.cancel .back img{
  width: .8rem;
  height: .8rem;  
}
.info-wrap ul{
  margin: 0 .5rem;
  border:2px solid #f2f2f2;
  border-bottom: none;
  list-style: none;
  box-sizing: border-box;
}
.info-wrap ul li{
  width: 100%;
  height: 1.0666666666667rem;
  line-height: 1.0666666666667rem;
  font-size: .4rem;
  color: #999;
  border-bottom:2px solid #f2f2f2;
  padding: 0 .3rem;
  box-sizing: border-box;
  overflow: hidden;
}
.info-wrap ul li:last-child{
  height: 2.1333333333333rem;
  padding: 2% .3rem;
}
.info-wrap ul li input,
.info-wrap ul li textarea{
  border:none;
  width: 100%;
  height: 100%;
  resize: none;
}
.avatar-wrap{
  height: 5.6rem;
  width: 100%;
  text-align: center;
  padding: 1.4rem 0;
  box-sizing: border-box;
}
#photo{
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  display:none;
}
.avatar-wrap img{
  width: 2.8rem;
  height: 2.8rem;
}
</style>
