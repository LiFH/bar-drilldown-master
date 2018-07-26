@RequestMapping("selectBycategory.do")
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