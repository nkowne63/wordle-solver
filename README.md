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

実際に推論を行うと以下のようになります。（https://www.devangthakkar.com/wordle_archive/?200 での確認）

```
> var list = w.words;
undefined
> w.next(list)
guess: 563.337ms
infomation: 5.160427564363666
result: euros
'euros'
> var list = w.filter(list, "euros", "y_y__")
count: 12972 -> 677
information: 4.260101284880809
undefined
> w.next(list)
guess: 530.326ms
infomation: 6.643856189774733
result: rebar
'rebar'
> var list = w.filter(list, "rebar", "_y__g")
count: 677 -> 71
information: 3.2532649040703148
undefined
> w.next(list)
guess: 238.023ms
infomation: 5.649747119504682
result: cheer
'cheer'
> var list = w.filter(list, "cheer", "___gg")
count: 71 -> 54
information: 0.3948596173412136
undefined
> w.next(list)
guess: 158.583ms
infomation: 5.754887502163468
result: ilial
'ilial'
> list = w.filter(list, "ilial", "y____")
count: 54 -> 31
information: 0.8006911917765933
[
  'fixer', 'finer', 'tiger', 'diner',
  'diver', 'timer', 'giver', 'wider',
  'piper', 'miner', 'viper', 'diker',
  'dimer', 'fifer', 'fiver', 'jiver',
  'kiter', 'mimer', 'miter', 'mixer',
  'niger', 'niner', 'niter', 'nixer',
  'piker', 'titer', 'twier', 'viner',
  'viver', 'wiper', 'wiver'
]
> w.next(list)
guess: 64.916ms
infomation: 2.619667960634469
result: twang
'twang'
> list = w.filter(list, "twang", "g___y")
count: 31 -> 1
information: 4.954196310386875
[ 'tiger' ]
>
```
