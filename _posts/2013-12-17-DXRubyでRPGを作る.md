---
layout: post
date: 2013-12-17
title: DXRubyでRPGを作る
excerpt: ゲームの中でも最も色々な要素が絡みこむRPG。DXRubyで作るにはどうすればいいのか模索してみます。
---

[DXRuby Advent Calendar](http://atnd.org/events/45135)17日目です。前回はあおいたく氏の[僕のコードは地図が読める](http://blog.aotak.me/post/70092390140/fmf-rb)でした。RPGにもかなり関わる話で、参考になりました。技術的にも、他のアプリケーションのバイナリデータを読むという、興味深い内容に思えました。

さて、私はRPGを作ろうとしています。ゲームの中でも最も色々な要素が絡みこむRPG。DXRubyで作るにはどうすればいいのか模索してみます。

### そもそもなぜDXRubyでRPGを作るのか

理由は次の3つです

* Rubyに魅かれた
* RPGに魅かれた
* DXRubyに魅かれた

それぞれ具体的に思うことを述べます。

#### Ruby

私はRubyに出会うまで、JavaScript→HTML/CSS→PHP→VBAと様々な形態のものを使っていました。(コンパイル言語は嫌いなのでやっていませんが。)その時に「これはどう表現するんだ？」というのが多くありました。

しかしRubyという完全なるオブジェクト指向の言語は、簡潔で直感に近い構文や統一感のある構造のおかげか本当に生産性が高く感じられます。また"Enjoy Programming!"は学生として趣味でやるプログラミングにすごくフィットしています。

#### RPG

また私は、ゲームほど人を楽しませるのに、Enjoyさせることに特化したプログラムは無いと思っています。現在の人々の娯楽の多くを占めているのも事実でしょう。

楽しんでプログラミングをしたい。ならば人を楽しませるものを作りたい。そう思いました。

そして私がこれまでで一番楽しめたのはRPGでした。自分が楽しめたものはきっと他の人も楽しめるはず、と思ったのです。

#### DXRuby

そういう訳で、RubyでRPGを作りたくなった私はDXRubyを選びました。

それは、Rubyの高生産性やオブジェクト指向に最もフィットしているからです。簡潔な構文やメソッドは見るだけでどんなものを作っているのかが分かり、サンプルが読みやすかったのも決め手の一つでした。

### RPGを考えよう

そろそろ本題に入りましょう。で、早速難問です。そもそもRPG要素とは何でしょうか？

様々な資料にあたって、最終的に大衆の作る世界最大の電子図書館Wikipediaを参考に次のような結論となりました。

+ Growth(成長)
+ Search(探索)
+ Collection(収集)
+ Effect(演出)

それぞれ分析していきましょう。

#### Growth(成長)

キャラクター(特に主人公)が成長しないRPGを私は知りません。皆さんにも「レベル上げ」や「ローラー」「～～狩り」などの言葉はなじみ深いのではないでしょうか？自分の努力によってキャラクターが強くなるのは嬉しいものです。

ここで必要になるものとしてまず、把握しやすいようにまとめてキャラクターのパラメータを保持しておく必要が有ります。

また、キャラクターを強くするものの代表は戦闘でしょう。多くのゲームが「新戦闘システム」を生み出そうとするなど、これがRPGの面白さの多くを担っているのは紛れもない事実です。

#### Search(探索)

ダンジョンのないRPGも、私は知りません。RPGと言えば広大な世界を冒険するものではないでしょうか。

そこで、マップを表示しスクロールさせる事になりますが、広大な世界を1枚の画像にしでそれをスクロールさせようとしたら、重くて仕方が有りません。マップの情報を縦と横のマス目で区切って管理することになります。

また、マップは1つに管理することは問題が起こります。例えば、町の中でエンカウントはするべきではないでしょうし、時間を考えるのであれば町の中では時間経過を止めることもあるでしょう。ゲームにイベント配置するときにも、ある程度エリアで区切ってその中で何マス目かを指定する方が絶対簡単です。

では、マップの移動ができれば終わりでしょうか？そんなことはなく、メニューを表示させたり、自動移動するNPCと会話をしたりして情報の収集・管理をします。

その上で、面白いRPGにするなら世界はイベントなどによって変わるべきでしょう(ここに来ると‥‥/ここを調べると‥‥/などなど)。

#### Collection(収集)

RPGのやりこみ要素の代表格は、アイテム収集かと思います。強い装備品などを集めることはストーリーの進展にも関わってきます。

プログラムの観点からこのシステムを考えると、アイテムデータをまとめて保持し、売買システムを構築し、(もしかすると「合成」や「錬金」といったものも実装し、)並べ替えにも対応させましょう。

私も見落としかけたのですが、一般のアイテムを拾うことによって得たりする場合は、一定の条件のもとで再出現させることも必要になってきます。

#### Effect(演出)

これはゲームの進行には関わりませんが、できるのであればイベントシーンや戦闘シーンは臨場感を持たせたいものです。エリア移動の時やオープニング画面など細かい部分にまで手を回せると、RPGとしての面白さが倍増していくことでしょう。

### では早速、どんな構造に？

RPG要素は大方列挙しましたので、今度はそれを分類・分析します。本質的に被っている物を消していきましょう。

- Dataをまとめて保持
- Map/戦闘/Event Scene
- Map∋Area∋Squareで管理しScroll
- NPC
- Menu表示
- Eventの登録

すっきりしました。これを制御しなければならないので、ツリーを考えてみましょう。

    RPG-+--Scene-+--Map-+--Area-+--Square
        |        |      |       |
        |        |      |       +--NPC
        |        |      |
        |        |      +--Menu
        |        |
        |        +--Battle
        |        |
        |        +--Event(Animation)
        |       (|         )
        |       (+--Opening)
        |
        +--Data
        |
        +--Event

完全に正しいかどうかというのは、実際に作ってみなくては分かりません。「この仕組みだとこれこれが大変すぎる」「これ以上機能を増やすにはコードが汚い」ということになるかもしれません。

ただ、RPGのData管理部分を一つにまとめ、Eventも一元に管理し、SceneをMap/Battle/Eventに分け、MapはArea毎にSquareやNPCを設定し、表示するものとしてはそれ以外にMenuがある。どうでしょうか？

では、簡単なものから私の考える実装を話します。

#### Data(モジュール)

Dataモジュールにはただひたすらにデータを保持させます。が、任意の名前で好きなデータを代入できる必要があります。そこで一工夫。

RubyのModuleには`missing_method(name, *args)`と言うメソッドが設定されています。そのモジュールに対して定義されていない名前のメソッドが呼び出された時に、その名前(Symbol)を`name`に、引数を`*args`に渡して代わりに呼び出されます。

さらに、Rubyで何か代入するときは`hensuu=`のような`=`で終わるメソッドが呼び出されています。

これらを組み合わせて、Dataモジュールは次のようにしてみました。

{% highlight ruby %}
module Data
  @@value = {} #Data格納用ハッシュ。変数名に値を対応させる。
  
  def self.method_missing(name,*args) #先ほど出ましたね
    if name.to_s =~ /[^=]=$/ #正規表現です。"="一つで終わっていたらtrue
      @@value[name.to_s[0...(name.to_s.size - 1)].to_sym] = args[-1]
      #nameから最後の"="を取った部分のSymbolに最後の引数を対応させました
      
    elsif @@value.has_key?(name) #"="で終わっていなくて、以前代入したことあるなら
      @@value[name] #その値を返します。
    else
      super #どちらでもなかったら元々の処理(NoMethodErrorのraise)
    end
  end
end
{% endhighlight %}

「おい！」思った人も多いでしょう。「こんなのただのハッシュだよ！`Data[:hensuu]=`と変わってないよ！」もっともな指摘です。

――――このままならね。

私はこれに3つ機能を加えました。

1. Group
2. List
3. Event

Groupというのは、変数と並列でまたハッシュを作ることです。`Data[:Group][:GAgain][:hensuu]`と`Data.group.gAgain.hensuu`のどちらが直感的でしょう？

Listというのは、変数に対してそれが取りうる値を予め与えることで予期せぬ値を代入しないようにすることです。いちいち実装していたら大変ですよね。

Eventというのは、変数が変更された時にイベントを発生させるようにすることです。データが変更されたら呼び出すイベントは必要でしょう。

では今回はGroupを実装しましょう。手順は、

1. Dataと同じ動きをするVGroupクラスを作成
2. `Data.group(name)`で、それをnewしてほかのデータと同じように格納する

です。これで、`Data.(グループ名).(変数名)=`とできます。

DataモジュールからVGroupクラスを作るのでincludeしてサクッとやりたいところですが、Dataモジュールは`@@value`、これから作るVGroupクラスは`@value`とする必要があるので恐らく無理です。

でも、難しくは有りません。次のようになります。

{% highlight ruby %}
module Data
  class VGroup
    def initialize
      @value = {}
    end
    
    def method_missing(name,*args)
      if name.to_s =~ /[^=]=$/
        @value[name.to_s[0...(name.to_s.size - 1)].to_sym] = args[-1]
      elsif @value.has_key?(name)
        @value[name]
      else
        super
      end
    end
  end
  
  @@value = {}
  
  def self.method_missing(name,*args)
    if name.to_s =~ /[^=]=$/
      @@value[name.to_s[0...(name.to_s.size - 1)].to_sym] = args[-1]
    elsif @@value.has_key?(name)
      @@value[name]
    else
      super
    end
  end
end
{% endhighlight %}

次に、Dataにモジュールメソッドを追加して、その中で`VGroup.new`して`@@value[name.to_sym]`にそれを代入します。

この時、`=`でグループ名が終わっていると後で参照できないので例外を発生させます。

さらに、VGroupの中にもVGroupを作成できるようにします。

{% highlight ruby %}
module Data
  class VGroup
    def initialize
      @value = {}
    end
    
    def method_missing(name,*args)
      if name.to_s =~ /[^=]=$/
        @value[name.to_s[0...(name.to_s.size - 1)].to_sym] = args[-1]
      elsif @value.has_key?(name)
        @value[name]
      else
        super
      end
    end
    
    def group(name)
      if name.to_s =~ /[^=]$/
        @value[name.to_sym] = VGroup.new
      else
        raise ArgumentError, "group's name mustn't end with `='", caller(1)
      end
    end
  end
  
  @@value = {}
  
  def self.method_missing(name,*args)
    if name.to_s =~ /[^=]=$/
      @@value[name.to_s[0...(name.to_s.size - 1)].to_sym] = args[-1]
    elsif @@value.has_key?(name)
      @@value[name]
    else
      super
    end
  end
  
  def self.group(name)
    if name.to_s =~ /[^=]$/
      @@value[name.to_sym] = VGroup.new
    else
      raise ArgumentError, "group's name mustn't end with `='", caller(1)
    end
  end
end
{% endhighlight %}

できました。いろいろ試してみて下さい。

余りに長すぎてしまうので、他の機能についてはまた今度です。

※実際には、DataクラスがRubyにあるためこのモジュール名は使えません。`GData'等としましょう。

### 一旦中断♪

長くなりましたのでここで中断します。

RPGに必要なものを掴み、構造化しました。そしてデータ管理を実装してみました。明日は、残りの部分を考えていきます。
