import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsModule } from './forms/forms.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: 'zxcvbnm123',
		database: 'form',
		logging: false,
		synchronize: true,
		entities:['./entities/**.entity{.ts,.js}'],
		timezone: 'Z'
    }),
    FormsModule
  ],
})
export class AppModule {}
