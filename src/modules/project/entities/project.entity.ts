import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import TimeStampEntity from '../../../core/entities/timestamp.entity';
import { User } from '../../user/entities/user.entity';
import { ProjectStatus } from '../enums/project.enums';

@Entity()
export default class Project extends TimeStampEntity {
  @Column({ nullable: false, type: 'varchar' }) name: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  @Index()
  	creator: User;

  @Column({ enum: ProjectStatus, type: 'enum', default: ProjectStatus.DRAFT }) status: ProjectStatus;
}
