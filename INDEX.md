# 项目总控索引：树洞·3分钟情绪急救箱

## 项目信息
- **项目名称**: 树洞·3分钟情绪急救箱
- **项目描述**: 专为14-30岁青少年设计的情绪急救工具
- **技术栈**: Vue 3 + Vite + Tailwind CSS v4 + SCSS
- **包管理器**: Yarn
- **创建时间**: 2026-06-20
- **最后更新**: 2026-06-20 01:25

## 技术需求摘要

### 功能清单（基于 PRD）
| 功能 | 优先级 | 状态 |
|------|--------|------|
| 情绪选择（5种） | P0 | ✅ 已实现 |
| 情绪程度调节 | P0 | ✅ 已实现 |
| 动作推荐 | P0 | ✅ 已实现 |
| 深呼吸引导 | P0 | ✅ 已实现 |
| 匿名留言 | P1 | ✅ 已实现 |
| 树洞消息墙 | P1 | ✅ 已实现 |
| 情绪日记 | P2 | ✅ 已实现 |
| 音乐推荐 | P2 | ✅ 已实现 |
| 主题切换 | - | ✅ 已实现 |

### 配色方案
- **主色**: #8B5CF6（薰衣草紫）
- **焦虑**: #93C5FD（雾霾蓝）
- **愤怒**: #FCA5A5（玫瑰粉）
- **孤独**: #7DD3FC（天空蓝）
- **低落**: #FDBA74（暖橙色）
- **迷茫**: #C4B5FD（薰衣草紫）

---

## 任务清单

| 任务ID | 任务名称 | 类型 | 阶段 | 优先级 | 状态 | 日志文件 | 产出物 | 完成时间 |
|--------|---------|------|------|--------|------|---------|--------|----------|
| TASK-001 | 初始化Vue项目 | 前端 | 项目初始化 | P0 | ✅ 已完成 | [docs/dev_logs/TASK-001.md](docs/dev_logs/TASK-001.md) | vite.config.js, index.html | 2026-06-20 00:26 |
| TASK-002 | 配置Tailwind CSS和SCSS | 前端 | 样式配置 | P0 | ✅ 已完成 | [docs/dev_logs/TASK-002.md](docs/dev_logs/TASK-002.md) | src/assets/styles/main.scss | 2026-06-20 00:25 |
| TASK-003 | 创建EmotionCard组件 | 前端 | 组件开发 | P0 | ✅ 已完成 | [docs/dev_logs/TASK-003.md](docs/dev_logs/TASK-003.md) | src/components/EmotionCard.vue | 2026-06-20 00:26 |
| TASK-004 | 创建ActionCard组件 | 前端 | 组件开发 | P0 | ✅ 已完成 | [docs/dev_logs/TASK-004.md](docs/dev_logs/TASK-004.md) | src/components/ActionCard.vue | 2026-06-20 00:27 |
| TASK-005 | 创建BreathingGuide组件 | 前端 | 组件开发 | P0 | ✅ 已完成 | [docs/dev_logs/TASK-005.md](docs/dev_logs/TASK-005.md) | src/components/BreathingGuide.vue | 2026-06-20 00:28 |
| TASK-006 | 实现App.vue主逻辑 | 前端 | 业务逻辑 | P0 | ✅ 已完成 | [docs/dev_logs/TASK-006.md](docs/dev_logs/TASK-006.md) | src/App.vue | 2026-06-20 00:35 |
| TASK-007 | 创建情绪数据文件 | 前端 | 数据层 | P0 | ✅ 已完成 | [docs/dev_logs/TASK-007.md](docs/dev_logs/TASK-007.md) | src/data/emotions.js | 2026-06-20 00:23 |
| TASK-008 | 启动开发服务器 | DevOps | 开发环境 | P0 | ✅ 已完成 | [docs/dev_logs/TASK-008.md](docs/dev_logs/TASK-008.md) | http://localhost:5173/ | 2026-06-20 00:35 |
| TASK-009 | 组件化重构 | 前端 | 组件开发 | P0 | ✅ 已完成 | [docs/dev_logs/TASK-009.md](docs/dev_logs/TASK-009.md) | MessageWall, DiaryView, MusicPlayer, IntensitySlider | 2026-06-20 01:25 |

---

## 项目结构

```
hole3minute/
├── src/
│   ├── App.vue                    # 主应用组件
│   ├── main.js                    # 入口文件
│   ├── components/                # 组件目录
│   │   ├── EmotionCard.vue        # 情绪卡牌组件
│   │   ├── ActionCard.vue         # 动作卡片组件
│   │   ├── BreathingGuide.vue     # 深呼吸引导组件
│   │   ├── IntensitySlider.vue     # 程度滑动条组件
│   │   ├── MessageWall.vue        # 树洞消息墙组件
│   │   ├── DiaryView.vue          # 情绪日记组件
│   │   └── MusicPlayer.vue        # 音乐播放器组件
│   ├── data/                      # 数据目录
│   │   └── emotions.js            # 情绪数据
│   └── assets/                    # 资源目录
│       └── styles/
│           └── main.scss          # 主样式文件
├── docs/                          # 文档目录
│   ├── PRD-树洞·3分钟情绪急救箱.md
│   ├── PRD-技术需求.md            # 技术需求文档
│   ├── 开发计划.md                 # 开发计划
│   ├── 树洞·3分钟情绪急救箱.html  # 参考原型
│   └── dev_logs/                   # 开发日志
│       ├── TASK-001.md ~ TASK-009.md
├── INDEX.md                       # 项目总控索引（本文件）
├── vite.config.js                # Vite 配置
├── package.json                   # 依赖清单
├── yarn.lock                      # Yarn 锁定文件
└── index.html                     # 入口 HTML
```

---

## 下一步计划

### 待完善功能

| 任务ID | 任务名称 | 优先级 | 状态 | 依赖 |
|--------|---------|--------|------|------|
| TASK-010 | 音乐真实播放（接入真实音频API） | P1 | ⏳ 待执行 | 无 |
| TASK-011 | localStorage 数据持久化 | P1 | ⏳ 待执行 | 无 |
| TASK-012 | 单元测试 | P2 | ⏳ 待执行 | 无 |
| TASK-013 | E2E 测试 | P2 | ⏳ 待执行 | TASK-012 |
| TASK-014 | 生产构建优化 | P2 | ⏳ 待执行 | 无 |

### 相关文档

| 文档 | 路径 | 说明 |
|------|------|------|
| 技术需求文档 | [docs/PRD-技术需求.md](docs/PRD-技术需求.md) | 从PRD转化的技术实现方案 |
| 开发计划 | [docs/开发计划.md](docs/开发计划.md) | 详细的任务规划和里程碑 |

---

## Git 提交历史

暂无提交记录（待初始化 Git 仓库）

---

## 开发环境

- **Node.js**: >= 18.0.0
- **Yarn**: >= 1.22.0
- **开发服务器**: http://localhost:5173/
- **预览地址**: http://localhost:5173/

---

## 备注

1. **日志追踪**：每个任务都有对应的日志文件，记录执行过程、遇到的问题和产出物
2. **跨窗口续接**：只需读取本 INDEX.md 即可恢复项目上下文
3. **开发状态**：项目处于快速迭代阶段，代码和文档可能随时更新
