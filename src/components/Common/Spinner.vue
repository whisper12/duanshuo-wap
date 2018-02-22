<template>
<div class="loading">
</div>
</template>

<script>
export default {
  name: 'spinner',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading{
  width: 100%;
  height: 4px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1003;  
  background: #27c4f5 -webkit-gradient(linear,left top,right top,from(#27c4f5),color-stop(#a307ba),color-stop(#fd8d32),color-stop(#70c050),to(#27c4f5));
  background: #27c4f5 -webkit-linear-gradient(left,#27c4f5,#a307ba,#fd8d32,#70c050,#27c4f5);
  background: #27c4f5 linear-gradient(to right,#27c4f5,#a307ba,#fd8d32,#70c050,#27c4f5);
  background-size: 500%;
  -webkit-animation: 2s linear infinite barprogress,.3s fadein;
  animation: 2s linear infinite barprogress,.3s fadein;
}
@keyframes barprogress{
  0%{
    background-position:0% 0
    }
  to{
    background-position:125% 0
    }
}
</style>
