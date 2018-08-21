$(function () {
  
  // 发送请求获取用户数据
  $.ajax({
    url: '/user/queryUserMessage',
    dataType: 'json',
    success: function ( info ) {
      console.log(info);
      if (info.error === 400) {
        location.href = 'login.html';
        return;
      }
      var htmlStr = template('tpl', info);
      $('#userInfo').html( htmlStr );
    }

  })


  // 退出登陆
  $('#logout').click(function () {
    // 发送请求,退出登陆
    $.ajax({
      url: '/user/logout',
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = 'login.html';
        }
        
      }
    })
  })


})