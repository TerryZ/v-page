# Changelog

Please refer to [CHANGELOG-CN](CHANGELOG-CN.md) for Chinese changelog

## [3.2.1](https://github.com/TerryZ/v-page/compare/v3.2.0...v3.2.1) (2024-10-27)

### Bug Fixes

- When changing the selected item in the list of records per page, there is a chance that the selected item will be inconsistent with the `pageSize` value
- Fixed round page number button style issue
- Avoid component style contamination

## [3.2.0](https://github.com/TerryZ/v-page/compare/v3.1.0...v3.2.0) (2024-10-24)

- Added `circle` prop to set whether to apply round button style
- Added `pageSize` value to the number of records per page list
- Automatically select an item in the number of records per page list when it matches the `pageSize` value
- Streamlined multilingual text content
- Removed exposed data items and functions

## [3.1.0](https://github.com/TerryZ/v-page/compare/v3.0.0...v3.1.0) (2024-06-23)

- Add `pageSizeOptions` prop, used to show page size list
- `pageSizeMenu` prop remove `boolean` type, only use for set page size list items
- Add `pageSize` prop, set the item number of per page
- Add `hideOnSinglePage` prop, hide pagination when have only one page
- `change` event output data add `totalPage` property for the number of total pages

## [3.0.0](https://github.com/TerryZ/v-page/compare/v3.0.0-beta.4...v3.0.0) (2023-09-11)

- Complete `.d.ts` document `default slot` content
- Optimize component styles
- The component default language is changed from `cn` to `en`
- The module name exported by the component is changed from `Page` to `PaginationBar`

## [3.0.0-beta.4](https://github.com/TerryZ/v-page/compare/v3.0.0-beta.3...v3.0.0-beta.4) (2023-09-10)

- Update `.d.ts` document
- Upgrade dependency libraries

## [3.0.0-beta.3](https://github.com/TerryZ/v-page/compare/v3.0.0-beta.2...v3.0.0-beta.3) (2023-09-09)

- Update the `.d.ts` related settings of package.json

## [3.0.0-beta.2](https://github.com/TerryZ/v-page/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2023-01-25)

- Upgrade dependency libraries

## [3.0.0-beta.1](https://github.com/TerryZ/v-page/compare/v2.1.0...v3.0.0-beta.1) (2022-08-26)

### Features

- Refactor `v-page` with vue3 **composition api**
- Change module bundler library from `webpack` to `vite`
- Change unit test library from `mocha` to `vitest`
- `page-change` event rename to `change`
