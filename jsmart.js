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
 jsmart.Arrunique=function(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

