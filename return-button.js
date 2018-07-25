var dom = document.getElementById("container");
          var myChart = echarts.init(dom);
          var option = drillDown.getOption();
          drillDown.initChart(myChart,option);
          $('#return-button').on('click',function(){
              var myChart = echarts.init(dom);
              var option = drillDown.getOption();
              drillDown.initChart(myChart,option);
         
 });