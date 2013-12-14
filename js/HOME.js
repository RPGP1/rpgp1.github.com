var Home = function(){
  this.type = 0;
  
  this.links = new Array("./about", "./download", "./link", "./blog");
  this.jump = function(){
    location.href = this.links[this.type];
  }
  
  this.width = $("body").width();
  this.height = $("body").height();
  
  this.draw = function(){
    // 画面の大きさを更新
    this.width = $(window).width();
    this.height = $(window).height();
    
    $("#header").css({top: 0});
    $("#header").css({left: 0});
    $("#header").width(this.width);
    $("#header").height(82);
    
    $("#title").css({top: 14});
    $("#title").css({left: (this.width - 459) / 2});
    $("#title").width(459);
    $("#title").height(54);
    
    $("#battle").css({top: 82});
    $("#battle").css({left: 0});
    $("#battle").width(this.width);
    $("#battle").height(this.height - 194);
    
    var imgw = 98;
    var imgh = 33;
    var curw = 98;
    var curh = 33;
    var m = (this.width - imgw * 4) / 7;
    var h = this.height - 126 - imgh
    
    var list = new Array(2 * m, 3 * m + imgw, 4 * m + imgw * 2, 5 * m + imgw * 3);
    
    $("#cursor").css({top: h - 14 - curh});
    $("#cursor").css({left: list[this.type]});
    
    $("#about").css({top: h});
    $("#about").css({left: list[0]});
    
    $("#download").css({top: h});
    $("#download").css({left: list[1]});
    
    $("#link").css({top: h});
    $("#link").css({left: list[2]});
    
    $("#blog").css({top: h});
    $("#blog").css({left: list[3]});
    
    $("#navi").css({top: this.height - 112});
    $("#navi").css({left: 0});
    $("#navi").width(140);
    $("#navi").height(112);
    
    $("#which").css({top: 14});
    $("#which").css({left: 14});
    $("#which").width(112);
    $("#which").height(84);
    
    $("#content").css({top: this.height - 112});
    $("#content").css({left: 140});
    $("#content").width(this.width - 140);
    $("#content").height(112);
    
    $("#text").css({top: 14});
    $("#text").css({left: 14});
    $("#text").width(this.width - 168);
    $("#text").height(84);
  }
  
  this.timer = null
  
  this.change = function(v){
    var old = this.type
    this.type = v
    if (v != old){
      clearInterval(this.timer);
      this.count = 0
      this.timer = setInterval("text()",100);
    }
    Game.draw();
  }
  
  this.count = 0
  this.msg = new Array("ＤＸＲｕｂｙＲＰＧ　Ｐｒｏｊｅｃｔ\nについての説明です。", "スクリプトのダウンロード\nはこちらです。", "ＤＸＲｕｂｙや、その開発者、\n参考にしているサイト\nなどをまとめています。", "これの製作者のブログです。\nプログラミングやゲーム\nの話をします。");
}

var Game = new Home();

function text(){
  Game.count += 1;
  $("#text").html("<p id='text'>" + Game.msg[Game.type].substr(0, Game.count).replace(/\n/g, "<br />") + "</p>");
  if (Game.count == Game.msg[Game.type].length) clearInterval(Game.timer);
}

// 入力処理
// 1.マウスが動いた時 // 動作せず。

$("#about").mousemove(function(){
  Game.change(0);
});

$("#download").mousemove(function(e){
  Game.change(1);
});

$("#link").mousemove(function(e){
  Game.change(2);
});

$("#blog").mousemove(function(e){
  Game.change(3);
});

// 2.左右キー/Enterキーの押された時
$(document).keydown(function(e){
  var Left = 37;
  var Right = 39;
  
  switch(e.keyCode){
    case Left:
      var type = Game.type;
      type -= 1;
      if (type < 0) type = 3;
      Game.change(type);
      break;
      
    case Right:
      var type = Game.type;
      type += 1;
      if (type > 3) type = 0;
      Game.change(type);
      break;
      
  }
  
  var Enter = 13;
  
  if (e.keyCode == Enter) Game.jump();
  
  Game.draw();
});

// 3.画面の大きさが変わった時
$(window).resize(function(){
  Game.draw();
});

// 4.ページ読み込み時
$("document").ready(function(){
  Game.draw();
});

/*
描画について考える。
＋―――――――――――――――――――――――＋
｜タイトル画像　　　　　　　　　　　　　　　　　｜
｜　　　　　　　　　　　　　　　　　　　　　　　｜
＋―――――――――――――――――――――――＋
｜　　　　　　　　　　　　　　　　　　　　　　　｜
｜　　＋――＋　＋――＋　＋――＋　＋――＋　　｜
｜　　｜リ画｜　｜リ画｜　｜リ画｜　｜リ画｜　　｜
｜　　｜ン像｜　｜ン像｜　｜ン像｜　｜ン像｜　　｜
｜　　｜ク　｜　｜ク　｜　｜ク　｜　｜ク　｜　　｜
｜　　＋――＋　＋――＋　＋――＋　＋――＋　　｜
＋――――＋――――――――――――――――――＋
｜どの　　｜ＤＸＲｕｂｙ　Ｐｒｏｊｅｃｔ　　　　｜
｜リンクに｜についての説明です。　　　　　　　　｜
｜進む？　｜　　　　　　　　　　　　　　　　　　｜
＋――――＋――――――――――――――――――＋


*/
