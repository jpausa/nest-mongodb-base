import { Test, TestingModule } from '@nestjs/testing';
import { MongoTestController } from './mongo-test.controller';
import * as request from 'supertest';
import { MongoTestService } from '../providers/mongo-test.service';
import { HttpStatus, INestApplication } from '@nestjs/common';

describe('MongoTestController', () => {
  let controller: MongoTestController;
  let app: INestApplication;

  const mongoTestServiceMock = {
    createNewJedi: jest.fn(),
    createNewJediMaster: jest.fn(),
    getAllJediMastersInfo: jest.fn(),
    getJedisInfoById: jest.fn(),
    deleteJediByIds: jest.fn(),
    deleteJediMasterByIds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoTestController],
      providers: [
        { provide: MongoTestService, useValue: mongoTestServiceMock },
      ],
    }).compile();

    controller = module.get<MongoTestController>(MongoTestController);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('POST /jedi', () => {
    it('should call the right method, return the expected message and the right HttpStatus', async () => {
      const returnMessageMock = 'Jedi info created succesfully';
      const endpointBodyMock = {
        name: 'Ahsoka Tano',
        masterId: '623cd3c918c12e987171443f',
        isAlive: true,
      };
      mongoTestServiceMock.createNewJedi.mockResolvedValue(returnMessageMock);
      const result = await request(app.getHttpServer())
        .post('/jedi')
        .send(endpointBodyMock);
      expect(result.text).toEqual(returnMessageMock);
      expect(result.status).toEqual(HttpStatus.CREATED);
      expect(mongoTestServiceMock.createNewJedi).toHaveBeenCalledWith(
        endpointBodyMock,
      );
    });
  });
  describe('POST /jedi/jedi-master', () => {
    it('should call the right method, return the expected message and the right HttpStatus', async () => {
      const returnMessageMock = 'Jedi Master info created succesfully';
      const endpointBodyMock = {
        name: 'Anakin',
        isAlive: false,
      };
      mongoTestServiceMock.createNewJediMaster.mockResolvedValue(
        returnMessageMock,
      );
      const result = await request(app.getHttpServer())
        .post('/jedi/jedi-master')
        .send(endpointBodyMock);
      expect(result.text).toEqual(returnMessageMock);
      expect(result.status).toEqual(HttpStatus.CREATED);
      expect(mongoTestServiceMock.createNewJediMaster).toHaveBeenCalledWith(
        endpointBodyMock,
      );
    });
  });
  describe('GET /jedi', () => {
    const endpointReturnMock = {
      name: 'Ahsoka Tano',
      masterId: '623cd3c918c12e987171443f',
      isAlive: true,
    };
    it('should call the right method, return the expected message and the right HttpStatus', async () => {
      mongoTestServiceMock.getJedisInfoById.mockResolvedValue(
        endpointReturnMock,
      );
      const result = await request(app.getHttpServer()).get('/jedi/');
      expect(result.body).toEqual(endpointReturnMock);
      expect(result.status).toEqual(HttpStatus.OK);
      expect(mongoTestServiceMock.getJedisInfoById).toHaveBeenCalled();
    });
    it('should send query param in request', async () => {
      mongoTestServiceMock.getJedisInfoById.mockResolvedValue(
        endpointReturnMock,
      );
      await request(app.getHttpServer()).get(
        '/jedi?ids[]=623cd3ecc3b1b5794a26fbf7',
      );
      expect(mongoTestServiceMock.getJedisInfoById).toHaveBeenCalledWith({
        ids: ['623cd3ecc3b1b5794a26fbf7'],
      });
    });
  });
  describe('GET /jedi/jedi-master', () => {
    it('should call the right method, return the expected message and the right HttpStatus', async () => {
      const endpointReturnMock = {
        name: 'Anakin',
        isAlive: false,
      };
      mongoTestServiceMock.getAllJediMastersInfo.mockResolvedValue(
        endpointReturnMock,
      );
      const result = await request(app.getHttpServer()).get(
        '/jedi/jedi-master',
      );
      expect(result.body).toEqual(endpointReturnMock);
      expect(result.status).toEqual(HttpStatus.OK);
      expect(mongoTestServiceMock.getAllJediMastersInfo).toHaveBeenCalled();
    });
  });
  describe('GET /jedi/jedi-master', () => {
    it('should call the right method, return the expected message and the right HttpStatus', async () => {
      const endpointReturnMock = {
        name: 'Anakin',
        isAlive: false,
      };
      mongoTestServiceMock.getJedisInfoById.mockResolvedValue(
        endpointReturnMock,
      );
      const result = await request(app.getHttpServer()).get(
        '/jedi/jedi-master',
      );
      expect(result.body).toEqual(endpointReturnMock);
      expect(result.status).toEqual(HttpStatus.OK);
      expect(mongoTestServiceMock.getAllJediMastersInfo).toHaveBeenCalled();
    });
  });
  describe('DELETE /jedi', () => {
    it('should call the right method, return the expected message and the right HttpStatus', async () => {
      const returnMessageMock = 'Jedis info deleted succesfully';
      mongoTestServiceMock.deleteJediByIds.mockResolvedValue(returnMessageMock);
      const result = await request(app.getHttpServer())
        .delete('/jedi')
        .send({
          jedisIdsDto: ['623cd3c918c12e987171443f'],
        });
      expect(result.text).toEqual(returnMessageMock);
      expect(result.status).toEqual(HttpStatus.OK);
      expect(mongoTestServiceMock.deleteJediByIds).toHaveBeenCalledWith({
        jedisIdsDto: ['623cd3c918c12e987171443f'],
      });
    });
  });
  describe('DELETE /jedi/jedi-master', () => {
    it('should call the right method, return the expected message and the right HttpStatus', async () => {
      const returnMessageMock = 'Jedi Master info deleted succesfully';
      mongoTestServiceMock.deleteJediMasterByIds.mockResolvedValue(
        returnMessageMock,
      );
      const result = await request(app.getHttpServer())
        .delete('/jedi/jedi-master')
        .send({
          jedisMastersIdsDto: ['623cd3c918c12e987171443f'],
        });
      expect(result.text).toEqual(returnMessageMock);
      expect(result.status).toEqual(HttpStatus.OK);
      expect(mongoTestServiceMock.deleteJediMasterByIds).toHaveBeenCalledWith({
        jedisMastersIdsDto: ['623cd3c918c12e987171443f'],
      });
    });
  });
});
