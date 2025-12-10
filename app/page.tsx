"use client"

import { useState, useEffect } from "react"
import { BookOpen, Brain, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// 81-100番のデータ
const poems = [
  { no: 81, kami: "ほととぎす 鳴きつる方を ながむれば", shimo: "ただ有明の 月ぞ残れる", author: "後徳大寺左大臣", translation: "ホトトギスが鳴いた方角を眺めやると、ホトトギスの姿は見えず、ただ明け方の月が空に残っているばかりだ。", kimari: "ほと" },
  { no: 82, kami: "思ひわび さても命は あるものを", shimo: "憂きにたへぬは 涙なりけり", author: "道因法師", translation: "つれない人のことを思い悩み、それでも命だけはどうにかあるものの、このつらさに耐えかねて流れるのは涙であることよ。", kimari: "おも" },
  { no: 83, kami: "世の中よ 道こそなけれ 思ひ入る", shimo: "山の奥にも 鹿ぞ鳴くなる", author: "皇太后宮大夫俊成", translation: "この世の中には、つらさから逃れる道などないのだなあ。思いつめて分け入った山奥でさえ、悲しげに鹿が鳴いているのが聞こえるよ。", kimari: "よのなかよ" },
  { no: 84, kami: "ながらへば またこのごろや しのばれむ", shimo: "憂しと見し世ぞ 今は恋しき", author: "藤原清輔朝臣", translation: "このまま生き長らえていれば、今のこのつらい日々も、いつか懐かしく思い出されるのだろうか。かつてつらいと思っていた昔が、今では恋しく思われるのだから。", kimari: "なが" },
  { no: 85, kami: "夜もすがら 物思ふころは 明けやらで", shimo: "ねやのひまさへ つれなかりけり", author: "俊恵法師", translation: "一晩中、あの人のことを思い悩んでいるこの頃は、夜がなかなか明けなくて、寝室の隙間さえもがつれなく感じられることだ。", kimari: "よも" },
  { no: 86, kami: "嘆けとて 月やは物を 思はする", shimo: "かこち顔なる わが涙かな", author: "西行法師", translation: "嘆けと言って、月が私に物思いをさせるのだろうか、いやそうではない。（月が悪いわけではないのに）月のせいにして流れる私の涙であることよ。", kimari: "なげけ" },
  { no: 87, kami: "村雨の 露もまだひぬ 真木の葉に", shimo: "霧立ちのぼる 秋の夕暮れ", author: "寂蓮法師", translation: "にわか雨が通り過ぎて、その露もまだ乾いていない杉や檜の葉のあたりから、霧が白く立ち上っていく秋の夕暮れであることよ。", kimari: "む" },
  { no: 88, kami: "難波江の 芦のかりねの ひとよゆゑ", shimo: "みをつくしてや 恋ひわたるべき", author: "皇嘉門院別当", translation: "難波の入江の芦の刈り根の「ひと節」ほどの、ほんの短い「一夜」の仮初めの契りのために、澪標のように「身を尽くして」私は一生恋い焦がれ続けなければならないのでしょうか。", kimari: "なにはえ" },
  { no: 89, kami: "玉の緒よ 絶えなば絶えね ながらへば", shimo: "忍ぶることの 弱りもぞする", author: "式子内親王", translation: "私の命よ、絶えるなら絶えてしまっておくれ。このまま生き長らえていると、秘めている恋心が表に現れてしまいそうだから。", kimari: "たま" },
  { no: 90, kami: "見せばやな 雄島のあまの 袖だにも", shimo: "濡れにぞ濡れし 色は変はらず", author: "殷富門院大輔", translation: "お見せしたいものです。松島にある雄島の漁夫の袖でさえ、波しぶきに濡れに濡れても色は変わらないのに、（私の袖は涙で濡れて色が変わってしまいました。）", kimari: "みせ" },
  { no: 91, kami: "きりぎりす 鳴くや霜夜の さむしろに", shimo: "衣かたしき ひとりかも寝む", author: "後京極摂政前太政大臣", translation: "こおろぎが鳴いている霜の降りる寒い夜、寒々としたむしろの上で、自分の衣の片袖を敷いて、私は寂しく独り寝をするのだろうか。", kimari: "きり" },
  { no: 92, kami: "わが袖は 潮干に見えぬ 沖の石の", shimo: "人こそ知らね 乾く間もなし", author: "二条院讃岐", translation: "私の袖は、引き潮の時でも海中に隠れて見えない沖の石のように、人は知らないでしょうが、涙で濡れて乾く間もありません。", kimari: "わがそ" },
  { no: 93, kami: "世の中は 常にもがもな 渚こぐ", shimo: "あまの小舟の 綱手かなしも", author: "鎌倉右大臣", translation: "この世の中は、いつまでも変わらないであってほしいものだなあ。渚を漕いでいく漁師の小舟が、綱手で引かれていく様子は、しみじみと心惹かれるものだ。", kimari: "よのなかは" },
  { no: 94, kami: "み吉野の 山の秋風 小夜ふけて", shimo: "ふるさと寒く 衣打つなり", author: "参議雅経", translation: "吉野の山の秋風が吹き、夜も更けて、古都である吉野の里は寒々と感じられ、衣を打つ砧（きぬた）の音が響いてくる。", kimari: "みよ" },
  { no: 95, kami: "おほけなく うき世の民に おほふかな", shimo: "わがたつ杣に 墨染の袖", author: "前大僧正慈円", translation: "身の程知らずなことですが、このつらい世の中を生きる人々の苦しみを包み込んであげたいと思うのです。比叡山に住み始めたこの墨染の袖で。", kimari: "おほけ" },
  { no: 96, kami: "花さそふ 嵐の庭の 雪ならで", shimo: "ふりゆくものは わが身なりけり", author: "入道前太政大臣", translation: "桜の花を誘って散らす嵐が吹く庭は、まるで雪が降るようだが、実際に古びていくのは（花ではなく）私自身であったよ。", kimari: "はなさ" },
  { no: 97, kami: "こぬ人を まつほの浦の 夕なぎに", shimo: "焼くや藻塩の 身もこがれつつ", author: "権中納言定家", translation: "待っても来ない人を待つ私は、松帆の浦の夕凪のころに焼く藻塩のように、身も焦がれる思いで恋い慕っております。", kimari: "こぬ" },
  { no: 98, kami: "風そよぐ ならの小川の 夕暮れは", shimo: "みそぎぞ夏の しるしなりける", author: "従二位家隆", translation: "風がそよそよと吹く「ならの小川」の夕暮れは涼しくて秋のようだが、行われている禊（みそぎ）だけが、まだ夏であることの証拠なのだなあ。", kimari: "かぜそ" },
  { no: 99, kami: "人もをし 人も恨めし あぢきなく", shimo: "世を思ふゆゑに もの思ふ身は", author: "後鳥羽院", translation: "人が愛しくもあり、また恨めしくもある。つまらない世の中だと悩むために、あれこれと物思いをする私にとっては。", kimari: "ひとも" },
  { no: 100, kami: "百敷や 古き軒端の しのぶにも", shimo: "なほあまりある 昔なりけり", author: "順徳院", translation: "宮中の古びた建物の軒端に生えている忍ぶ草を見るにつけても、どれほどお慕いしても慕いきれないほど懐かしい、昔の御代であることよ。", kimari: "もも" },
]

type Mode = "menu" | "study" | "quiz"

export default function HyakuninIsshuApp() {
  const [mode, setMode] = useState<Mode>("menu")
  const [selectedPoem, setSelectedPoem] = useState<number | null>(null)
  const [currentPoem, setCurrentPoem] = useState<(typeof poems)[0] | null>(null)
  const [options, setOptions] = useState<typeof poems>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (mode === "quiz" && !currentPoem) {
      generateNewQuestion()
    }
  }, [mode])

  const generateNewQuestion = () => {
    const randomPoem = poems[Math.floor(Math.random() * poems.length)]
    setCurrentPoem(randomPoem)

    const wrongPoems = poems.filter((p) => p.no !== randomPoem.no)
    const selectedWrong = wrongPoems.sort(() => Math.random() - 0.5).slice(0, 3)
    const allOptions = [randomPoem, ...selectedWrong].sort(() => Math.random() - 0.5)
    setOptions(allOptions)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswerSelect = (selectedPoem: (typeof poems)[0]) => {
    if (!currentPoem) return
    setSelectedAnswer(selectedPoem.no)
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    generateNewQuestion()
  }

  if (mode === "menu") {
    return (
      <div className="h-[100dvh] bg-black flex flex-col items-center justify-center p-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 relative z-10"
        >
          <div className="space-y-2">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-red-500 tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              百人一首
            </h1>
            <p className="font-serif text-yellow-500 text-xl tracking-[0.5em] font-light uppercase">HYAKUNIN ISSHU</p>
            <p className="text-gray-500 text-sm mt-2">No.81 〜 100</p>
          </div>

          <div className="flex flex-col gap-4 mt-12 w-full max-w-xs mx-auto">
            <button
              onClick={() => setMode("study")}
              className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-serif text-lg font-bold tracking-wider shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all transform hover:scale-105 rounded-lg flex items-center justify-center"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              学習モード
            </button>
            <button
              onClick={() => setMode("quiz")}
              className="w-full h-16 bg-yellow-500 hover:bg-yellow-600 text-black font-serif text-lg font-bold tracking-wider shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all transform hover:scale-105 rounded-lg flex items-center justify-center"
            >
              <Brain className="mr-2 h-5 w-5" />
              クイズモード
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (mode === "study") {
    return (
      <div className="h-[100dvh] bg-black flex flex-col overflow-hidden relative">
        <div className="bg-gradient-to-b from-gray-900 to-black border-b border-red-500/30 p-4 shadow-[0_0_20px_rgba(239,68,68,0.3)] z-10">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl font-bold text-red-500 tracking-wider">学習モード</h1>
            <button
              onClick={() => setMode("menu")}
              className="text-gray-400 hover:text-white text-sm"
            >
              メニューへ
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-safe">
          {poems.map((poem) => (
            <div
              key={poem.no}
              className={`bg-gray-900/50 border border-gray-800 p-4 rounded-xl cursor-pointer transition-all hover:border-red-500/50 ${
                selectedPoem === poem.no ? "bg-red-900/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : ""
              }`}
              onClick={() => setSelectedPoem(selectedPoem === poem.no ? null : poem.no)}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-500 font-bold">No.{poem.no}</span>
                      <span className="text-xs text-gray-500 font-serif">{poem.author}</span>
                    </div>
                    <p className="font-serif text-white text-lg leading-relaxed">{poem.kami}</p>
                    <p className="font-serif text-gray-400 text-sm leading-relaxed">{poem.shimo}</p>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 text-red-500 transition-transform ${
                      selectedPoem === poem.no ? "rotate-90" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {selectedPoem === poem.no && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pt-4 border-t border-red-900/30 space-y-3 overflow-hidden"
                    >
                      <div className="bg-black/30 p-3 rounded border border-white/5">
                        <span className="text-yellow-500 text-xs font-bold block mb-1">現代語訳</span>
                        <p className="text-gray-300 text-sm leading-relaxed">{poem.translation}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-400 text-xs font-bold">決まり字:</span>
                        <span className="text-white font-serif">{poem.kimari}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
          <div className="h-20" /> {/* Bottom spacer */}
        </div>
      </div>
    )
  }

  if (mode === "quiz" && currentPoem) {
    const isCorrect = selectedAnswer === currentPoem.no
    const kamiLines = currentPoem.kami.split(" ")

    return (
      <div className="flex flex-col h-[100dvh] bg-black overflow-hidden relative selection:bg-red-900 selection:text-white">
        {/* 背景グリッド */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* 戻るボタン (左上固定) */}
        <div className="absolute top-4 left-4 z-50">
          <button
            onClick={() => setMode("menu")}
            className="p-2 bg-gray-900/80 hover:bg-gray-800 border border-red-500/50 rounded-lg text-red-500 hover:text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        {/* 1. 上の句エリア (高さ45% = 少し上げる) */}
        <div className="h-[45dvh] flex-none flex flex-col justify-end items-center pb-6 z-10 relative select-none">
          <motion.div
            key={currentPoem.no}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-3 px-4"
          >
            {kamiLines.map((line, index) => (
              <div 
                key={index} 
                className="font-serif text-3xl md:text-5xl text-red-500 font-bold leading-relaxed tracking-wider drop-shadow-[0_2px_10px_rgba(220,38,38,0.6)]"
              >
                {line}
              </div>
            ))}
          </motion.div>
        </div>

        {/* 2. 操作エリア */}
        <div className="flex-1 flex flex-col justify-end p-4 pb-8 relative z-10">
          <AnimatePresence mode="wait">
            {!showResult ? (
              // 選択肢ボタン
              <motion.div
                key="options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full space-y-3 max-w-md mx-auto"
              >
                {options.map((option, index) => (
                  <motion.div
                    key={option.no}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleAnswerSelect(option)}
                      className="w-full h-auto py-3 px-4 bg-gray-900/90 hover:bg-gray-800 text-gray-200 border border-indigo-900/30 rounded-xl font-serif text-lg text-left flex justify-start active:bg-red-900/40 active:border-red-500 transition-all"
                    >
                      {option.shimo}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // 結果表示
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full max-w-md mx-auto flex flex-col justify-between"
              >
                {/* 上側：結果カード */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-md mt-2 ${isCorrect ? "bg-red-950/80 border-red-500" : "bg-blue-950/80 border-blue-500"}`}
                >
                  <div className="text-center mb-2">
                    <span className={`text-xl font-bold tracking-widest ${isCorrect ? "text-red-400" : "text-blue-400"}`}>
                      {isCorrect ? "正解！" : "不正解..."}
                    </span>
                  </div>

                  <div className="text-center mb-2">
                    <p className="text-xl md:text-2xl font-serif text-white font-bold leading-relaxed tracking-tight">{currentPoem.shimo}</p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
                    <span>作者: {currentPoem.author}</span>
                    <span className="font-bold">No.{currentPoem.no}</span>
                  </div>
                </motion.div>

                {/* 下側：次へボタン */}
                <button
                  onClick={handleNextQuestion}
                  className="w-full h-14 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] text-lg tracking-wider flex items-center justify-center gap-2 active:scale-95"
                >
                  <RotateCcw className="w-5 h-5" /> 次へ
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return null
}