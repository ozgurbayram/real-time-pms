import { CreateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Project from './project.entity';
import { User } from '../../user/entities/user.entity';
import AbstractEntity from '../../../core/entities/abstract.entity';

@Entity()
export default class ProjectUser extends AbstractEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  	user: User;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  	project: Project;

  @CreateDateColumn({ precision: 3 }) assigned_at: Date;
}
