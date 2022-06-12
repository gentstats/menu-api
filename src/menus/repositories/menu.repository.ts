import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
  async createMenu(menu: MenuEntity): Promise<Menu> {
    return await this.menuModel.create({ menu: [menu] });
  }

  async createMenus(menu: MenuEntity[]): Promise<Menu> {
    return await this.menuModel.create({ menu: menu });
  }

  // async getMenuById(_id: Types.ObjectId): Promise<MenuEntity> {
  //   const res: Menu = await this.menuModel.findById(_id);
  //   if (!res) throw new NotFoundException('Id not found');
  //   return { _id, ...res.menu[0] };
  // }

  async getMenuByIdLang(params: {
    _id: Types.ObjectId;
    lang: string;
  }): Promise<MenuEntity> {
    const res: Menu = await this.menuModel.findById(params._id);
    if (!res) throw new NotFoundException('Id not found');

    if (params.lang !== 'es' && params.lang !== 'en') {
      params.lang = 'en';
    }

    let menu = res.menu.filter((menu) => {
      return menu.lang === params.lang;
    })[0];

    if (!menu) {
      menu = res.menu[0];
    }

    return { _id: params._id, ...menu };
  }
}
