import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Types } from 'mongoose';
import { MenuEntity } from './entities/menu.entity';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  getMenu() {
    return this.menusService.getMenu();
  }

  @Get(':id')
  async getMenuById(@Param('id') id: string): Promise<MenuEntity> {
    return await this.menusService.getMenuById(id);
  }

  @Get(':id:lang')
  async getMenuByIdLang(
    @Param('id') id: string,
    @Param('lang') lang: string,
  ): Promise<MenuEntity> {
    return await this.menusService.getMenuByIdLang({ _id: id, lang });
  }

  // @Post()
  // create(@Body() createMenuDto: CreateMenuDto) {
  //   return this.menusService.create(createMenuDto);
  // }

  // @Get()
  // findAll() {
  //   return this.menusService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.menusService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
  //   return this.menusService.update(+id, updateMenuDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.menusService.remove(+id);
  // }
}
