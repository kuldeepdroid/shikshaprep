import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { MockTest, MockTestDocument } from './schemas/mocktest.schema';

@Injectable()
export class TestService {
  constructor(
    // @InjectModel(MockTest.name)
    private readonly mockTestModel: Model<MockTestDocument>,
  ) {}

  async findAllByUser(userId: Types.ObjectId) {
    return this.mockTestModel.find({ userId }).sort({ createdAt: -1 });
  }

  async findOneByUser(id: string, userId: Types.ObjectId) {
    return this.mockTestModel.findOne({ _id: id, userId });
  }

  async deleteByUser(id: string, userId: Types.ObjectId) {
    const test = await this.findOneByUser(id, userId);

    if (!test) {
      throw new NotFoundException('Test not found');
    }

    if (test.filePath && fs.existsSync(test.filePath)) {
      fs.unlinkSync(test.filePath);
    }

    await test.deleteOne();
  }

  async submitTest(id: string, userId: Types.ObjectId, answers: string[]) {
    const test = await this.findOneByUser(id, userId);

    if (!test) {
      throw new NotFoundException('Test not found');
    }

    let correctAnswers = 0;

    const results = test.questions.map((q, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === q.correctAnswer;

      if (isCorrect) correctAnswers++;

      return {
        question: q.question,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const score = Math.round((correctAnswers / test.questions.length) * 100);

    test.score = score;
    test.lastTaken = new Date();
    await test.save();

    return {
      score,
      correctAnswers,
      totalQuestions: test.questions.length,
      results,
    };
  }

  async getDownloadFile(id: string, userId: Types.ObjectId) {
    const test = await this.findOneByUser(id, userId);

    if (!test) {
      throw new NotFoundException('Test not found');
    }

    if (test.status !== 'completed') {
      throw new BadRequestException('Test is not ready for download');
    }

    const filePath =
      test.filePath ||
      path.join(process.cwd(), `files/mocktest-${test._id}.pdf`);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    return { filePath, test };
  }
}
