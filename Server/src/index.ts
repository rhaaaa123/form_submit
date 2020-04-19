import Koa from 'koa'
import Router from 'koa-router'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import { createConnection } from 'typeorm'
import mysql from './query/mysql'
import querystring from 'querystring'


createConnection()
    .then(() => {
    	const app = new Koa()
    	const router = new Router()
    	//AppRoutes.forEach(route => router[route.method](route.path, route.action))
    	//设置跨域 koa2直接可以设置跨域
    	/*
		app.use(async (ctx, next)=> {
		  ctx.set('Access-Control-Allow-Origin', '*');
		  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
		  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
		  if (ctx.method == 'OPTIONS') {
		    ctx.body = 200; 
		  } else {
		    await next();
		  }
		});
		*/
		
    	app.use(cors({
    		origin:  'http://localhost:8080', // 允许这个域名的 跨域请求
		    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
		    maxAge: 5,
		    credentials: true,
		    allowMethods: ['GET', 'POST', 'DELETE'],
		    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
    	}))

    	app.use(bodyParser())
    	    .use(router.routes())
    	    /*
    	    .use(async (ctx: any) => {
    	    	//ctx.body = ctx.request.body
    	    	console.log(postParam)
    	    	//ctx.body = ctx.request.body
    	    	//let res = await mysql.addForm(ctx)
    	    	/*
    	    	ctx.response.body = {
    	    		'code': 1,
    	    		//'data': res
    	    	}
    	    	//ctx.body = 'aaaa'//JSON.stringify(mysql.findForm)
    	    	//console.log(mysql.findForm(ctx))
    	    	//console.log("chenggg")
    	    })
            */
        router.post('/', async (ctx, next) => {
			let postParam = await ctx.request.body
			console.log(postParam)
			let res = await mysql.addForm(ctx)
			ctx.response.body = {
	    	    'code': 1,
	    		'data': res
	    		//将字符串解码为json
	    	}	
		})

    	app.listen(3000)
    	console.log("服务已启动")
    })
    .catch(error => console.log('TypeORM 链接失败： ', error))