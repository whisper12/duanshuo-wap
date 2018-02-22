<template>
  <div class="menu-wrap">
      <div class="bg" @click.stop="menuOff()"></div>
      <ul class="sort">
        <li v-for="item in category">
          <span @click.stop="reRender($event)" :data-type="item.id">{{item.name}}</span>
        </li>
        <li><router-link :to="{name:'Search'}">搜索</router-link></li>
        <li><router-link :to="{name:'Search'}">隐私</router-link></li>
      </ul>
  </div>
</template>

<script>
import {get_category} from '../store/api.js'
export default {
  name: 'menu',
  data () {
    return {
    }
  },
  computed:{
    category(){
      return this.$store.getters.getcategory
    }
  },
  mounted:function(){
    if(!this.category){
      get_category().then(res => {
        this.$store.dispatch('setcategory',res.result.category)
      })
    }
  },
  methods: {
    menuOff: function(){
      this.$store.dispatch('setmenuFlag',false)
    },
    reRender: function(e){
      let _type=e.currentTarget.getAttribute('data-type')
      this.$store.dispatch('setcurrentType',_type)
      this.menuOff()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu-wrap{
  width: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 1003;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
.menu-wrap .bg{
  position: absolute;
  top: -55px;
  left: -55px;
  right: -55px;
  bottom: -55px;
  background-color: rgba(0,0,0,.9);
  background-image: url(http://image.wufazhuce.com/FsMvagZUtXLUuxXJRnzfkxxL0S36);
  filter: blur(20px);
  background-size: cover;
  z-index: 1003;
}
.sort{
  position: relative;
  z-index: 1003;
  top: .4rem;
  left: .4rem;
  font-style: none;
  width: 3rem;
}
.sort li{
  font-size: .48rem;
  color: #fff;
  font-style: italic;
  list-style: none;
  margin-top: 2px;
  /*width: 1.6533333333333rem;*/
  width: auto;
  height: 0.93333333333333rem;
  line-height: 0.93333333333333rem;
  text-align: left;
  font-weight: bold;
  /*border-radius: 3px;*/
}
.sort li span{
  /*background: #57fdcb;*/
  display: inline-block;
  height: 100%;
  padding:0 10px;
  border-radius:3px;
}
.sort li a{
  text-decoration: none;
  color: #fff;
}
.sort li:nth-child(1) span{
  background: #81a1ff;
  animation: showup .35s ease-out 0s 1;
}
.sort li:nth-child(2) span{
  background: #fc3a90;
  animation: showup .4s ease-out 0s 1;
}
.sort li:nth-child(3) span{
  background: #fefe9e;
  color: #000;
  animation: showup .45s ease-out 0s 1;
}
.sort li:nth-child(4) span{
  /*width: 2.5066666666667rem;*/
  background: #e80c18;
  color: #000;
  animation: showup .5s ease-out 0s 1;
}
.sort li:nth-child(5) span{
  /*width: 2.5066666666667rem;*/
  background: #57fdcb;
  color: #000;
  animation: showup .55s ease-out 0s 1;
}
.sort li:nth-child(6) span{
  background: #4983ab;
  animation: showup .6s ease-out 0s 1;
}
.sort li:nth-child(7) span{
  /*width: 2.0533333333333rem;*/
  background: #2afd7a;
  color: #000;
  animation: showup .65s ease-out 0s 1;
}
.sort li:nth-child(8) span{
  background: #b638fb;
  animation: showup .7s ease-out 0s 1;
}
.sort li:nth-child(9){
  padding: 0 10px;
  font-style: normal;
  font-weight: normal;
  animation: showup .75s ease-out 0s 1;
  margin-top: 15px;
}
.sort li:nth-child(10){
  padding: 0 10px;
  font-style: normal;
  font-weight: normal;
  animation: showup .8s ease-out 0s 1;
}
@keyframes showup{
  from{
    transform: translate(-1rem,0);
  }
  to{
    transform: translate(0,0);
  }
}
</style>
