<template>
<div class="hello">
  <div class="menu-wrap" :class="{'showOff':bgFlag}" v-if="pageData[episode]" @touchstart="touchstartHandle($event)" @touchmove="touchmoveHandle($event)">
    <span class="menu-back" @click="back()"><img src="../assets/back3.png"></span>
    <div class="info">
      <p class="title">{{pageData[episode].title}}-第{{pageData[episode].episode}}章</p>
      <p class="author">{{pageData[episode].author}} 著</p>
      <p class="other-chapter"><span v-if="pageData.length>1" class="to-other-chapter" @click="goOther(pageData[0].fkSeriesId)">其他章节  {{episode+1}}/{{pageData.length}}</span> <span>{{pageData[episode].readCount}}</span></p>
      <p class="desc">{{pageData[episode].introduction}}</p>
    </div>
    <div class="next" @click="bgOff()">
      <img src="../assets/nextArrow.png">
    </div>
    <div class="bg">
      <img :src="'http://img.duanshuoapp.com/upload/' +pageData[episode].cover">
      <span></span>
    </div>
  </div>
  <section class="content" :class="{'showOff2':bgFlag}" v-if='pageData[episode]' @click="cancelAutoMode()">
    <header>
      <span class="back" @click="back()"><img src="../assets/back2.png"></span>
      <p>{{pageData[episode].title}}</p>
    </header>
    <ul>
      <li v-for="item in contentData">
        <p :class="{'scene':item.elementCategory==1,'aside':item.elementCategory==2,
        'actor':item.elementCategory==3,'pic':item.elementCategory==4}">
        <span v-if="item.elementCategory==3" class="actorName">{{item.actor}}</span>
        <span v-if="item.elementCategory!=4">{{item.content}}</span>
        <span v-if="item.elementCategory==4"><img :src="item.content"></span>
        </p>
      </li>
    </ul>

    <div class="button-wrap">
      <div class="next-button"  v-if="!isEnd">
        <button @click="showNext()" @touchstart="autoSwitch()" @touchend="cancelAuto()" @touchmove="cancelAuto()" v-if="!autoMode"></button>
        <img src="../assets/play.png" class="play" v-if="autoMode&&pause" @click.stop="playSwitch()">
        <img src="../assets/pause.png" class="pause" v-if="autoMode&&!pause" @click.stop="pauseSwitch()">
      </div>
      <div v-if="isEnd" class="end">End</div>
    </div>    
  </section>
</div>
</template>

<script>
import {get_by_seriesId,get_element,upload_record} from '../store/api.js'
export default {
  name: 'Chapter',
  data () {
    return {
      bgFlag:false,
      pageData:[],
      resData:[],
      contentData:[],
      startY:Number,
      endY:0,
      id:this.$route.params.id,
      episode:this.$route.query.episode?this.$route.query.episode-1:0,
      loading:false,
      page:1,
      size:'',
      isEnd:false,
      autoMode:false,
      pause:false,
      autoTimeOut:'',
      autoTimeInterval:''
      // currentIndex:0
    }
  },
  watch:{
    bgFlag(){
      let _this = this
      let index = 0
      let readLine = ((this.pageData[0].readLine==0||this.pageData[0].readLine==undefined)?1:this.pageData[0].readLine)
      setTimeout( res=>{
        for(;index<readLine;index++){
          _this.contentData.push(_this.resData[index]) 
        }        
      },500)
      _this.loading=true
    }
  },
  computed:{
    currentIndex(){
      return this.contentData.length
    }
  },
  beforeRouteEnter: function(to,from,next){
    // console.log(this.$route.query)
    // console.log(from)
    get_by_seriesId(to.params.id).then(res => {
      next(vm=>{
        vm.$store.dispatch('setisRouteLoading',false)
        vm.pageData = res.result.stories
        vm.size = vm.pageData[0].readLine>15?vm.pageData[0].readLine:15
        let episodeId = vm.pageData[vm.episode].id
        get_element(episodeId,vm.page,vm.size).then(res => {
          console.log(res)
          vm.resData = vm.resData.concat(res.result.storyContent)
        })        
      })
    })
  },
  methods: {
    bgOff: function(){
      this.bgFlag=true
    },
    touchstartHandle:function(e){
      // console.log(e.currentTarget)
      this.startY=e.touches[0].clientY         //第一屏上拉动作捕捉
      this.endY=0
    },
    touchmoveHandle:function(e){
      // console.log(e.touches[0])
      this.endY =this.endY + e.touches[0].clientY - this.startY
      this.startY = e.touches[0].clientY
      // console.log(Math.abs(this.endY))
      if(this.endY<=-150){
        this.bgOff()
      }
    },
    showNext:function(){
      if(this.loading){
        if(this.currentIndex<this.resData.length){
          this.contentData.push(this.resData[this.currentIndex])    //显示下一条数据
        }else{
          this.page++
          get_element(this.pageData[0].id,this.page,this.size).then(res => {
            // console.log(res)
            this.resData = this.resData.concat(res.result.storyContent)
            if (this.contentData.length==this.resData.length) {
              this.isEnd=true
              return
            }
            this.contentData.push(this.resData[this.currentIndex])
          })          
        }        
      }
    },
    back:function(){
      if(this.$store.getters.getisLogin){
        try{
          let data = [{}]
          data[0].fkStoryId=this.resData[0].fkStoryId
          data[0].fkSeriesId=this.pageData[0].fkSeriesId    //返回时上传记录
          data[0].readLine = this.currentIndex
          data[0].chargeTime=''
          data[0].updateTime=this.dateStr(new Date(),'yyyy-MM-dd hh:mm:ss')
          upload_record(data)
           .then(res=>{
            window.history.go(-1)
           })
           .catch(res=>{
            window.history.go(-1)
           })          
        }catch(e){
          window.history.go(-1)
        }        
      } else{
        window.history.go(-1)
      }
    },
    dateStr:function(x,y){
     let z = {
        y: x.getFullYear(),
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
     }
     return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
     })   
    },
    autoSwitch:function(){
      let _this = this
      this.autoTimeOut = setTimeout(()=>{
        _this.autoMode=true
        _this.pause=false
        clearInterval(_this.autoTimeInterval)      //切换为自动播放模式
        _this.showNext() 
        _this.autoTimeInterval = setInterval(()=>{
          _this.showNext()
        },2000)
      },1000)
    },
    cancelAuto:function(){
      if(!this.autoMode){
        clearTimeout(this.autoTimeOut)         //取消进入自动播放模式
      }
    },
    cancelAutoMode:function(){
      clearInterval(this.autoTimeInterval)        //取消自动播放模式
      this.autoMode = false
      this.pause = false      
    },
    playSwitch:function(){
      let _this = this
      _this.pause = false
      _this.showNext()      
      _this.autoTimeInterval = setInterval(()=>{        //开始自动播放
        _this.showNext()
      },2000)      
    },
    pauseSwitch:function(){
      clearInterval(this.autoTimeInterval)        //暂停
      this.pause = true
    },
    goOther:function(id){
      this.$router.push({path:'/SearchRes/ohtherCha',query:{'key':id}})
    }
  },
  updated:function(){
    let item = document.querySelector('.content ul')
    item.scrollTop = item.scrollHeight
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
  position: fixed;
  opacity: .5;
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
.menu-back{
  position: absolute;
  top: 22px; 
  right:22px;
  z-index: 1003;
  display: block;
  width: .6rem;
  height: .6rem;
  background: #5b7efb;
  border-radius: 50%;
  padding: .2rem;
}
.menu-back img{
  width: 100%;
  height: 100%;
}
.hello{
  height: 17.786666666667rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #f6f6f6;
  
}
.menu-wrap{
  width: 100%;
  height: 17.786666666667rem;
  overflow: hidden;
  position: relative;
  z-index: 1002;
  transition: all 1s ease;
}
.menu-wrap .bg{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.9);
  /*background-image: url(http://image.wufazhuce.com/FsMvagZUtXLUuxXJRnzfkxxL0S36);*/
  /*filter: blur(20px);*/
  background-size: cover;
  z-index: 1002;
}
.bg img{
  width: 100%;
  height: 100%;
}
.bg span{
  display: block;
  position: absolute;
  top: 20%;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(transparent, black);
  z-index: 1003;
  /*opacity: .9;*/
}
.info{
  position: absolute;
  z-index: 1003;
  padding: 0 .53333333333333rem;
  bottom: 1.52rem;
  color: #fff;
}
.info .title{
  font-size: .4rem;
}
.info .author{
  font-size: .32rem;
  margin-top: 0.13333333333333rem;
}
.info .other-chapter{
  font-size: .32rem;
  margin-top: .32rem;
  color: #999;
}
.info .other-chapter .to-other-chapter{
  text-decoration:underline;
}
.info .desc{
  font-size: .32rem;
  margin-top: .32rem;
  line-height: 1.5;
}
.next{
  position: absolute;
  width: 100%;
  height: 1.52rem;
  bottom: 0;
  text-align: center;
  line-height: 2rem;
  z-index: 1003;
}
.next>img{
  position: relative;
  width: 0.93333333333333rem;
  height: 0.53333333333333rem;
  display: inline-block;
  animation: next 1.5s ease-out 0s infinite;
}
@keyframes next{
  from{
    opacity: 1;
  }
  to{
    opacity: .5;
    transform: translateY(5px) scale(1.4);
  }
}
.showOff{
  transform: translate(0,-17.786666666667rem);
  opacity: .2;
  /*display: none;*/
}
.showOff2{
  transform: translate(0,-17.786666666667rem);
}
.content{
  transition: all 1s ease;
  height: 17.786666666667rem;
  overflow-y:hidden;

}
.content ul{
  padding: .32rem .32rem;
  list-style: none;
  height: 13.76rem;
  overflow-y:scroll;  
}
.content ul li{
  /*transition: all .5s ease;*/
  opacity: 1;
  color: #757575;
  font-size: 0.34666666666667rem;
  /*background: #fff;*/
  margin-bottom: 0.18666666666667rem;
/*  border-radius: 3px;
  border:1px solid #ddd;*/
}
.content ul li:first-child{
  margin-top: .96666666666667rem;
}
.content ul li p{
  width: 100%;
  height: 100%;
  padding: 0.29333333333333rem 0.26666666666667rem;
  box-sizing: border-box;
  animation: fade 1s ease 0s 1;
}
.content ul li .scene{
  color: #000;
  font-size: .48rem;
  /*margin-top: .66666666666667rem;*/
  padding-left: 0;
}
.content ul li .actor,
.content ul li .aside,
.content ul li .pic{
  border-radius: 3px;
  border:1px solid #ddd;
  background: #fff;
}
.content ul li .actorName{
  display: block;
  color: #b367e9;
  margin-bottom: 0.29333333333333rem;
}
.aside::before{
  content: '●';
  opacity: .5;
  margin-right: 2px;
}
@keyframes fade{
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
.button-wrap{
  width: 100%;
  text-align: center;
  transition:all 1s ease;
  margin-top: .85rem;
}
.button-wrap .next-button{
  display: inline-block;
  height: .8rem;
  width: .8rem;
  border-radius: 50%;
  border:1px solid #ddd;
  background: #fff;
  /*line-height: 1.5rem;*/
  padding: .25rem;
}
.next-button>button,
.next-button .play,
.next-button .pause{
  display: inline-block;
  width: .8rem;
  height: .8rem;
  background: #5b7efb;
  border-radius: 50%;
  border:none;
  -webkit-touch-callout: none;
  -webkit-user-select: none
}
.next-button .pause,
.next-button .play{
  background: none;
  border-radius:0;
}
.next-button>button:active{
  opacity: .8;
}
.end{
  font-size: .6rem;
}
</style>
