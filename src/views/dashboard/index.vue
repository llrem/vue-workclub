<template>
  <div class="wrapper">
    <div class="content">
      <div class="myTask">

      </div>
      <div class="info">
        <div class="calendar">

        </div>
        <div class="notice">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index.vue"
  }
</script>

<style lang="scss" scoped>
  .wrapper{
    //height: calc(100vh - 50px);
    width: 100%;
    padding: 10px;

    .content{
      width: 100%;
      height:calc(100vh - 70px);

      .myTask{
        width: 70%;
        height: 100%;
        float: left;
        border-radius: 15px;
        background-color: #F0ECE3;
      }
      .info{
        width: 30%;
        height: 100%;
        float: right;
        padding-left: 10px;

        .calendar{
          width: 100%;
          height: 50%;
          border-radius: 15px;
          margin-bottom: 10px;
          background-color:  #F0ECE3;
        }
        .notice{
          width: 100%;
          height: 48% ;
          border-radius: 15px;
          background-color:  #F0ECE3;;
        }
      }
    }
  }
</style>
