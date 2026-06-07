# MCP / CLI 连接方案

## CLI 形式

CLI 是第一版最稳定的连接方式，适合 Codex、Cursor、Claude Code 等工具直接读写本地文件。

```powershell
npm run bridge -- sample
npm run bridge -- prompt
npm run bridge -- validate data/inbox/strategy_result.json
```

流程：

1. `sample` 生成 `data/outbox/account_snapshot.json`。
2. AI 编程工具读取账号快照，并按提示词生成 `strategy_result.json`。
3. `validate` 校验结果字段，并复制到 `data/inbox/strategy_result.json`。
4. 网页后续读取 inbox，把结果转成投放计划草稿、直播话术和验收清单。

## MCP 形式

后续可把 CLI 封装为 MCP server，向 Codex 暴露工具和资源：

Resources:

- `douyin-live://workspace`
- `douyin-live://account-snapshot`
- `douyin-live://strategy-result`

Tools:

- `get_account_snapshot`
- `write_strategy_result`
- `validate_strategy_result`
- `list_import_files`
- `create_campaign_draft`

安全边界：

- MCP 只读账号数据和写入草稿，不直接发布广告。
- 真实广告投放仍需人工在官方后台确认。
- 评论回复只生成建议，不自动刷屏。
