import { Test } from '@nestjs/testing';
import { AppModule } from '../AppModule';
import { Connection } from 'typeorm';
import { PgTestHelper } from './PgTestHelper';
import MemberEntity from '../MemberEntity';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

describe('Member (e2e-test)', function () {
  let app: INestApplication;
  let pgTestHelper: PgTestHelper;

  beforeAll(async () => {
    pgTestHelper = new PgTestHelper();
    await pgTestHelper.connect([MemberEntity]);

    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(Connection)
      .useValue(pgTestHelper.connection)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    pgTestHelper.restore();
  });

  it('should return []', async () => {
    return request(app.getHttpServer())
      .get('/members')
      .then(res => {
        console.log(res.body);
      });
  });

  it('should createMember successfully ', function () {
    return request(app.getHttpServer())
      .post('/members')
      .send({
        name: 'mojo',
      })
      .expect({
        success: true,
      });
  });

  it('should return two members', async () => {
    await request(app.getHttpServer()).post('/members').send({ name: 'member1' });
    await request(app.getHttpServer()).post('/members').send({ name: 'member2' });

    await request(app.getHttpServer())
      .get('/members')
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual([
          { id: expect.any(String), name: 'member1' },
          { id: expect.any(String), name: 'member2' },
        ]);
      });
  });
});
