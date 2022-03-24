import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Jedi } from '../schemas/jedis.schema';
import { Model } from 'mongoose';
import { IJediInfo } from '../interfaces/jedi.interface';
import { JedisIdsDto } from '../dtos/jedis-ids.dto';
import { CreateNewJediDto } from '../dtos/create-new-jedi.dto';
import { Masters } from '../schemas/master.schema';
import { IMasterInfo } from '../interfaces/master.interface';
import { CreateNewJediMasterDto } from '../dtos/create-new-master.dto';
import { JedisMastersIdsDto } from '../dtos/jedis-masters-ids.dto';

@Injectable()
export class MongoTestService {
  constructor(
    @InjectModel(Jedi.name) private jediModel: Model<IJediInfo>,
    @InjectModel(Masters.name) private mastersModel: Model<IMasterInfo>,
  ) {}

  async createNewJedi(newJediInfo: CreateNewJediDto): Promise<string> {
    await this.jediModel.create(newJediInfo);
    return 'Jedi info created succesfully';
  }

  async createNewJediMaster(
    newJediMasterInfo: CreateNewJediMasterDto,
  ): Promise<string> {
    await this.mastersModel.create(newJediMasterInfo);

    return 'Jedi Master info created succesfully';
  }

  async getAllJedisInfo(): Promise<IJediInfo[] | string> {
    const jedisInfo = await this.jediModel.find<IJediInfo>();

    return jedisInfo?.length > 0 ? jedisInfo : 'There is no info to show';
  }

  async getAllJediMastersInfo(): Promise<IMasterInfo[] | string> {
    const mastersInfo = await this.mastersModel.find();

    return mastersInfo?.length > 0 ? mastersInfo : 'There is no info to show';
  }

  async getJedisInfoById(
    jedisIds?: JedisIdsDto,
  ): Promise<IJediInfo[] | string> {
    let jedisInfoPromises;
    let jedisInfo;

    if (jedisIds.ids) {
      jedisInfoPromises = jedisIds?.ids?.map(async (id) => {
        return this.jediModel.findById(id);
      });
      jedisInfo = jedisInfoPromises
        ? await Promise.all(jedisInfoPromises)
        : undefined;
    } else {
      return await this.getAllJedisInfo();
    }

    return jedisInfo ? jedisInfo : 'There is no info to show';
  }

  async deleteJediByIds(jedisIds: JedisIdsDto): Promise<string> {
    const deleteJedisPromises = jedisIds?.ids?.map(async (id) => {
      return this.jediModel.deleteOne({ _id: id });
    });

    await Promise.all(deleteJedisPromises);
    return 'Jedis info deleted succesfully';
  }

  async deleteJediMasterByIds(
    jediMasterIds: JedisMastersIdsDto,
  ): Promise<string> {
    const deleteJedisMastersPromises = jediMasterIds.ids.map(async (id) => {
      return this.mastersModel.deleteOne({ _id: id });
    });

    await Promise.all(deleteJedisMastersPromises);
    return 'Jedi Master info deleted succesfully';
  }
}
