export type UserRole = 'admin' | 'user' | 'guest';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: [true, 'Email is required'], unique: true })
  email: string;

  @Prop({
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  resetPasswordToken?: string;
  resetPasswordExpires?: Date;

  @Prop({ required: [true, 'Username is required'], unique: true })
  username: string;

  @Prop({ type: String, enum: ['admin', 'user', 'guest'], default: 'user' })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
