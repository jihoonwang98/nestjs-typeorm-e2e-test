import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('member')
export default class MemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;
}
