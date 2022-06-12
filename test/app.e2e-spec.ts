import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MongoModule } from '../src/mongo/mongo.module';
import { connections } from 'mongoose';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { menuStub, multipleMenuStub } from '../src/menus/stubs/menu.stub';
import { MenuRepository } from '../src/menus/repositories/menu.repository';
import { MenusService } from '../src/menus/menus.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: MenuRepository;
  let service: MenusService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = moduleFixture.get<MenusService>(MenusService);
    repository = moduleFixture.get<MenuRepository>(MenuRepository);
    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.enableCors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    });
    await app.listen(process.env.PORT, process.env.HOST);
  });

  afterAll(async () => {
    await connections[1].close();
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/menus (GET)', () => {
    return request(app.getHttpServer())
      .get('/menus')
      .expect(200)
      .expect(menuStub());
  });

  // it('/menus/:id', async () => {
  //   const savedMenu = await repository.createMenu(menuStub());
  //   const savedId = savedMenu._id.toHexString();
  //   const res = await request(app.getHttpServer())
  //     .get(`/menus/${savedId}`)
  //     .expect(200);

  //   expect(res.body._id === savedId).toBeTruthy();
  // });

  it('/menus/:lang/:id', async () => {
    const savedMenus = await repository.createMenus(multipleMenuStub());
    const savedId = savedMenus._id.toHexString();
    const res = await request(app.getHttpServer())
      .get(`/menus/${savedId}/es`)
      .expect(200);
    expect(res.body._id === savedId).toBeTruthy();
  });
});
