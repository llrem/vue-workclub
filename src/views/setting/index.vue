<template>
  <div class="home">
    <div class="inner">
    </div>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>
  .home{
    width: 500px;
    height: 300px;
    background-color: aqua;
    box-sizing: border-box;
  }
  .inner{
    width: 400px;
    height: 200px;
    /* 为什么这里上方的margin会溢出父元素？？？？？？ */
    margin: 20px;
    box-sizing: border-box;
    background-color: #08667d;
  }
</style>
