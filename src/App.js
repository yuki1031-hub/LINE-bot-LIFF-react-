import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";

// 作った3つのファイルを読み込む
import Home from "./Home";
import Diagnosis from "./Diagnosis";
import AdChatbot from "./AdChatbot";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 👇 URLごとの行き先を設定する場所 */}

          {/* トップページ (https://.../) */}
          <Route path="/" element={<Home />} />

          {/* 診断アプリ (https://.../diagnosis) */}
          <Route path="/diagnosis" element={<Diagnosis />} />

          {/* 広告チャット (https://.../chat) */}
          <Route path="/chat" element={<AdChatbot />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
