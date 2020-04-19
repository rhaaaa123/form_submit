import { getManager } from 'typeorm'
import { Context } from 'koa'
import querystring from 'querystring'
import Forms from '../entity/forms'

class formSubmit {
	//添加进数据库
	async addForm(ctx: Context) {
		const formContent = ctx.request.body
		console.log(formContent)
		const entityRepository = getManager().getRepository(Forms)
		let dateTime = new Date()
		//转json为字符串加进数据库
		let aForm = entityRepository.create({content: querystring.stringify(formContent), submitTime: dateTime})
		let res = await entityRepository.save(aForm)
		ctx.body = res
		return res
	}
	//从数据库中查找
	async findForm(ctx: Context) {
		const entityRepository = getManager().getRepository(Forms)
		let res = await entityRepository.find()
		ctx.body = res
		return res
	}
}

export default new formSubmit()