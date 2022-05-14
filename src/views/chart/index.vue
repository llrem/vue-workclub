<template>
  <div class="chart-wrapper">
    <div class="area-1">
      <div id="pie"></div>
    </div>
    <div class="area-2">
      <div id="bar"></div>
    </div>
  </div>
</template>

<script>
  import Date from "@/utils/formatDate";
  import {getProjectsData, getTasksData} from "@/api/chart";

  export default {
    name: "index.vue",
    data(){
      return{
        pieData:[],
        barData:[]
      }
    },
    methods:{
      pieChart(){
        let myChart = this.$echarts.init(document.getElementById('pie'));
        let date = new Date().Format("yyyy-MM-dd")
        let option1 = {
          title: {
            text: '项目',
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
      barChart(){
        let myChart = this.$echarts.init(document.getElementById('bar'));
        let option2 = {
          xAxis: {
            type: 'category',
            data: ['未完成','进行中','已完成','紧急','非常紧急']
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              data: this.barData,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        };
        myChart.setOption(option2);
      }
    },
    mounted(){
      getProjectsData({userId:this.$store.getters.userInfo.id}).then(res=>{
        this.pieData = res.data
        this.pieChart();
      })
      getTasksData({userId:this.$store.getters.userInfo.id}).then(res=>{
        this.barData = res.data
        this.barChart();
      })
    }
  }
</script>

<style lang="scss" scoped>
  .chart-wrapper{
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow: auto;
    background-color: #f0f0f0;
  }
  .area-1{
    width: 500px;
    height: 300px;
    border-radius: 10px;
    float: left;
    background-color: white;
    padding: 30px;
    margin-right: 20px;
    #pie{
      width: 110%;
      height: 100%;
    }
  }
  .area-2{
    width: 420px;
    height: 300px;
    border-radius: 10px;
    float: left;
    background-color: white;
    #bar{
      width: 100%;
      height: 100%;
    }
  }
</style>
