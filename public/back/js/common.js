/* 进度条 */
$(function () {
  // 在AJAX 请求刚开始时执行一个处理函数。 
  $(document).ajaxStart(function () {
    NProgress.start();
  })
  // 在AJAX 请求完成时执行一个处理函数。
  $(document).ajaxStop(function () {
    // NProgress.done();
    setTimeout(function () {
      NProgress.done()
    }, 2000)
  })
})

// 判断是否登陆
$(function () {
  console.log(location.href.indexOf('login.html'));

  if (location.href.indexOf('login.html') === -1) {
    $.ajax({
      type: 'get',
      url: '/employee/checkRootLogin',
      dataType: 'json',
      success: function (info) {
        if (info.error === 400) {
          location.href = 'login.html';
        }
      }
    })
  }


})

// 侧边栏及topbar
$(function () {
  // 二级菜单隐藏显示
  $('.nav .category').click(function () {
    $('.nav .child').stop().slideToggle();
  })

  // 侧边栏隐藏显示切换
  $('.icon-menu').click(function () {
    $('.lt-aside').toggleClass('hidemenu');
    $('.lt-topbar').toggleClass('hidemenu');
    $('.lt-body').toggleClass('hidemenu');
  })

  // 显示模态框
  $('.icon-logout').click(function () {
    $('#logoutModal').modal('show');
  })

  // 退出登陆
  $('.logout').click(function () {
    // 发送请求
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          location.href = 'login.html';
        }
      }
    })
  })

})