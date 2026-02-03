import React, { useState } from "react";
import "./styles.css"; // 既存のスタイルを一部借用します

const AdChatbot = () => {
  // ▼ ここが「シナリオ（YAMLの代わり）」です！
  // 業務で書いていたロジックをここで定義します
  const scenarios = {
    intro: {
      text: "こんにちは！🌟\n最近、お肌の調子はいかがですか？",
      options: [
        { label: "乾燥が気になる", nextId: "dry_skin" },
        { label: "毛穴が気になる", nextId: "pores" },
        { label: "絶好調！", nextId: "good" },
      ],
    },
    dry_skin: {
      text: "乾燥は敵ですよね💦\nそんなあなたには「高保湿ヒアルロン酸化粧水」がおすすめです！",
      image:
        "https://placehold.jp/30/87cefa/ffffff/300x200.png?text=MoistLotion", // 商品画像のダミー
      options: [
        { label: "詳しく見る", nextId: "detail_moist" },
        { label: "他には？", nextId: "intro" },
      ],
    },
    pores: {
      text: "毛穴ケアならこれ！✨\n「ビタミンC配合 美容液」でつるつる肌を目指しませんか？",
      image:
        "https://placehold.jp/30/ffebcd/333333/300x200.png?text=VitaminSerum",
      options: [
        { label: "詳しく見る", nextId: "detail_vitamin" },
        { label: "戻る", nextId: "intro" },
      ],
    },
    good: {
      text: "素晴らしいですね！👏\n今の状態をキープするために、このクリームもチェックしてみてください。",
      options: [{ label: "見てみる", nextId: "intro" }],
    },
    detail_moist: {
      text: "ありがとうございます！\n商品ページはこちらです👇\n(ここにLPへのリンクなどを置きます)",
      options: [{ label: "最初に戻る", nextId: "intro" }],
    },
    detail_vitamin: {
      text: "ありがとうございます！\nビタミンパワーで元気に！🍋\n(ここにLPへのリンクなどを置きます)",
      options: [{ label: "最初に戻る", nextId: "intro" }],
    },
  };

  // ▼ ここからが「Reactのロジック」です
  const [currentId, setCurrentId] = useState("intro"); // 今どのシナリオを表示しているか

  // 現在のシナリオデータを取得
  const currentScenario = scenarios[currentId];

  // 選択肢をクリックしたときの処理
  const handleOptionClick = (nextId) => {
    setCurrentId(nextId);
  };

  return (
    <div className="container ad-container">
      <div className="chat-box">
        {/* ボットのメッセージ */}
        <div className="bot-message">
          <div className="bot-icon">🤖</div>
          <div className="message-bubble">
            {currentScenario.text.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 画像がある場合は表示 */}
        {currentScenario.image && (
          <div className="chat-image">
            <img src={currentScenario.image} alt="Product" />
          </div>
        )}

        {/* ユーザーの選択肢ボタン */}
        <div className="options-area">
          {currentScenario.options.map((option, index) => (
            <button
              key={index}
              className="option-btn"
              onClick={() => handleOptionClick(option.nextId)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdChatbot;
