# リンター・フォーマッター追加ガイド

新しいリンター/フォーマッターをこのリポジトリに追加する際に更新が必要な箇所のチェックリストです。

> **Note**: 生成プロジェクトにリンター/フォーマッターを追加する場合は、プリセットとして実装します。
> [docs/preset-authoring.md](preset-authoring.md) を参照してください。

## チェックリスト

### 1. ツールのインストール

- [ ] `.mise.toml` にツールとバージョンプレフィックスを追加
- [ ] `mise install` で動作確認
- [ ] バージョンが最新安定版であることを確認（プレリリース版を避ける）

### 2. 設定ファイル

- [ ] ツール固有の設定ファイルを作成（例: `.hadolint.yaml`）
- [ ] プロジェクトの規約に合わせた設定（インデント 2、行幅 100、LF 等）
- [ ] exclude/ignore パターンの設定（`node_modules`, `templates`, `dist` 等）

### 3. package.json

- [ ] `scripts` に `lint:<name>` を追加
- [ ] `lint:all` に含めるか判断し、必要なら `lint:all` の `&&` チェーンに追加
- [ ] `lint:all` に含めない場合、コメントでその旨を明記

### 4. lefthook.yaml（pre-commit）

- [ ] フォーマッター → `stage_fixed: true` 付きで追加
- [ ] リンター → `glob` パターンを設定して追加
- [ ] フォーマッターとリンターの実行順序が正しいことを確認（フォーマッター先）
- [ ] CI やローカルコマンドとオプションが一致していることを確認

### 5. CI ワークフロー（`.github/workflows/ci.yaml`）

- [ ] lint ステップを追加
- [ ] package.json の `lint:<name>` コマンドと**同じオプション**を使用
- [ ] 前提条件があるツールは適切な位置に配置

### 6. ドキュメント

- [ ] `CLAUDE.md` — Tech Stack (Linting/Formatting)
- [ ] `CLAUDE.md` — Key Commands (lint コマンド一覧)
- [ ] `CLAUDE.md` — Coding Conventions (規約追加)
- [ ] `.claude/skills/lint-rules/SKILL.md` — 拡張子別コマンド表
- [ ] `docs/branch-strategy.md` — Lefthook フック構成

### 7. 整合性確認

- [ ] `pnpm run lint:all` が通ること
- [ ] `pnpm test` が通ること
- [ ] 各場所でのコマンドオプションが一致していること:
  - package.json scripts
  - `.github/workflows/ci.yaml`
  - lefthook.yaml
  - `.claude/skills/lint-rules/SKILL.md`

## 対象ファイルのクイックリファレンス

| 更新箇所 | ファイル |
|----------|---------|
| ツール定義 | `.mise.toml` |
| ツール設定 | プロジェクトルートの設定ファイル |
| npm scripts | `package.json` |
| Git hooks | `lefthook.yaml` |
| CI | `.github/workflows/ci.yaml` |
| プロジェクトガイダンス | `CLAUDE.md` |
| Lint ルール | `.claude/skills/lint-rules/SKILL.md` |
| ブランチ戦略 | `docs/branch-strategy.md` |
