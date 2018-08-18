
/* 进度条 */
$(function () {
  // 在AJAX 请求刚开始时执行一个处理函数。 
  $(document).ajaxStart(function () {
    NProgress.start();
  })
  // 在AJAX 请求完成时执行一个处理函数。
  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done()
    }, 2000) 
  })
})