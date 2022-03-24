import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Masters {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Boolean })
  isAlive: boolean;
}

export const MastersSchema = SchemaFactory.createForClass(Masters);
