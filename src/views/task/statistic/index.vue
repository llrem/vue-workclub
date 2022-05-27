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
    <div class="steps">
      <div class="title">
        <label>任务拓扑序列</label>
      </div>
      <el-steps>
        <el-step v-for="(node,index) in nodeData" :key="index" :title="node.name"></el-step>
      </el-steps>
    </div>
    <div class="area-4">
      <div class="title">
        <label>任务拓扑图</label>
      </div>
      <div class="graph">
        <div id="topology"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCardData, getLineData, getPieData, getTopology} from "@/api/statistic";
  import Date from "@/utils/formatDate"

  export default {
    name: "index",
    data(){
      return{
        pieData:[],
        cardData:[],
        nodeData:[],
        linksData:[],
        datesData:[],
        lineData:[],
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
            data: this.datesData
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Email',
              type: 'line',
              data: this.lineData
            }
          ]
        };
        myChart.setOption(option2);
      },
      graph(){
        let myChart = this.$echarts.init(document.getElementById('topology'));
        let option3 = {
          tooltip: {},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              type: 'graph',
              layout: 'none',
              symbolSize: 50,
              roam: true,
              label: {
                show: true
              },
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                fontSize: 20
              },
              data: this.nodeData,
              links: this.linksData,
              lineStyle: {
                opacity: 0.9,
                width: 2,
                curveness: 0
              }
            }
          ]
        };
        myChart.setOption(option3);
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
      getTopology({projectId:this.$store.getters.project.id}).then(res=>{
        this.nodeData = res.data.graphVexNodes
        this.linksData = res.data.graphArcNodes
        this.graph();
      })
      getLineData({projectId:this.$store.getters.project.id}).then(res=>{
        this.datesData = res.data.dates;
        this.lineData = res.data.numbers;
        this.lineChart();
      })
    }
  }
</script>

<style lang="scss" scoped>
  .statistic-wrapper{
    padding-right: 12px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #f0f0f0;
    ::-webkit-scrollbar{
      width: 5px;
      height: 5px;
    }
    ::-webkit-scrollbar-track{
      background-color: white;

    }
    ::-webkit-scrollbar-thumb{
      border-radius: 5px;
      background-color: lightgray;
    }
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
  .area-3,.area-4{
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
    .graph{
      width: 100%;
      height: calc(100% - 40px);
      padding: 0 20px 20px 20px;
    }
    #line,#topology{
      width: 100%;
      height: 100%;
    }
  }
  .steps{
    width: 1184px;
    height: 125px;
    float: left;
    margin: 0 0 0 12px;
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    overflow-x: auto;
    overflow-y: hidden;
    .el-steps{
      padding: 10px 20px 20px 20px;
      color: #333333 !important;
    }
    .el-step{
      width: 150px;
      >>>.el-step__title.is-wait,>>>.el-step__head.is-wait{
        color: darkgrey;
        border-color: darkgrey;
      }
      >>>.el-step__line{
        background-color: darkgrey;
      }
    }
  }
  .title{
    height: 40px;
    width: 100%;
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
