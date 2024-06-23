# Changelog

英文 changelog 内容请访问 [CHANGELOG](CHANGELOG.md)

## [3.1.0](https://github.com/TerryZ/v-page/compare/v3.0.0...v3.1.0) (2024-06-23)

- 新增 `pageSizeOptions` prop，用于设置是否显示页数列表
- `pageSizeMenu` 移除 `boolean` 类型，仅作为页数列表设置项
- 新增 `pageSize` prop，指定每页项目个数
- 新增 `hideOnSinglePage` prop，用于设置是否在只有一页时隐藏分页栏
- `change` 事件输出数据中新增 `totalPage` 总页数属性

## [3.0.0](https://github.com/TerryZ/v-page/compare/v3.0.0-beta.4...v3.0.0) (2023-09-11)

- 完善 `.d.ts` 文档 `default slot` 内容
- 优化组件样式
- 组件默认语言从 `cn` 修改为 `en`
- 组件导出的模块名称从 `Page` 修改为 `PaginationBar`

## [3.0.0-beta.4](https://github.com/TerryZ/v-page/compare/v3.0.0-beta.3...v3.0.0-beta.4) (2023-09-10)

- 更新 `.d.ts` 文档
- 更新依赖库版本

## [3.0.0-beta.3](https://github.com/TerryZ/v-page/compare/v3.0.0-beta.2...v3.0.0-beta.3) (2023-09-09)

- 更新 package.json 的 `.d.ts` 相关设置

## [3.0.0-beta.2](https://github.com/TerryZ/v-page/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2023-01-25)

- 升级依赖库

## [3.0.0-beta.1](https://github.com/TerryZ/v-page/compare/v2.1.0...v3.0.0-beta.1) (2022-08-26)

### 新特性

- 使用 vue3 **composition api** 重构 `v-page`
- 工具链从 `webpack` 更换为 `vite`
- 单元测试库从 `mocha` 更换为 `vitest`
- `page-change` 事件更名为 `change`
