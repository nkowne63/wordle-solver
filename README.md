# wordle-solver

wordle のソースコードにある単語リストを元に、単語を入力したときに得られる平均情報量を最大化するようにすることができるプログラムです。平均情報量の計算は 1 手についてだけ行っており、全体最適などは考えていません。
また、計算量を削減するために、得られる情報量の見積もりにはモンテカルロ法を、単語の候補は乱択をして計算をしています。これにより短時間（~500ms 程度）である程度良い精度で計算が可能です。

## 使い方

### 関数リスト

`npm run repl`で TypeScript REPL(ts-node)が起動します。以下の関数と値がプリロードされています。

#### w.words: string[]

wordle の単語リスト

#### w.next: (list: string[]) -> string

単語リストをもとに、平均情報量が最も多い単語を計算して返します。

#### w.filter: (list: string[], word: string, status: string) -> string[]

word を入力したときのステータスを元に、list を絞り込みます。
例えば、"alpha"を入力して「黄灰灰緑灰」となった場合、status は"y\_\_g\_"と入力します。
w.filter は「絞り込み前と後で候補数がどう変化したか」も表示するため、残り候補が 1 になったら返り値の中身を見ると良いでしょう。

### 使用例

実際に推論を行うと以下のようになります。

```
> var list = w.words;
undefined
> w.next(list)
guess: 584.494ms
infomation: 5.205979129983105
result: earls
'earls'
> list = w.filter(list, "earls", "_y___")
count: 12972 -> 453
information: 4.839746068409571
[
  'audit', 'aback', 'vodka', 'champ', 'whack', 'chant', 'today',
  'comma', 'aphid', 'khaki', 'twang', 'tibia', 'admit', 'aging',
  'mocha', 'human', 'coach', 'ninja', 'chaff', 'aping', 'about',
  'china', 'thank', 'aunty', 'quota', 'adopt', 'among', 'agony',
  'gonad', 'piano', 'topaz', 'afoot', 'pizza', 'quack', 'annoy',
  'amity', 'dogma', 'nomad', 'again', 'cocoa', 'audio', 'knack',
  'admin', 'abbot', 'axiom', 'giant', 'titan', 'foamy', 'avian',
  'avoid', 'tonga', 'affix', 'axion', 'chain', 'antic', 'woman',
  'guava', 'junta', 'await', 'attic', 'adapt', 'abaca', 'abaci',
  'abaft', 'abaka', 'abamp', 'aband', 'abaya', 'abmho', 'abohm',
  'aboma', 'aboon', 'abuna', 'abuzz', 'accoy', 'achoo', 'acidy',
  'acing', 'acini', 'acmic', 'acock', 'actin', 'acton', 'adbot',
  'addax', 'addio', 'adhan', 'adman', 'admix', 'adobo', 'adown',
  'aduki', 'adunc', 'adyta', 'agama', 'agami', 'agita', 'agood',
  'aguna', 'aguti',
  ... 353 more items
]
> w.next(list)
guess: 537.463ms
infomation: 6.276509250999221
result: avian
'avian'
> list = w.filter(list, "avian", "y____")
count: 453 -> 113
information: 2.0031882776310477
[
  'champ', 'whack', 'today', 'comma', 'mocha', 'coach', 'chaff',
  'quota', 'topaz', 'quack', 'dogma', 'cocoa', 'foamy', 'bobac',
  'bobak', 'bocca', 'booay', 'bowat', 'boyau', 'bubba', 'buffa',
  'byway', 'chack', 'chaco', 'chado', 'chaft', 'chapt', 'chawk',
  'chota', 'chufa', 'coact', 'coady', 'coapt', 'cobza', 'cohab',
  'copay', 'cotta', 'couta', 'coyau', 'cuppa', 'cycad', 'douma',
  'ducat', 'dukka', 'dumka', 'dwaum', 'fouat', 'ghaut', 'goaty',
  'gogga', 'gompa', 'gopak', 'gotta', 'guaco', 'gumma', 'gutta',
  'gyoza', 'hoagy', 'hodad', 'hodja', 'hooka', 'hopak', 'huzza',
  'hypha', 'khaph', 'khoja', 'kofta', 'kokam', 'koppa', 'kyack',
  'mohua', 'momma', 'motza', 'mugga', 'mutha', 'muzak', 'myoma',
  'occam', 'octad', 'ogham', 'otaku', 'outta', 'phoca', 'poach',
  'pooja', 'pooka', 'poppa', 'pucka', 'puffa', 'pujah', 'pukka',
  'pzazz', 'quaff', 'quaky', 'quayd', 'quoad', 'thack', 'thawy',
  'thuja', 'thuya',
  ... 13 more items
]
> w.next(list)
guess: 535.296ms
infomation: 4.808899367762383
result: chota
'chota'
> list = w.filter(list, "chota", "yg__y")
count: 113 -> 1
information: 6.820178962415188
[ 'whack' ]
```
