# 资源分享站 - 部署指南

## 项目概述
这是一个包含管理后台的资源分享网站，您可以通过管理后台添加、编辑和删除网盘资源。

## 获取代码
1. 将项目代码克隆到本地：
   ```bash
   git clone <repository-url>
   cd resource-sharing-platform
   ```

2. 安装依赖：
   ```bash
   pnpm install
   ```

## 本地开发
1. 启动开发服务器：
   ```bash
   pnpm dev
   ```

2. 在浏览器中访问：`http://localhost:3000`

3. 管理后台访问：`http://localhost:3000/admin/login`
   - 用户名：admin
   - 密码：password123

## 部署到Vercel
1. **准备工作**：
   - 将代码推送到GitHub仓库
   - 注册并登录Vercel账号：https://vercel.com/signup

2. **部署步骤**：
   - 在Vercel dashboard中点击"New Project"
   - 导入您的GitHub仓库
   - 配置项目设置：
     - Framework Preset: Vite
     - Build Command: pnpm build
     - Output Directory: dist/static
   - 点击"Deploy"开始部署

3. 部署完成后，Vercel会提供一个URL，您可以通过该URL访问您的网站。

## 项目结构
- `/src/pages/Home.tsx` - 首页
- `/src/pages/Admin` - 管理后台相关页面
- `/src/mocks/resources.ts` - 资源数据管理