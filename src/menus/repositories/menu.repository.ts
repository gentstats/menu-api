import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuEntity } from '../entities/menu.entity';
import { Menu, MenuDocument } from '../schemas/menu.schema';
import { menuStub } from '../stubs/menu.stub';

@Injectable()
export class MenuRepository {
  constructor(
    @InjectModel(Menu.name) private readonly menuModel: Model<MenuDocument>,
  ) {}
  getMenu() {
    return menuStub();
  }
  async createMenu(menu) {
    return menuStub();
  }
}
