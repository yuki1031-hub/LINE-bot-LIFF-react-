import { useState, useEffect } from "react";
import liff from "@line/liff"; // LIFF機能をインポート
import "./styles.css";

// =================================================================
// 📝 設定 1：共通の選択肢
// =================================================================
const COMMON_OPTIONS = [
  { text: "非常にそう思う ", score: 4 },
  { text: "そう思う ", score: 3 },
  { text: "そう思わない ", score: 2 },
  { text: "全くそう思わない ", score: 1 },
];

// =================================================================
// 📝 設定 2：質問文（全9問）
// =================================================================
const questions = [
  { id: 1, text: "休日は家でゆっくりするよりも、外に出かけたい派だ " },
  { id: 2, text: "初対面の人とも緊張せずに話せる方だ " },
  { id: 3, text: "レストランのメニューは直感で即決する " },
  { id: 4, text: "計画を立てて行動するより、その場のノリが大事だ " },
  { id: 5, text: "一人で作業するより、チームでワイワイやるのが好きだ " },
  { id: 6, text: "新しいガジェットや流行りの店にはすぐに飛びつく " },
  { id: 7, text: "感情が顔に出やすいと言われることがある " },
  { id: 8, text: "リスクがあっても、リターンが大きい勝負を選びたい " },
  { id: 9, text: "過去の失敗をいつまでも引きずらない方だ " },
];

// =================================================================
// 📝 設定 3：診断結果
// =================================================================
// ⚠️ フォルダ名 "/image/"
const results = [
  {
    type: "A",
    title: "織田信長タイプでした🌈",
    image: "/image/type-a.png",
    minScore: 0,
    maxScore: 4,
  },
  {
    type: "B",
    title: "坂本龍馬タイプでした🌈",
    image: "/image/type-b.png",
    minScore: 5,
    maxScore: 8,
  },
  {
    type: "C",
    title: "諸葛孔明タイプでした🌈",
    image: "/image/type-c.png",
    minScore: 9,
    maxScore: 12,
  },
  {
    type: "D",
    title: "豊臣秀吉タイプでした🌈",
    image: "/image/type-d.png",
    minScore: 13,
    maxScore: 16,
  },
  {
    type: "E",
    title: "ダ・ヴィンチタイプでした🌈",
    image: "/image/type-e.png",
    minScore: 17,
    maxScore: 20,
  },
  {
    type: "F",
    title: "ナイチンゲールタイプでした🌈",
    image: "/image/type-n.png",
    minScore: 21,
    maxScore: 24,
  },
  {
    type: "G",
    title: "エジソンタイプでした🌈",
    image: "/image/type-g.png",
    minScore: 25,
    maxScore: 28,
  },
  {
    type: "H",
    title: "マリー・アントワネットタイプでした🌈",
    image: "/image/type-h.png",
    minScore: 29,
    maxScore: 999,
  },
];

// =================================================================
// ⚙️ ロジック部分
// =================================================================

export const Diagnosis = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finishedResult, setFinishedResult] = useState(null);

  // ユーザー名（LINEの名前）
  const [userName, setUserName] = useState("ゲスト");

  // ■■■ LIFFの初期化と名前取得 ■■■
  useEffect(() => {
    // あなたのLIFF IDを指定
    liff
      .init({ liffId: "2009029412-d1KRC9Mp" })
      .then(() => {
        // LINE内ブラウザなどでログイン状態ならプロフィール取得
        if (liff.isLoggedIn()) {
          liff
            .getProfile()
            .then((profile) => {
              setUserName(profile.displayName);
            })
            .catch((err) => {
              console.error("プロフィールの取得に失敗しました", err);
            });
        }
      })
      .catch((err) => {
        console.error("LIFFの初期化に失敗しました", err);
      });
  }, []);

  const handleStart = () => {
    setIsStarted(true);
  };

  // 再診断用の関数
  const handleRestart = () => {
    setIsStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setFinishedResult(null);
  };

  const handleClickAnswer = (optionScore) => {
    const newScore = score + optionScore;
    setScore(newScore);

    const nextQuestion = currentQuestionIndex + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      const result = results.find(
        (r) => newScore >= r.minScore && newScore <= r.maxScore
      );
      setFinishedResult(result);
    }
  };

  return (
    <div className="container">
      {finishedResult ? (
        /* ■■ 結果画面（テキスト＋画像＋再診断ボタン） ■■ */
        <div className="result-screen">
          {/* テキスト表示 */}
          <h2>
            {userName}のタイプは
            <br />
            {finishedResult.title}
          </h2>

          {/* 画像表示（結果データに紐づく画像） */}
          <img
            src={finishedResult.image}
            alt={finishedResult.title}
            className="result-image"
          />

          {/* ▼▼▼ 追加：独立した再診断エリア ▼▼▼ */}
          <div
            style={{
              marginTop: "40px",
              borderTop: "1px solid #eee",
              paddingTop: "20px",
              width: "100%",
            }}
          >
            <button onClick={handleRestart} className="restart-btn">
              最初から診断しなおす👀
            </button>
          </div>
          {/* ▲▲▲ 追加終わり ▲▲▲ */}
        </div>
      ) : !isStarted ? (
        /* ■■ スタート画面 ■■ */
        <div className="start-screen">
          <div className="line-icon">👻</div>

          <div className="speech-bubble">
            <p>こんにちは！{userName}さん✨</p>
            <p>あなたの性格を9つの質問で診断します💡</p>
            <p>悩まずに直観的に選んでください！👇</p>
          </div>

          <img src="/image/start.png" alt="スタート" className="main-image" />

          {/* ▼▼▼ ここを元に戻しました（画像タグではなくテキスト） ▼▼▼ */}
          <button onClick={handleStart} className="start-btn">
            診断をスタートする 🚀
          </button>
          {/* ▲▲▲ 修正完了 ▲▲▲ */}
        </div>
      ) : (
        /* ■■ 質問画面 ■■ */
        <div className="question-screen" key={currentQuestionIndex}>
          <div className="line-icon">👻</div>

          <div className="speech-bubble">
            <div className="progress-text">
              Q.{questions[currentQuestionIndex].id} / {questions.length}
            </div>
            <h2 className="question-text">
              {questions[currentQuestionIndex].text}
            </h2>
          </div>

          <div className="button-container">
            {COMMON_OPTIONS.map((option) => (
              <button
                key={option.text}
                onClick={() => handleClickAnswer(option.score)}
                className="option-btn"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <Diagnosis />
    </div>
  );
}
