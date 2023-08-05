## 初回環境構築
```sh
npm install
cp .env.example .env
```

## Sass起動
```sh
npm run sass
```

## OpenWeatherのAPI設定
### アカウント作成する
https://openweathermap.org/
### APIキーを`.env`ファイルにコピぺ
https://home.openweathermap.org/api_keys
### 導通テスト
```sh
node js/api_test.js
```