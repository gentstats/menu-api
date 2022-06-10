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
import { menuStub } from '../src/menus/stubs/menu.stub';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

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
});
