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
// 全角符号转半角
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

