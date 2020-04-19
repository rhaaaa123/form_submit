# form_test

> 基于node.js+vue.js+koa2+typeorm的表单提交demo。

## 下载
``` bash
git clone https://github.com/rhaaaa123/form_submit.git
```
## 执行安装
``` bash
cd form_test //前端文件夹
npm install

cd form_test/Server //后端文件夹
npm install //同时创建数据库
```
## 进行项目配置
数据库配置文件 ./Server/ormconfig.js
``` bash
module.exports = {
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',（修改账户）
	password: 'zxcvbnm123',（修改密码）
	database: 'node_form',（数据库名称）
	logging: false,
	synchronize: true,
	entities:['src/entity/*{.ts,.js}'],
	timezone: 'Z',
	dateStrings: 'DATETIME'
}
```
## 开始执行
``` bash
# 前端地址，接口为8080
cd form_test
npm run dev

# 后端地址，接口为3000
cd Server
npm run dev
```
## 详情

表单在前端提交后，以json格式传至后台，后端接收到数据，将数据转为字符串存进数据库。

前端页面在提交之后会显示这条记录存在数据库里的格式，及对以上字符串数据解析后的结果。
