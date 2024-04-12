import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import TimeStampEntity from '../../../core/entities/timestamp.entity';
import Project from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'task' })
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

  public create(name: string, status: string, project: Project, creator: User) {
  	const task = new Task();

  	task.name = name;
  	task.status = status;
  	task.project = project;
  	task.creator = creator;

  	return task;
  }
}
