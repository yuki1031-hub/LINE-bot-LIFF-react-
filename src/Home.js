import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Home = () => {
  return (
    <div className="container home-container">
      <h1>My Portfolio 📂</h1>
      <p>作成したアプリ一覧</p>
      
      <div className="menu-list">
        {/* 診断アプリへのボタン */}
        <Link to="/diagnosis" className="menu-btn diagnosis-btn">
          🏛️ 偉人タイプ診断
        </Link>

        {/* 広告チャットへのボタン */}
        <Link to="/chat" className="menu-btn chat-btn">
          💬 広告チャットボット
        </Link>
        
        {/* 将来のFigmaアプリ（まだ準備中） */}
        <button className="menu-btn disabled-btn">
          🎨 Figma再現 (準備中)
        </button>
      </div>
    </div>
  );
};

export default Home;