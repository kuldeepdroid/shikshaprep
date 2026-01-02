import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestDocument = HydratedDocument<Test>;

export class Test {
  testName: string;
  originalFileName: string;
  questions: string;
  createdAt: Date;
}

export const TestSchema = SchemaFactory.createForClass(Test);
