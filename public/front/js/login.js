$(function () {
  
  // 登陆
  // 校验表单
  // 发送请求
  $('#sumbitBtn').click(function () {
    // 获取表单信息
    var username = $('[name="username"]').val();
    var password = $('[name="password"]').val();
    
    if (!username.trim()){
      mui.toast('请输入用户名',{ duration:'long', type:'div' })
      // duration 持续显示时间,默认值 short(2000ms)	支持 整数值 和 String ,
                  // String可选: long(3500ms),short(2000ms)
    }
    else if(!password.trim()){
      mui.toast('请输入密码',{ duration:'long', type:'div' }) 
    }
    else{
      // 发送请求验证密码
      $.ajax({
        type: 'post',
        url: '/user/login',
        data: {
          username: username,
          password: password
        },
        dataType: 'json',
        success: function ( info ) {
          console.log(info);
          if (info.success) {
            location.href = 'user.html'
          }
          else {
            mui.toast('用户名或密码输入错误',{ duration:'long', type:'div' }) 
          }
        }
      })
    }
  })

  
})