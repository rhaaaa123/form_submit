# form_submit

> 基于node.js+nuxt.js+next.js+typeorm的表单提交demo。

## 执行安装
``` bash
cd formClient //前端文件夹
npm install

cd form-server //后端文件夹
npm install //同时创建数据库
```
## 进行项目配置
数据库配置文件 在src/app.module.ts里配置
``` bash
TypeOrmModule.forRoot {
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
}
```
## 开始执行
``` bash
# 前端地址，接口为3000
cd formClient
npm run dev

# 后端地址，接口为3001
cd form-server
npm run start
```
## 详情

可配置表单以实现单行输入框、文本框、下拉选择、多选、单选等。
