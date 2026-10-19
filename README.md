# Homebox (Cloudflare Pages 纯静态版)

本项目是 xgheaven/homebox 的纯静态移植版本，沿用原版 UI 与交互，无需 Cloudflare Worker 或任何后端服务，可直接部署于 Cloudflare Pages。

## 特性

- 保持原版 UI 与交互逻辑（基于 React 18 与 Blueprint.js 5）。
- 纯静态运行：无需配置 Functions 或 Worker，无调用配额限制。
- 默认端点：使用 Cloudflare 测速端点（speed.cloudflare.com）进行 Ping、下载与上传测试。
- 自定义端点：支持在高级设置中指定私有 Homebox 节点地址进行局域网测速。

## 部署说明

### 方式一：直接上传构建产物（推荐）

1. 在 Cloudflare Dashboard 中创建 Pages 项目，选择 Direct Upload。
2. 上传本项目根目录下的 `dist` 文件夹即可完成部署。

### 方式二：Git 仓库自动构建

- Framework preset: None
- Build command: pnpm build
- Build output directory: dist
- Node.js 版本: >= 18

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm start

# 构建静态产物到 dist 目录
pnpm build

# 运行测试与类型检查
pnpm test
pnpm typecheck
```

## 许可协议

MIT
