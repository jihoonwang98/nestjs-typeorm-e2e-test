import { Injectable } from '@nestjs/common';
import MemberRepository from './MemberRepository';

@Injectable()
export default class MemberService {
  constructor(private memberRepo: MemberRepository) {}

  async createMember(name: string) {
    await this.memberRepo.createMember(name);
  }

  async findMemberById(id: number) {
    const member = await this.memberRepo.findMemberById(id);
    return member;
  }

  async findMembers() {
    return this.memberRepo.findMembers();
  }
}
