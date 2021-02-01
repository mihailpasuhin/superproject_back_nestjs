import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PapersController } from './papers/papers.controller';
import { PapersService } from './papers/papers.service';
import { PapersModel } from './papers/papers.model';
import { PapersModule } from './papers/papers.module';
import { ForumController } from './forum/forum.controller';
import { ForumService } from './forum/forum.service';
import { ForumSectionsModel } from './forum/forum.sections.model';
import { ForumSubsectionsModel } from './forum/forum.subsections.model';
import { ForumModule } from './forum/forum.module';
import { ForumThreadsModel } from './forum/forum.threads.model';
import { ForumPostsModel } from './forum/forum.posts.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersModel } from './users/users.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '11235813',
      database: 'superproject',
      // @ts-ignore
      models: [PapersModel, ForumSectionsModel, ForumSubsectionsModel, ForumThreadsModel, ForumPostsModel, UsersModel],
    }),
    PapersModule,
    ForumModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, PapersController, ForumController],
  providers: [AppService, PapersService, ForumService],
})
export class AppModule {}
