import { Test, TestingModule } from '@nestjs/testing';
import { connections } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './mongo/mongo.module';

describe('AppController', () => {
  let appController: AppController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [MongoModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterAll(async () => {
    await connections[1].close();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
