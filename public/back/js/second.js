$(function () {
  var currentPage = 1;
  var pageSize = 5;
  // 一进入页面便渲染一次
  render();

  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        var htmlStr = template('secondTpl', info);
        $('.lt_content tbody').html(htmlStr);

        // 分页
        $('#paginator').bootstrapPaginator({
          // 设置bootstrap版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页码
          totalPages: Math.ceil(info.total / info.size),
          // 点击页码触发的事件
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          },
          itemTexts: function (type, page, current) {
            // console.log(type, page, current);
            switch (type) {
              case 'page':
                return page;
              case 'first':
                return '首页';
              case 'page':
                return page;
              case 'last':
                return '尾页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              default:
                break;
            }
          },
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case 'page':
                return '前往第'+ page +'页';
              case 'first':
                return '首页';
              case 'page':
                return page;
              case 'last':
                return '尾页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              default:
                break;
            }
          },
          useBootstrapTooltip: true

        })
      }
    })
  }

  // 模态框显示 
  // 渲染一级分类列表
  $('#addBtn').click(function () {
    $('#secondModal').modal('show');
    // 发请求回去一级分类并渲染到页面中
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('firstTpl', info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })

  // 设置事件委托
  // 选中一级分类
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    console.log(txt);
    var id = $(this).data('id');
    $('#dropdownText').text(txt);
    $('[name="categoryId"]').val(id);
    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
  })

  // 文件上传 显示
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      console.log(data.result.picAddr);
      $('#brandLogo').attr('src', data.result.picAddr);
      $('[name="brandLogo"]').val(data.result.picAddr);
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
  })

  // 表单验证
  $('#form').bootstrapValidator({

    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // 重置不校验类型
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          }
        }
      }


    }
  })

  // 表单提交 添加二级菜单
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        currentPage = 1;
        render();
        $('#secondModal').modal('hide');
        $('#form').data('bootstrapValidator').resetForm(true);
        $('#brandLogo').attr('src', 'images/none.png');
        $('#dropdownText').text('请选择一级分类');
      }
    })
  })

  // 

})