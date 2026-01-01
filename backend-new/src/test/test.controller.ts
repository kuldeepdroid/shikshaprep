import {
  Get,
  Delete,
  Param,
  UseGuards,
  Req,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/guards/jwt-guard';
import { TestService } from './test.service';

@UseGuards(AuthGuard)
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  async getAll(@Req() req: Request) {
    console.log('req.user', req);
    const tests = await this.testService.findAllByUser(req.user._id);
    return {
      tests: tests.map((test) => ({
        id: test._id,
        name: test.name,
        originalFileName: test.originalFileName,
        questions: test.questions.length,
        status: test.status,
        createdAt: test.createdAt,
        lastTaken: test.lastTaken,
        score: test.score,
      })),
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: Request) {
    const test = await this.testService.findOneByUser(id, req.user._id);

    if (!test) {
      return { error: 'Test not found' };
    }

    return {
      id: test._id,
      name: test.name,
      duration: test.duration,
      questions: test.questions,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    await this.testService.deleteByUser(id, req.user._id);
    return { message: 'Test deleted successfully' };
  }

  @Get(':id/download')
  async download(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { filePath, test } = await this.testService.getDownloadFile(
      id,
      req.user._id,
    );

    return res.download(filePath, `MockTest-${test.name || 'Test'}.pdf`);
  }

  @Post(':id/submit')
  async submit(
    @Param('id') id: string,
    @Req() req: Request,
    @Body('answers') answers: string[],
  ) {
    return this.testService.submitTest(id, req.user._id, answers);
  }
}
