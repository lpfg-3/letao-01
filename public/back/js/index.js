$(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart1 = echarts.init($('.echarts_1')[0]);
  var myChart2 = echarts.init($('.echarts_2')[0]);

  // 指定图表的配置项和数据
  var option1 = {
    title: {
      text: '2017年注册人数',
      // subtext: '纯属虚构',
      // x: 'center'
    },

    tooltip : {
      // trigger: 'axis',
      // axisPointer : {            // 坐标轴指示器，坐标轴触发有效
      //     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      // }
  },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    legend: {
      orient: 'vertical',
      left: 'center',
      data: ['人数']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '人数',
      
      data: [999, 1200, 1500, 1880, 700, 1100],
      type: 'bar'
    }]
  };

  var option2 = {
    title: {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪', '新百伦', '特步', '李宁']
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [{
          value: 1335,
          name: '耐克'
        },
        {
          value: 1310,
          name: '阿迪'
        },
        {
          value: 1234,
          name: '新百伦'
        },
        {
          value: 1135,
          name: '特步'
        },
        {
          value: 1548,
          name: '李宁'
        }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option1);
  myChart2.setOption(option2);
})