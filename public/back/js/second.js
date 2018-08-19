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
      success: function ( info ) {
        // console.log(info);
        var htmlStr = template('secondTpl', info);
        $('.lt_content tbody').html( htmlStr );

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
          }
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
      success: function ( info ) {
        console.log(info);
        var htmlStr = template('firstTpl', info);
        $('.dropdown-menu').html( htmlStr );
      }
    })
  })

  // 设置事件委托
  // 选中一级分类
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    console.log(txt); 
    
    $('#dropdownText').text(txt);
  })

  // 文件上传 显示
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      console.log(data.result.picAddr);
      $('#brandLogo').attr('src', data.result.picAddr)
      
    }
  })

  // 表单验证=--=--
  $('#form').bootstrapValidator({
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

})