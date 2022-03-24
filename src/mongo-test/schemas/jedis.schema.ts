import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Masters } from './master.schema';

@Schema({ timestamps: true })
export class Jedi {
  @Prop({ required: true, type: String, unique: true })
  name: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Masters',
    autopopulate: true,
  })
  masterId: Masters;

  @Prop({ required: true, type: Boolean })
  isAlive: boolean;
}

export const JediSchema = SchemaFactory.createForClass(Jedi);
// eslint-disable-next-line @typescript-eslint/no-var-requires
JediSchema.plugin(require('mongoose-autopopulate'));
