# MIXTEND Calendar Application

Flight PHP + React + TypeScript でのカレンダーアプリケーション

## 必要要件

- Docker
- Docker Compose

## セットアップと起動

1. リポジトリをクローンまたはダウンロード

2. Dockerコンテナを起動:
```bash
docker-compose up -d --build
```

3. アプリケーションにアクセス:
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:8000

## API エンドポイント

- `GET /api/meetings` - ミーティングスケジュールを取得

## 技術スタック

### バックエンド
- PHP 8.1
- Flight PHP Framework

### フロントエンド
- React 18
- TypeScript
- Axios (API通信)

## 停止方法

```bash
docker-compose down
```
