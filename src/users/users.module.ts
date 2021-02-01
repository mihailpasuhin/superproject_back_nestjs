import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from './users.model';

@Module({
  imports: [SequelizeModule.forFeature([UsersModel])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [SequelizeModule]
})
export class UsersModule {}
