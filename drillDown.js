var drillDown = {
    getOption : function () {
        var option = null;
                option = {
                    title: {
                        text: 'Basic drilldown',
                        left: 'center'
                    },
                    legend: {
                        left: 'left',
                        data: ['category']
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Animals', 'Fruits', 'Cars']
                    },               
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'category',
                            type: 'bar',
                            data: [5,2,4]
                        }
                    ]
                };
                return option;
    },
    initChart : function (myChart,option) {
        myChart.setOption(option);
        myChart.on('click',function(object){
          // 销毁之前的echarts实例
        echarts.dispose(dom);
        // 初始化一个新的实例
        var myChart = echarts.init(dom);
        // object为当前的这个echart对象，大家可以自己打印出来看看
        // console.dir(object);
        // $.ajax(
        //     type : 'get',
        //     url : interfaceUrl + '&category=' + object.name, // 此处可以替换为你的接口地址
        //     dataType : 'json',
        //     success : function (msg){
        //         option.xAxis.data = msg.xAxis;
        //         option.series[0].data = msg.yAxis[0];
        //         myChart.setOption(option, true);
        //     }
        // );
        console.dir(object.name);
        if (object.name == "Animals"){
            option.xAxis.data = [
            'Cats','Dogs','Cows','Sheep','Pigs'
            ];
            option.series[0].data = [
                4,2,1,2,1
            ];
            option.legend.data= ['Animals'];
                        
            option.series[0].name=['Animals'];
        }
        if (object.name == "Fruits"){
            option.xAxis.data = [
            'Apples','Oranges'
            ];
            option.series[0].data = [
                4,2
            ];
            option.legend.data= ['Fruits'];
                        
            option.series[0].name=['Fruits'];
        }
        if (object.name == "Cars"){
            option.xAxis.data = [
            'Toyota','Opel','Volkswagen'
            ];
            option.series[0].data = [
                4,2,2
            ];
            option.legend.data= ['Cars'];             
            option.series[0].name=['Cars'];
        }             
        myChart.setOption(option, true);
    });
  },
};
