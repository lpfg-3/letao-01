$(function () {
  
  // mui表单验证
  $('#sumbitBtn').click(function () {
    console.log(1);
    var check = true;
    mui(".mui-input-group input").each(function() {
    //若当前input为空，则alert提醒 
    if(!this.value || this.value.trim() == "") {
        var label = this.previousElementSibling;
        //  mui.toast('登陆成功',{ duration:'long', type:'div' }) 
        // duration	持续显示时间,默认值 short(2000ms)	支持 整数值 和 String ,
                  // String可选: long(3500ms),short(2000ms)
        mui.toast(label.innerText + "不允许为空", { duration:1000, type:'div' });
        check = false;
        return false;
    }
    }); //校验通过，继续执行业务逻辑 
    if(check){
      console.log($('#form').serialize());
      
        $.ajax({
          type: 'post',
          url: '/user/login',
          data: $('#form').serialize(),
          dataType: 'json',
          success: function ( info ) {
            if(info.success){
              var obj = {};
              if (location.search) {
                var arr = location.search.split('?')[1].split('&');
                arr.forEach(function (v, i) {
                  // console.log('--------------');
                  // console.log(v);
                  var res = v.split('=');
                  // console.log(res);
                  // console.log(res[0],res[1]);
                  obj[res[0]] = res[1];               
                });
              }

              location.href = obj.retUrl || 'user.html';
              
            }else{
              mui.toast('用户名或密码错误', { duration:1000, type:'div' });
            }
          }
        })
    }
  })
  
    

})