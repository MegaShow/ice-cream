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

