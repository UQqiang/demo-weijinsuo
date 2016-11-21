/*
* @Author: 虚竹
* @Date:   2016-08-17 20:33:10
* @Last Modified by:   虚竹
* @Last Modified time: 2016-09-09 00:24:32
*/

'use strict';

$(function() {


  function resize() {
    // 屏幕宽度
    var windowWidth = $(window).width();
    // 是否为小于768的屏幕
    var smallScreen = windowWidth < 768;
    // 轮播图板块适应
    var $itemImages = $('#home_slide .item-image');
    $itemImages.each(function(i, item) {
      var $item = $(item);
      var imgSrc = $item.data(smallScreen ? 'image-small' : 'image-large');
      var imgAlt = $item.data('image-alt');
      $item.html('<img src="' + imgSrc + '" alt="' + imgAlt + '"/>');
      $item.css('backgroundImage', 'url(' + imgSrc + ')');
    });

    // tab栏宽度适应
    var $tabs = $(".nav-tabs");
    $tabs.each(function(index, item) {
      var width = 20;
      $tabs.children().each(function(ci, citem) {
        width += $(citem).width();
      })      

      if(width > $tabs.parent().width()) {
        $tabs.css("width", width);
        $tabs.parent().css("overflow-x", "scroll");
      }else {
        $tabs.css("width", "auto");
        $tabs.parent().css("overflow-x", "hidden");
      }
    })
  }

  var OFFSET = 50;
  // 轮播图触摸
  $('.carousel').each(function(i, item) {
    var startX, endX;
    item.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      e.preventDefault();
    });
    item.addEventListener('touchmove', function(e) {
      endX = e.touches[0].clientX;
      e.preventDefault();
    });
    item.addEventListener('touchend', function(e) {
      var offsetX = endX - startX;
      if (offsetX > OFFSET) {
        // 上一张
        $(this).carousel('prev');
      } else if (offsetX < -OFFSET) {
        // 上一张
        $(this).carousel('next');
      }
      e.preventDefault();
    });
  });

  $(window).on('resize', resize).trigger('resize');

  // 提示框效果
  $('[data-toggle="tooltip"]').tooltip();

  // 新闻点击切换
  $('.news-nav a').click(function(e) {
    // e.preventDefault();
    // e.stopPropagation();
    // 不要阻止默認事件
    $('.news-title').text($(this).data('title'));

  });
});
