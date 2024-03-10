import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import TimeStampEntity from '../../../core/entities/timestamp.entity';
import Project from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export default class Task extends TimeStampEntity {
  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  	project: Project;
  
  @Column() name: string;

  @Column() status: string;

  
  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  @Index()
  	creator: User;
}
