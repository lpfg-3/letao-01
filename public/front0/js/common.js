$(function () {

  // 轮播图初始化
  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
  });
  // 跳转到某张图片
  // gallery.slider().gotoItem(index);//跳转到第index张图片，index从0开始；


  // 初始化 全屏滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false, //是否显示滚动条
    
    // 默认值如下
    // scrollY: true, //是否竖向滚动
    // scrollX: false, //是否横向滚动
    // startX: 0, //初始化时滚动至x
    // startY: 0, //初始化时滚动至y
    // indicators: true, //是否显示滚动条
    // deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    // bounce: true //是否启用回弹
    
  });

})