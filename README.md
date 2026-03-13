# 前言

用 react 和 typescript 实现一套包含常用功能的 sdk，侧重于数据状态管理和 UI 组件相关内容，其模块包括配置管理、主题、icon、本地化、网络请求、mock 数据等，具体如下

**基础层**：配置管理、环境管理、安全、日志、错误码&异常类型、时间类型处理
**网络层**：grpc、http、tcp、websocket、自动重试
**数据层**：s3 存储、 Mock 内存数据、消息队列、本地文件 IO、上下文模板
**UI 层**：后台管理相关组件、icon、本地化、模态窗口、消息窗口、主题
**业务层**：

文档
CI/CD

| 模块               | 功能                                       | 描述 |
| ------------------ | ------------------------------------------ | ---- |
| alisa-env          | .env 支持                                  |      |
| alisa-config       | 保存读取 json 配置                         |      |
| alisa-storage      | s3、本地存储                               |      |
| alisa-mock         | 制造内存层的假数据                         |      |
| alisa-message      | 提供消息队列客户端                         |      |
| alisa-network      | 提供 grpc、http、tcp、websocket 客户端支持 |      |
| alisa-security     | 提供身份验证、授权、加密                   |      |
| alisa-time         | 处理时间格式                               |      |
| alisa-exception    | 定义错误码、异常类型                       |      |
| alisa-log          | 处理日志                                   |      |
| alisa-icon         | 常见 icon                                  |      |
| alisa-localization | 本地化                                     |      |
| alisa-admin        | 后台管理组件                               |      |
| alisa-plugin       | 插件                                       |      |
| alisa-theme        | 主题                                       |      |
| alisa-context      | 上下文模板                                 |      |

# 实验环境

- nvm
- react
- typescript
- tscup

## 目标

- 模块隔离
- 层次分明
- 开箱即用
