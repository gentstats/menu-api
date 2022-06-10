import { Injectable } from '@nestjs/common';
import { menuStub } from '../stubs/menu.stub';

@Injectable()
export class MenuRepository {
  getMenu() {
    return menuStub();
  }
}
