import { Column, Entity, JoinColumn, ManyToMany, Unique } from "typeorm";
import Task from "./task.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
@Unique("task_user", ["user_id", "task_id"])
export default class TaskUser {
  @ManyToMany(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToMany(() => Task)
  @JoinColumn({ name: "task_id" })
  task: Task;

  @Column({ type: "datetime" })
  assigned_at: Date;
}
