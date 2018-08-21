$(function () {
  
  $.ajax({
    url: '/cart/queryCart',
    dataType: 'json',
    success: function ( info ) {
      console.log( info );
      if (info.error === 400) {
        location.href = 'login.html';
        return;
      }
    }
  })

})