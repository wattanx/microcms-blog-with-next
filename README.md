# microCMS × Next.js example

[Demo](https://microcms-blog-with-next.vercel.app/)

## 機能

- 記事一覧
- カテゴリー別記事一覧
- 人気の記事一覧
- 最新の記事一覧
- 検索
- パンくずリスト
- 記事詳細
- 目次
- 著者
- SNS シェアボタン
- 関連記事

## 技術構成

- Next.js (SSG + SSR)
- microCMS (コンテンツ)
- Vercel (Hosting, API)

## microCMS の API スキーマ設定

本家 microCMS ブログの API スキーマと同じにしました。

### ブログ

endpoint: blog  
type: リスト形式

| フィールド ID | 表示名     | 種類                        |
| ------------- | ---------- | --------------------------- |
| title         | タイトル   | テキストフィールド          |
| category      | カテゴリー | コンテンツ参照 - カテゴリー |
| toc_visible   | 目次       | 真偽値                      |
| body          | 本文       | リッチエディタ              |
| description   | 概要       | テキストフィールド          |
| ogimage       | OGP 画像   | 画像                        |
| writer        | 著者       | コンテンツ参照 - 著者       |
| partner       | パートナー | コンテンツ参照 - パートナー |
| related_blogs | 関連記事   | 複数コンテンツ参照 - ブログ |

### 著者

endpoint: authors  
type: リスト形式

| フィールド ID | 表示名   | 種類               |
| ------------- | -------- | ------------------ |
| name          | 名前     | テキストフィールド |
| text          | 自己紹介 | テキストエリア     |
| image         | 画像     | 画像               |

### カテゴリー

endpoint: categories  
type: リスト形式

| フィールド ID | 表示名 | 種類               |
| ------------- | ------ | ------------------ |
| name          | 名前   | テキストフィールド |

### パートナー

endpoint: partners  
type: リスト形式

| フィールド ID | 表示名   | 種類               |
| ------------- | -------- | ------------------ |
| company       | 会社名   | テキストフィールド |
| url           | 会社 URL | テキストフィールド |
| description   | 説明文   | テキストエリア     |
| logo          | ロゴ     | 画像               |

### 人気の記事

endpoint: popular-articles  
type: オブジェクト形式

| フィールド ID | 表示名     | 種類                        |
| ------------- | ---------- | --------------------------- |
| articles      | 人気の記事 | 複数コンテンツ参照 - ブログ |

### バナー

endpoint: banner  
type: オブジェクト形式

| フィールド ID | 表示名       | 種類               |
| ------------- | ------------ | ------------------ |
| image         | 画像         | 画像               |
| url           | リンク先 URL | テキストフィールド |
| alt           | 代替テキスト | テキストフィールド |

## 環境変数

プロジェクトルートに`.env.local`ファイルを作成し、以下の項目を設定してください。

- MICROCMS_APIKEY（microCMS の API キー）
- SERVICE_ID（microCMS のサービス ID）
- NEXT_PUBLIC_BASEURL（ベースとなる URL、API Routes で使用します）

例:

```
MICROCMS_APIKEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
SERVICE_ID=your-service-id
NEXT_PUBLIC_BASEURL=hogehoge
```

## 開発方法

```bash
# パッケージをインストール
$ yarn install

# 開発サーバーを起動（localhost:3000）
$ yarn dev
```
