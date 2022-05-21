import { EntityRepository, Repository } from 'typeorm';
import MemberEntity from './MemberEntity';

@EntityRepository(MemberEntity)
export default class MemberRepository extends Repository<MemberEntity> {
  async createMember(name: string) {
    const entity = this.create({ name });
    await this.save(entity);
  }

  async findMemberById(id: number) {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  async findMembers() {
    return this.find();
  }
}
