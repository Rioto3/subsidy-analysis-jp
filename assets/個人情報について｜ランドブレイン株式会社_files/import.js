/*
 *  import.js
 *  Copyright (c) 2012 AOK (http://aokura.com/)
 *
 *  2012.4.19　第2版
 *
 */

// ----------スクリプトの位置を取得----------
var get_js_path = function(fn) {
  var a = document.getElementsByTagName('script');
  var s = a[a.length-1].src;
  if (s.indexOf('?') > 0) {
    s = s.substring(0, s.indexOf('?'));
  }
  if (fn && (/\.js$/i).test(fn)) {
    var e = fn.replace(/[\+\.\(\)\[\]\^\$]/g, function($0) {
      return ("\\" + $0);
    });
    var r = new RegExp(e+'$');
    for (var i = 0; i < a.length; i++) {
      s = a[i].src;
      if (s.indexOf('?') > 0) {
        s = s.substring(0, s.indexOf('?'));
      }
      if (r.test(s)) break;
    }
  }
  return s.substring(0, s.lastIndexOf('/')+1);
};

// ----------絶対パスを取得----------
var normalize_url = function(path) {
  var a = document.createElement('a');
  a.href = path;
  return a.href;
};

// ----------スクリプトの読み込み----------
var require = function(url, charset, nocache) {
  document.write('<script type="text/javascript" src="');
  if (!(/^https?:\/\//i).test(url)) {
    url = normalize_url(get_js_path('import.js')+url);
  }
  if (nocache) url += '?' + new Date().getTime();
  document.write(url);
  if (charset) document.write('" charset="'+charset);
  document.write('"></script>');
};

// ----------インポート----------
(function() {
    require('nav.js'); // スマホナビ
    require('jquery.mobilemenu.js'); // リストをセレクトボックスに変換
    //require('jquery.cookie.js'); // cookie
    //require('jquery.textresizer.min.js'); // テキストサイズ
    require('jquery.accordion.js'); // サブナビのドロップダウンメニュー
    //require('jquery-opacity-rollover.js'); // ロールオーバー（CSS3 アニメ）
    //require('rollover.js'); // ロールオーバー（画像）
    require('pagetop.js'); // ページトップ
    require('smoothscroll.js'); // するするスクロール
    require('jquery.matchHeight.js'); // リストの高さ揃える
    //require('jquery.dlTableSet.min.js'); // dlを使ったtableのdtとddの高さを揃える
    //require('link.js'); // 外部リンク設定
    require('breadcrumb.js'); // パンくずリスト
    require('addIcon2Links.js'); // アイコン付加
    //require('fileSizeGetter.js'); // ファイルサイズ自動計算
    require('pngie.js'); // 透過png IE対策
})();





// ----------ページトップ----------
$(document).ready(function() {
  var pagetop = $('#pagetop');
    $(window).scroll(function () {
       if ($(this).scrollTop() > 100) {
            pagetop.fadeIn();
       } else {
            pagetop.fadeOut();
            }
       });
       pagetop.click(function () {
           $('body, html').animate({ scrollTop: 0 }, 500);
              return false;
   });
});

// ----------リストの高さ揃える（matchHeight.js）----------
$(function(){
      $('.listheight li').matchHeight();
      $('.listheight2 li').matchHeight();
      $('.listheight3 li').matchHeight();
      $('.listheight4 li').matchHeight();
      $('.listheight5 li').matchHeight();
      $('.listheight6 li').matchHeight();
});
// ----------コピーライトの西暦を取得----------
function year() {
    var data = new Date();
    var now_year = data.getFullYear();
    document.write(now_year);
}
// ----------タブ（採用情報）----------

// ----------タブ（個人情報）----------
$(function(){
    $('#privacytabcontents div[id != "privacytab1"]').hide();
     
    // タブをクリックすると
    $("#privacyTAB ul.privacytabmenu li a").click(function(){
        // 一度全てのコンテンツを非表示にする
        $("#privacytabcontents div").hide();
 
        // 次に選択されたコンテンツを再表示する
        $($(this).attr("href")).show();
         
        // 現在のcurrentクラスを削除
        $(".current").removeClass("current");
         
        // 選択されたタブ（自分自身）にcurrentクラスを追加
        $(this).addClass("current");
 
         
        return false;
    });
 
});










// ----------サブナビゲーションのドロップダウンメニュー----------
$(function(){
    $('.subMenu').hide();
    //
    $('#menu .archive').click(function(e){
        $('+ul.subMenu',this).slideToggle();
    });
});

// ----------dlを使ったtableのdtとddの高さを揃える----------
//$(function(){
//    $('dl.dltable').dlTableSet();
//});
