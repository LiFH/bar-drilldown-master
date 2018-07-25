Echarts实现柱状图下钻功能
===
[[toc]]
# 需求描述
在一个月份数据柱状图上，点击柱状图上的某一月份后可显示该月每一天的数据。
实现效果如下：

下钻前
![1]($res/1.png)
下钻后
![2]($res/2.png)

# 实现思路
Echarts本身并没有像HighCharts直接实现柱状图的下钻功能，但Echarts可以通过setOptions间接实现下钻功能。
通过点击月份柱状图的某一月，触发点击事件，点击事件的功能是销毁该Echarts实例，并会向后台请求该月份的数据，当后台返回数据后，进行重新初始化Echarts实例。
# 实现细节
## 前端部分
* html代码

```html
<!DOCTYPE html>
<html style="height: 100%">
   <head>
       <meta charset="utf-8">
   </head>
   <body style="height: 100%; margin: 0">
      <div style="margin-left:40%;margin-top:2%">
        <button id='return-button' value=''>返回</button>       
      </div>
      <div id="container" style="height: 50%;width: 50%"></div>
      <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/echarts-all-3.js"></script>
      <script type="text/javascript" src="../jquery.js"></script>
      <script type="text/javascript" src="./drillDown.js"></script>
      <script type="text/javascript" src="./return-button.js"></script>
   </body>
</html>

```
* js代码

```javascript
var drillDown = {
    getOption : function () {
        var option = null;
                option = {
                    title: {
                        text: '柱状图下钻示例',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c}'
                    },
                    legend: {
                        left: 'left',
                        data: ['月数据']
                    },
                    xAxis: {
                        type: 'category',
                        name: 'x',
                        splitLine: {show: false},
                        data: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07', '2016-08', '2016-09']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'log',
                        name: 'y'
                    },
                    series: [
                        {
                            name: '月数据',
                            type: 'bar',
                            data: [1, 2, 4, 8, 16, 32, 64, 128, 256]
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
        // object为当前的这个echart对象
        // console.dir(object);
        // 我们可以看到name属性即为当前点击点的对应月份值，那么我们可以通过这个值去接口查询对应201609月份下的每一天的值.
        // 此处的201609月份数据可以通过接口读取
        // $.ajax(
        //     type : 'get',
        //     url : selectBymonth.do+ '&month=' + object.name,
        //     dataType : 'json',
        //     success : function (msg){
        //         option.xAxis.data = msg.xAxis;
        //         option.series.data = msg.yAxis;
        //         myChart.setOption(option, true);
        //     }
        // );

        // 这里就模拟一个测试数据，做为demo演示
        option.xAxis.data = [
        '2016-09-01','2016-09-02','2016-09-03','2016-09-04','2016-09-05','2016-09-06','2016-09-07','2016-09-08',
        '2016-09-09','2016-09-10','2016-09-11','2016-09-12','2016-09-13','2016-09-14','2016-09-15','2016-09-16',
        '2016-09-17','2016-09-18','2016-09-19','2016-09-20','2016-09-21','2016-09-22','2016-09-23','2016-09-24',
        '2016-09-25','2016-09-26','2016-09-27','2016-09-28','2016-09-29','2016-09-30'
        ];
        option.series.data = [
            3,4,5,6,5,6,7,8,8,9,
            12,13,15,16,20,12,30,21,22,29,
            30,31,33,34,35,36,20,29,33,40
        ];
        myChart.setOption(option, true);
    });
  },
};
```



## 后端接口
```javascript
    @RequestMapping("selectBymonth.do")
    @ResponseBody
    public ServerResponse addCategory(HttpSession session,String month){
		Map<String, Object>  map  =  new HashMap<>(); 
		ResultBean result = onSelectByMonth(month); 
		out.println("result==>"  + result); 
		map.put("xAxis", result.day()); 			   				
		map.put("yAxis", result.value()); 
		return map;
        }
    }
```
*这里没有具体实现全部代码，而是使用简单的伪代码描述了后台接口实现思路。

# 总结
* 以上简要叙述了需求以及实现的基本思想。
* 使用静态数据实现了一个样例，具体实现还要后端接口的配合，这里介绍了接口的设计思想
* 以上内容参考了折线图下钻功能的实现https://github.com/phping1/echarts3-line-drilldown
<<<<<<< HEAD
=======

>>>>>>> 773ede8150cf65ee55a4ac1e0d373151f1c06b5d
* 查看本项目可访问https://github.com/LiFH/bar-drilldown-master.git




