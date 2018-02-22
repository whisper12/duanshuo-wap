<template>
<div>
  <header>
    <span class="back" @click="back()"><img src="../../assets/back.png"></span>
    <span class="set">
      <router-link to="Set"><img src="../../assets/set.png"></router-link>
    </span>
  </header>
  <section class="user-info" v-if="profile">
    <div class="user-name">
      <p class="nick">{{profile.nickname}}</p>
      <p class="name">{{profile.name}}</p>
      <p><span class="fan">粉丝 <i>20</i></span>  <span class="subscribe">关注 <i>5</i></span></p>
    </div>
    <div class="avatar">
      <img :src="'http://img.duanshuoapp.com/photo/s/'+ profile.photo">
    </div>
  </section>
<!--   <section class="my-story">
    <p class="title">我的故事</p>
    <div class="content flexbox">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </section> -->
  <section class="reading">
    <p class="title">当前阅读</p>
    <div class="content flexbox" v-if="profile">
      <div v-if="profile.recordCover.length>=1">
        <img :src="'http://img.duanshuoapp.com/upload/'+profile.recordCover[0]">
      </div>
      <div v-if="profile.recordCover.length>=2">
        <img :src="'http://img.duanshuoapp.com/upload/'+profile.recordCover[1]">
      </div>
      <div v-if="profile.recordCover.length>=2">
        <img :src="'http://img.duanshuoapp.com/upload/'+profile.recordCover[2]" v-if="profile.recordCover.length>=3">
      </div>
    </div>
  </section>
  <section class="collect"></section>
</div>
</template>

<script>
import {CheckLogin} from '../../mixins/CheckLogin.js'
import {get_profile} from '../../store/api.js'
export default {
  name: 'UserCenter',
  mixins:[CheckLogin],
  data () {
    return {
      bgFlag:false
    }
  },
  // beforeRouteEnter(to,from,next){
  //   console.log('路由切换前')
  //   setTimeout(()=>{       //数据请求后再切换路由
  //     next()
  //   },5000)
  // },
  methods: {
    back: function(){
      this.$router.push({path:'/'})
    }
  },
  computed:{
    profile(){
      return this.$store.getters.getuserFile
    }
  },
  watch:{
    profile(){
      return this.profile
    }
  },
  mounted:function(){
    this.axios.get('/ppstory/mystory/series_list')
    .then(res=>{
      console.log(res)
    })
    this.axios.get('/ppstory/mystory/story_list?seriesId=177')
    .then(res=>{
      console.log(res)
    })
    this.$store.dispatch('setisRouteLoading',false)
    if (!this.profile) {
      get_profile().then(res=>{
        if(res.retCode==0){
          this.$store.dispatch('setisLogin',true)
          this.$store.dispatch('setuserFile',res.result)
        }
      }) 
    }   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
  width: 100%;
  height: 1.2rem;
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
.set{
  float:right;
}
.user-info{
  width: 100%;
  height: 3.0666666666667rem;
  padding: 0 .4rem;
  box-sizing: border-box;
}
.user-name{
  /*overflow-x: hidden;*/
  max-width: 4rem;
}
.user-name .nick,
.user-name .name{
  max-width: 4rem;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user-name .nick{
  color: #000;
  font-size: .32rem;
  margin-bottom: .18666666666667rem;
  margin-top: .56rem;
}
.user-name .name{
  font-size: .53333333333333rem;
  margin-bottom:.72rem;
  font-weight: bold;
}
.user-name .subscribe,
.user-name .fan{
  font-size: .32rem;
  color: #666;
}
.user-name .subscribe i,
.user-name .fan i{
  font-size: .4rem;
  font-style: normal;
  font-family: Arial;
}
.user-name .subscribe{
  margin-left: .72rem;
}
.user-name{
  display: inline-block;
}
.avatar{
  float: right;
  margin-top: .4rem;
}
.avatar img{
  display: inline-block;
  width: 2.4533333333333rem;
  height: 2.4533333333333rem;
  border-radius: 100%;
  border:1px solid #999;
}
.my-story,
.reading{
  margin-top: .4rem;
  padding: 0 .4rem;
}
.my-story .title,
.reading .title{
  font-size: .32rem;
  color: #999;
}
.my-story .content,
.reading .content{
  margin-top: 0.26666666666667rem;
  height: 3.8666666666667rem;
  /*width: 100%;*/
  width: 9.2rem;
  background-color: #DDD;
  border-radius: 4px;
  overflow: hidden;
}
.content>div{
  /*width: 33.33333333%;*/
  flex: 1;
  height: 100%;
  /*background-color: blue;*/
  box-sizing: border-box;
  /*float: left;*/
  border-right:1px solid #f5f5f5;
  /*position: relative;*/
} 
.content>div:last-child{
  border-right: none;
}
.content div img{
  width: 100%;
  height: 100%;
  display: block;
}
</style>
