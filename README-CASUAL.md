# Retypeset 随心说 (Casual) 功能配置指南
Starter
本主题集成了“随心说”功能，支持从 Telegram 频道自动同步内容，并提供实时更新、标签筛选等功能。

## 1. 功能简介

- **数据源**：直接抓取公开的 Telegram 频道（无需 Telegram Bot Token）。
- **实时性**：用户访问页面时，通过 Serverless API 实时获取最新消息。
- **筛选**：支持通过 `#标签` 进行内容筛选。
- **纯净阅读**：自动清洗内容中的标签符号，提供更好的阅读体验。

## 2. 本地开发配置

由于网络环境原因，在中国大陆本地开发时，**必须**配置代理才能抓取 Telegram 数据。

### 启动方式

**Windows PowerShell:**
```powershell
$env:HTTPS_PROXY="http://127.0.0.1:7890"; pnpm dev
```

**Windows CMD:**
```cmd
set HTTPS_PROXY=http://127.0.0.1:7890 && pnpm dev
```
*(请将 `7890` 替换为您本地代理软件的实际端口)*

## 3. 部署配置 (Vercel)

项目已预配置为使用 `@astrojs/vercel` 适配器，可直接部署到 Vercel。

### 环境变量设置

在 Vercel 项目的 **Settings > Environment Variables** 中添加以下变量：

| 变量名 | 描述 | 是否必须 | 示例值 |
| :--- | :--- | :--- | :--- |
| `CASUAL_TELEGRAM_CHANNEL` | 您的 Telegram 频道用户名 (Username) | **是** | `hi_co1sini_casual` |
| `HTTPS_PROXY` | 代理服务器地址 | **否** (Vercel 环境通常不需要) | `http://proxy.example.com:8080` |

> **注意**：Vercel 的服务器通常位于海外，可以直接访问 Telegram API，因此**不需要**设置 `HTTPS_PROXY`，除非您部署在受限网络环境中。

## 4. 使用说明

1.  **创建频道**：创建一个 **公开 (Public)** 的 Telegram 频道。
2.  **发布内容**：
    *   直接发送文本、图片。
    *   使用 `#标签` (例如 `#生活`, `#Coding`) 来组织内容。
    *   主题会自动提取标签生成筛选器，并在正文中隐藏这些标签符号。
3.  **配置**：确保 `CASUAL_TELEGRAM_CHANNEL` 环境变量已设置为您的频道 ID。
4.  **访问**：打开博客的 `/casual` (或对应语言路径) 即可查看。

## 5. 常见问题

*   **Q: 页面一直显示 "Loading..." 或 "Failed to load updates"？**
    *   **本地**：检查终端是否有报错，确认 `HTTPS_PROXY` 是否配置正确且代理软件已开启。
    *   **Vercel**：检查 `CASUAL_TELEGRAM_CHANNEL` 是否填写正确，查看 Vercel Logs 中的 Function 日志是否有超时或连接错误。

*   **Q: 图片不显示？**
    *   Telegram 图片链接有时具有时效性或防盗链限制。目前的实现是直接引用 Telegram 的图片地址。如果遇到问题，后续可能需要实现图片代理或缓存机制。
