import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateNewJediDto } from '../dtos/create-new-jedi.dto';
import { CreateNewJediMasterDto } from '../dtos/create-new-master.dto';
import { JedisIdsDto } from '../dtos/jedis-ids.dto';
import { JedisMastersIdsDto } from '../dtos/jedis-masters-ids.dto';
import { IJediInfo } from '../interfaces/jedi.interface';
import { IMasterInfo } from '../interfaces/master.interface';
import { MongoTestService } from '../providers/mongo-test.service';

@Controller('jedi')
export class MongoTestController {
  constructor(private mongoTestService: MongoTestService) {}

  @Post()
  async createNewJedi(
    @Body() createNewJediDto: CreateNewJediDto,
  ): Promise<string> {
    return await this.mongoTestService.createNewJedi(createNewJediDto);
  }

  @Post('jedi-master')
  async createNewJediMaster(
    @Body() createNewJediMasterDto: CreateNewJediMasterDto,
  ): Promise<string> {
    return await this.mongoTestService.createNewJediMaster(
      createNewJediMasterDto,
    );
  }

  @Get()
  async getJedisInfoById(
    @Query() jedisIdsDto?: JedisIdsDto,
  ): Promise<IJediInfo[] | string> {
    return await this.mongoTestService.getJedisInfoById(jedisIdsDto);
  }

  @Get('jedi-master')
  async getAllJediMastersInfo(): Promise<IMasterInfo[] | string> {
    return await this.mongoTestService.getAllJediMastersInfo();
  }

  @Delete()
  async deleteJediById(@Body() jedisIdsDto: JedisIdsDto): Promise<string> {
    return await this.mongoTestService.deleteJediByIds(jedisIdsDto);
  }

  @Delete('jedi-master')
  async deleteJediMastersById(
    @Body() jedisMastersIdsDto: JedisMastersIdsDto,
  ): Promise<string> {
    return await this.mongoTestService.deleteJediMasterByIds(
      jedisMastersIdsDto,
    );
  }
}
