import { Get, Controller, Param } from '@nestjs/common';
import { FormsService } from './forms.service';
import { Forms } from '../entities/forms.entity';


@Controller('forms')
export class FormsController {
	constructor(private readonly formsService: FormsService)  {}


	@Get() 
	root():string{
		console.log(123)
		return this.formsService.root();
	}


	@Get('findOne/:id') 
	async findOne(@Param() params):Promise<Forms> {
		console.log(params.id);
		return this.formsService.findOne(params.id);
	}

	@Get('create')
	async create():Promise<string>{
		console.log('1323')
		return this.formsService.create();
	}


}