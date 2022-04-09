<template>
  <div class="statistic-wrapper">
    <div class="area-1">
      <div class="title">
        <label>任务完成情况</label>
      </div>
      <div class="chart">
        <div id="pie"></div>
      </div>
    </div>
    <div class="area-2">
      <div class="card" v-for="(card,index) in cardData" :key="index">
        <div class="card-title">{{card.name}}</div>
        <div class="number">{{card.value}}</div>
        <el-progress :percentage="card.percentage" :color="card.color"></el-progress>
      </div>
    </div>
    <div class="area-3">
      <div class="title">
        <label>燃尽图</label>
      </div>
      <div class="chart">
        <div id="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCardData, getPieData} from "@/api/statistic";
  import Date from "@/utils/formatDate"

  export default {
    name: "index",
    data(){
      return{
        pieData:[],
        cardData:[],
        lineData:[]
      }
    },
    methods:{
      pieChart(){
        let myChart = this.$echarts.init(document.getElementById('pie'));
        let date = new Date().Format("yyyy-MM-dd")
        let option1 = {
          title: {
            text: '任务类别',
            subtext: date,
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: this.pieData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        myChart.setOption(option1);
      },
      lineChart(){
        let myChart = this.$echarts.init(document.getElementById('line'));
        let option2 = {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14','15']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Email',
              type: 'line',
              data: [15,15,15,14,14,12,11,10,9,9,9,7,5,5,5]
            },
            {
              name: 'Union Ads',
              type: 'line',
              data: [15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]
            },
          ]
        };
        myChart.setOption(option2);
      }
    },
    mounted(){
      getPieData({projectId:this.$store.getters.project.id}).then(res=>{
        this.pieData = res.data
        this.pieChart();
      })
      getCardData({projectId:this.$store.getters.project.id}).then(res=>{
        this.cardData = res.data
      })
      this.lineChart();
    },

  }
</script>

<style lang="scss" scoped>
  .statistic-wrapper{
    padding-right: 12px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #f0f0f0;
  }
  .area-1{
    width: 586px;
    margin: 12px 0 0 12px;
    height: 330px;
    border-radius: 10px;
    float: left;
    background-color: white;
    .chart{
      width: 100%;
      height: 100%;
      padding: 10px 30px;
    }
    #pie{
      width: 110%;
      height: 100%;
    }
  }
  .area-2{
    width: 586px;
    margin: 12px 0 0 12px;
    height: 330px;
    border-radius: 10px;
    float: left;
    background-color: white;
    padding: 20px 38px;
    .card{
      width: 150px;
      height: 75px;
      float: left;
      margin: 10px;
      //background-color: #4CAF50;
    }
    .card-title{
      font-size: 13px;
      color: #606266;
    }
    .number{
      font-size: 35px;
      margin-top: 3px;
    }
  }
  .area-3{
    width: 1184px;
    margin: 12px 0 12px 12px;
    height: 493px;
    border-radius: 10px;
    float: left;
    background-color: white;
    .chart{
      width: 100%;
      height: calc(100% - 40px);
      padding:0 80px;
    }
    #line{
      width: 100%;
      height: 100%;
    }
  }
  .title{
    height: 40px;
    padding: 10px 15px;
    color: grey;
  }
</style>
<style lang="scss">
  .area-2{
    .el-progress{
      line-height: 0;
    }
    .el-progress-bar__outer{
      height: 4px !important;
    }
    .el-progress__text{
      font-size: 13px !important;
    }
  }
</style>
