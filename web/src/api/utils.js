
import Vue from 'vue'

//校验value是否为空如果为空界面显示msg
export function checkVoid (value, msg) {
  if (value == 'undefined' || value == null || value == '') {
    Vue.$vux.alert.show(msg)
    return true
  }
  return false
}

//时间戳转时间
export function timestampToTime (unixtimestamp){
  var unixtimestamp = new Date(unixtimestamp*1000);
  var year = 1900 + unixtimestamp.getYear();
  var month = "0" + (unixtimestamp.getMonth() + 1);
  var date = "0" + unixtimestamp.getDate();
  var hour = "0" + unixtimestamp.getHours();
  var minute = "0" + unixtimestamp.getMinutes();
  var second = "0" + unixtimestamp.getSeconds();
  return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)
      + " " + hour.substring(hour.length-2, hour.length) + ":"
      + minute.substring(minute.length-2, minute.length) + ":"
      + second.substring(second.length-2, second.length);
}