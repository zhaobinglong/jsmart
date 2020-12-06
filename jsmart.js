'use strict'
// jsmart lib
// 2.0.0


class JSMart {

    constructor(){
        console.log('welcome use jsmart')
    }

    /**
     * 为字符串增加千分位
     * @param  {String} str 参数字符串
     * @return {String}
     */
    comdify (str) {
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
    arrUnique (arr) {
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
    shuffle (arr) {
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
    toSBC (str) {
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
    titleCase (str) {
        return str.replace(/\w\S*/g, function(word){
            return word.charAt(0).toUpperCase()+word.substr(1).toLowerCase();
        });
    }

    /**
     * 获取url字符串中传递的参数
     * @param  {String} name 参数值
     * @return {String}      [description]
     */
    getUrlParam (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }

    /**
     * 判断字符串是不是整数(从0开始的整数)
     * @param  {String} name 参数值
     * @return {bool}
     */
    isInteger (str) {
        return /^\+?\d+$/.test(str);
    }

    /**
     * 利用正则判断字符串是否存在子串  不区分大小写
     * @param  {String} subStr  子串
     * @param  {String} str     父串
     * @return {Bool}
     */
    coverString (subStr, str) {
        var reg = eval("/"+subStr+"/ig");
        return reg.test(str);
    }

    /**
     * 利用递归实现阶乘
     * @param  {Number} num 一个整数
     * @return {Number}
     */
    factorial  (num) {
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
    MergeCell (tableId, startRow, endRow, col) {
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
    MergeColCell (tableId,startCol,endCol) {
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
    isEmptyObject (e) {
        var t;
        for (t in e)
            return !1;
        return !0
    }

    /**
     * 返回顶部
     * @return {[type]} [description]
     */
    backTop () {
        window.scrollTo(0, 0)
    }


    /**
     * 显示base64编码的图片
     * base64编码的作用是
     * @pparam {type}       图片类型png/jpg/gif
     * @pparam {imgString}  base64编码的字符串
     * @return {string}     字符串，给img的src属性显示
     */

    showBase64img (type, imgString) {
        return 'data:image/'+type+';base64,'+imgString;
    }


    /**
     *  绘制扇形函数
     * @param {[type]} id        canvas的id
     * @param {[type]} x         圆心的x坐标
     * @param {[type]} y         圆心的y坐标
     * @param {[type]} radius    扇形半径
     * @param {[type]} color     填充的颜色
     * @param {[number]} eAngle    扇形结束的角度 0 - 360
     *
     */
    sector (id, x, y, radius, color, eAngle) {
        var canvas = document.getElementById(id);
        var ctx = canvas.getContext('2d');
        // 开始一条新路径
        ctx.beginPath();
        // 位移到圆心，方便绘制
        ctx.translate(x, y);
        // 移动到圆心
        ctx.moveTo(0, 0);
        // 绘制圆弧
        ctx.arc(0, 0, radius, 0, Math.PI * (eAngle/180));
        // 闭合路径
        ctx.closePath();
        // 填充颜色
        ctx.fillStyle=color;
        ctx.fill();
    }


    /**
     * 统计字符串中每个字符出现的次数
     * 参考 https://segmentfault.com/q/1010000005070166
     *
     */
    sortNumber (str) {
        return str.split('').reduce((p, k) => (p[k]++ || (p[k] = 1), p), {});
    }

    /**
     * 传递一个我文件名进来，获取文件后缀名
     * @param  {String} str 参数字符串
     * @return {String}
     */
    getExtensions (str) {
        if(typeof str != 'string'){
            console.log('the function getExtensions() need a param of string type');
            return false;
        }else{
            return str.substring(str.lastIndexOf('.')+1);
        }
    }

    /**
     * 数字   渐进动画
     * @param  {String} id    参数字符串
     * @param {Number} time   渐进的时间
     * @param {Number} num    最终呈现的数字
     */
    numberAnimation (id, time, num) {
        var obj=document.getElementById(id);
        obj.innerHTML=num;
            var flag=0;
            var timer=setInterval(function(){
            if(flag>=time){
                    clearInterval(timer);
                }else{
                    obj.innerHTML=flag;
                    flag++;
                }
        }, 1);
    }

    /**
     * js截取字符串，中英文都能用,超过长度的字符串用...代替
     * @param str：需要截取的字符串
     * @param len: 需要截取的长度
     */
    cutstr(str, len) {
        var str_length = 0;
        var str_len = 0;
        str_cut = new String();
        str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        if (str_length < len) {
            return str;
        }
    }


    /**
     * 获取本年度指定月份的周数
     */
    getWeeks (m) {
        var str=new Date('2016-'+m+'-1');
        // 当前年份
        var year=str.getFullYear();
        //  获取月份第一天是周几  周日是0
        var day=str.getDay();
        // 获取当前月份的天数
        var days=new Date(year,m,0).getDate();
        // 要减去开头的这几天
        var first=0;
        day==0? first=1 : first=8-day;
        days = days-first;
        return 1+ Math.ceil(days/7);
    }
}

export default new JSMart()
