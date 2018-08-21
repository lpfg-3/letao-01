$(function () {
  // 记录当前一级分类的id
  var currentId = 1;
  
  // 左侧一级分类,已进入页面便渲染一次
  firstRender();
  function firstRender() {
    $.ajax({
      url: '/category/queryTopCategory',
      dataType: 'json',
      success: function ( info ) {
        if (info.rows[0]['id']) {
          // 记录第一个一级分类id信息,用于获取二级分类信息
          currentId = info.rows[0]['id'];
          console.log(currentId);

          // 获取成功 通过模板渲染页面
          var htmlStr = template('firstTpl', info);
          $('.lt-left ul').html( htmlStr );
          
          // 获取二级分类信息并渲染
          secRender();
        }
      }

    })
  }

  // 右侧二级分类信息
  function secRender() {
    $.ajax({
      url: '/category/querySecondCategory',
      data: {
        id: currentId
      },
      dataType: 'json',
      success: function ( info ) {
        console.log( info );
        
        // 通过模板, 渲染内容
        var htmlStr = template('secTpl', info);
        $('.lt-right ul').html( htmlStr );
        
      }
    })
  }

  // 点击一级分类,切换二级分类信息, 使用事件委托
  $('.lt-left ul').on('click', 'a', function () {

    // 切换a标签的样式
    // $('.lt-left ul a').removeClass('current');
    $('[data-id="'+ currentId +'"]').removeClass('current');
    $(this).addClass('current');

    // 更新 一级分类的id
    var id = $(this).data('id');
    if( currentId === id ) return;
    currentId = id;

    // 使用新的id 重新渲染二级分类
    secRender();
    
  })
})