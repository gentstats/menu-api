import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './mongo/mongo.module';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [MongoModule, MenusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
