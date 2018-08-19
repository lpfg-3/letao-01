$(function () {

  var currentPage = 1;
  var pageSize = 5;

  // 一进页面便渲染一次
  render();

  function render() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        // 渲染模板
        var htmlStr = template('firstTpl', info);
        $('.lt_content tbody').html(htmlStr);

        // 分页
        $('#paginator').bootstrapPaginator({
          // bootstrap版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: currentPage,
          // 总页码
          totalPages: Math.ceil(info.total / info.size),
          // 页码点击触发的事件
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  // 点击添加显示模态框
  $('#addBtn').click(function () {
    $('#firstModal').modal('show');
  })

  // 模态框表单验证
  $('#form').bootstrapValidator({
    // 配置 图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 配置表单验证和提示内容
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  })
  // 表单验证成功后发送请求
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    // console.log($('#form').serialize());

    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        // console.log( info );
        if (info.success) {
          $('#firstModal').modal('hide');
          $('form').data('bootstrapValidator').resetForm(true);
          currentPage = 1;
          render();
        }
      }
    })
  })
})