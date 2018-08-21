$(function () {
  
  // 动态获取用户信息
  $.ajax({
    url: '/user/queryUserMessage',
    dataType: 'json',
    success: function ( info ) {
      if(info.error === 400){
        location.href = 'login.html';
        return;
      }
      console.log( info );
      var htmlStr = template('userTpl', info);
      $('#info').html( htmlStr );
    }
  })

  // 点击退出， 退出登陆
  $('#logout').click(function () {
    $.ajax({
      url: '/user/logout',
      
      dataType: 'json',
      success: function ( info ) {
        if (info.success) {
          location.href = 'login.html';
        }
      }
    })
  })

})