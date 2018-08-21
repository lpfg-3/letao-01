$(function () {

  // 记录当前一级分类 id
  var currentId = 0;

  // 一进入页面便获取一次一级分类数据
  firRender();
  function firRender() {
    $.ajax({
      url: '/category/queryTopCategory',
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        // 通过模板渲染 
        var htmlStr = template('firstTpl', info);
        $('.lt-content-left ul').html(htmlStr);

        // 保存第一个分类的id
        // 一级分类获取成功后获取一次二级分类数据
        currentId = info.rows[0]['id'];
        // console.log(currentId);
        secRender();
      }
    })
  }


  // 一级分类获取成功后获取一次二级分类数据
  // 一级分类切换时获取一次二级分类数据
  // 二级分类获取 secRender();
  function secRender() {
    $.ajax({
      url: '/category/querySecondCategory',
      data: {
        id: currentId
      },
      dataType: 'json',
      success: function (info) {
        // console.log( info );
        // 通过模板渲染
        var htmlStr = template('secondTpl', info);
        $('.lt-content-right ul').html(htmlStr);
      }
    })
  }

  // 点击一级分类切换 通过事件委托
  $('.lt-content-left ul').on('click', 'a', function () {
    console.log(1);

    // 获取点击的 一级分类 id
    var id = $(this).data('id');
    // 给其他元素清除 current 类
    $('.lt-content-left ul a').removeClass('current');
    // 给当前元素添加 current 类
    $(this).addClass('current');
    // 获取 当前一级分类 对应的二级分类
    currentId = id;
    secRender();
  })

})