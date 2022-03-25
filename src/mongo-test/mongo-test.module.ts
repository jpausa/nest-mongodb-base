import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoTestController } from './controllers/mongo-test.controller';
import { MongoTestService } from './providers/mongo-test.service';
import { Jedi, JediSchema } from './schemas/jedis.schema';
import { Masters, MastersSchema } from './schemas/master.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Jedi.name, schema: JediSchema },
      { name: Masters.name, schema: MastersSchema },
    ]),
  ],
  controllers: [MongoTestController],
  providers: [MongoTestService],
})
export class MongoTestModule {}
