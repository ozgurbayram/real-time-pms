import { Column, Entity, Index, JoinColumn, ManyToMany } from "typeorm";
import Task from "./task.entity";
import { User } from "../../user/entities/user.entity";
import AbstractEntity from "../../../core/entities/abstract.entity";

@Entity()
export default class TaskUser extends AbstractEntity {
  @ManyToMany(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToMany(() => Task)
  @JoinColumn({ name: "task_id" })
  task: Task;

  @Column()
  assigned_at: string;
}
