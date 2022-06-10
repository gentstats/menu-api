import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { MenuEntity } from '../entities/menu.entity';

@Schema()
export class Menu {
  _id?: Types.ObjectId;
  @Prop()
  menu: MenuEntity[];
}
export type MenuDocument = Document & Menu;
export const MenuSchema = SchemaFactory.createForClass(Menu);
