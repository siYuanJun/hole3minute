# 项目总控索引：树洞·3分钟情绪急救箱

## 项目信息
- **项目名称**: 树洞·3分钟情绪急救箱
- **项目描述**: 专为14-30岁青少年设计的情绪急救工具
- **技术栈**: Vue 3 + Vite + Tailwind CSS v4 + SCSS
- **包管理器**: Yarn
- **创建时间**: 2026-06-20
- **最后更新**: 2026-06-20 00:35

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
| TASK-001 | 初始化Vue项目 | 前端 | 项目初始化 | P0 | ✅ 已完成 | [logs/TASK-001.md](logs/TASK-001.md) | vite.config.js, index.html | 2026-06-20 00:26 |
| TASK-002 | 配置Tailwind CSS和SCSS | 前端 | 样式配置 | P0 | ✅ 已完成 | [logs/TASK-002.md](logs/TASK-002.md) | src/assets/styles/main.scss | 2026-06-20 00:25 |
| TASK-003 | 创建EmotionCard组件 | 前端 | 组件开发 | P0 | ✅ 已完成 | [logs/TASK-003.md](logs/TASK-003.md) | src/components/EmotionCard.vue | 2026-06-20 00:26 |
| TASK-004 | 创建ActionCard组件 | 前端 | 组件开发 | P0 | ✅ 已完成 | [logs/TASK-004.md](logs/TASK-004.md) | src/components/ActionCard.vue | 2026-06-20 00:27 |
| TASK-005 | 创建BreathingGuide组件 | 前端 | 组件开发 | P0 | ✅ 已完成 | [logs/TASK-005.md](logs/TASK-005.md) | src/components/BreathingGuide.vue | 2026-06-20 00:28 |
| TASK-006 | 实现App.vue主逻辑 | 前端 | 业务逻辑 | P0 | ✅ 已完成 | [logs/TASK-006.md](logs/TASK-006.md) | src/App.vue | 2026-06-20 00:35 |
| TASK-007 | 创建情绪数据文件 | 前端 | 数据层 | P0 | ✅ 已完成 | [logs/TASK-007.md](logs/TASK-007.md) | src/data/emotions.js | 2026-06-20 00:23 |
| TASK-008 | 启动开发服务器 | DevOps | 开发环境 | P0 | ✅ 已完成 | [logs/TASK-008.md](logs/TASK-008.md) | http://localhost:5173/ | 2026-06-20 00:35 |

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
│   │   └── BreathingGuide.vue     # 深呼吸引导组件
│   ├── data/                      # 数据目录
│   │   └── emotions.js            # 情绪数据
│   └── assets/                    # 资源目录
│       └── styles/
│           └── main.scss          # 主样式文件
├── docs/                          # 文档目录
│   ├── PRD-树洞·3分钟情绪急救箱.md
│   └── 树洞·3分钟情绪急救箱.html
├── logs/                          # 任务日志目录
│   ├── TASK-001.md               # 初始化Vue项目
│   ├── TASK-002.md               # 配置Tailwind CSS和SCSS
│   ├── TASK-003.md               # 创建EmotionCard组件
│   ├── TASK-004.md               # 创建ActionCard组件
│   ├── TASK-005.md               # 创建BreathingGuide组件
│   ├── TASK-006.md               # 实现App.vue主逻辑
│   ├── TASK-007.md               # 创建情绪数据文件
│   └── TASK-008.md               # 启动开发服务器
├── INDEX.md                       # 项目总控索引（本文件）
├── vite.config.js                # Vite 配置
├── package.json                   # 依赖清单
├── yarn.lock                      # Yarn 锁定文件
└── index.html                     # 入口 HTML
```

---

## 下一步计划

### 待完成功能（基于 PRD）
| 功能 | 优先级 | 说明 |
|------|--------|------|
| 单元测试 | P1 | 使用 Vitest 进行组件测试 |
| E2E 测试 | P2 | 使用 Playwright 进行端到端测试 |
| 构建优化 | P2 | 优化生产构建 |
| 文档完善 | P1 | 生成模块设计文档 |

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
