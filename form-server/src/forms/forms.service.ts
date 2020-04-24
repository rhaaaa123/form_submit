import { Injectable } from '@nestjs/common';
import { Forms } from '../entities/forms.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createForm } from './forms.interface'

@Injectable()
export class FormsService {

	constructor(@InjectRepository(Forms) private readonly formsRepository: Repository<Forms>) {}

    async CreateForm(NewForm: createForm): Promise<any> {

    	return await this.formsRepository.save(NewForm)
    	  .then(res => {
    	  	return 'create forms ...done'
    	  })
    	  .catch(err => {
    	  	return err
    	  });
    }

    async findOne(id: number): Promise<any> {
    	return await this.formsRepository.findOne(id);
    }
}
