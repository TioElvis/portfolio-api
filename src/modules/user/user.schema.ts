import type { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, maxlength: 10 })
  username: string;

  @Prop({ required: true, minlength: 24, select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
