import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Task from './task.entity';
import { User } from '../../user/entities/user.entity';
import AbstractEntity from '../../../core/entities/abstract.entity';

@Entity({})
export default class TaskUser extends AbstractEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  	user: User;

  @ManyToOne(() => Task)
  @JoinColumn({ name: 'task_id' })
  	task: Task;

  @Column() assigned_at: string;
}
