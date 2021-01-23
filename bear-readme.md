# swagger 接口工具

## 1. 安装

 `$ npm i --save-dev @lowinc/swagger-typescript --registry=https://nexus.billbear.cn/repository/npm-group/`


## 2. 配置 swagger.config.json

```json
{
  "url": "http://47.102.105.127:8100/v3/api-docs/billbear-supplychain-server",
  "dir": "./src",
  "language": "typescript"
}

```

## 3. 生成


`$ yarn bear-swag-ts`



## 4. 参考

[gitlab](https://gitlab.dev.billbear.cn/interest/frontend/admin-api-billbear-foodie-first-server)