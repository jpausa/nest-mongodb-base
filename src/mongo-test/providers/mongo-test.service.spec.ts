import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { IJediInfo } from '../interfaces/jedi.interface';
import { MongoTestService } from './mongo-test.service';

import { Model } from 'mongoose';
import { IMasterInfo } from '../interfaces/master.interface';

describe('MongoTestService', () => {
  let provider: MongoTestService;
  let jediModel: Model<IJediInfo>;
  let jediMastersModel: Model<IMasterInfo>;

  const jediModelMock = {
    findById: jest.fn(),
    find: jest.fn(),
    deleteOne: jest.fn(),
    create: jest.fn(),
  };
  const jediMastersModelMock = {
    findById: jest.fn(),
    find: jest.fn(),
    deleteOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongoTestService,
        { provide: getModelToken('Jedi'), useValue: jediModelMock },
        { provide: getModelToken('Masters'), useValue: jediMastersModelMock },
      ],
    }).compile();

    provider = module.get<MongoTestService>(MongoTestService);
    jediModel = module.get<Model<IJediInfo>>(getModelToken('Jedi'));
    jediMastersModel = module.get<Model<IMasterInfo>>(getModelToken('Masters'));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
    expect(jediModel).toBeDefined();
    expect(jediMastersModel).toBeDefined();
  });
  describe('getAllJedisInfo', () => {
    it('should call the right method if no param is passed to method', async () => {
      await provider.getAllJedisInfo();
      expect(jediModelMock.find).toHaveBeenCalled();
    });
  });
  describe('getAllJediMastersInfo', () => {
    it('should call the right method', async () => {
      await provider.getAllJediMastersInfo();
      expect(jediMastersModelMock.find).toHaveBeenCalled();
    });
  });
  describe('getJedisInfoById', () => {
    it('should call the right method if no param is passed to method', async () => {
      const getAllJedisInfoSpy = jest
        .spyOn(provider, 'getAllJedisInfo')
        .mockImplementation();
      await provider.getJedisInfoById({ ids: undefined });
      expect(getAllJedisInfoSpy).toHaveBeenCalled();
    });

    it('should call the right method if param is passed to method', async () => {
      const getAllJedisInfoSpy = jest
        .spyOn(provider, 'getAllJedisInfo')
        .mockImplementation();
      await provider.getJedisInfoById({ ids: ['id1', 'id2'] });
      expect(jediModelMock.findById).toHaveBeenCalledTimes(2);
      expect(getAllJedisInfoSpy).not.toHaveBeenCalled();
    });
  });
  describe('createNewJedi', () => {
    it('should call the right method', async () => {
      const result = await provider.createNewJedi({
        name: 'Anakin',
        masterId: 'id',
        isAlive: false,
      });
      expect(result).toEqual('Jedi info created succesfully');
      expect(jediModelMock.create).toHaveBeenCalled();
    });
  });
  describe('createNewJediMaster', () => {
    it('should call the right method', async () => {
      const result = await provider.createNewJediMaster({
        name: 'Obi-Wan Kenobi',
        isAlive: false,
      });
      expect(result).toEqual('Jedi Master info created succesfully');
      expect(jediMastersModelMock.create).toHaveBeenCalled();
    });
  });
  describe('deleteJediByIds', () => {
    it('should call the right method', async () => {
      const result = await provider.deleteJediByIds({ ids: ['id1', 'id2'] });
      expect(result).toEqual('Jedis info deleted succesfully');
      expect(jediModelMock.deleteOne).toHaveBeenCalledTimes(2);
    });
  });
  describe('deleteJediMasterByIds', () => {
    it('should call the right method', async () => {
      const result = await provider.deleteJediMasterByIds({
        ids: ['id1', 'id2'],
      });
      expect(result).toEqual('Jedi Master info deleted succesfully');
      expect(jediMastersModelMock.deleteOne).toHaveBeenCalledTimes(2);
    });
  });
});
