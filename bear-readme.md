# swagger 接口工具

## 1. 安装

 `$ npm i --save-dev swagger-typescript --registry=https://nexus.billbear.cn/repository/npm-group/`


## 2. 配置 swagger.config.json

```json
{
  "url": "http://47.102.105.127:8100/v3/api-docs/billbear-supplychain-server",
  "dir": "./src/lib",
  "language": "typescript"
}

```

## 3. 生成


`$ yarn swag-ts`


