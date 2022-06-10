import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './schemas/menu.schema';
import { MongoModule } from '../mongo/mongo.module';
import { MenuRepository } from './repositories/menu.repository';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      {
        name: Menu.name,
        schema: MenuSchema,
      },
    ]),
  ],
  controllers: [MenusController],
  providers: [MenusService, MenuRepository],
})
export class MenusModule {}
