import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import TimeStampEntity from '../../../core/entities/timestamp.entity';
import { User } from '../../user/entities/user.entity';
import Task from '../../task/entities/task.entity';

@Entity()
export default class Comment extends TimeStampEntity {
  @Column() context: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  	user: User;

  @ManyToOne(() => Task)
  @JoinColumn({ name: 'task_id' })
  	task: Task;
}
