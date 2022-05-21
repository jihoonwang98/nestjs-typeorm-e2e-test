import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MemberRepository from './MemberRepository';
import MemberEntity from './MemberEntity';
import MemberController from './MemberController';
import MemberService from './MemberService';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'testdb',
      username: 'mojo',
      password: '',
      entities: [MemberEntity],
      synchronize: true,
      logger: 'advanced-console',
      logging: true,
    }),
    TypeOrmModule.forFeature([MemberRepository]),
  ],
  providers: [MemberService],
  controllers: [MemberController],
})
export class AppModule {}
