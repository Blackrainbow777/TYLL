<div align="center">

# 🧒 童语乐乐 —— 面向儿童的智慧教育物联网陪伴与安全预警终端

**让每一次童言稚语，都被温柔守护**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com)
[![License](https://img.shields.io/badge/License-Apache%202.0-green)](LICENSE)

</div>

---

## 📖 项目简介

**童语乐乐** 是一套面向 **3～12 岁儿童**的 IoT 智能伴学终端系统，以 **树莓派** 为核心硬件载体，融合 **AI 对话陪伴**、**声纹唤醒**、**家庭环境安全监测** 与 **家长云端管控** 于一体。

孩子说一声 **「乐乐」**，AI 伙伴即刻响应；烟雾/燃气传感器实时守护，家长端随时掌握孩子的成长动态与家庭安全状态。

---

## ✨ 核心功能

### 🎙️ 儿童端
| 功能 | 说明 |
|------|------|
| **标准模式（3-5岁）** | 大按钮极简 UI，按住说话即可与 AI 对话，专为幼儿设计 |
| **进阶模式（6岁+）** | 声纹绑定后免唤醒词连续对话，支持多轮上下文 |
| **唤醒词召唤** | 呼叫「乐乐」激活 AI 伙伴，仅主人声纹可唤醒 |
| **烟雾/燃气检测** | 硬件传感器联动，异常时界面实时警报 |

### 👨‍👩‍👧 家长云端管控台
| 模块 | 说明 |
|------|------|
| 📊 **主页看板** | 设备在线状态、今日对话次数、报警总览一目了然 |
| 💬 **聊天记录** | 查看孩子与 AI 的完整对话历史，支持情绪/话题标签筛选 |
| 🚨 **安全警报** | 烟雾、燃气、CO、温度异常等报警事件管理与处置 |
| 📈 **成长报告** | 孩子语言发展与互动数据可视化分析 |
| 📱 **设备管理** | 绑定/解绑树莓派设备，自定义唤醒词与声纹管理 |
| 🔒 **内容管控** | 防沉迷时间管控、内容过滤白名单设置 |
| 🎙️ **远程陪伴** | 家长远程语音陪伴，实时互动 |
| ⚙️ **系统设置** | 账号、通知、隐私等偏好配置 |

---

## 🏗️ 技术架构

```
TYLL/
├── 📁 TYLLWEB/                  # 前端应用（React + Vite）
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx        # 登录页
│   │   │   ├── Register.tsx     # 注册页
│   │   │   ├── StandardMode.tsx # 儿童标准模式（3-5岁）
│   │   │   ├── AdvancedMode.tsx # 儿童进阶模式（6岁+）
│   │   │   ├── ParentDashboard.tsx  # 家长管控台
│   │   │   └── ParentSubPages.tsx   # 管控台子页面
│   │   ├── App.tsx              # 路由入口
│   │   └── main.tsx
│   └── vite.config.ts
│
└── 📁 tongyulele-server/        # 后端服务（Node.js + Express）
    ├── server.js                # 服务主入口
    ├── init-demo-data.js        # 演示数据初始化
    └── sql/
        └── init_schema.sql      # 数据库建表脚本
```

### 🛠️ 技术栈

**前端**
- ⚛️ React 19 + TypeScript 5.8
- ⚡ Vite 6 构建工具
- 🎨 Tailwind CSS 4 样式框架
- 🧭 React Router DOM 7 路由
- 🤖 Google Gemini AI SDK
- 💫 Motion 动画库

**后端**
- 🟢 Node.js + Express 4
- 🗄️ MySQL 8.0（mysql2/promise 连接池）
- 🌐 CORS 跨域支持

**硬件**
- 🍓 树莓派（Raspberry Pi）
- 🔥 烟雾 / 燃气 / CO / 温度传感器
- 🎤 麦克风模组（声纹唤醒）

---

## 🗄️ 数据库设计

| 表名 | 说明 |
|------|------|
| `t_user` | 家长账号及孩子基本信息（声纹 ID、生日、性别等） |
| `t_device` | 树莓派设备管理（序列号、在线状态、唤醒词配置） |
| `t_chat_record` | 孩子与 AI 的完整聊天记录（含情绪标签、话题标签） |
| `t_alarm` | 安全报警事件（烟雾/燃气/CO/温度，含处置状态） |

---

## 🚀 快速启动

### 📋 环境要求

- Node.js ≥ 18
- MySQL 8.0（监听 `127.0.0.1:3306`）
- 数据库账号：`root` / 密码：`root`

### 1️⃣ 初始化数据库

```sql
CREATE DATABASE tongyulele CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

然后执行建表脚本：

```bash
mysql -u root -p tongyulele < tongyulele-server/sql/init_schema.sql
```

### 2️⃣ 启动后端服务

```bash
cd tongyulele-server
npm install
npm start
# 服务运行在 http://localhost:3001
```

### 3️⃣ 启动前端应用

```bash
cd TYLLWEB
npm install
npm run dev
# 应用运行在 http://localhost:3000
```

### 4️⃣ 打开浏览器

访问 [http://localhost:3000](http://localhost:3000) 即可体验完整应用 🎉

---

## 🔌 API 接口文档

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/health` | 服务健康检查 |
| `POST` | `/api/chat` | 保存孩子与 AI 的聊天记录 |
| `POST` | `/api/alarm` | 上报传感器安全报警事件 |
| `GET` | `/api/alarms` | 查询报警记录列表（支持类型/状态/设备筛选） |

### 📤 聊天记录上报示例

```json
POST /api/chat
{
  "user_id": 1,
  "device_id": 1,
  "content_text": "乐乐，今天天气怎么样？",
  "role": 1,
  "emotion_tag": "happy",
  "topic_tag": "weather"
}
```

### 🚨 安全报警上报示例

```json
POST /api/alarm
{
  "device_id": 1,
  "user_id": 1,
  "alarm_type": 1,
  "alarm_level": 3,
  "sensor_value": 450.5,
  "sensor_unit": "ppm"
}
```

> 报警类型：`1`-烟雾 `2`-燃气 `3`-CO `4`-温度异常 `5`-其他  
> 报警等级：`1`-低 `2`-中 `3`-高 `4`-紧急

---

## 📱 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 登录页 | 账号密码登录入口 |
| `/register` | 注册页 | 新用户注册 |
| `/standard` | 标准模式 | 幼儿（3-5岁）极简交互界面 |
| `/advanced` | 进阶模式 | 大龄儿童（6岁+）声纹免唤醒界面 |
| `/parent` | 家长管控台 | 八大功能模块的管理后台 |

---

## 🔒 安全说明

- 🛡️ 声纹绑定保护：仅注册声纹可唤醒设备
- 🔑 密码哈希存储（bcrypt）
- 🌐 CORS 白名单限制，防止非授权域名请求
- 📋 所有报警事件留存完整处置记录
- 🚫 `.env` 文件已加入 `.gitignore`，API Key 不入库

---

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交代码：`git commit -m "feat: 描述你的改动"`
4. 推送分支：`git push origin feature/your-feature`
5. 提交 Pull Request

---

## 📄 许可证

本项目基于 [Apache 2.0 License](LICENSE) 开源。

---

<div align="center">

**🧒 童语乐乐 —— 让 AI 成为孩子最温暖的成长伙伴**

Made with ❤️ by [Blackrainbow777](https://github.com/Blackrainbow777)

</div>
