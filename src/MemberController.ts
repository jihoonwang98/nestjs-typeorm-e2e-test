import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import MemberService from './MemberService';

@Controller('/members')
export default class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('/:id')
  async findMemberById(@Param('id') id: number) {
    return this.memberService.findMemberById(id);
  }

  @Get()
  async findMembers() {
    return this.memberService.findMembers();
  }

  @Post()
  async createMember(@Body('name') name: string) {
    await this.memberService.createMember(name);
    return {
      success: true,
    };
  }
}
