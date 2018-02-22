<template>
  <div class="hello" ref="container">
    <vmenu v-if="menuFlag"></vmenu>
    <div class="menu" @click="menuSwich()">
      <img src="../assets/avatar.png">
    </div>
    <div class="user" @click="goUser()">
      <img :src="'http://img.duanshuoapp.com/photo/s/'+ profile.photo" v-if="profile.photo">
      <img src="http://img.duanshuoapp.com/photo/s/2017/07/1000000003.jpg" v-if="!profile.photo">
    </div>
    <img src="http://image.wufazhuce.com/FsMvagZUtXLUuxXJRnzfkxxL0S36" style="width:0;height:0;position:absolute">
    <section class="item-wrap"  v-for="(item,index) in pageData">
      <div class="item-block flexbox" v-if='index%2==0'>
        <div class="item-right" v-if="item[0]">
          <div @click="goToChapter(item[0].id)">
            <div class="bg-cover"></div>
            <img :src="'http://img.duanshuoapp.com/upload/'+item[0].cover">
            <p class="title">{{item[0].title}}</p>
            <p class="author">{{item[0].author}} 著</p>
          </div>  
        </div>

        <div class="item-left">
            <div class="item-top" v-if="item[1]">
              <div @click="goToChapter(item[1].id)">
                <div class="bg-cover"></div>
                <img :src="'http://img.duanshuoapp.com/upload/' + item[1].cover">
                <p class="title">{{item[1].title}}</p>
                <p class="author">{{item[1].author}} 著</p>
              </div>  
            </div>
            <div class="item-bottom" v-if="item[2]">
              <div @click="goToChapter(item[2].id)">
                <div class="bg-cover"></div>
                <img :src="'http://img.duanshuoapp.com/upload/'+item[2].cover">
                <p class="title">{{item[2].title}}</p>
                <p class="author">{{item[2].author}} 著</p> 
              </div>             
            </div>
        </div>
      </div>

      <div class="item-block flexbox" v-if='index%2==1'>
        <div class="item-left">
            <div class="item-top"  v-if="item[0]">
              <div @click="goToChapter(item[0].id)">
                <div class="bg-cover"></div>
                <img :src="'http://img.duanshuoapp.com/upload/'+item[0].cover">
                <p class="title">{{item[0].title}}</p>
                <p class="author">{{item[0].author}} 著</p>  
              </div>          
            </div>
            <div class="item-bottom" v-if="item[1]">
              <div @click="goToChapter(item[1].id)">
                <div class="bg-cover"></div>
                <img :src="'http://img.duanshuoapp.com/upload/'+item[1].cover">
                <p class="title">{{item[1].title}}</p>
                <p class="author">{{item[1].author}} 著</p> 
              </div>             
            </div>
        </div>

        <div class="item-right" style="border-right:0;border-left:1px solid #999"  v-if="item[2]">
          <div  @click="goToChapter(item[2].id)">
            <div class="bg-cover"></div>
            <img :src="'http://img.duanshuoapp.com/upload/'+item[2].cover">
            <p class="title">{{item[2].title}}</p>
            <p class="author">{{item[2].author}} 著</p>          
          </div>
        </div>        
      </div>
    </section>

    <div style="text-align:center;padding:.3rem 0;color:#fff;font-size:.4rem;" v-if="loadComplete">已经加载所有短说</div>
  </div>
</template>

<script>
import menu from './Menu'
// import spinner from './Common/Spinner'
// import Nav from './Navigator'
import {get_home,get_series_by_category} from '../store/api.js'
export default {
  name: 'index',
  data () {
    return {
      profile: this.$store.getters.getuserFile,
      page:1,
      size:12,
      originData:[],
      timeRun:'',
      loadComplete:false,
    }
  },
  components: {
    'vmenu': menu,
  },
  computed: {
    currentType() {
      return this.$store.getters.getcurrentType
    },    
    menuFlag() {
      return this.$store.getters.getmenuFlag
    },
    pageData() {
      let data = this.originData
      let res = []
      for(let i=0,k=data.length;i<k;i+=3){
        res.push(data.slice(i,i+3))
      }
      return res
    }
  },
  watch:{
    currentType(){
      this.$store.dispatch('setisRouteLoading',true)
      clearTimeout(this.timeRun)
      this.page=1
      if(this.currentType==1){
        get_home(1,this.size).then(res => {
          this.originData = res.result.homeStory
          this.$store.dispatch('setisRouteLoading',false)
        })
      }else{
        get_series_by_category(this.currentType,1,this.size).then(res => {
          this.originData = res.result.series
          this.$store.dispatch('setisRouteLoading',false)
        })
      }
      this.loadComplete=false
      window.addEventListener('scroll',this.getNextPage)
      return this.currentType
    }
  },
  mounted:function(){
    this.$store.dispatch('setisRouteLoading',true)
    get_home(this.page,this.size).then(res => {
      this.originData = res.result.homeStory
      this.$store.dispatch('setisRouteLoading',false)
    })
  },
  methods: {
    menuSwich: function () {
      this.$store.dispatch('setmenuFlag',true)
    },
    goToChapter: function(id){
      this.$store.dispatch('setisRouteLoading',true)
      this.$router.push({path:'/Chapter/'+ id})
    },
    goUser: function(){
      let isLogin = this.$store.getters.getisLogin
      if(isLogin){
        this.$router.push({path:'/UserCenter'})
      }else{
        this.$router.push({path:'/Navigator'})
      }
    },
    getNextPage:function(){
      let _this = this
      if(window.innerHeight + document.body.scrollTop >= (document.body.offsetHeight-50)){
          clearTimeout(_this.timeRun)
          if(!_this.$store.getters.getisRouteLoading){_this.$store.dispatch('setisRouteLoading',true)}
          _this.timeRun = setTimeout(function() {
          // _this.$store.dispatch('setisRouteLoading',true)
          if (_this.originData.length!=0) {
            if(_this.currentType==1){
              get_home(++_this.page,_this.size).then(res => {
                _this.$store.dispatch('setisRouteLoading',false)
                if(res.result.homeStory.length==0){
                  window.removeEventListener('scroll',_this.getNextPage)
                  _this.loadComplete = true
                }
                _this.originData = _this.originData.concat(res.result.homeStory)
              })
            }else{
              get_series_by_category(_this.currentType,++_this.page,_this.size).then(res => {
                _this.$store.dispatch('setisRouteLoading',false)
                if(res.result.series.length==0){
                  window.removeEventListener('scroll',_this.getNextPage)
                  _this.loadComplete = true
                }
                _this.originData = _this.originData.concat(res.result.series)              
              })            
            }                
          }         
        }, 1000);    
      }
    }
  },
  beforeRouteLeave:function(to,from,next){                 //应该绑定在组件下而不是window
    window.removeEventListener('scroll',this.getNextPage)  //离开路由取消滚动加载  
    next()
  },
  beforeRouteEnter:function(to,from,next){
    next( vm=>{
      window.addEventListener('scroll',vm.getNextPage)  //进入路由重新绑定
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  min-height: 17.786666666667rem;
  background: #999;
}
.item-wrap{
  width: 100%;
  box-sizing: border-box;
}
.menu,
.user{
  width: .933333333rem;
  height: .933333333rem;
  padding: .2rem;
  background-color: transparent;
  border-radius: 50%;
  position: fixed;
  z-index: 1002;
}
.user{
  bottom: 0.29333333333333rem;
  right: 0.29333333333333rem;
}
.menu{
  top: 0.29333333333333rem;
  left: 0.29333333333333rem;  
}
.user img,
.menu img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.item-block,
.item-left{
  box-sizing: border-box;
}
.item-block{
  border-bottom: 1px solid #999;
}
.item-block img{
  width: 100%;
  height: 100%;
  transition: all .5s;
}
.item-block img:hover,
.item-block img:active{
  transform: scale(1.1);
}
.item-block .item-right{
  /*background-color: #000;*/
  /*width: 6.64rem;*/
  flex: 1;
  height: 8.8266666666667rem;
  border-right: 1px solid #999;
}
.item-block .item-left{
  /*background-color: blue;*/
  width: 3.33333333rem;
  /*height: 8.8266666666667rem;*/
}
.item-top{
  width: 100%;
  height: 4.4rem;
  border-bottom: 1px solid #999;
}
.item-bottom{
  width: 100%;
  height: 4.4rem;
  background-color: #fff;
}
.item-right,
.item-left,
.item-top,
.item-bottom{
  position: relative;
  overflow: hidden;
}
.title,
.author{
  position: absolute;
  color: #fff;
  left: 10px;
}
.title{
  font-size: .4rem;
  bottom: .96rem;
}
.author{
  font-size: .32rem;
  bottom: .26666666666667rem;
}
.bg-cover{
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(transparent 40%, black);
  width: 100%;
  height: 100%;
}
.item-top>div,
.item-bottom>div,
.item-right>div{
  height: 100%;
}
</style>
