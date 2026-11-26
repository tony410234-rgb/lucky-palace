# 럭키 팰리스

- `docs/` — 게임 본체 (GitHub Pages로 공개됨). **업데이트는 여기만 바꾸면 끝.** 앱을 다시 열면 새 버전이 나와요.
- `android/` — 안드로이드 앱 껍데기. 바꿀 일 거의 없음. 바뀌면 Actions가 APK를 새로 만들어 Releases에 올려요.

## 처음 한 번만
1. 이 폴더 내용물 전체를 새 저장소 `lucky-palace`에 업로드 (`.github` 폴더 포함).
2. Settings → Pages → Source: **Deploy from a branch**, Branch: **main**, 폴더: **/docs** → Save.
3. Actions 탭에서 "Build APK"가 끝나면 Releases → latest → `LuckyPalace.apk`를 폰에서 받아 설치.

## 업데이트할 때
`docs/` 안의 파일(index.html, games.js, audio.js, app.js)만 새 파일로 교체해서 커밋 → 1~2분 뒤 앱 재실행하면 반영.
