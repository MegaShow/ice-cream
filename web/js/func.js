/* 
 * Copyright (c) 2017 MegaShow
 * Licensed under the MIT license
 */

function submit() {
  let md_text = $('#md-text').val();
  if (md_text == '') {
    return false;
  }
  $.post('/api/modifyIndex', {
    text: md_text
  }, (data) => {
    if (data.status == 'success') {
      window.location.href = "index.html";
      return true;
    }
  });
}

function getQueryString(name) { //获取get参数
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  return r !== null ? unescape(r[2]) : null;
}

function getCookie(name) { //获取cookie
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}