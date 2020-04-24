import { Injectable } from '@nestjs/common';
import { Forms } from '../entities/forms.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormsService {

	constructor(@InjectRepository(Forms) private readonly formsRepository: Repository<Forms>) {}
    root(): string {
    	return 'Hello World!';
    }

    async create(): Promise<string> {
    	let forms = new Forms();
    	forms.user_id = 1;
    	forms.form_content = '11111';
    	forms.form_type = '111';

    	return this.formsRepository.save(forms)
    	  .then(res => {
    	  	return 'create forms ...done'
    	  })
    	  .catch(err => {
    	  	return err
    	  });
    }

    async findOne(id: number): Promise<Forms> {
    	return await this.formsRepository.findOne({id:id});
    }
}
