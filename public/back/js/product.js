$(function () {
  var currentPage = 1;
  var pageSize = 5;

  // 已进入页面渲染一次
  render();
  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function ( info ) {
        // console.log(info);
        // 通过模板渲染数据
        var htmlStr = template('productTpl', info);
        $('.lt_content tbody').html( htmlStr );

        // 分页
        $('#paginator').bootstrapPaginator({
          // bootstrap版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页码
          totalPages: Math.ceil( info.total / info.size ),
          // 点击分页触发的事件
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  // 添加商品模态框显示
  $('#addBtn').on('click', function () {
    $('#productModal').modal('show');
  })

  // 文件上传
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      console.log(data);
      // 上传后图片的地址
      // console.log(data.result.picAddr);
      // 上传后图片的名字
      // console.log(data.result.picName);
      var img = $('<img></img>').attr('src', data.result.picAddr);
      $('#imgBox').prepend(img);
      var imgs = $('#imgBox').children('img');
      if ( imgs.length > 3) {
        for (var i = 3; i < imgs.length ; i++) {
          imgs[i].remove();
        }
      }
 
    }
  })
})