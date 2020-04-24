import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { Forms } from '../entities/forms.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Forms])],
	providers: [FormsService],
	controllers: [FormsController]
})

export class FormsModule {}