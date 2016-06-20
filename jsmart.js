// jsmart lib;
// 1.0.0

var jsmart={};


/**
 * 为字符串增加千分位
 * @param  {String} str 参数字符串
 * @return {String}
 */
jsmart.comdify=function(str)
{
  str = str.substring(0, 10);                 
  var re=/\d{1,3}(?=(\d{3})+$)/g;      
  var n1=str.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
  return n1;
}

/**
 * 数组去重 
 * @param  {Array} arr 参数字符串
 * @return {Araay}    
 */
 jsmart.arrUnique=function(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

/**
 * 数组元素随机排列
 * @param  {Array} arr  等待排序的数组
 * @return {[type]}     [description]
 */
jsmart.shuffle=function(arr){
  var len = arr.length;
  for(var i = 0; i < len - 1; i++){
    var idx = Math.floor(Math.random() * (len - i));
    var temp = arr[idx];
    arr[idx] = arr[len - i - 1];
    arr[len - i -1] = temp;
  }
  return arr;
}

/**
 * 将字符串内的全角符号转换成半角符号 
 * @param  {String} str 字符串
 * @return {String}    
 */
 jsmart.toSBC=function(str){
    var result = "";
    var len = str.length;
    for(var i=0;i<len;i++)
    {
        var cCode = str.charCodeAt(i);
        //全角与半角相差（除空格外）：65248（十进制）
        cCode = (cCode>=0xFF01 && cCode<=0xFF5E)?(cCode - 65248) : cCode;
        //处理空格
        cCode = (cCode==0x03000)?0x0020:cCode;
        result += String.fromCharCode(cCode);
    }
    return result;
}

/**
 * 将字符串中的单词首字母转大写
 * @param  {String} str 字符串
 * @return {String}    
 */
 jsmart.titleCase=function(str) {
     return str.replace(/\w\S*/g, function(word){ 
             return word.charAt(0).toUpperCase()+word.substr(1).toLowerCase();
     });
 }

/**
 * 获取url字符串中传递的参数
 * @param  {String} name 参数值
 * @return {String}      [description]
 */
 jsmart.getUrlParam=function(name) {

   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");

   var r = window.location.search.substr(1).match(reg);

   if (r!=null) return unescape(r[2]); return null;

}
/**
 * 判断字符串是不是整数(从0开始的整数)
 * @param  {String} name 参数值
 * @return {bool}      
 */
 jsmart.isInteger=function(str){
   return /^\+?\d+$/.test(str);
}

/**
 * 利用正则判断字符串是否存在子串  不区分大小写
 * @param  {String} subStr  子串
 * @param  {String} str     父串
 * @return {Bool}   
 */
jsmart.coverString=function(subStr,str){
   var reg = eval("/"+subStr+"/ig");
   return reg.test(str);
}

/**
 * 利用递归实现阶乘
 * @param  {Number} num 一个整数
 * @return {Number}      
 */
 jsmart.factorial=function (num) {
    if (num < 0) {       
        return -1;
    } else if (num === 0 || num === 1) {      
         return 1;
    } else {        
      return (num * factorial(num - 1));
    }
}

/**
 * 合并表格中相同内容的单元格
 * @param {[type]} tableId  [description]
 * @param {[type]} startRow [description]
 * @param {[type]} endRow   [description]
 * @param {[type]} col      [description]
 */
jsmart.MergeCell=function(tableId, startRow, endRow, col) {  
    var tb = document.getElementById(tableId);  
    if (col >= tb.rows[0].cells.length) {  
        return;  
    }  
    //当检查第0列时检查所有行  
    if (col == 0) {  
        endRow = tb.rows.length - 1;  
    }  
    for (var i = startRow; i < endRow; i++) {  
        //subCol:已经合并了多少列  
        var subCol = tb.rows[0].cells.length - tb.rows[startRow].cells.length;  
        //程序是自左向右合并，所以下一行一直取第0列  
        if (tb.rows[startRow].cells[col - subCol].innerHTML == tb.rows[i + 1].cells[0].innerHTML) {  
            //如果相同则删除下一行的第0列单元格  
            tb.rows[i + 1].removeChild(tb.rows[i + 1].cells[0]);  
            //更新rowSpan属性  
            tb.rows[startRow].cells[col - subCol].rowSpan = (tb.rows[startRow].cells[col - subCol].rowSpan | 0) + 1;  
            //当循环到终止行前一行并且起始行和终止行不相同时递归(因为上面的代码已经检查了i+1行，所以此处只到endRow-1)  
            if (i == endRow - 1 && startRow != endRow) {  
                MergeCell(tableId, startRow, endRow, col + 1);  
            }  
        } else {  
            //起始行，终止行不变，检查下一列  
            MergeCell(tableId, startRow, i, col + 1);  
            //增加起始行  
            startRow = i + 1;  
        }  
    }  
}  

/**
 * 合并横向的单元格 空白的单元格和有内容的单元格合并  可以指定合并的列
 * @param {[type]} tableId   [description]
 * @param {[type]} startRCol 开始合并的列
 * @param {[type]} endCol    结束合并的列
 * 
 */
jsmart.MergeColCell=function(tableId,startCol,endCol){
   var trs=$('#'+tableId).find('tr');
   for (var i = 0; i < trs.length; i++) {
       var tr=trs.eq(i);
       var tds=$(tr).find('td');
       var tdCol=tds.eq(startCol);
       var col=1;
       for (var j = startCol; j <= endCol; j++) {
           var td=tds.eq(j);
           if(td.text()==''){
              tdCol.attr('colspan',++col );
              td.remove();
           }else{
              tdCol=tds.eq(j);
              col=1;
           }
       }
   }

}
/**
 * 判断一个对象是否为一个空对象
 * @param  {object}  e 对象名
 * @return {Boolean}   [description]
 */
jsmart.isEmptyObject=function(e){
  var t;  
  for (t in e)  
      return !1;  
  return !0  
}

/**
 * 返回顶部
 * @return {[type]} [description]
 */
jsmart.backTop=function(){
   window.scrollTo(0,0);
}




