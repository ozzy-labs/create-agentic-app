# Git ワークフロールール

## ブランチ

- `main` から新しいブランチを作成する
- 命名規則: `<type>/<short-description>`（例: `feat/add-auth`, `fix/login-error`）
- type: feat, fix, docs, style, refactor, perf, test, build, ci, chore

## コミット

Conventional Commits 形式を使用する:

```text
<type>[optional scope]: <description>
```

- type は上記のブランチ type と同一
- description は英語で、簡潔に変更内容を記述
- 破壊的変更: type 後に `!`（例: `feat!: remove legacy api`）

## PR

- マージ方法: **squash merge のみ**
- PR タイトル: `<type>[optional scope]: <description>`（コミット規約と同じ形式）
- マージ後に feature branch を削除する

## Lefthook フック

- **commit-msg**: commitlint でメッセージ形式を検証
- **pre-commit**: 各リンター・フォーマッター + セキュリティが並列実行
  - markdownlint, yamlfmt, yamllint, shellcheck, shfmt, taplo
  - dockerfmt, hadolint, actionlint, gitleaks
<!-- SECTION:PRE_COMMIT_TOOLS -->
- **pre-push**: <!-- SECTION:GIT_WORKFLOW_PRE_PUSH -->

## 禁止事項

- `main` への直接 push
- `--force` push
- `.env` ファイルのステージング
- `--no-verify` でのフックスキップ
