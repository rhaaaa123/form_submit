import { Get, Controller, Param } from '@nestjs/common';
import { FormsService } from './forms.service';
import { Forms } from '../entities/forms.entity';
import { createForm } from './forms.interface'

@Controller('forms')
export class FormsController {
	constructor(private readonly formsService: FormsService)  {}



	@Get('findOne/:id') 
	findOne(@Param() params):Promise<Forms> {
		console.log(params.id);
		return this.formsService.findOne(params.id);
	}

	@Get('create')
	CreateForm(@Param() content: createForm){
		console.log('createform')
		return this.formsService.CreateForm(content);
	}


}