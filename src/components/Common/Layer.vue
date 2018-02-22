<template>
<div class="layer-wrap">
  <div class="msg-wrap">
    <div class="info">
      <p class="tip">{{errorInfo.tip}}</p>
      <p class="error">{{errorInfo.error}}</p>
    </div>
    <div class="close" @click="close()">ok</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Layer',
  props:{
    errorInfo:{
      type:Object
    }
  },
  methods: {
    close: function(){
      this.$store.dispatch('setisError',false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layer-wrap{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.8);
}
.msg-wrap{
  width: 6.6666666666667rem;
  height: auto;
  background: #fff;
  margin:4rem auto;
  border-radius: 5px;
  position: relative;
  padding: 0.74666666666667rem;
}
.info{
  width: 100%;
  height: auto;
  margin-bottom: .74666666666667rem;
}
.info .tip,
.info .error{
  font-size: .48rem;
  color: #000;
  text-align: center;
}
.error{
  margin-top:.53333333333333rem;
}
.close{
  width: 5.3333333333333rem;
  height: 1.0666666666667rem;
  background: #5b7efb;
  font-size: .48rem;
  font-family: 'Arial';
  color:#fff;
  line-height: 1.0666666666667rem;
  text-align: center;
  margin:0 auto;
  border-radius: 20px;
}
</style>
