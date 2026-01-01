import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum QuestionType {
  MCQ = 'mcq',
  TRUE_FALSE = 'true-false',
  SHORT_ANSWER = 'short-answer',
}

@Schema({ _id: false })
export class Question {
  @Prop({ required: true })
  question: string;

  @Prop({ type: [String], default: [] })
  options: string[];

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({
    type: String,
    enum: QuestionType,
    default: QuestionType.MCQ,
  })
  type: QuestionType;

  @Prop()
  explanation?: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

export type MockTestDocument = MockTest & Document;

export enum MockTestStatus {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Schema({ timestamps: true })
export class MockTest {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  originalFileName: string;

  @Prop({ required: true })
  filePath: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({ type: [QuestionSchema], default: [] })
  questions: Question[];

  @Prop({
    type: String,
    enum: MockTestStatus,
    default: MockTestStatus.PROCESSING,
  })
  status: MockTestStatus;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  lastTaken?: Date;

  @Prop()
  score?: number;

  @Prop()
  processingError?: string;

  @Prop()
  duration?: string;
}

export const MockTestSchema = SchemaFactory.createForClass(MockTest);
