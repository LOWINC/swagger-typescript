# swagger 接口工具

## 1 新建api项目

### 1.1 安装



 `$ npm i --save-dev @lowinc/swagger-typescript --registry=https://nexus.billbear.cn/repository/npm-group/`


### 1.2 配置 swagger.config.json

```json
{
  "url": "http://47.102.105.127:8100/v3/api-docs/billbear-supplier",
  "dir": "./src",
  "language": "typescript",
  "serviceName": "supplymerchant"
}


```

### 1.3 生成


`$ yarn bear-swag-ts`



## 1.4 参考

[gitlab](https://gitlab.dev.billbear.cn/interest/frontend/admin-api-billbear-foodie-first-server)


---

## 2. 项目内使用

### 2.1 初始化接口

```js
import {setRequest } from 'admin-api-xxxxxx'

setRequest({
  get:yourAdapterForGet,
  post:youreAapterForPost,
  put:yourAdapterForPut,
  delete:yourAterForDelete,
})

```

### 2.2 具体业务使用


```jsx
import {services } from 'admin-api-xxxxxx'

services.xxxxxx().then(res=>{
  console.log('success:',res)
})

```