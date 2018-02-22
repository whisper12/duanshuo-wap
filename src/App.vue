<template>
  <div id="app">
    <spinner v-if="isRouteLoading"></spinner>
    <keep-alive exclude ="Chapter,SearchRes">
      <router-view v-if="loading"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {get_profile} from './store/api.js'
import spinner from './components/Common/Spinner'
export default {
  name: 'app',
  components: {
    spinner
  },
  data(){
    return{
      loading:false
    }
  },
  computed:{
    isRouteLoading(){
      return this.$store.getters.getisRouteLoading
    }
  },
  watch:{
    isRouteLoading(){
      return this.$store.getters.getisRouteLoading
    }
  },
  mounted:function(){
    get_profile()
    .then(res=>{
      if(res.retCode==0){
        this.$store.dispatch('setisLogin',true)
        this.$store.dispatch('setuserFile',res.result)
        this.profile = res.result
      }
      this.loading=true
    })
    .catch( error=>{
      console.log(error)
      this.loading=true
    })     
  }
}
</script>

<style>
@charset "UTF-8";
body{
  /*background-color: #f6f6f6;*/
  margin:0;
}
 h1, h2, h3, h4, h5, h6, p,hr, blockquote, dl, dt, dd, ul, ol, li, pre, figcaption, figure, fieldset, legend, button, input, textarea, th, td {
  margin: 0;
  padding: 0; }

body, button, input, select, textarea {
  font: 12px/1 Lucida Grande, 'Microsoft YaHei', "Lucida Grande", "Lucida Sans Unicode", Helvetica, Arial, Verdana, sans-serif;
}
#app{
  overflow: hidden;
}
.flexbox {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
}
</style>
