$(function () {
  var currentPage = 1;
  var pageSize = 5;

  var picArr = [];

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
      success: function (info) {
        // console.log(info);
        // 通过模板渲染数据
        var htmlStr = template('productTpl', info);
        $('.lt_content tbody').html(htmlStr);

        // 分页
        $('#paginator').bootstrapPaginator({
          // bootstrap版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页码
          totalPages: Math.ceil(info.total / info.size),
          // 点击分页触发的事件
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          },
          // 配置分页显示方式
          // 按钮显示的方式itemTexts
          itemTexts: function (type, page, current) {
            // type: 按钮类型 page first last prev next
            switch (type) {
              case 'page':
                return page;
                // 通过返回值设置按钮显示的内容
              case 'first':
                return '首页';
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
                // 通过返回值设置按钮显示的内容
              case 'first':
                return '前往首页';
              case 'last':
                return '前往尾页';
              case 'prev':
                return '前往上一页';
              case 'next':
                return '前往下一页';
              default:
                break;
            }
          },
          // 按钮按照bootstrap样式显示
          useBootstrapTooltip: true

        })
      }
    })
  }

  // 添加商品模态框显示
  // 动态获取二级分类列表
  $('#addBtn').on('click', function () {
    $('#productModal').modal('show');

    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);

        var htmlStr = template('dropTpl', info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })

  // 点击二级分类列表
  // 将文本内容给按钮
  // 将分类的id给input隐藏域
  // 选中后将隐藏域的表单验证值为通过
  $('.dropdown-menu').on('click', 'a', function () {
    // 将点击的内容给 按钮
    var txt = $(this).text();
    $('#dropdownText').text(txt);

    // 将二级分类的id给input隐藏域
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);

    // 选中后将隐藏域的表单验证置为通过
    $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  })

  // 文件上传
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {

      console.log(data);
      // 上传后图片的地址
      // console.log(data.result.picAddr);
      picArr.unshift(data.result);

      // 上传后图片的名字
      // console.log(data.result.picName);
      var img = $('<img></img>').attr('src', data.result.picAddr);
      $('#imgBox').prepend(img);

      if (picArr.length > 3) {
        $('#imgBox img').eq(-1).remove();
        picArr.pop();
      }

      // 如果上传的文件等于3将隐藏域的表单验证置为通过
      if (picArr.length == 3) {
        $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
      }

    }
  })

  // 表单校验
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

    // 配置校验规则
    fields: {
      // 二级分类
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },

      // 商品名称
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },

      // 商品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },

      // 商品库存
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存必须是已0开头的数字'
          }
        }
      },

      // 商品尺寸
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺寸'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '商品尺寸必须是 xx-xx , 例如 32-40'
          }
        }
      },

      // 商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },

      // 商品价格
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品价格'
          }
        }
      },

      // 上传图片
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      },

    }
  })

  // 表单验证成功后,发送请求添加数据
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    var paramStr = $('#form').serialize();
    paramStr += '?picName1=' + picArr[0].picName + '?picAddr1=' + picArr[0].picAddr;
    paramStr += '?picName2=' + picArr[1].picName + '?picAddr2=' + picArr[1].picAddr;
    paramStr += '?picName3=' + picArr[2].picName + '?picAddr3=' + picArr[2].picAddr;

    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: paramStr,
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          // 添加成功

          // 隐藏模态框
          $('#productModal').modal('hide'),

            // 重置表单元素
            $('#form').data('bootstrapValidator').resetForm(true);
          // 重置非表单元素
          $('#imgBox img').remove();
          $('#dropdownText').text('请选择二级分类');

          // 重新渲染第一页
          currentPage = 1;
          render();

        }

      }
    })
  })



})