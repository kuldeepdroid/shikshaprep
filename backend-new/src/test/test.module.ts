import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MockTest, MockTestSchema } from './schemas/mocktest.schema';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: MockTest.name, schema: MockTestSchema },
    ]),
  ],
  exports: [TestService],
})
export class TestModule {}
