# Basketball Videos Directory

This directory contains videos for the basketball teams showcased in basketball.html.

## 📁 File Structure
```
assets/videos/
├── dept-final-game.mp4          # 系際盃決賽精華
├── dept-final-game.webm         # 系際盃決賽精華 (WebM格式)
├── dept-training.mp4            # 訓練日常
├── dept-training.webm           # 訓練日常 (WebM格式)
├── dept-team-building.mp4       # 團隊活動
├── dept-team-building.webm      # 團隊活動 (WebM格式)
├── school-highlights.mp4        # 校隊比賽集錦
├── outlier-weekend.mp4          # 週末聯盟比賽
└── lunch-club-fun.mp4           # Lunch Club 趣味時刻
```

## 🎬 影片格式建議
- **MP4**: 主要格式，支援度最高
- **WebM**: 備用格式，檔案較小
- **解析度**: 建議 1080p (1920x1080) 或 720p (1280x720)
- **檔案大小**: 建議每部影片小於 50MB
- **長度**: 建議 30秒 - 3分鐘

## 🖼️ Poster 圖片
- 使用現有的照片作為影片封面 (poster 屬性)
- 當影片尚未載入時顯示
- 提供更好的使用者體驗

## 🎯 HTML5 Video 功能
- **controls**: 顯示播放控制器 (播放/暫停/音量/進度條)
- **poster**: 影片封面圖片
- **preload**: 預載選項 (none/metadata/auto)
- **autoplay**: 自動播放 (建議不要使用)
- **muted**: 靜音播放
- **loop**: 循環播放

## 💡 使用範例
```html
<video width="800" height="450" controls poster="cover-image.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  你的瀏覽器不支援影片播放。
</video>
```

## 📱 響應式設計
- CSS 已設定為響應式，影片會自動縮放
- 在手機上會調整為單欄顯示
- 維持影片比例不變形