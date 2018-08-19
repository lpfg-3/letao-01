$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var id = 0;
  var isDelete = 0;
  // 已进入页面便渲染一次
  render();

  function render() {
    $.ajax({
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);

        // 渲染模板
        var htmlStr = template('userTpl', info);
        $('.lt_content tbody').html(htmlStr);

        // 分页
        $('#paginator').bootstrapPaginator({
          // 设置bootstrap版本
          bootstrapMajorVersion: 3,
          // 设置当前页
          currentPage: currentPage,
          // 设置总页数
          totalPages: Math.ceil(info.total / info.size),
          // 点击触发的函数
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }


        })

      }
    })
  }

  // 设置事件委托, 点击禁用/启用弹出模态框
  $('.lt_content tbody').on('click', '.btn', function () {
    // console.log(1);
    $('#userModal').modal('show');
    // console.log($(this).parent().data('id'));
    id = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
  })

  // 点击模态框确认按钮发送ajax请求,改变状态
  $('#sumbitBtn').on('click', function () {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data:{
        id: id,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function ( info ) {
        // console.log(info);
        if (info.success) {
          $('#userModal').modal('hide');
          render();
        }
      }
    })
  })
})