<template>
<div>
  <header class="flexbox">
    <span class="back" @click="back()"><img src="../assets/back.png"></span>
      <div class="search-box">
        <form action="javascript:;">
          <input  type="search" placeholder="搜索" @keyup.enter="getResult(keyword)" ref="inputer" v-model="keyword">
        </form>
      </div>
    <span class="search" @click="getResult(keyword)"><img src="../assets/search.png"></span>
  </header>
  <section class="hot-story">
    <p class="title">热门故事</p>
    <ul class="content">
      <li class="flexbox" v-for="item in pageData" @click="goToChapter(item.fkSeriesId,item.episode)">
        <div class="pic">
          <img :src="'http://img.duanshuoapp.com/upload/'+item.cover">
        </div>
        <div class="info">
          <p>第{{item.episode}}章</p>
          <p>{{item.title}}</p>
          <p>{{item.author}}</p>
        </div>
      </li>           
    </ul>
  </section>
  <section class="hot-author">
    <p class="title">热门作者</p>
    <ul>
      <li v-for="item in pageData">{{item.author}}</li>
    </ul>
  </section>

</div>
</template>

<script>
import {hot_story} from '../store/api.js'
export default {
  name: 'Search',
  data () {
    return {
      bgFlag:false,
      pageData:[],
      keyword:''
    }
  },
  mounted:function(){
    hot_story()
      .then( (res)=>{
        this.pageData = res.result.hotStory
        console.log(this.pageData)
      })
  },
  methods: {
    back: function(){
      this.$router.push({path:'/'})
    },
    goToChapter: function(id,episode){
      this.$store.dispatch('setisRouteLoading',true)
      this.$router.push({path:'/Chapter/'+ id +'?episode='+episode})
    },
    getResult:function(key){
      if(!this.keyword){
        this.$refs.inputer.focus()
        return
      }
      this.$store.dispatch('setisRouteLoading',true)
      this.$router.push({path:'/SearchRes/search',query:{'key':key}})
    }   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header{
  width: 100%;
  height: 1.2rem;
  padding: 0 .2rem 0 .2rem;
}
header span{
  display: inline-block;
  height: 1.2rem;
  width: 1.2rem;
  padding: .2rem;
  box-sizing: border-box;
  /*background-size: cover;*/
  img{
    width: .8rem;
    height: .8rem;
  }
}

header .search-box{
  width: 7.2rem;
  height: .88rem;
  margin-top: .22666666666667rem;
  background-color: #f3f3f3;
}
.search-box input{
  width: 100%;
  height: .88rem;
  padding-left: .4rem;
  -webkit-appearance: none;
  border: 0;
  background-color: transparent;
  font-size: .4rem;
  color: #c0c0c0;
}
.hot-story,
.hot-author{
  padding: 0 .4rem;
  margin-top: .53333333333333rem;
}
.hot-author{
  margin-top: .66666666666667rem;
}
.title{
  font-size: .53333333333333rem;
  color: #b1b1b1;
}
.content,
.hot-author ul{
  margin-top: .4rem;
  list-style:none;
}
.hot-author ul li{
  margin-top: .53333333333333rem;
  font-size: .53333333333333rem;
  text-align:center;
  font-weight: bold;
}
.hot-author ul li:first-child{
  margin-top: 0;
}
.content li{
  height: 1.9866666666667rem;
  overflow: hidden;
  margin-top: .26666666666667rem;
}
.content li .pic{
  width: 1.44rem;
  height: 100%;
}
.pic img{
  width: 100%;
  height: 100%;
}
.content li .info{
  height: 100%;
  width: auto;
  margin-left:.34666666666667rem;
}
.info  p{
  max-width: 5rem;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info p:nth-child(1){
  margin-top: .22666666666667rem;
  color: #333;
  font-size: .32rem;
}
.info p:nth-child(2){
  margin-top: .18666666666667rem;
  color: #000;
  font-size: .53333333333333rem;
  font-weight: bold; 
}
.info p:nth-child(3){
  margin-top: .18666666666667rem;
  color: #999;
  font-size: .32rem;
}
</style>
