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


