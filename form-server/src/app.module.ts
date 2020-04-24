import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsModule } from './forms/forms.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    FormsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
