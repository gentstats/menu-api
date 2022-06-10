import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuRepository } from './repositories/menu.repository';
import { menuStub } from './stubs/menu.stub';

@Injectable()
export class MenusService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async getMenuById(_id: Types.ObjectId) {
    return await this.menuRepository.getMenuById(_id);
  }
  getMenu() {
    return menuStub();
  }
  // create(createMenuDto: CreateMenuDto) {
  //   return 'This action adds a new menu';
  // }

  // findAll() {
  //   return `This action returns all menus`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} menu`;
  // }

  // update(id: number, updateMenuDto: UpdateMenuDto) {
  //   return `This action updates a #${id} menu`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} menu`;
  // }
}
